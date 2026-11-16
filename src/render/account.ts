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

        <div id="signed-out" class="card account-card">
          <h2>${escapeHtml(a.signedOut.heading)}</h2>
          <p class="body-text">${escapeHtml(a.signedOut.body)}</p>
          <form id="login-form" class="account-form" novalidate>
            <label for="email">${escapeHtml(a.signedOut.emailLabel)}</label>
            <div class="account-row">
              <input id="email" name="email" type="email" required autocomplete="email"
                     placeholder="${escapeHtml(a.signedOut.placeholder)}" />
              <button type="submit" class="btn primary" id="login-submit">${escapeHtml(a.signedOut.send)}</button>
            </div>
          </form>
          <p id="login-note" class="muted small" hidden></p>
        </div>

        <div id="signed-in" class="card account-card" hidden>
          <h2>${escapeHtml(a.signedIn.heading)}</h2>
          <dl class="account-facts">
            <div><dt>${escapeHtml(a.signedIn.emailLabel)}</dt><dd id="fact-email">—</dd></div>
            <div><dt>${escapeHtml(a.signedIn.clipsLabel)}</dt><dd id="fact-clips">—</dd></div>
            <div><dt>${escapeHtml(a.signedIn.sessionsLabel)}</dt><dd id="fact-sessions">—</dd></div>
            <div><dt>${escapeHtml(a.signedIn.syncEndpoint)}</dt><dd><code>${escapeHtml(API_BASE)}</code></dd></div>
          </dl>

          <h3>${escapeHtml(a.signedIn.devicesLabel)}</h3>
          <ul id="device-list" class="account-devices"></ul>

          <div class="account-actions">
            <button type="button" class="btn" id="sign-out">${escapeHtml(a.signedIn.signOut)}</button>
            <button type="button" class="btn" id="sign-out-all">${escapeHtml(a.signedIn.signOutAll)}</button>
          </div>

          <details class="account-danger">
            <summary>${escapeHtml(a.signedIn.deleteAccount)}</summary>
            <p class="muted small">${escapeHtml(a.signedIn.deleteWarning)}</p>
            <button type="button" class="btn danger" id="delete-account">${escapeHtml(a.signedIn.deleteConfirm)}</button>
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

  // 默认状态已经是「未登录」，脚本把已登录的卡片换上来即可

  function renderSignedIn(data) {
    outEl.hidden = true;
    inEl.hidden = false;
    document.getElementById("fact-email").textContent = data.user.email;
    document.getElementById("fact-clips").textContent = String(data.clipCount);
    document.getElementById("fact-sessions").textContent = String(data.sessionCount);

    var list = document.getElementById("device-list");
    list.textContent = "";
    if (!data.devices || data.devices.length === 0) {
      var empty = document.createElement("li");
      empty.className = "muted small";
      empty.textContent = dict.noDevices;
      list.appendChild(empty);
      return;
    }
    data.devices.forEach(function (device) {
      var li = document.createElement("li");
      var when = new Date(device.lastSeenAt).toISOString().slice(0, 10);
      li.textContent = (device.name || device.clientId) + " · " + device.platform + " · " + when;
      list.appendChild(li);
    });
  }

  function refresh() {
    return api("/v1/web/account", { method: "GET" }).then(function (res) {
      if (res.ok) return res.json().then(renderSignedIn);
      renderSignedOut();
    });
  }

  // 邮件链接跳回来时带的结果参数
  var params = new URLSearchParams(location.search);
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

  refresh().catch(function () {
    renderSignedOut();
  });
})();
`;
