// 结算页：两个收款渠道共用一个入口。
//
// 点订阅时先问服务端「我该去哪个渠道」（POST /v1/billing/checkout）：
// - provider=paddle → 用 Paddle.js 打开 overlay，价格由 PricePreview 现算
// - provider=waffo  → 服务端铸好结账会话，整页跳过去
// 分流比例只在服务端算一次，前端不参与判断，否则两边分桶会对不上。
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
  var state = { period: "month", prices: {}, country: null, ready: false, initError: null, debug: /[?&]debug=1(?:&|$)/.test(location.search) };
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

  // 拿不到 PricePreview 时的兜底金额。沙箱的 Paddle 目录里没有建这些价，
  // 生产上万一 Paddle 不可用也不该让价格区空着 —— 以 tiers 里的标价为准。
  function fallbackAmount(tier) {
    var value = state.period === "year" ? tier.amount.year : tier.amount.month;
    var locale = document.documentElement.lang || "en";
    try {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: tier.amount.currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    } catch (err) {
      return tier.amount.currency === "USD" ? "$" + value.toFixed(2) : String(value);
    }
  }

  function renderPrice() {
    var tier = CONFIG.tiers[0];
    // 试用版与立即版同价，取任一即可；用试用版更贴近大多数人的默认选择。
    var priceId = priceFor(tier, state.period, "trial");
    var totals = state.prices[priceId];

    if (!totals) {
      if (amountEl) amountEl.textContent = tier.amount ? fallbackAmount(tier) : "";
      return;
    }

    // 原样输出 Paddle 给的字符串，不做任何加工。
    // price 的 tax_mode 是 external（价格不含税），所以 subtotal 就是标价，
    // 与 Waffo 收银台展示的税前金额一致；税在结账页另行计算。
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

  // 两条收款渠道由服务端决定走哪条：这里只问一次「我该去哪」，
  // 不自己判断比例 —— 否则前后端各算一遍，分桶必然对不上。
  function requestProvider(mode) {
    return fetch(CONFIG.apiBase + "/v1/billing/checkout", {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ interval: state.period, withTrial: mode === "trial" }),
    }).then(function (response) {
      if (!response.ok) throw new Error("checkout_unavailable");
      return response.json();
    });
  }

  function openPaddle(mode) {
    var tier = CONFIG.tiers[0];
    var priceId = priceFor(tier, state.period, mode === "trial" ? "trial" : "immediate");
    if (!priceId) return;

    return loadPaddle().then(function (Paddle) {
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
    });
  }

  function subscribe(mode) {
    if (!state.ready) return;

    setActionsDisabled(true);

    requestProvider(mode)
      .then(function (result) {
        // Waffo 的订单必须挂在账号上：先登录，回来再点一次。
        if (result && result.signinRequired) {
          showError(CONFIG.copy.signinRequired);
          return;
        }
        if (result && result.provider === "waffo" && result.url) {
          window.location.href = result.url;
          return;
        }
        return openPaddle(mode);
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
          return Promise.resolve(Paddle.Initialize({ token: CONFIG.clientToken })).catch(function (error) {
            // 重复初始化会抛错，这里不是失败情形；但如果是 token 本身的问题，
            // 后面 PricePreview 必然 403，把原始错误留着一起报出去。
            state.initError = error;
          });
        })
        .then(function () {
          return loadPrices(Paddle);
        });
    })
    .catch(function (error) {
      // 具体原因只进控制台：页面上给用户看原始报错既没用也泄露实现细节。
      // 但要看得出「初始化就没成功」和「预览被拒」的区别，否则 403 只能靠猜。
      if (window.console && window.console.error) {
        window.console.error("[checkout] price preview failed", {
          previewError: error,
          initError: state.initError,
          clientTokenPrefix: String(CONFIG.clientToken || "").split("_")[0],
          environment: CONFIG.environment,
        });
      }
      // 价格预览失败不再拦人：金额有本地兜底，而具体走哪家渠道、按什么金额收款
      // 由服务端的 /v1/billing/checkout 决定 —— 沙箱的 Paddle 目录里本来就没建这些价，
      // 拦下按钮只会让人以为「页面坏了」。原因留在控制台，按钮照常放行。
      setActionsDisabled(false);
    });
})();
`;

function copyFor(locale: Locale) {
  const c = content(locale);
  // 文案在各自的字典里，回退链由 content() 保证 —— 这里不再有语言分支。
  return { ...c.checkout, backHome: c.nav.home };
}

export function renderCheckout(locale: Locale, paddle: PaddleClientConfig): PageMeta {
  const c = content(locale);
  const t = copyFor(locale);

  const plans = tiers
    .map((tier) => {
      const features = c.plan.features.map((f) => `<li>${escapeHtml(f)}</li>`).join("\n          ");
      return `<article class="plan featured plan-checkout">
        <h2>${escapeHtml(tier.name)}</h2>
        <p class="plan-summary">${escapeHtml(c.plan.description)}</p>
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
    tiers: tiers.map((tier) => ({ name: tier.name, priceId: tier.priceId, amount: tier.amount })),
    copy: t,
  };

  const body = `<section class="section checkout-section">
    <div class="wrap">
      <h1>${escapeHtml(t.heading)}</h1>
      <p class="section-lede">${escapeHtml(t.lede)}</p>
      <div class="billing-switch" role="group" aria-label="${escapeHtml(t.billingPeriod)}">
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
