// HTML 骨架：所有 SEO 相关标签集中在这里，页面内容只负责正文。

import { site } from "../site.js";
import { content, htmlLang, ogLocale, type Content } from "../i18n/index.js";
import { defaultLocale, locales, pagePath, pageUrl, type Locale, type PageKey } from "../i18n/locales.js";

export interface PageMeta {
  locale: Locale;
  page: PageKey;
  /** <title>，不含站点名后缀（由这里统一拼） */
  title: string;
  description: string;
  /** <main> 内的 HTML */
  body: string;
  /** 结构化数据，会序列化进 <script type="application/ld+json"> */
  jsonLd?: unknown[];
  /** 是否让搜索引擎索引（隐私页之外的页面都为 true） */
  indexable?: boolean;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export { escapeHtml };

function abs(path: string): string {
  return `${site.url}${path}`;
}

function navLinks(locale: Locale, current: PageKey, c: Content): string {
  const items: Array<[PageKey, string]> = [
    ["chrome", c.nav.chrome],
    ["zotero", c.nav.zotero],
    ["android", c.nav.android],
  ];
  const links = items
    .map(([key, label]) => {
      const active = key === current ? ' aria-current="page"' : "";
      return `<a href="${pagePath(locale, key)}"${active}>${escapeHtml(label)}</a>`;
    })
    .join("");
  return links;
}

function languageSwitcher(locale: Locale, current: PageKey, c: Content): string {
  if (locales.length < 2) return "";
  const links = locales
    .filter((l) => l !== locale)
    .map((l) => {
      const label = l === "zh-CN" ? "简体中文" : "English";
      return `<a href="${pagePath(l, current)}" hreflang="${l}" lang="${l}">${escapeHtml(label)}</a>`;
    })
    .join("");
  const currentLabel = locale === "zh-CN" ? "简体中文" : "English";
  return `<details class="lang">
    <summary aria-label="${escapeHtml(c.nav.language)}">${escapeHtml(currentLabel)}</summary>
    <div class="lang-menu">${links}</div>
  </details>`;
}

function alternates(page: PageKey): string {
  const tags = locales.map(
    (l) => `  <link rel="alternate" hreflang="${l}" href="${abs(pagePath(l, page))}">`,
  );
  tags.push(`  <link rel="alternate" hreflang="x-default" href="${abs(pagePath(defaultLocale, page))}">`);
  return tags.join("\n");
}

/** 拼接页面标题：产品页带站点名后缀，首页不加（标题本身已含品牌）。 */
function fullTitle(meta: PageMeta): string {
  return meta.page === "home" ? meta.title : `${meta.title} · ${site.name}`;
}

export function renderPage(meta: PageMeta): string {
  const c = content(meta.locale);
  const title = fullTitle(meta);
  const canonical = pageUrl(meta.locale, meta.page);
  const ogImage = `${site.url}/og/${meta.page}-${meta.locale}.png`;
  const indexable = meta.indexable !== false;

  const jsonLd = (meta.jsonLd ?? [])
    .map((block) => `<script type="application/ld+json">${JSON.stringify(block)}</script>`)
    .join("\n  ");

  const alternateLocales = locales
    .filter((l) => l !== meta.locale)
    .map((l) => `<meta property="og:locale:alternate" content="${ogLocale(l)}">`)
    .join("\n  ");

  return `<!doctype html>
<html lang="${htmlLang(meta.locale)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(meta.description)}">
  <link rel="canonical" href="${canonical}">
${alternates(meta.page)}
  <meta name="robots" content="${indexable ? "index, follow" : "noindex, follow"}">
  <meta name="theme-color" content="#12121a">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${escapeHtml(c.siteName)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(meta.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:locale" content="${ogLocale(meta.locale)}">
  ${alternateLocales}
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${escapeHtml(title)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(meta.description)}">
  <meta name="twitter:image" content="${ogImage}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preload" href="/assets/styles.css" as="style">
  <link rel="stylesheet" href="/assets/styles.css">
  ${jsonLd}
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="wrap header-inner">
      <a class="brand" href="${pagePath(meta.locale, "home")}">
        <span class="brand-mark" aria-hidden="true">R</span>
        <span class="brand-name">${escapeHtml(c.siteName)}</span>
      </a>
      <nav class="site-nav" aria-label="Products">
        ${navLinks(meta.locale, meta.page, c)}
        <a href="${pagePath(meta.locale, "privacy")}"${meta.page === "privacy" ? ' aria-current="page"' : ""}>${escapeHtml(c.nav.privacy)}</a>
        <a href="${site.github.chrome}" rel="noopener" class="nav-github">${escapeHtml(c.nav.github)}</a>
        ${languageSwitcher(meta.locale, meta.page, c)}
      </nav>
    </div>
  </header>

  <main id="main">
${meta.body}
  </main>

  <footer class="site-footer">
    <div class="wrap footer-grid">
      <div class="footer-brand">
        <span class="brand-mark" aria-hidden="true">R</span>
        <p>${escapeHtml(c.footer.tagline)}</p>
        <p class="muted small">${escapeHtml(c.footer.madeFor)}</p>
      </div>
      <div>
        <h2 class="footer-title">${escapeHtml(c.footer.products)}</h2>
        <ul>
          <li><a href="${pagePath(meta.locale, "chrome")}">${escapeHtml(c.nav.chrome)}</a></li>
          <li><a href="${pagePath(meta.locale, "zotero")}">${escapeHtml(c.nav.zotero)}</a></li>
          <li><a href="${pagePath(meta.locale, "android")}">${escapeHtml(c.nav.android)}</a></li>
        </ul>
      </div>
      <div>
        <h2 class="footer-title">${escapeHtml(c.footer.resources)}</h2>
        <ul>
          <li><a href="${site.github.chrome}" rel="noopener">${escapeHtml(c.footer.source)}</a></li>
          <li><a href="${site.github.cloud}" rel="noopener">${escapeHtml(c.footer.cloud)}</a></li>
          <li><a href="mailto:${site.email}">${escapeHtml(site.email)}</a></li>
        </ul>
      </div>
      <div>
        <h2 class="footer-title">${escapeHtml(c.footer.legal)}</h2>
        <ul>
          <li><a href="${pagePath(meta.locale, "privacy")}">${escapeHtml(c.footer.privacy)}</a></li>
        </ul>
      </div>
    </div>
    <div class="wrap footer-bottom">
      <span>© ${new Date().getFullYear()} ${escapeHtml(c.footer.copyright)}</span>
    </div>
  </footer>
</body>
</html>
`;
}
