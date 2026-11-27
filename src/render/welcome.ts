// 结算成功后的落地页。Paddle 与 Waffo 都会把用户送回这里。

import { content } from "../i18n/index.js";
import { pagePath, type Locale } from "../i18n/locales.js";
import { escapeHtml, type PageMeta } from "./layout.js";

export function renderWelcome(locale: Locale): PageMeta {
  const c = content(locale);
  const t = c.welcome;

  const body = `<section class="section">
    <div class="wrap welcome-wrap">
      <p class="welcome-mark" aria-hidden="true">✓</p>
      <h1>${escapeHtml(t.heading)}</h1>
      <p class="section-lede">${escapeHtml(t.lede)}</p>
      <div class="cta-row">
        <a class="btn primary" href="${pagePath(locale, "account")}">${escapeHtml(t.accountCta)}</a>
        <a class="btn" href="${pagePath(locale, "home")}">${escapeHtml(t.homeCta)}</a>
      </div>
      <p class="muted small">${escapeHtml(t.note)}</p>
    </div>
  </section>`;

  return {
    locale,
    page: "welcome",
    canonicalPath: "/welcome/",
    title: t.heading,
    description: t.lede,
    body,
    indexable: false,
  };
}
