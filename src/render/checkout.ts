// 结算页：价格由 Paddle 的 PricePreview 现算，前端不做任何金额运算。
//
// 关键约束：
// - 页面上出现的金额只能来自 formattedTotals，不拼字符串、不四舍五入、不本地化。
// - 国家码来自服务端注入的 [data-country]；为空时一律不传，让 Paddle 按 IP 自行判断。
// - client token 可以出现在页面里（它本来就是公开的），API key 永远不进前端。

import { site } from "../site.js";
import { content } from "../i18n/index.js";
import { escapeHtml, type PageMeta } from "./layout.js";
import type { Locale } from "../i18n/locales.js";
import { tiers, type PaddleClientConfig } from "../paddle.js";

/** 用户账户 API。和账号页用的是同一个，登录态靠 cookie。 */
const API_BASE = site.apiBase;

/** 序列化成 <script> 里的 JSON，顺带挡掉 </script> 截断。 */
function jsonForScript(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

const CHECKOUT_SCRIPT = String.raw`
(function () {
  var CONFIG = __CONFIG__;
  var state = { period: "month", prices: {}, country: null, ready: false };
  var paddlePromise = null;

  var amountEl = document.querySelector("[data-amount]");
  var cadenceEl = document.querySelector("[data-cadence]");
  var actionEls = Array.prototype.slice.call(document.querySelectorAll("[data-subscribe]"));
  var errorEl = document.getElementById("checkout-error");
  var noteEl = document.getElementById("checkout-note");

  function setActionsDisabled(disabled) {
    actionEls.forEach(function (el) { el.disabled = disabled; });
  }

  function showError(message) {
    if (!errorEl) return;
    errorEl.textContent = message;
    errorEl.hidden = false;
    setActionsDisabled(true);
  }

  function loadPaddle() {
    if (window.Paddle) return Promise.resolve(window.Paddle);
    if (paddlePromise) return paddlePromise;
    paddlePromise = new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
      // onload 只代表脚本下载完，window.Paddle 有可能还没挂上去，
      // 所以这里再轮询一小会儿，别把「还没准备好」当成「加载失败」。
      script.onload = function () {
        var tries = 0;
        (function waitForPaddle() {
          if (window.Paddle) return resolve(window.Paddle);
          if (tries++ >= 60) return reject(new Error("paddle_unavailable"));
          setTimeout(waitForPaddle, 50);
        })();
      };
      script.onerror = function () { reject(new Error("paddle_unavailable")); };
      document.head.appendChild(script);
    });
    return paddlePromise;
  }

  // 只接受真正的两位字母国家码。服务端没给、或给了内部占位符，
  // 一律当作「不知道」—— 此时省略 address，Paddle 会按访问者 IP 定位。
  function readCountry() {
    var el = document.querySelector("[data-country]");
    var value = el ? (el.getAttribute("data-country") || "").trim().toUpperCase() : "";
    return /^[A-Z]{2}$/.test(value) ? value : null;
  }

  // 同一档四个价：月/年 × 试用/立即。金额相同，只是扣费时点不同。
  function priceFor(tier, period, mode) {
    if (mode === "trial") return period === "year" ? tier.priceId.year : tier.priceId.month;
    return period === "year" ? tier.priceId.yearImmediate : tier.priceId.monthImmediate;
  }

  function buildRequest() {
    var items = [];
    CONFIG.tiers.forEach(function (tier) {
      items.push({ priceId: tier.priceId.month, quantity: 1 });
      items.push({ priceId: tier.priceId.year, quantity: 1 });
      items.push({ priceId: tier.priceId.monthImmediate, quantity: 1 });
      items.push({ priceId: tier.priceId.yearImmediate, quantity: 1 });
    });
    var request = { items: items };
    if (state.country) request.address = { countryCode: state.country };
    return request;
  }

  function renderPrice() {
    var tier = CONFIG.tiers[0];
    // 试用版与立即版同价，取任一即可；用试用版更贴近大多数人的默认选择。
    var priceId = priceFor(tier, state.period, "trial");
    var totals = state.prices[priceId];

    if (!totals) {
      if (amountEl) amountEl.textContent = "";
      return;
    }

    // 原样输出 Paddle 给的字符串，不做任何加工。
    // 税外加时 total 含税，页面上展示税前小计，与定价页的「$9.90/月」保持一致；
    // 实付总额在结账页由 Paddle 列出（小计 + 税）。
    if (amountEl) amountEl.textContent = totals.subtotal ?? totals.total;
    if (cadenceEl) cadenceEl.textContent = state.period === "month" ? CONFIG.copy.perMonth : CONFIG.copy.perYear;
  }

  function setPeriod(period) {
    state.period = period;
    var buttons = document.querySelectorAll("[data-period]");
    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      var active = button.getAttribute("data-period") === period;
      button.setAttribute("aria-pressed", active ? "true" : "false");
      button.classList.toggle("is-active", active);
    }
    renderPrice();
  }

  function loadPrices(Paddle) {
    return Paddle.PricePreview(buildRequest()).then(function (result) {
      var lineItems = (result && result.data && result.data.details && result.data.details.lineItems) || [];
      lineItems.forEach(function (item) {
        // 预览结果里价格 ID 嵌在 item.price.id，不在顶层。
        var id = (item.price && item.price.id) || item.priceId;
        if (id && item.formattedTotals) state.prices[id] = item.formattedTotals;
      });
      state.ready = true;
      renderPrice();
      // 价格确实拿到了才放行按钮 —— 否则会打开一个金额为空的结算页。
      setActionsDisabled(false);
      if (noteEl && state.country) noteEl.textContent = CONFIG.copy.localized;
    });
  }

  // 已登录时取邮箱和本站 user id。user id 会作为 customData 传给 Paddle，
  // webhook 靠它把订阅关联回具体用户 —— 少了它，订阅就落不到账号上。
  function prefillCustomer() {
    return fetch(CONFIG.apiBase + "/v1/web/account", { credentials: "include" })
      .then(function (response) { return response.ok ? response.json() : null; })
      .then(function (data) {
        var user = data && data.user ? data.user : null;
        return {
          email: user && user.email ? user.email : null,
          userId: user && user.id ? user.id : null,
        };
      })
      .catch(function () { return { email: null, userId: null }; });
  }

  function subscribe(mode) {
    var tier = CONFIG.tiers[0];
    var priceId = priceFor(tier, state.period, mode === "trial" ? "trial" : "immediate");
    if (!priceId || !state.ready) return;

    setActionsDisabled(true);

    loadPaddle()
      .then(function (Paddle) {
        return prefillCustomer().then(function (who) {
          var options = {
            items: [{ priceId: priceId, quantity: 1 }],
            settings: {
              displayMode: "overlay",
              variant: "one-page",
              successUrl: CONFIG.successUrl,
              theme: "dark",
            },
          };
          // 只有确实登录了才预填，否则留给 Paddle 自己的输入框。
          if (who.email) options.customer = { email: who.email };
          if (who.userId) options.customData = { user_id: who.userId };
          Paddle.Checkout.open(options);
        });
      })
      .catch(function () {
        showError(CONFIG.copy.checkoutFailed);
      })
      .finally(function () {
        // overlay 关掉之后还要能再点一次
        setTimeout(function () {
          if (!errorEl || errorEl.hidden) setActionsDisabled(false);
        }, 800);
      });
  }

  state.country = readCountry();

  document.addEventListener("click", function (event) {
    var target = event.target;
    if (!(target instanceof Element)) return;
    var periodButton = target.closest("[data-period]");
    if (periodButton) {
      event.preventDefault();
      setPeriod(periodButton.getAttribute("data-period") === "year" ? "year" : "month");
      return;
    }
    var action = target.closest("[data-subscribe]");
    if (action) {
      event.preventDefault();
      subscribe(action.getAttribute("data-subscribe") === "trial" ? "trial" : "immediate");
    }
  });

  setPeriod("month");
  loadPaddle()
    .then(function (Paddle) {
      // Paddle.js 默认连 production。test_ 开头的令牌必须先显式切到 sandbox。
      // 注意 Initialize 不接受 environment 参数（传了会抛 Unknown option），
      // 环境只能通过 Environment.set() 设定。
      // 另外 Initialize 是异步的：不等它完成就调 PricePreview 同样会失败。
      return Promise.resolve()
        .then(function () {
          if (Paddle.Environment && Paddle.Environment.set) {
            return Paddle.Environment.set(CONFIG.environment === "production" ? "production" : "sandbox");
          }
        })
        .then(function () {
          return Promise.resolve(Paddle.Initialize({ token: CONFIG.clientToken })).catch(function () {
            // 重复初始化会抛错，这里不是失败情形
          });
        })
        .then(function () {
          return loadPrices(Paddle);
        });
    })
    .catch(function (error) {
      // 具体原因只进控制台：页面上给用户看原始报错既没用也泄露实现细节。
      if (window.console && window.console.error) window.console.error("[checkout] price preview failed", error);
      showError(CONFIG.copy.pricesFailed);
    });
})();
`;

function copyFor(locale: Locale) {
  const c = content(locale);
  if (locale === "zh-CN") {
    return {
      heading: "选择你的套餐",
      lede: "3 天免费试用。需要绑定支付方式，试用结束后自动按所选周期扣费；不想续订的话随时取消。",
      monthly: "按月",
      yearly: "按年",
      perMonth: "/月",
      perYear: "/年",
      subscribeNow: "立即订阅",
      perMonthNote: "标价为税前金额。税费由 Paddle 在结算时按你的所在地计算，最终以结账页显示的总额为准。",
      localized: "价格已按你的所在地显示，最终金额在结算时确认。",
      pricesFailed: "价格加载失败，请刷新页面重试。",
      checkoutFailed: "无法打开结算窗口，请稍后重试或联系支持。",
      startTrial: "开始 3 天试用",
      backHome: c.nav.home,
    };
  }
  return {
    heading: "Choose your plan",
    lede: "3-day free trial. A payment method is required — we charge automatically when the trial ends. Cancel anytime before then.",
    monthly: "Monthly",
    yearly: "Yearly",
    perMonth: "/month",
    perYear: "/year",
    subscribeNow: "Subscribe now",
    perMonthNote: "Prices exclude tax. Paddle calculates applicable tax for your location at checkout, and the checkout total is final.",
    localized: "Prices are shown for your location; the final amount is confirmed at checkout.",
    pricesFailed: "Could not load prices. Please refresh and try again.",
    checkoutFailed: "Could not open checkout. Please try again or contact support.",
    startTrial: "Start 3-day trial",
    backHome: c.nav.home,
  };
}

export function renderCheckout(locale: Locale, paddle: PaddleClientConfig): PageMeta {
  const t = copyFor(locale);

  const plans = tiers
    .map((tier) => {
      const features = tier.features[locale].map((f) => `<li>${escapeHtml(f)}</li>`).join("\n          ");
      return `<article class="plan featured plan-checkout">
        <h2>${escapeHtml(tier.name)}</h2>
        <p class="plan-summary">${escapeHtml(tier.description[locale])}</p>
        <p class="plan-price">
          <strong data-amount aria-live="polite"></strong>
          <span data-cadence>${escapeHtml(t.perMonth)}</span>
        </p>
        <ul class="checklist plan-features">
          ${features}
        </ul>
        <div class="plan-actions">
          <button type="button" class="btn primary" data-subscribe="immediate" disabled>${escapeHtml(t.subscribeNow)}</button>
          <button type="button" class="btn" data-subscribe="trial" disabled>${escapeHtml(t.startTrial)}</button>
        </div>
      </article>`;
    })
    .join("\n      ");

  const config = {
    environment: paddle.environment,
    clientToken: paddle.clientToken,
    successUrl: `${site.url}/welcome`,
    apiBase: API_BASE,
    tiers: tiers.map((tier) => ({ name: tier.name, priceId: tier.priceId })),
    copy: t,
  };

  const body = `<section class="section checkout-section">
    <div class="wrap">
      <h1>${escapeHtml(t.heading)}</h1>
      <p class="section-lede">${escapeHtml(t.lede)}</p>
      <div class="billing-switch" role="group" aria-label="Billing period">
        <button type="button" data-period="month" aria-pressed="true" class="is-active">${escapeHtml(t.monthly)}</button>
        <button type="button" data-period="year" aria-pressed="false">${escapeHtml(t.yearly)}</button>
      </div>
      <div class="grid plans">
        ${plans}
      </div>
      <p id="checkout-note" class="plan-note muted small">${escapeHtml(t.perMonthNote)}</p>
      <p id="checkout-error" class="checkout-error" role="alert" hidden></p>
    </div>
  </section>
  <div data-country="" id="paddle-country" hidden></div>
  <script>${CHECKOUT_SCRIPT.replace("__CONFIG__", jsonForScript(config))}</script>`;

  return {
    locale,
    page: "checkout",
    canonicalPath: "/checkout",
    title: t.heading,
    description: t.lede,
    body,
    indexable: false,
  };
}
