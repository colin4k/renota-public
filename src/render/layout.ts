// HTML 骨架：所有 SEO 相关标签集中在这里，页面内容只负责正文。

import { site } from "../site.js";
import { content, htmlLang, ogLocale, type Content } from "../i18n/index.js";
import {
  defaultLocale,
  localeLabels,
  locales,
  pages,
  pagePath,
  pageUrl,
  type Locale,
  type PageKey,
} from "../i18n/locales.js";

/**
 * 功能页：没有导航项、不进 sitemap、不参与 hreflang。
 * checkout 和 welcome 属于这类 —— 它们由 Paddle 结算流程驱动，
 * 不是站点内容，搜索引擎也没有索引它们的理由。
 */
export type UtilityPageKey = "checkout" | "welcome";
export type AnyPageKey = PageKey | UtilityPageKey;

function isSitePage(page: AnyPageKey): page is PageKey {
  return (pages as readonly string[]).includes(page);
}

/**
 * 样式表路径。构建时会改写为带内容哈希的文件名（styles.<hash>.css），
 * 这样 /assets/* 的 immutable 长缓存才名副其实 —— 改了样式文件名就变，
 * 浏览器必然重新下载，不会出现「HTML 更新了但 CSS 还是旧的」。
 */
export const DEFAULT_CSS_HREF = "/assets/styles.css";

export interface PageMeta {
  locale: Locale;
  page: AnyPageKey;
  /** 功能页的 canonical 路径（站点页面由 page + locale 推导，不用填） */
  canonicalPath?: string;
  /** <title>，不含站点名后缀（由这里统一拼） */
  title: string;
  description: string;
  /** <main> 内的 HTML */
  body: string;
  /** 结构化数据，会序列化进 <script type="application/ld+json"> */
  jsonLd?: unknown[];
  /** 是否让搜索引擎索引（隐私页之外的页面都为 true） */
  indexable?: boolean;
  /** 带内容哈希的样式表路径，由构建流程注入 */
  cssHref?: string;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}


function abs(path: string): string {
  return `${site.url}${path}`;
}

/**
 * 允许出现第三方统计脚本的页面。
 *
 * AGENTS.md 的硬性约束是「内容页不加客户端 JS」，所以这里刻意只列账号页与结账页 ——
 * 这两页本来就为 Paddle / 登录流程带了内联脚本，再挂一个 defer 的 tracker
 * 既不改变首屏渲染路径，也不破坏「内容页零 JS」的承诺。
 *
 * 后果是「首页 → 定价页」的曝光拿不到数，只能看到「进入账号页 → 进入结账页 → 付款」
 * 这一段。要补前面那段，得先改 AGENTS.md 那条约束。
 */
const ANALYTICS_PAGES: ReadonlySet<AnyPageKey> = new Set(["account", "checkout", "welcome"]);

/** Umami tracker。两项配置缺一就不输出，本地构建产物里不会出现任何外部脚本。 */
function analyticsTag(page: AnyPageKey): string {
  const { src, websiteId } = site.umami;
  if (!src || !websiteId || !ANALYTICS_PAGES.has(page)) return "";
  return `  <script defer src="${escapeHtml(src)}/script.js" data-website-id="${escapeHtml(websiteId)}"></script>`;
}


/**
 * 六个页面链接。渲染两次：一次给桌面导航，一次给移动端折叠菜单。
 * 两份是同一组 href，SSR 静态站里没有副作用，换来的是纯 CSS 的两态切换
 * （内容页不允许加客户端 JS）。
 */
function navLinks(locale: Locale, current: PageKey | null, c: Content): string {
  const items: Array<[PageKey, string]> = [
    ["chrome", c.nav.chrome],
    ["zotero", c.nav.zotero],
    ["android", c.nav.android],
    ["pricing", c.nav.pricing],
    ["privacy", c.nav.privacy],
    ["account", c.nav.account],
  ];
  const links = items
    .map(([key, label]) => {
      const active = key === current ? ' aria-current="page"' : "";
      return `<a href="${pagePath(locale, key)}"${active}>${escapeHtml(label)}</a>`;
    })
    .join("");
  return links;
}

function languageSwitcher(locale: Locale, current: PageKey | null, c: Content): string {
  // 功能页不参与语言互跳：结算页的文案由 Paddle 自己的本地化负责。
  if (current === null) return "";
  if (locales.length < 2) return "";
  // 语言名一律用它自己的写法（日本語、Français），不随界面语言变化 ——
  // 一个看不懂当前界面语言的用户，也能在这些原生名里找到自己那一行。
  const links = locales
    .filter((l) => l !== locale)
    .map((l) => {
      const label = localeLabels[l];
      return `<a href="${pagePath(l, current)}" hreflang="${l}" lang="${l}">${escapeHtml(label)}</a>`;
    })
    .join("");
  const currentLabel = localeLabels[locale];
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
  const sitePage = isSitePage(meta.page) ? meta.page : null;
  const canonical = sitePage
    ? pageUrl(meta.locale, sitePage)
    : `${site.url}${meta.canonicalPath ?? "/"}`;
  // 功能页没有预渲染的社媒预览图，也不该出现在分享卡片里。
  const ogImage = sitePage ? `${site.url}/og/${sitePage}-${meta.locale}.png` : null;
  const indexable = meta.indexable !== false;

  const hreflangTags = sitePage ? alternates(sitePage) : "";
  const ogImageTags = ogImage
    ? `  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${escapeHtml(title)}">
  <meta name="twitter:card" content="summary_large_image">`
    : `  <meta name="twitter:card" content="summary">`;
  const twitterImageTag = ogImage ? `  <meta name="twitter:image" content="${ogImage}">` : "";

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
${hreflangTags}
  <meta name="robots" content="${indexable ? "index, follow" : "noindex, follow"}">
  <meta name="theme-color" content="#0b0c0f">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${escapeHtml(c.siteName)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(meta.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:locale" content="${ogLocale(meta.locale)}">
  ${alternateLocales}
${ogImageTags}
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(meta.description)}">
${twitterImageTag}
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="${escapeHtml(meta.cssHref ?? DEFAULT_CSS_HREF)}" as="style">
  <link rel="stylesheet" href="${escapeHtml(meta.cssHref ?? DEFAULT_CSS_HREF)}">
  ${jsonLd}
${analyticsTag(meta.page)}
</head>
<body>
  <a class="skip" href="#main">${escapeHtml(c.common.skipToContent)}</a>
  <header class="site-header">
    <div class="wrap header-inner">
      <a class="brand" href="${pagePath(meta.locale, "home")}">
        <span class="brand-mark" aria-hidden="true">R</span>
        <span class="brand-name">${escapeHtml(c.siteName)}</span>
      </a>
      <nav class="site-nav" aria-label="${escapeHtml(c.common.productsNav)}">
        ${navLinks(meta.locale, sitePage, c)}
      </nav>
      <div class="header-actions">
        <details class="nav-menu">
          <summary aria-label="${escapeHtml(c.nav.menu)}"><span class="nav-menu-icon" aria-hidden="true"></span></summary>
          <div class="nav-menu-panel">${navLinks(meta.locale, sitePage, c)}</div>
        </details>
        ${languageSwitcher(meta.locale, sitePage, c)}
      </div>
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
          <li><a href="${pagePath(meta.locale, "pricing")}">${escapeHtml(c.nav.pricing)}</a></li>
        </ul>
      </div>
      <div>
        <h2 class="footer-title">${escapeHtml(c.footer.resources)}</h2>
        <ul>
          <li><a href="mailto:${site.email}">${escapeHtml(c.footer.mail)}</a></li>
          <li><a href="${site.discord}" rel="noopener">${escapeHtml(c.footer.discord)}</a></li>
        </ul>
      </div>
      <div>
        <h2 class="footer-title">${escapeHtml(c.footer.legal)}</h2>
        <ul>
          <li><a href="${pagePath(meta.locale, "privacy")}">${escapeHtml(c.footer.privacy)}</a></li>
          <li><a href="${pagePath(meta.locale, "terms")}">${escapeHtml(c.footer.terms)}</a></li>
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
