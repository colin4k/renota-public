# Renota public website

产品宣传站。三个产品各有一个独立落地页，全站静态预渲染，面向搜索引擎和分享抓取优化。

- 简体中文名 **睿记**，繁体中文名 **睿記**，其余语言一律 **Renota**
- 语言：`en`（根路径）、`zh-CN`、`zh-TW`、`ja`、`ko`、`fr`、`de`、`es`、`pt`、`ru`（其余九种在 `/<locale>/` 下），十种全部完整翻译，含法律全文
- 语种清单与顺序对标 `../contextflow` 扩展的设置页语言列表
- 页面：首页、Chrome 扩展、Zotero 插件、安卓版、价格、隐私政策、服务条款、账号 —— 每页每语言一个 HTML

## 本地开发

```bash
npm install
npm run dev        # 构建 + 起预览 http://127.0.0.1:4321
npm run build      # 只构建到 dist/
npm run typecheck
npm run crx:sync   # 商店发版后，把最新 .crx 拉到 public/downloads/（Chrome 页的离线下载用）
```

## 部署（Cloudflare Workers 静态资源）

构建与上线都由 `cf` CLI 完成，配置在 `cloudflare.config.ts`：

```bash
set -a && . ./.env && set +a   # 构建需要 PADDLE_*
npx cf build
npx cf deploy --prebuilt
```

`cf build` 把站点和 `src/worker.ts` 一起写进 `.cloudflare/output/`，`--prebuilt` 直接上传这份产物，不会再构建一次。缓存与安全响应头在 `public/_headers`，随构建复制到 `dist/`。

`src/worker.ts` 只做两件事：裸域 301 到 www、把访客国家写进结算页。三条配置缺一不可，少任何一条 Worker 都不会按预期生效：

| 配置 | 作用 |
|---|---|
| `worker.entrypoint` | 不写的话 Worker 根本不参与部署 |
| `env: { ASSETS: { type: "assets" } }` | 不写的话 Worker 拿不到 `env.ASSETS`，无法分发静态资源 |
| `assets.runWorkerFirst: true` | 不写的话资产层会先吃掉所有命中静态文件，Worker 永远不执行 |

上线前改一处域名：

```bash
src/site.ts  →  site.url
```

`canonical`、`hreflang`、`sitemap.xml`、`robots.txt`、OG 图地址都由它生成，改完全站一致。`werenota.com` 与 `www.werenota.com` 都绑同一个 Worker，只有 www 是站点主机名，裸域一律 301。

> 静态资源层对 `/chrome` 会自动映射到 `/chrome/index.html`，与站内使用的 `/chrome/` 形式一致，不需要额外的重写规则。

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

## 订阅与结账

定价页 `/pricing/` 是**纯静态**的：两档对比、FAQ，按钮只是跳到账号页
`/account/?subscribe=1`。所有 Paddle 相关的 JS 都只在账号页加载，因为：

- Paddle Checkout 必须在网页环境跑，Chrome 扩展里加载不了（也违反 Paddle 条款）
- 搜索引擎要能无 JS 抓到定价内容
- 结账前必须先有网站登录态，账号页本来就有

结账只有一个入口：站点的 `/checkout` 页。

```
Paddle.PricePreview()  → 展示 Paddle 算好的含税总价
Paddle.Checkout.open({items:[{priceId}], settings:{displayMode:'overlay', variant:'one-page'}})
```

账号页的「订阅」按钮只是跳到 `/checkout`，不再自己建 transaction。
金额始终来自 Paddle 的 `formattedTotals`，前端不做任何价格运算。
付款结果不靠前端回调，而是 `cloud.werenota.com/v1/billing/webhook` 落库，
账号页再 `GET /v1/billing/status` 读真实状态。

后台配置（Paddle product / price / webhook）在
[`../renota-cloud/docs/paddle-setup.md`](../renota-cloud/docs/paddle-setup.md)。

## 加一门语言

1. 复制 `src/i18n/zh-CN.ts` 为新语言文件，翻译内容（类型来自 `en.ts`，漏字段会编译失败）
2. 在 `src/i18n/index.ts` 的 `dictionaries` 里登记
3. 在 `src/i18n/locales.ts` 的 `locales` 和 `localeLabels` 里加一行
4. 从 `privacy.md` / `terms.md` 译出 `privacy.<locale>.md` 与 `terms.<locale>.md`，缺一份构建会当场报错
5. 删掉 `public/og/*-<locale>.png`（如果有）再本地构建，让十种语言用同一版布局重新出图

页面、`hreflang`、`sitemap`、语言切换器、OG 图、`og:locale` 都会自动生成。

> 结算页（`/checkout/`）与欢迎页只维护英文和简体中文两版，其余语言回退英文：支付界面本身由 Paddle 按其区域设置本地化，这两页也不进索引。

> 只给**真正翻译过**的语言加页面。把英文复制到多语言路径下会被搜索引擎判定为重复内容。

## 改文案 / 加页面

- 文案：`src/i18n/en.ts`（结构源头）与另外九份字典；改一条要十处同步，`npm run typecheck` 会把漏掉的字段全部点出来
- 页面骨架：`src/render/pages.ts`；可复用区块在 `src/render/ui.ts`
- 样式：`src/styles.ts`（单文件，无 CSS 框架）
- 视觉规范：`DESIGN.md`（色板/字号/间距/表面台阶，改样式前先改它，`npm run design:lint` 把关）

## 社交预览图

`src/og.ts` 生成 SVG，再用 `@resvg/resvg-js` 渲染成 PNG。

生成好的 PNG 已提交在 `public/og/`（十种语言 × 六个页面），构建时优先复用 —— 因为标题里的中日韩与俄文字形需要构建机上有对应字体，而 CI 镜像不一定有。`src/og.ts` 会按语言挑字体栈（`PingFang SC/TC`、`Hiragino Sans`、`Apple SD Gothic Neo`，其余走 Noto 与 Helvetica 兜底）。改了标题文案想重新出图时，删掉对应的 `public/og/*.png` 再 `npm run build`（本地跑，字体齐全）。

## 目录

```
src/
├── site.ts               域名、联系邮箱、社区与下载链接（上架后填 store 地址）
├── build.ts              遍历语言 × 页面 → dist/，生成 sitemap/robots/OG
├── og.ts                 社交预览图 SVG
├── styles.ts             全站 CSS
├── serve.ts              本地预览服务器
├── i18n/                 语言列表、URL 规则、各语言文案（含 pricing）
└── render/               HTML 骨架（SEO 标签）与页面/区块
privacy.md                隐私政策英文全文（/privacy/，权威版本）
privacy.<locale>.md       其余九种语言的正式译本（zh-CN 沿用整语种代码作文件名）
terms.md / terms.<locale>.md  服务条款同上
public/og/                已生成的社交预览图
```

## 待办

- `src/site.ts` 里 `links.chromeStore` 为空，Chrome 页的主按钮因此指向源码构建。上架后填入商店地址即可，页面无需改动。
