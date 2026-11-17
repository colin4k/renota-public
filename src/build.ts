// 构建静态站：遍历语言 × 页面生成 HTML，并产出 sitemap / robots / 样式 / 图标 / 社交预览图。

import { mkdir, readFile, rm, writeFile, cp } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import MarkdownIt from "markdown-it";

import { site } from "./site.js";
import { defaultLocale, locales, pagePath, pages, type Locale, type PageKey } from "./i18n/locales.js";
import { content } from "./i18n/index.js";
import { renderPage } from "./render/layout.js";
import { createHash } from "node:crypto";
import { renderAccount } from "./render/account.js";
import { renderHome, renderPricing, renderProduct, renderPrivacy, renderTerms } from "./render/pages.js";
import { renderCheckout } from "./render/checkout.js";
import { renderWelcome } from "./render/welcome.js";
import { readPaddleClientConfig } from "./paddle.js";
import { css } from "./styles.js";
import { renderOgSvg } from "./og.js";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");

const md = new MarkdownIt({ html: false, linkify: true, typographer: false, breaks: true });

async function loadMarkdownPage(file: string): Promise<string> {
  const raw = await readFile(path.join(root, file), "utf8");
  // 去掉原来的 H1（页面自己会渲染标题）
  return md.render(raw.replace(/^#\s+.*\n/, ""));
}

function htmlPath(locale: Locale, page: PageKey): string {
  const p = pagePath(locale, page);
  return path.join(dist, p.replace(/^\//, ""), "index.html");
}

function sitemap(entries: LocaleEntry[]): string {
  // alternates 按「页面」聚合：每种语言都不能只看到自己那条，否则 hreflang 就失效了。
  const byPage = new Map<PageKey, Array<[Locale, string]>>();
  for (const entry of entries) {
    const list = byPage.get(entry.page) ?? [];
    list.push([entry.locale, `${site.url}${entry.path}`]);
    byPage.set(entry.page, list);
  }

  const urls = entries
    .map((entry) => {
      const alternates = (byPage.get(entry.page) ?? [])
        .map(([altLocale, href]) => `    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${href}"/>`)
        .join("\n");
      const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${site.url}${entry.defaultPath}"/>`;
      return `  <url>
    <loc>${site.url}${entry.path}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.page === "home" ? "weekly" : "monthly"}</changefreq>
    <priority>${entry.page === "home" ? "1.0" : "0.8"}</priority>
${alternates}
${xDefault}
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

interface LocaleEntry {
  locale: Locale;
  page: PageKey;
  path: string;
  defaultPath: string;
  lastmod: string;
}

function localeEntries(): LocaleEntry[] {
  const lastmod = new Date().toISOString().slice(0, 10);
  const entries: LocaleEntry[] = [];
  for (const page of pages) {
    for (const locale of locales) {
      entries.push({
        locale,
        page,
        path: pagePath(locale, page),
        defaultPath: pagePath(defaultLocale, page),
        lastmod,
      });
    }
  }
  return entries;
}

function robots(): string {
  return `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap.xml
`;
}

function webmanifest(): string {
  return JSON.stringify(
    {
      name: site.name,
      short_name: site.name,
      description: "Read anything. Keep what matters. Ask your own notes.",
      start_url: "/",
      display: "standalone",
      background_color: "#0d0d14",
      theme_color: "#8b7cf6",
      icons: [
        { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
        { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    null,
    2,
  );
}

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#8b7cf6"/><stop offset="1" stop-color="#4f3fd0"/>
  </linearGradient></defs>
  <rect width="64" height="64" rx="16" fill="url(#g)"/>
  <path d="M22 46V18h12.5c6 0 9.5 3.2 9.5 8.2 0 4.1-2.4 6.9-6.3 7.8L45 46h-7.4l-6.4-11.2h-3V46H22Zm6.2-16h5.6c2.6 0 4.2-1.3 4.2-3.5 0-2.2-1.6-3.5-4.2-3.5h-5.6V30Z" fill="#fff"/>
</svg>`;

/**
 * SVG → PNG。resvg 是原生模块，在少数平台上可能加载失败；
 * 失败时只是没有预览图，不应该让整站构建挂掉。
 */
async function rasterize(svg: string, width: number): Promise<Buffer | null> {
  try {
    const { Resvg } = await import("@resvg/resvg-js");
    return new Resvg(svg, { fitTo: { mode: "width", value: width } }).render().asPng();
  } catch (error) {
    console.warn(`! 无法生成预览图（${width}px）：${(error as Error).message}`);
    return null;
  }
}

async function build(): Promise<void> {
  // 先于一切文件操作：配置不完整就别产出半成品站点。
  const paddle = readPaddleClientConfig();

  await rm(dist, { recursive: true, force: true });
  await mkdir(path.join(dist, "assets"), { recursive: true });
  await mkdir(path.join(dist, "og"), { recursive: true });

  // 原样拷贝 public/（如果有）
  if (existsSync(path.join(root, "public"))) {
    await cp(path.join(root, "public"), dist, { recursive: true });
  }

  // 内容哈希：文件名随内容变化，配合 immutable 长缓存既省流量又不会拿到旧样式。
  const cssBody = css.trimStart();
  const cssHash = createHash("sha256").update(cssBody).digest("hex").slice(0, 10);
  const cssHref = `/assets/styles.${cssHash}.css`;
  await writeFile(path.join(dist, "assets", `styles.${cssHash}.css`), cssBody);
  await writeFile(path.join(dist, "favicon.svg"), faviconSvg);
  await writeFile(path.join(dist, "site.webmanifest"), webmanifest());
  await writeFile(path.join(dist, "robots.txt"), robots());

  // 法律文本每种语言各有一份完整版本：日文页面不能再展示英文原文
  // （用户要追责或对照时，两种语言都得是完整文本）。英文版仍是权威版本。
  // 文件约定与 URL 一致：英文是 privacy.md，其余是 privacy.<locale>.md。
  const legalDocs = async (kind: "privacy" | "terms"): Promise<Record<Locale, string>> => {
    const entries = await Promise.all(
      locales.map(async (locale) => {
        const file = locale === defaultLocale ? `${kind}.md` : `${kind}.${locale}.md`;
        return [locale, await loadMarkdownPage(file)] as const;
      }),
    );
    return Object.fromEntries(entries) as Record<Locale, string>;
  };
  const policyHtml = await legalDocs("privacy");
  const termsHtml = await legalDocs("terms");
  const entries = localeEntries();

  for (const entry of entries) {
    const meta =
      entry.page === "home"
        ? renderHome(entry.locale)
        : entry.page === "privacy"
          ? renderPrivacy(entry.locale, policyHtml[entry.locale])
          : entry.page === "account"
            ? renderAccount(entry.locale)
            : entry.page === "terms"
              ? renderTerms(entry.locale, termsHtml[entry.locale])
              : entry.page === "pricing"
                ? renderPricing(entry.locale)
                : renderProduct(entry.locale, entry.page);

    const html = renderPage({ ...meta, cssHref });
    const file = htmlPath(entry.locale, entry.page);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html);
  }

  // 功能页：checkout / welcome 不参与多语言导航和 sitemap，单独生成。
  // 结算页必须在根路径可访问 —— Paddle 的 default payment link 指向 /checkout。
  for (const locale of locales) {
    const utilityFile = (name: string) =>
      path.join(dist, locale === "en" ? name : `${locale}/${name}`, "index.html");

    const checkoutFile = utilityFile("checkout");
    await mkdir(path.dirname(checkoutFile), { recursive: true });
    await writeFile(checkoutFile, renderPage({ ...renderCheckout(locale, paddle), cssHref }));

    const welcomeFile = utilityFile("welcome");
    await mkdir(path.dirname(welcomeFile), { recursive: true });
    await writeFile(welcomeFile, renderPage({ ...renderWelcome(locale), cssHref }));
  }

  // 账号页是功能区，不收录进站点地图，避免被索引到。
  await writeFile(
    path.join(dist, "sitemap.xml"),
    sitemap(entries.filter((e) => e.page !== "account")),
  );

  // 社交预览图：优先复用 public/og/ 里已生成好的 PNG（提交进仓库），
  // 这样在缺少中文字体的 CI 镜像上也不会渲染出方框。
  for (const page of pages) {
    if (page === "account" || page === "terms") continue; // 功能区页面不分享，跳过社交预览图
    for (const locale of locales) {
      const prebuilt = path.join(root, "public/og", `${page}-${locale}.png`);
      if (existsSync(prebuilt)) {
        await cp(prebuilt, path.join(dist, "og", `${page}-${locale}.png`));
        continue;
      }
      const c = content(locale);
      const title =
        page === "home"
          ? c.home.hero.title
          : page === "privacy"
            ? c.privacy.title
            : page === "pricing"
              ? c.pricing.title
              : c.product[page].name;
      const subtitle =
        page === "home"
          ? c.seo.home.description
          : page === "privacy"
            ? c.privacy.summaryTitle
            : page === "pricing"
              ? c.pricing.pro.summary
              : c.product[page].tagline;

      const svg = renderOgSvg({ title, subtitle, brand: c.siteName, locale });
      const png = await rasterize(svg, 1200);
      if (png) await writeFile(path.join(dist, "og", `${page}-${locale}.png`), png);
    }
  }

  // apple-touch-icon 从首页 OG 图裁不了，单独渲染一个方形图标
  const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#8b7cf6"/><stop offset="1" stop-color="#4f3fd0"/>
  </linearGradient></defs>
  <rect width="180" height="180" rx="40" fill="url(#g)"/>
  <text x="90" y="120" font-family="Helvetica, Arial, sans-serif" font-size="96" font-weight="700"
        fill="#ffffff" text-anchor="middle">R</text>
</svg>`;
  const iconPng = await rasterize(iconSvg, 180);
  if (iconPng) await writeFile(path.join(dist, "apple-touch-icon.png"), iconPng);

  console.log(`✔ built ${entries.length} pages for ${locales.length} locale(s) → dist/`);
  for (const entry of entries) console.log(`  ${entry.path}`);

  if (process.argv.includes("--serve")) {
    const { serve } = await import("./serve.js");
    await serve(dist);
  }
}

await build();
