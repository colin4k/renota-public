// 账号页：登录（一次性邮件链接）与已登录后的账号概况。
//
// 页面本身是静态渲染的，登录态由内联脚本在浏览器里向 cloud.werenota.com 查询 ——
// cookie 设在 .werenota.com 域下，所以两个子域共享同一个会话。

import { content } from "../i18n/index.js";
import { pagePath, type Locale } from "../i18n/locales.js";
import { site } from "../site.js";
import { escapeHtml, type PageMeta } from "./layout.js";

/** 同步服务地址：与三端客户端的默认值保持一致。 */
const API_BASE = "https://cloud.werenota.com";

function escapeForScript(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/-->/g, "--\\u003e");
}

export function renderAccount(locale: Locale): PageMeta {
  const c = content(locale);
  const a = c.account;

  const body = `
    <section class="hero account-hero">
      <div class="wrap">
        <h1>${escapeHtml(a.title)}</h1>
        <p class="lede">${escapeHtml(a.intro)}</p>
      </div>
    </section>

    <section class="account">
      <div class="wrap">
        <p id="account-status" class="account-status" hidden></p>

        <div id="signed-out" class="panel auth-panel">
          <h2 class="panel-title">${escapeHtml(a.signedOut.heading)}</h2>
          <p class="panel-lede">${escapeHtml(a.signedOut.body)}</p>

          <div id="google-row" hidden>
            <a class="btn provider-btn" id="google-signin" href="${escapeHtml(API_BASE)}/v1/auth/google?next=${encodeURIComponent(
              `${site.url}${pagePath(locale, "account")}`,
            )}">
              <svg class="provider-icon" viewBox="0 0 48 48" aria-hidden="true" width="18" height="18">
                <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.4 5.4 2.5 13.3l7.8 6c1.9-5.6 7.1-9.8 13.7-9.8z"/>
                <path fill="#4285F4" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9.1h12.4c-.5 2.9-2.1 5.4-4.5 7l7.6 5.9c4.4-4.1 6.6-10.1 6.6-17.4z"/>
                <path fill="#FBBC05" d="M10.3 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.8-6C.9 16.5 0 20.1 0 24s.9 7.5 2.5 10.7l7.8-6z"/>
                <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.6-5.9c-2.1 1.4-4.8 2.3-7.6 2.3-6.6 0-11.8-4.2-13.7-9.9l-7.8 6C6.4 42.6 14.6 48 24 48z"/>
              </svg>
              ${escapeHtml(a.signedOut.google)}
            </a>
            <div class="divider" id="google-or"><span>${escapeHtml(a.signedOut.orEmail)}</span></div>
          </div>

          <form id="login-form" class="auth-form" novalidate>
            <label for="email">${escapeHtml(a.signedOut.emailLabel)}</label>
            <div class="auth-input-row">
              <input id="email" name="email" type="email" required autocomplete="email"
                     placeholder="${escapeHtml(a.signedOut.placeholder)}" />
              <button type="submit" class="btn primary" id="login-submit">${escapeHtml(a.signedOut.send)}</button>
            </div>
          </form>
          <p id="login-note" class="auth-note" hidden></p>
        </div>

        <div id="signed-in" class="panel account-panel" hidden>
          <header class="account-head">
            <span class="account-avatar" aria-hidden="true">R</span>
            <div class="account-head-text">
              <p class="account-email" id="fact-email">—</p>
              <p class="account-since">${escapeHtml(a.signedIn.heading)}</p>
            </div>
          </header>

          <dl class="account-stats">
            <div><dt>${escapeHtml(a.signedIn.clipsLabel)}</dt><dd id="fact-clips">—</dd></div>
            <div><dt>${escapeHtml(a.signedIn.sessionsLabel)}</dt><dd id="fact-sessions">—</dd></div>
            <div class="wide">
              <dt>${escapeHtml(a.signedIn.syncEndpoint)}</dt>
              <dd><code id="fact-endpoint">${escapeHtml(API_BASE)}</code></dd>
            </div>
          </dl>

          <section class="account-section">
            <h3>${escapeHtml(a.signedIn.devicesLabel)}</h3>
            <ul id="device-list" class="device-list"></ul>
          </section>

          <section class="account-section plan-section">
            <h3>${escapeHtml(a.plan.label)}</h3>
            <div id="plan-row" class="plan-row" hidden>
              <div>
                <span class="plan-badge" id="plan-name">—</span>
                <div class="plan-when" id="plan-when"></div>
              </div>
              <div class="plan-actions">
                <button type="button" class="btn primary" id="plan-subscribe" hidden>${escapeHtml(a.plan.checkout)}</button>
                <button type="button" class="btn" id="plan-cancel" hidden>${escapeHtml(a.plan.cancel)}</button>
                <a class="btn" href="${pagePath(locale, "pricing")}">${escapeHtml(a.plan.pricingLink)}</a>
              </div>
            </div>
          </section>

          <div class="account-actions">
            <button type="button" class="btn" id="sign-out">${escapeHtml(a.signedIn.signOut)}</button>
            <button type="button" class="btn" id="sign-out-all">${escapeHtml(a.signedIn.signOutAll)}</button>
          </div>

          <details class="danger-zone">
            <summary>${escapeHtml(a.signedIn.deleteAccount)}</summary>
            <div class="danger-body">
              <p class="muted small">${escapeHtml(a.signedIn.deleteWarning)}</p>
              <button type="button" class="btn danger" id="delete-account">${escapeHtml(a.signedIn.deleteConfirm)}</button>
            </div>
          </details>
        </div>

        <p class="account-back"><a href="${pagePath(locale, "home")}">← ${escapeHtml(a.backHome)}</a></p>
      </div>
    </section>

    <script type="application/json" id="account-i18n">${escapeForScript({
      send: a.signedOut.send,
      sending: a.signedOut.sending,
      sent: a.signedOut.sent,
      noDevices: a.signedIn.noDevices,
      deleting: a.signedIn.deleting,
      welcome: a.welcome,
      errors: a.errors,
      plan: a.plan,
    })}</script>
    <script>${ACCOUNT_SCRIPT.replace("__API_BASE__", API_BASE)}</script>`;

  return {
    locale,
    page: "account",
    title: a.title,
    description: a.intro,
    body,
    indexable: false,
  };
}

/**
 * 页面脚本。刻意保持无依赖：静态站不引入打包器，这段代码直接内联进 HTML。
 * 所有语言文案都从上面的 JSON 块读取。
 */
const ACCOUNT_SCRIPT = String.raw`
(function () {
  var API = "__API_BASE__";
  var dict = JSON.parse(document.getElementById("account-i18n").textContent);
  var statusEl = document.getElementById("account-status");
  var outEl = document.getElementById("signed-out");
  var inEl = document.getElementById("signed-in");
  var form = document.getElementById("login-form");
  var noteEl = document.getElementById("login-note");
  var submitEl = document.getElementById("login-submit");

  function showStatus(message, kind) {
    if (!message) { statusEl.hidden = true; return; }
    statusEl.textContent = message;
    statusEl.className = "account-status " + (kind || "");
    statusEl.hidden = false;
  }

  function errorText(code) {
    return dict.errors[code] || dict.errors.generic;
  }

  function api(path, options) {
    var opts = options || {};
    opts.credentials = "include";
    opts.headers = Object.assign({ "content-type": "application/json" }, opts.headers || {});
    return fetch(API + path, opts);
  }

  function renderSignedOut() {
    outEl.hidden = false;
    inEl.hidden = true;
  }

  // ---------- 订阅 ----------

  var billingCache = null;
  var paddleLoading = null;

  function formatDay(ts) {
    if (!ts) return "";
    var d = new Date(ts);
    var pad = function (n) { return n < 10 ? "0" + n : String(n); };
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  function loadPaddle() {
    if (window.Paddle) return Promise.resolve(window.Paddle);
    if (paddleLoading) return paddleLoading;
    paddleLoading = new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
      script.onload = function () { resolve(window.Paddle); };
      script.onerror = function () { reject(new Error("paddle_unavailable")); };
      document.head.appendChild(script);
    });
    return paddleLoading;
  }

  function renderPlan(plan, planExpiresAt) {
    var row = document.getElementById("plan-row");
    if (!row) return;
    row.hidden = false;

    var nameEl = document.getElementById("plan-name");
    var whenEl = document.getElementById("plan-when");
    var subscribeEl = document.getElementById("plan-subscribe");
    var cancelEl = document.getElementById("plan-cancel");
    var p = dict.plan;

    var isPro = plan === "pro";
    nameEl.textContent = isPro ? p.pro : p.free;
    nameEl.className = "plan-badge" + (isPro ? " pro" : "");

    var sub = billingCache && billingCache.subscription;
    if (isPro && sub) {
      if (sub.cancelAtPeriodEnd) {
        whenEl.textContent = p.canceledUntil + " " + formatDay(sub.currentPeriodEnd);
        cancelEl.hidden = true;
      } else {
        whenEl.textContent = p.renewsOn + " " + formatDay(sub.currentPeriodEnd);
        cancelEl.hidden = false;
      }
      if (sub.status === "past_due") whenEl.textContent = p.pastDue;
    } else if (isPro) {
      whenEl.textContent = planExpiresAt ? p.until + " " + formatDay(planExpiresAt) : "";
      cancelEl.hidden = true;
    } else {
      whenEl.textContent = p.upgrade + (p.price ? " · " + p.price : "");
      cancelEl.hidden = true;
    }

    var available = !!(billingCache && billingCache.available);
    subscribeEl.hidden = isPro || !available;
  }

  function refreshBilling() {
    return fetch(API + "/v1/billing/status", { credentials: "include", headers: { "content-type": "application/json" } })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (data) {
        billingCache = data;
        return data;
      })
      .catch(function () { return null; });
  }

  function startCheckout() {
    var button = document.getElementById("plan-subscribe");
    button.disabled = true;

    api("/v1/billing/checkout", { method: "POST", body: "{}" })
      .then(function (res) {
        return res.json().then(function (body) {
          if (!res.ok) throw new Error(body.code || "checkout_failed");
          return body;
        });
      })
      .then(function (order) {
        return loadPaddle().then(function (Paddle) {
          Paddle.Environment.set(order.environment === "production" ? "production" : "sandbox");
          Paddle.Initialize({
            token: order.clientToken,
            eventCallback: function (event) {
              if (event && event.name === "checkout.completed") {
                // webhook 落库有几百毫秒延迟，等一会儿再拉状态
                setTimeout(function () { refresh().then(function () {}); location.reload(); }, 2500);
              }
            },
          });
          Paddle.Checkout.open({ transactionId: order.transactionId });
        });
      })
      .catch(function () {
        showStatus(dict.plan.failed, "err");
      })
      .finally(function () {
        button.disabled = false;
        button.textContent = dict.plan.checkout;
      });
  }

  function cancelPlan() {
    if (!window.confirm(dict.plan.cancelHint)) return;
    var button = document.getElementById("plan-cancel");
    button.disabled = true;
    api("/v1/billing/cancel", { method: "POST", body: "{}" })
      .then(function (res) {
        if (!res.ok) throw new Error("cancel_failed");
        showStatus(dict.plan.cancelDone, "ok");
        return refreshBilling();
      })
      .then(function () { return refresh(); })
      .catch(function () { showStatus(dict.errors.generic, "err"); })
      .finally(function () {
        button.disabled = false;
      });
  }

  // 默认状态已经是「未登录」，脚本把已登录的卡片换上来即可

  function renderSignedIn(data) {
    outEl.hidden = true;
    inEl.hidden = false;
    document.getElementById("fact-email").textContent = data.user.email;
    document.getElementById("fact-clips").textContent = String(data.clipCount);
    document.getElementById("fact-sessions").textContent = String(data.sessionCount);

    renderPlan(data.plan, data.planExpiresAt);
    refreshBilling().then(function () { renderPlan(data.plan, data.planExpiresAt); });

    var list = document.getElementById("device-list");
    list.textContent = "";
    if (!data.devices || data.devices.length === 0) {
      var empty = document.createElement("li");
      empty.className = "device-empty";
      empty.textContent = dict.noDevices;
      list.appendChild(empty);
      return;
    }
    data.devices.forEach(function (device) {
      var li = document.createElement("li");
      li.className = "device-row";

      var main = document.createElement("span");
      main.className = "device-name";
      main.textContent = device.name || device.clientId;

      var meta = document.createElement("span");
      meta.className = "device-meta";
      var when = new Date(device.lastSeenAt).toISOString().slice(0, 10);
      meta.textContent = device.platform + " · " + when;

      li.appendChild(main);
      li.appendChild(meta);
      list.appendChild(li);
    });
  }

  function loadProviders() {
    return fetch(API + "/v1/auth/providers", { credentials: "include" })
      .then(function (res) { return res.ok ? res.json() : { google: false }; })
      .then(function (info) {
        if (info.google) {
          document.getElementById("google-row").hidden = false;
          document.getElementById("google-or").hidden = false;
        }
      })
      .catch(function () {});
  }

  function refresh() {
    return api("/v1/web/account", { method: "GET" }).then(function (res) {
      if (res.ok) return res.json().then(renderSignedIn);
      renderSignedOut();
    });
  }

  // 邮件链接跳回来时带的结果参数
  var params = new URLSearchParams(location.search);
  var wantsSubscribe = params.get("subscribe") === "1";
  if (params.get("welcome")) showStatus(dict.welcome, "ok");
  if (params.get("error")) showStatus(errorText(params.get("error")), "err");
  if (params.toString()) {
    history.replaceState(null, "", location.pathname);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var email = document.getElementById("email").value.trim();
    if (!email) return;

    submitEl.disabled = true;
    submitEl.textContent = dict.sending;
    noteEl.hidden = false;
    noteEl.textContent = dict.sending;

    api("/v1/auth/link", { method: "POST", body: JSON.stringify({ email: email }) })
      .then(function (res) {
        return res.json().then(function (body) {
          if (res.ok) {
            noteEl.textContent = dict.sent;
            showStatus("");
          } else {
            noteEl.hidden = true;
            showStatus(errorText(body.code), "err");
          }
        });
      })
      .catch(function () {
        noteEl.hidden = true;
        showStatus(dict.errors.generic, "err");
      })
      .finally(function () {
        submitEl.disabled = false;
        submitEl.textContent = dict.send;
      });
  });

  document.getElementById("plan-subscribe").addEventListener("click", startCheckout);
  document.getElementById("plan-cancel").addEventListener("click", cancelPlan);

  document.getElementById("sign-out").addEventListener("click", function () {
    api("/v1/auth/logout", { method: "POST", body: "{}" }).then(function () {
      location.reload();
    });
  });

  document.getElementById("sign-out-all").addEventListener("click", function () {
    api("/v1/auth/logout-all", { method: "POST", body: "{}" }).then(function () {
      location.reload();
    });
  });

  document.getElementById("delete-account").addEventListener("click", function () {
    var button = document.getElementById("delete-account");
    button.disabled = true;
    button.textContent = dict.deleting;
    api("/v1/web/account", { method: "DELETE" })
      .then(function (res) {
        if (res.ok) location.reload();
        else { button.disabled = false; button.textContent = dict.errors.generic; }
      })
      .catch(function () {
        button.disabled = false;
        button.textContent = dict.errors.generic;
      });
  });

  loadProviders();
  refresh()
    .then(function () {
      if (wantsSubscribe && !inEl.hidden) startCheckout();
    })
    .catch(function () {
      renderSignedOut();
    });
})();
`;
