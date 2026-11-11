# Renota public website

产品宣传站。三个产品各有一个独立落地页，全站静态预渲染，面向搜索引擎和分享抓取优化。

- 中文名 **睿记**，其余语言一律 **Renota**
- 当前语言：`en`（根路径）、`zh-CN`（`/zh-CN/`）
- 页面：首页、Chrome 扩展、Zotero 插件、安卓版、隐私政策 —— 每页每语言一个 HTML

## 本地开发

```bash
npm install
npm run dev        # 构建 + 起预览 http://127.0.0.1:4321
npm run build      # 只构建到 dist/
npm run typecheck
```

## 部署（Cloudflare Pages）

推到 GitHub 后在 Cloudflare Pages 里连接仓库，构建配置：

| 项 | 值 |
|---|---|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 20 或更高 |

或者用 CLI：

```bash
npx wrangler pages deploy dist --project-name renota-public
```

`wrangler.toml` 已声明输出目录；缓存与安全响应头在 `public/_headers`，会随构建复制到 `dist/`。

上线前改一处域名：

```bash
src/site.ts  →  site.url
```

`canonical`、`hreflang`、`sitemap.xml`、`robots.txt`、OG 图地址都由它生成，改完全站一致。

> Cloudflare Pages 对 `/chrome` 会自动映射到 `/chrome/index.html`，与站内使用的 `/chrome/` 形式一致，不需要额外的重写规则。

## SEO 做了什么

| 项 | 位置 |
|---|---|
| 每页独立的 `<title>` / `meta description` | `src/i18n/*.ts` 的 `seo` 段 |
| `canonical` | `src/render/layout.ts` |
| `hreflang`（含 `x-default`） | 同上，按页面 × 语言生成 |
| Open Graph + Twitter Card（大图） | 同上 |
| JSON-LD：`WebSite` / `Organization` / `SoftwareApplication` / `BreadcrumbList` / `FAQPage` | `src/render/pages.ts` |
| `sitemap.xml`（含多语言 alternate） | `src/build.ts` |
| `robots.txt` | 同上 |
| 语义化结构：单一 `h1`、`header/nav/main/section/footer`、`details` 做 FAQ（无需 JS） | 全站 |
| 社交预览图 1200×630，每页每语言一张 | `src/og.ts` → `public/og/` |

全站没有客户端 JS，首屏就是最终 HTML，抓取和分享预览不依赖渲染。

## 加一门语言

1. 复制 `src/i18n/zh-CN.ts` 为新语言文件，翻译内容（类型来自 `en.ts`，漏字段会编译失败）
2. 在 `src/i18n/index.ts` 的 `dictionaries` 里登记
3. 在 `src/i18n/locales.ts` 的 `locales` 和 `localeLabels` 里加一行

页面、`hreflang`、`sitemap`、语言切换器、OG 图都会自动生成。

> 只给**真正翻译过**的语言加页面。把英文复制到多语言路径下会被搜索引擎判定为重复内容。

## 改文案 / 加页面

- 文案：`src/i18n/en.ts`（结构源头）与 `src/i18n/zh-CN.ts`
- 页面骨架：`src/render/pages.ts`；可复用区块在 `src/render/ui.ts`
- 样式：`src/styles.ts`（单文件，无 CSS 框架）

## 社交预览图

`src/og.ts` 生成 SVG，再用 `@resvg/resvg-js` 渲染成 PNG。

生成好的 PNG 已提交在 `public/og/`，构建时优先复用 —— 因为中文标题需要构建机上有中文字体，而 CI 镜像不一定有。改了标题文案想重新出图时，删掉对应的 `public/og/*.png` 再 `npm run build`（本地跑，字体齐全）。

## 目录

```
src/
├── site.ts               域名、GitHub、下载链接（上架后填 store 地址）
├── build.ts              遍历语言 × 页面 → dist/，生成 sitemap/robots/OG
├── og.ts                 社交预览图 SVG
├── styles.ts             全站 CSS
├── serve.ts              本地预览服务器
├── i18n/                 语言列表、URL 规则、各语言文案
└── render/               HTML 骨架（SEO 标签）与页面/区块
privacy.md                隐私政策全文（构建时渲染进 /privacy/）
public/og/                已生成的社交预览图
```

## 待办

- `src/site.ts` 里 `links.chromeStore` 为空，Chrome 页的主按钮因此指向源码构建。上架后填入商店地址即可，页面无需改动。
