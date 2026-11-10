// 构建静态站：遍历语言 × 页面生成 HTML，并产出 sitemap / robots / 样式 / 图标 / 社交预览图。

import { mkdir, readFile, rm, writeFile, cp } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import MarkdownIt from "markdown-it";

import { site } from "./site.js";
import { locales, pagePath, pages, type Locale, type PageKey } from "./i18n/locales.js";
import { content } from "./i18n/index.js";
import { renderPage } from "./render/layout.js";
import { renderHome, renderProduct, renderPrivacy } from "./render/pages.js";
import { css } from "./styles.js";
import { renderOgSvg } from "./og.js";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");

const md = new MarkdownIt({ html: false, linkify: true, typographer: false, breaks: true });

async function loadPolicyHtml(): Promise<string> {
  const raw = await readFile(path.join(root, "privacy.md"), "utf8");
  // 去掉原来的 H1（页面自己会渲染标题）
  return md.render(raw.replace(/^#\s+.*\n/, ""));
}

function htmlPath(locale: Locale, page: PageKey): string {
  const p = pagePath(locale, page);
  return path.join(dist, p.replace(/^\//, ""), "index.html");
}

function sitemap(localePages: Array<{ path: string; lastmod: string }>): string {
  const byPage = new Map<string, Map<Locale, string>>();
  for (const entry of localeEntries()) {
    const list = byPage.get(entry.page) ?? new Map<Locale, string>();
    list.set(entry.locale, `${site.url}${entry.path}`);
    byPage.set(entry.page, list);
  }

  const urls = localeEntries()
    .map((entry) => {
      const alternates = [...(byPage.get(entry.page)?.entries() ?? [])]
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
        defaultPath: pagePath(locales[0] ?? "en", page),
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

async function build(): Promise<void> {
  await rm(dist, { recursive: true, force: true });
  await mkdir(path.join(dist, "assets"), { recursive: true });
  await mkdir(path.join(dist, "og"), { recursive: true });

  // 原样拷贝 public/（如果有）
  if (existsSync(path.join(root, "public"))) {
    await cp(path.join(root, "public"), dist, { recursive: true });
  }

  await writeFile(path.join(dist, "assets/styles.css"), css.trimStart());
  await writeFile(path.join(dist, "favicon.svg"), faviconSvg);
  await writeFile(path.join(dist, "site.webmanifest"), webmanifest());
  await writeFile(path.join(dist, "robots.txt"), robots());

  const policyHtml = await loadPolicyHtml();
  const entries = localeEntries();

  for (const entry of entries) {
    const meta =
      entry.page === "home"
        ? renderHome(entry.locale)
        : entry.page === "privacy"
          ? renderPrivacy(entry.locale, policyHtml)
          : renderProduct(entry.locale, entry.page);

    const html = renderPage(meta);
    const file = htmlPath(entry.locale, entry.page);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html);
  }

  await writeFile(path.join(dist, "sitemap.xml"), sitemap(entries.map((e) => ({ path: e.path, lastmod: e.lastmod }))));

  // 社交预览图：优先复用 public/og/ 里已生成好的 PNG（提交进仓库），
  // 这样在缺少中文字体的 CI 镜像上也不会渲染出方框。
  const { Resvg } = await import("@resvg/resvg-js");
  for (const page of pages) {
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
            : c.product[page].name;
      const subtitle =
        page === "home"
          ? c.seo.home.description
          : page === "privacy"
            ? c.privacy.summaryTitle
            : c.product[page].tagline;

      const svg = renderOgSvg({ title, subtitle, brand: c.siteName, locale });
      const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
      await writeFile(path.join(dist, "og", `${page}-${locale}.png`), png);
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
  const iconPng = new Resvg(iconSvg, { fitTo: { mode: "width", value: 180 } }).render().asPng();
  await writeFile(path.join(dist, "apple-touch-icon.png"), iconPng);

  console.log(`✔ built ${entries.length} pages for ${locales.length} locale(s) → dist/`);
  for (const entry of entries) console.log(`  ${entry.path}`);

  if (process.argv.includes("--serve")) {
    const { serve } = await import("./serve.js");
    await serve(dist);
  }
}

await build();
