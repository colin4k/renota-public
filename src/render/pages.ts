// 页面组装：把字典内容拼成各页的 <main>，并给出标题、描述与结构化数据。

import { site, type ProductKey } from "../site.js";
import { content } from "../i18n/index.js";
import { pagePath, pageUrl, type Locale } from "../i18n/locales.js";
import { escapeHtml, type PageMeta } from "./layout.js";
import {
  breadcrumbs,
  checklist,
  ctaRow,
  faqList,
  featureGrid,
  readingPreview,
  section,
  stats,
  steps,
} from "./ui.js";

export type { PageMeta };

function faqJsonLd(items: Array<{ q: string; a: string }>): unknown {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

function breadcrumbJsonLd(locale: Locale, page: ProductKey | "privacy" | "terms" | "pricing", label: string): unknown {
  const home = content(locale).nav.home;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: home, item: pageUrl(locale, "home") },
      { "@type": "ListItem", position: 2, name: label, item: pageUrl(locale, page) },
    ],
  };
}

function softwareJsonLd(
  locale: Locale,
  page: ProductKey,
  name: string,
  description: string,
  category: string,
  os: string,
  /** 没有可点下载入口时不给 downloadUrl，免得结构化数据与页面说法不一致。 */
  downloadUrl?: string,
): unknown {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory: category,
    operatingSystem: os,
    url: pageUrl(locale, page),
    ...(downloadUrl ? { downloadUrl } : {}),
    inLanguage: locale,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };
}

export function renderHome(locale: Locale): PageMeta {
  const c = content(locale);
  const d = c.home;
  const productPath = (key: ProductKey) => pagePath(locale, key);

  const cards = (["chrome", "zotero", "android"] as ProductKey[])
    .map((key) => {
      const card = d.products[key];
      const points = card.points.map((p) => `<li>${escapeHtml(p)}</li>`).join("\n            ");
      return `<a class="product-card" href="${productPath(key)}">
        <span class="kicker">${escapeHtml(card.kicker)}</span>
        <h3>${escapeHtml(card.name)}</h3>
        <p class="product-tagline">${escapeHtml(card.tagline)}</p>
        <ul class="mini-list">
            ${points}
        </ul>
        <span class="product-link">${escapeHtml(card.cta)}</span>
      </a>`;
    })
    .join("\n      ");

  const body = `
    <section class="hero home">
      <div class="wrap hero-split">
        <div class="hero-copy">
          <p class="badge">${escapeHtml(d.hero.badge)}</p>
          <h1>${escapeHtml(d.hero.title)}</h1>
          <p class="lede">${escapeHtml(d.hero.subtitle)}</p>
          ${ctaRow(
            { label: d.hero.primary, href: "#products" },
            { label: d.hero.secondary, href: pagePath(locale, "privacy") },
          )}
          ${stats(d.hero.stats)}
        </div>
        <div class="hero-visual">${readingPreview("home", d.hero.preview)}</div>
      </div>
    </section>

    ${section(
      d.products.title,
      `<div class="grid products">
      ${cards}
      </div>`,
      { id: "products", lede: d.products.intro },
    )}

    ${section(d.why.title, featureGrid(d.why.items), { alt: true, lede: d.why.intro })}

    ${section(d.how.title, steps(d.how.steps))}

    ${section(d.sync.title, `<p class="body-text">${escapeHtml(d.sync.body)}</p>${checklist(d.sync.points)}`, {
      alt: true,
    })}

    ${section(
      d.mcp.title,
      `<p class="body-text">${escapeHtml(d.mcp.body)}</p>
      ${checklist(d.mcp.points)}
      <div class="mcp-endpoint">
        <span class="mcp-endpoint-label">${escapeHtml(d.mcp.endpointLabel)}</span>
        <code>${escapeHtml(`${site.apiBase}/mcp`)}</code>
      </div>
      <p class="mcp-link"><a href="${pagePath(locale, "account")}">${escapeHtml(d.mcp.cta)}</a></p>`,
      { id: "mcp", lede: d.mcp.lede },
    )}

    ${section(d.faq.title, faqList(d.faq.items))}

    <section class="cta-band">
      <div class="wrap">
        <h2>${escapeHtml(d.cta.title)}</h2>
        <p>${escapeHtml(d.cta.body)}</p>
        ${ctaRow(
          { label: c.nav.chrome, href: productPath("chrome") },
          { label: c.nav.zotero, href: productPath("zotero") },
        )}
      </div>
    </section>`;

  return {
    locale,
    page: "home",
    title: c.seo.home.title,
    description: c.seo.home.description,
    body,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: c.siteName,
        alternateName: "Renota",
        url: pageUrl(locale, "home"),
        inLanguage: locale,
        description: c.seo.home.description,
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: site.name,
        url: site.url,
        email: site.email,
      },
      faqJsonLd(d.faq.items),
    ],
  };
}

/**
 * 安装入口还没上架，落地页先不挂跳转，按钮位置与文案保留。
 * 上架后在 site.links 填对应地址即可恢复成可点按钮。
 */
const PRODUCT_META: Record<ProductKey, { category: string; os: string; download: string }> = {
  chrome: { category: "BrowserApplication", os: "Chrome", download: site.links.chromeStore },
  zotero: { category: "ReferenceApplication", os: "Zotero", download: site.links.zoteroXpi },
  android: { category: "ReferenceApplication", os: "Android", download: site.links.androidApk },
};

export function renderProduct(locale: Locale, page: ProductKey): PageMeta {
  const c = content(locale);
  const p = c.product[page];
  const seo = c.seo[page];
  const meta = PRODUCT_META[page];
  /** 有值才会渲染成可点的按钮。 */
  const installHref = meta.download || undefined;
  const primaryLabel = p.install.primary.label;
  const primaryNote = p.install.primary.note;

  const body = `
    ${breadcrumbs(pagePath(locale, "home"), c.nav.home, p.name)}

    <section class="hero product">
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <p class="kicker">${escapeHtml(p.kicker)}</p>
          <h1>${escapeHtml(p.name)}</h1>
          <p class="lede">${escapeHtml(p.tagline)}</p>
          <p class="body-text">${escapeHtml(p.intro)}</p>
          ${ctaRow(
            { label: primaryLabel, href: installHref },
            { label: c.common.learnMore, href: "#features" },
          )}
        </div>
        <div class="hero-art">${readingPreview(page, c.home.hero.preview)}</div>
      </div>
    </section>

    ${section(c.common.highlights, featureGrid(p.highlights), { alt: true })}

    ${section(p.features.title, featureGrid(p.features.items), { id: "features" })}

    ${section(p.steps.title, steps(p.steps.items))}

    ${section(p.privacy.title, `<p class="body-text">${escapeHtml(p.privacy.body)}</p>${checklist(p.privacy.points)}`, {
      alt: true,
    })}

    ${section(
      p.install.title,
      `<p class="body-text">${escapeHtml(p.install.body)}</p>
      <div class="card install-card">
        <h3>${escapeHtml(p.install.title)}</h3>
        <p class="muted">${escapeHtml(primaryNote)}</p>
        ${
          installHref
            ? `<a class="btn primary" href="${escapeHtml(installHref)}" rel="noopener">${escapeHtml(c.common.install)}</a>`
            : `<span class="btn primary btn-static" aria-disabled="true">${escapeHtml(c.common.install)}</span>`
        }
      </div>
      <p class="muted small"><strong>${escapeHtml(c.common.requirements)}:</strong> ${escapeHtml(p.install.requirements)}</p>`,
      { id: "install" },
    )}

    ${section(p.faq.title, faqList(p.faq.items))}`;

  return {
    locale,
    page,
    title: seo.title,
    description: seo.description,
    body,
    jsonLd: [
      softwareJsonLd(locale, page, p.name, seo.description, meta.category, meta.os, installHref),
      breadcrumbJsonLd(locale, page, p.name),
      faqJsonLd(p.faq.items),
    ],
  };
}

/**
 * 隐私政策与服务条款的版面完全一致，只有文案与全文字典不同。
 * 抽成一个生成器，避免两页各写一遍结构后逐渐走样。
 */
function renderLegalPage(
  locale: Locale,
  page: "privacy" | "terms",
  d: {
    title: string;
    intro: string;
    summaryTitle: string;
    summary: string[];
    fullPolicy: string;
    englishNote: string;
  },
  seo: { title: string; description: string },
  policyHtml: string,
): PageMeta {
  const c = content(locale);
  const body = `
    ${breadcrumbs(pagePath(locale, "home"), c.nav.home, d.title)}

    <section class="hero plain">
      <div class="wrap">
        <h1>${escapeHtml(d.title)}</h1>
        <p class="lede">${escapeHtml(d.intro)}</p>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <h2>${escapeHtml(d.summaryTitle)}</h2>
        ${checklist(d.summary)}
        <p class="muted small">${escapeHtml(d.englishNote)}</p>
      </div>
    </section>

    <section class="section alt">
      <div class="wrap">
        <h2>${escapeHtml(d.fullPolicy)}</h2>
        <div class="prose">${policyHtml}</div>
      </div>
    </section>`;

  return {
    locale,
    page,
    title: seo.title,
    description: seo.description,
    body,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: d.title,
        url: pageUrl(locale, page),
        inLanguage: locale,
        description: seo.description,
      },
      breadcrumbJsonLd(locale, page, d.title),
    ],
  };
}

export function renderTerms(locale: Locale, policyHtml: string): PageMeta {
  const c = content(locale);
  return renderLegalPage(locale, "terms", c.terms, c.seo.terms, policyHtml);
}

export function renderPrivacy(locale: Locale, policyHtml: string): PageMeta {
  const c = content(locale);
  const d = c.privacy;
  const summary = checklist(d.summary);

  const body = `
    ${breadcrumbs(pagePath(locale, "home"), c.nav.home, d.title)}

    <section class="hero plain">
      <div class="wrap">
        <h1>${escapeHtml(d.title)}</h1>
        <p class="lede">${escapeHtml(d.intro)}</p>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <h2>${escapeHtml(d.summaryTitle)}</h2>
        ${summary}
        <p class="muted small">${escapeHtml(d.englishNote)}</p>
      </div>
    </section>

    <section class="section alt">
      <div class="wrap">
        <h2>${escapeHtml(d.fullPolicy)}</h2>
        <div class="prose">${policyHtml}</div>
      </div>
    </section>`;

  return {
    locale,
    page: "privacy",
    title: c.seo.privacy.title,
    description: c.seo.privacy.description,
    body,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: d.title,
        url: pageUrl(locale, "privacy"),
        inLanguage: locale,
        description: c.seo.privacy.description,
      },
      breadcrumbJsonLd(locale, "privacy", d.title),
    ],
  };
}

/**
 * 定价页。
 *
 * 刻意保持纯静态：结账按钮只把用户带到账号页（`?subscribe=1`），
 * Paddle.js 只在账号页加载 —— 这样定价页仍然可被搜索引擎无 JS 抓取。
 */
export function renderPricing(locale: Locale): PageMeta {
  const c = content(locale);
  const d = c.pricing;

  function planCard(plan: typeof d.free, options: { featured?: boolean; href: string }): string {
    return `<div class="card plan${options.featured ? " featured" : ""}">
        <h3>${escapeHtml(plan.name)}</h3>
        <p class="plan-price"><strong>${escapeHtml(plan.price)}</strong> <span>${escapeHtml(plan.period)}</span></p>
        <p class="plan-summary">${escapeHtml(plan.summary)}</p>
        ${checklist(plan.features, "plan-features")}
        <a class="btn${options.featured ? " primary" : ""}" href="${options.href}">${escapeHtml(plan.cta)}</a>
      </div>`;
  }

  const accountHref = `${pagePath(locale, "account")}?subscribe=1`;

  const body = `
    ${breadcrumbs(pagePath(locale, "home"), c.nav.home, d.title)}

    <section class="hero plain">
      <div class="wrap">
        <span class="badge">${escapeHtml(d.badge)}</span>
        <h1>${escapeHtml(d.title)}</h1>
        <p class="lede">${escapeHtml(d.intro)}</p>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <h2>${escapeHtml(d.plansTitle)}</h2>
        <div class="grid plans">
          ${planCard(d.free, { href: pagePath(locale, "home") })}
          ${planCard(d.pro, { featured: true, href: accountHref })}
        </div>
        <p class="muted small plan-note">${escapeHtml(d.note)}</p>
      </div>
    </section>

    <section class="section alt">
      <div class="wrap">
        <h2>${escapeHtml(d.faqTitle)}</h2>
        ${faqList(d.faq)}
      </div>
    </section>

    <section class="section">
      <div class="wrap center">
        <h2>${escapeHtml(d.ctaTitle)}</h2>
        <p class="lede">${escapeHtml(d.ctaBody)}</p>
        <div class="cta-row"><a class="btn primary" href="${accountHref}">${escapeHtml(d.pro.cta)}</a></div>
      </div>
    </section>`;

  return {
    locale,
    page: "pricing",
    title: c.seo.pricing.title,
    description: c.seo.pricing.description,
    body,
    jsonLd: [faqJsonLd(d.faq), breadcrumbJsonLd(locale, "pricing", d.title)],
  };
}
