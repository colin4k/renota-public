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
  illustration,
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

function breadcrumbJsonLd(locale: Locale, page: ProductKey | "privacy", label: string): unknown {
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
  downloadUrl: string,
): unknown {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory: category,
    operatingSystem: os,
    url: pageUrl(locale, page),
    downloadUrl,
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
        <span class="product-link">${escapeHtml(card.cta)} →</span>
      </a>`;
    })
    .join("\n      ");

  const body = `
    <section class="hero home">
      <div class="wrap">
        <p class="badge">${escapeHtml(d.hero.badge)}</p>
        <h1>${escapeHtml(d.hero.title)}</h1>
        <p class="lede">${escapeHtml(d.hero.subtitle)}</p>
        ${ctaRow(
          { label: d.hero.primary, href: "#products" },
          { label: d.hero.secondary, href: pagePath(locale, "privacy") },
        )}
        ${stats(d.hero.stats)}
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
        sameAs: [site.github.chrome, site.github.zotero, site.github.android],
      },
      faqJsonLd(d.faq.items),
    ],
  };
}

const PRODUCT_META: Record<ProductKey, { category: string; os: string; download: string }> = {
  chrome: { category: "BrowserApplication", os: "Chrome", download: site.links.chromeStore || site.github.chrome },
  zotero: { category: "ReferenceApplication", os: "Zotero", download: site.links.zoteroXpi },
  android: { category: "ReferenceApplication", os: "Android", download: site.links.androidApk },
};

export function renderProduct(locale: Locale, page: ProductKey): PageMeta {
  const c = content(locale);
  const p = c.product[page];
  const seo = c.seo[page];
  const meta = PRODUCT_META[page];
  // 商店还没上架时，主按钮指向源码构建，避免「写着商店、点开却是 GitHub」
  const storeReady = page !== "chrome" || Boolean(site.links.chromeStore);
  const primaryHref = storeReady ? meta.download : site.github.chrome;
  const primaryLabel = storeReady ? p.install.primary.label : p.install.secondary.label;
  const primaryNote = storeReady ? p.install.primary.note : p.install.secondary.note;

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
            { label: primaryLabel, href: primaryHref },
            { label: c.common.learnMore, href: "#features" },
          )}
        </div>
        <div class="hero-art">${illustration(page, p.name)}</div>
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
      <div class="install-grid">
        <div class="card install-card">
          <h3>${escapeHtml(primaryLabel)}</h3>
          <p class="muted">${escapeHtml(primaryNote)}</p>
          <a class="btn primary" href="${escapeHtml(primaryHref)}" rel="noopener">${escapeHtml(c.common.install)}</a>
        </div>
        <div class="card install-card">
          <h3>${escapeHtml(p.install.secondary.label)}</h3>
          <p class="muted">${escapeHtml(p.install.secondary.note)}</p>
          <a class="btn" href="${escapeHtml(site.github[page])}" rel="noopener">${escapeHtml(c.common.viewOnGithub)}</a>
        </div>
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
      softwareJsonLd(locale, page, p.name, seo.description, meta.category, meta.os, meta.download),
      breadcrumbJsonLd(locale, page, p.name),
      faqJsonLd(p.faq.items),
    ],
  };
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
