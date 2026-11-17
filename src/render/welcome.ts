// 结算成功后的落地页。Paddle 完成扣款后把用户送到这里。

import { content } from "../i18n/index.js";
import { pagePath, type Locale } from "../i18n/locales.js";
import { escapeHtml, type PageMeta } from "./layout.js";

export function renderWelcome(locale: Locale): PageMeta {
  const c = content(locale);
  const zh = locale === "zh-CN";

  const heading = zh ? "订阅已生效" : "You're all set";
  const lede = zh
    ? "感谢订阅 Renota Pro。收据会由 Paddle 发到你的邮箱，随时可以在这里管理订阅。"
    : "Thanks for subscribing to Renota Pro. Paddle will email your receipt, and you can manage the subscription any time.";
  const accountLabel = zh ? "前往账户页" : "Go to your account";
  const homeLabel = zh ? "返回首页" : "Back to home";
  const note = zh
    ? "如果几分钟内没有收到确认邮件，请检查垃圾邮件目录，或联系 support@werenota.com。"
    : "If the confirmation email doesn't arrive within a few minutes, check your spam folder or email support@werenota.com.";

  const body = `<section class="section">
    <div class="wrap welcome-wrap">
      <p class="welcome-mark" aria-hidden="true">✓</p>
      <h1>${escapeHtml(heading)}</h1>
      <p class="section-lede">${escapeHtml(lede)}</p>
      <div class="cta-row">
        <a class="btn primary" href="${pagePath(locale, "account")}">${escapeHtml(accountLabel)}</a>
        <a class="btn" href="${pagePath(locale, "home")}">${escapeHtml(homeLabel)}</a>
      </div>
      <p class="muted small">${escapeHtml(note)}</p>
    </div>
  </section>`;

  return {
    locale,
    page: "welcome",
    canonicalPath: "/welcome",
    title: heading,
    description: lede,
    body,
    indexable: false,
  };
}
