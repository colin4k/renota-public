// 账号页：登录（一次性邮件链接）与已登录后的账号概况。
//
// 页面本身是静态渲染的，登录态由内联脚本在浏览器里向 cloud.werenota.com 查询 ——
// cookie 设在 .werenota.com 域下，所以两个子域共享同一个会话。

import { content } from "../i18n/index.js";
import { defaultLocale, pagePath, type Locale } from "../i18n/locales.js";
import { site } from "../site.js";
import { escapeHtml, type PageMeta } from "./layout.js";

/** 同步服务地址：与三端客户端的默认值保持一致。 */
const API_BASE = site.apiBase;

function escapeForScript(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/-->/g, "--\\u003e");
}

export function renderAccount(locale: Locale): PageMeta {
  const c = content(locale);
  const a = c.account;
  // 结账只有一个入口：站点自己的 /checkout 页面（Paddle.js 直连 priceId）。
  const checkoutHref = locale === defaultLocale ? "/checkout/" : `/${locale}/checkout/`;

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
                <a class="btn primary" id="plan-subscribe" href="${escapeHtml(checkoutHref)}" hidden>${escapeHtml(a.plan.checkout)}</a>
                <button type="button" class="btn" id="plan-portal" hidden>${escapeHtml(a.plan.manageBilling)}</button>
                <button type="button" class="btn" id="plan-cancel" hidden>${escapeHtml(a.plan.cancel)}</button>
                <a class="btn" href="${pagePath(locale, "pricing")}">${escapeHtml(a.plan.pricingLink)}</a>
              </div>
            </div>
          </section>

          <section class="account-section" id="storage-section" hidden>
            <h3>${escapeHtml(a.storage.label)}</h3>
            <div class="plan-row storage-row">
              <div>
                <span class="plan-badge" id="storage-value">—</span>
                <div class="plan-when" id="storage-note" hidden></div>
              </div>
            </div>
          </section>

          <section class="account-section keys-section">
            <h3>${escapeHtml(a.keys.label)}</h3>
            <p class="keys-intro">${escapeHtml(a.keys.intro)}</p>
            <p id="keys-locked" class="keys-locked" hidden>${escapeHtml(a.keys.requiresPro)}</p>

            <div class="key-create-row">
              <input id="key-name" type="text" maxlength="60" autocomplete="off" spellcheck="false"
                     placeholder="${escapeHtml(a.keys.namePlaceholder)}" />
              <button type="button" class="btn primary" id="key-create">${escapeHtml(a.keys.create)}</button>
            </div>
            <p id="key-note" class="auth-note" hidden></p>

            <div id="key-created" class="key-created" hidden>
              <code id="key-created-value"></code>
              <button type="button" class="btn" id="key-copy">${escapeHtml(a.keys.copy)}</button>
              <p class="muted small">${escapeHtml(a.keys.createdHint)}</p>
            </div>

            <ul id="key-list" class="key-list"></ul>

            <div class="mcp-box">
              <p class="mcp-label">${escapeHtml(a.keys.mcpTitle)}</p>
              <code class="mcp-url" id="mcp-url">${escapeHtml(API_BASE)}/mcp</code>
              <p class="muted small">${escapeHtml(a.keys.mcpHint)}</p>
              <details class="mcp-config">
                <summary>${escapeHtml(a.keys.configTitle)}</summary>
                <pre id="mcp-snippet"></pre>
              </details>
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

        <p class="account-back"><a href="${pagePath(locale, "home")}">${escapeHtml(a.backHome)}</a></p>
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
      storage: a.storage,
      keys: a.keys,
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

  function formatDay(ts) {
    if (!ts) return "";
    var d = new Date(ts);
    var pad = function (n) { return n < 10 ? "0" + n : String(n); };
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  function renderPlan(plan, planExpiresAt) {
    var row = document.getElementById("plan-row");
    if (!row) return;
    row.hidden = false;

    var nameEl = document.getElementById("plan-name");
    var whenEl = document.getElementById("plan-when");
    var subscribeEl = document.getElementById("plan-subscribe");
    var cancelEl = document.getElementById("plan-cancel");
    var portalEl = document.getElementById("plan-portal");
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
    // 有订阅才有 Paddle customer，自助改卡/开发票才有意义。
    if (portalEl) portalEl.hidden = !isPro || !available;
  }

  // ---------- 云端存储用量 ----------

  // 上限与已用都由接口给出（200 MB 是 Pro 档的额度，别写死在页面里）。
  // 用量用 1024 进制换算：limitBytes 209715200 正好是 200 MB。
  function formatBytes(bytes) {
    var b = Number(bytes);
    if (!isFinite(b) || b <= 0) return "0 MB";
    var mb = b / 1048576;
    if (mb >= 10) return Math.round(mb) + " MB";
    if (mb >= 1) {
      var v = Math.round(mb * 10) / 10;
      return (v % 1 === 0 ? String(v) : v.toFixed(1)) + " MB";
    }
    return Math.round(b / 1024) + " KB";
  }

  // 老部署的 /v1/web/account 还没有 storage 字段：缺了就整块不显示，
  // 不要拿 0 去猜用户用了多少。
  // 免费档没有云存储（同步接口返回 402），但仍把上限显示出来，
  // 外加一句「云端存储是 Pro 档的功能」，避免误以为现在就能用满 200 MB。
  function renderStorage(storage, plan) {
    var section = document.getElementById("storage-section");
    if (!section) return;
    var limit = storage && Number(storage.limitBytes);
    if (!storage || !isFinite(limit) || limit <= 0) {
      section.hidden = true;
      return;
    }
    var used = Number(storage.usedBytes);
    if (!isFinite(used) || used < 0) used = 0;
    var s = dict.storage;

    document.getElementById("storage-value").textContent =
      s.used + " " + formatBytes(used) + " / " + s.limit + " " + formatBytes(limit);

    var note = document.getElementById("storage-note");
    if (used >= limit) {
      note.textContent = s.full;
      note.className = "plan-when storage-full";
      note.hidden = false;
    } else if (plan !== "pro") {
      note.textContent = s.freeHint;
      note.className = "plan-when";
      note.hidden = false;
    } else {
      note.textContent = "";
      note.className = "plan-when";
      note.hidden = true;
    }
    section.hidden = false;
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

  // 结账走站点的 /checkout 页面（那个页面自己调 Paddle.js），
  // 账号页不再建 transaction、也不初始化 Paddle —— 只有一条链路。
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

  // 自助账单管理：服务端用会话里的 customer_id 铸一条已登录的 Paddle portal 链接，
  // 这里只负责整页跳过去（Paddle 要求托管页，不能嵌 iframe）。
  function openPortal() {
    var button = document.getElementById("plan-portal");
    button.disabled = true;

    api("/v1/billing/portal", { method: "POST", body: "{}" })
      .then(function (res) {
        return res.json().then(function (body) {
          if (!res.ok) throw new Error(body.code || "portal_failed");
          return body;
        });
      })
      .then(function (session) {
        window.location.href = session.url;
      })
      .catch(function () {
        showStatus(dict.plan.portalFailed, "err");
        button.disabled = false;
      });
  }

  // ---------- API 密钥 / MCP ----------

  var keyCache = { mcpUrl: "", available: false };

  function showKeyNote(message, kind) {
    var el = document.getElementById("key-note");
    if (!message) { el.hidden = true; return; }
    el.textContent = message;
    el.className = "auth-note" + (kind ? " " + kind : "");
    el.hidden = false;
  }

  function renderMcp() {
    var target = document.getElementById("mcp-url");
    if (target && keyCache.mcpUrl) target.textContent = keyCache.mcpUrl;
    var snippet = document.getElementById("mcp-snippet");
    if (!snippet) return;
    var url = keyCache.mcpUrl || (API + "/mcp");
    snippet.textContent = JSON.stringify({
      mcpServers: {
        renota: {
          type: "http",
          url: url,
          headers: { Authorization: "Bearer <your API key>" }
        }
      }
    }, null, 2);
  }

  function renderKeyList(keys) {
    var list = document.getElementById("key-list");
    list.textContent = "";

    if (!keys || keys.length === 0) {
      var empty = document.createElement("li");
      empty.className = "key-empty";
      empty.textContent = dict.keys.empty;
      list.appendChild(empty);
      return;
    }

    keys.forEach(function (item) {
      var li = document.createElement("li");
      li.className = "key-row";

      var main = document.createElement("div");
      main.className = "key-main";

      var name = document.createElement("span");
      name.className = "key-name";
      name.textContent = item.name;

      var meta = document.createElement("span");
      meta.className = "key-meta";
      var used = item.lastUsedAt ? dict.keys.lastUsed + " " + formatDay(item.lastUsedAt) : dict.keys.never;
      meta.textContent = item.prefix + " · " + dict.keys.created + " " + formatDay(item.createdAt) + " · " + used;

      main.appendChild(name);
      main.appendChild(meta);

      var revoke = document.createElement("button");
      revoke.type = "button";
      revoke.className = "btn key-revoke";
      revoke.textContent = dict.keys.revoke;
      revoke.addEventListener("click", function () { revokeKey(item.id, revoke); });

      li.appendChild(main);
      li.appendChild(revoke);
      list.appendChild(li);
    });
  }

  function loadKeys() {
    return api("/v1/api-keys", { method: "GET" })
      .then(function (res) {
        if (!res.ok) throw new Error("keys_failed");
        return res.json();
      })
      .then(function (data) {
        keyCache.mcpUrl = data.mcp && data.mcp.url ? data.mcp.url : API + "/mcp";
        keyCache.available = !!data.mcpAvailable;
        renderKeyList(data.keys || []);
        renderMcp();

        document.getElementById("keys-locked").hidden = keyCache.available;
        document.getElementById("key-create").disabled = !keyCache.available;
        document.getElementById("key-name").disabled = !keyCache.available;
        return data;
      })
      .catch(function () {
        showKeyNote(dict.keys.loadFailed, "err");
        renderMcp();
      });
  }

  function keyErrorMessage(code) {
    if (code === "duplicate_name") return dict.keys.nameTaken;
    if (code === "too_many_keys") return dict.keys.limitReached;
    if (code === "invalid_name") return dict.keys.nameRequired;
    return dict.keys.createFailed;
  }

  function createKey() {
    var input = document.getElementById("key-name");
    var button = document.getElementById("key-create");
    var name = input.value.trim();
    if (!name) { showKeyNote(dict.keys.nameRequired, "err"); return; }

    button.disabled = true;
    button.textContent = dict.keys.creating;

    api("/v1/api-keys", { method: "POST", body: JSON.stringify({ name: name }) })
      .then(function (res) {
        return res.json().then(function (body) { return { ok: res.ok, code: body && body.code, body: body }; });
      })
      .then(function (result) {
        if (!result.ok) {
          showKeyNote(keyErrorMessage(result.code), "err");
          return null;
        }
        input.value = "";
        document.getElementById("key-created").hidden = false;
        document.getElementById("key-created-value").textContent = result.body.key;
        showKeyNote("", "");
        return loadKeys();
      })
      .catch(function () { showKeyNote(dict.keys.createFailed, "err"); })
      .then(function () {
        button.disabled = !keyCache.available;
        button.textContent = dict.keys.create;
      });
  }

  function copyCreatedKey() {
    var value = document.getElementById("key-created-value").textContent || "";
    if (!value) return;
    var button = document.getElementById("key-copy");
    var done = function () {
      button.textContent = dict.keys.copied;
      setTimeout(function () { button.textContent = dict.keys.copy; }, 1600);
    };
    var fallback = function () {
      var area = document.createElement("textarea");
      area.value = value;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try { document.execCommand("copy"); done(); } catch (e) { /* 让用户手动选 */ }
      document.body.removeChild(area);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(done).catch(fallback);
    } else {
      fallback();
    }
  }

  function revokeKey(id, button) {
    button.disabled = true;
    button.textContent = dict.keys.revoking;
    api("/v1/api-keys/" + encodeURIComponent(id), { method: "DELETE" })
      .then(function (res) {
        if (!res.ok) throw new Error("revoke_failed");
        document.getElementById("key-created").hidden = true;
        showKeyNote(dict.keys.revokedNotice, "ok");
        return loadKeys();
      })
      .catch(function () {
        button.disabled = false;
        button.textContent = dict.keys.revoke;
        showKeyNote(dict.errors.generic, "err");
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
    renderStorage(data.storage, data.plan);
    refreshBilling().then(function () { renderPlan(data.plan, data.planExpiresAt); });
    loadKeys();

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

  document.getElementById("plan-cancel").addEventListener("click", cancelPlan);
  document.getElementById("plan-portal").addEventListener("click", openPortal);
  document.getElementById("key-create").addEventListener("click", createKey);
  document.getElementById("key-copy").addEventListener("click", copyCreatedKey);
  document.getElementById("key-name").addEventListener("keydown", function (event) {
    if (event.key === "Enter") { event.preventDefault(); createKey(); }
  });

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
      // 从那封「点这里订阅」的邮件跳回来时，直接送去结算页。
      if (wantsSubscribe && !inEl.hidden) location.replace(document.getElementById("plan-subscribe").getAttribute("href"));
    })
    .catch(function () {
      renderSignedOut();
    });
})();
`;
