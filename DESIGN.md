---
version: alpha
name: Renota — Ink & Margin
description: Renota（睿记）宣传站的视觉系统。中性墨色承载内容，书签琥珀是唯一的强调色，签名是引用角标。
colors:
  # —— 画布：墨。所有表面都从这里取，不带色相 ——
  background: "#0b0c0f"
  on-background: "#eef0f5"
  surface: "#0b0c0f"
  surface-dim: "#06070a"
  surface-bright: "#2f333c"
  surface-container-lowest: "#06070a"
  surface-container-low: "#12141a"
  surface-container: "#171a21"
  surface-container-high: "#1f232b"
  surface-container-highest: "#2a2f38"
  surface-variant: "#2a2f38"
  on-surface: "#eef0f5"
  on-surface-variant: "#a3a9b8"
  inverse-surface: "#eef0f5"
  inverse-on-surface: "#171a21"
  outline: "#4a4f59"
  outline-variant: "#23262c"
  surface-tint: "#e0a24a"

  # —— 主色：纸白。唯一的实心动作色 ——
  primary: "#eef0f5"
  on-primary: "#0c0d10"
  primary-container: "#d6d9e0"
  on-primary-container: "#1a1d23"
  inverse-primary: "#5a5f6b"
  primary-fixed: "#d6d9e0"
  primary-fixed-dim: "#b9bec8"
  on-primary-fixed: "#101216"
  on-primary-fixed-variant: "#454a55"

  # —— 次色：书签琥珀。全站唯一的强调色，占比几个百分点 ——
  secondary: "#e0a24a"
  on-secondary: "#1a1206"
  secondary-container: "#3a2a12"
  on-secondary-container: "#f0c789"
  secondary-fixed: "#f5d9a8"
  secondary-fixed-dim: "#e0a24a"
  on-secondary-fixed: "#1a1206"
  on-secondary-fixed-variant: "#6b4a1c"

  # —— 第三色：页边灰。次级可点文字与中性高亮，不带色相 ——
  tertiary: "#b9c0cf"
  on-tertiary: "#101216"
  tertiary-container: "#2a2e37"
  on-tertiary-container: "#d7dbe4"
  tertiary-fixed: "#d7dbe4"
  tertiary-fixed-dim: "#b9c0cf"
  on-tertiary-fixed: "#101216"
  on-tertiary-fixed-variant: "#464b56"

  # —— 语义色：只在有意义时出现，且压低饱和 ——
  success: "#4cc38a"
  error: "#ff8b84"
  on-error: "#2b0a0b"
  error-container: "#5c1a1d"
  on-error-container: "#ffd9d9"

typography:
  display-lg:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: "500"
    lineHeight: 60px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: "500"
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: "500"
    lineHeight: 28px
  title-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "500"
    lineHeight: 24px
  stat-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: "500"
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 26px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 16px
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 22px

rounded:
  sm: 6px
  md: 10px
  lg: 12px
  xl: 16px
  full: 9999px

spacing:
  unit: 4px
  container-padding: 24px
  card-gap: 16px
  panel-padding: 24px
  section-padding: 96px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 40px

components:
  panel:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.panel-padding}"
  panel-raised:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.panel-padding}"
  panel-hover:
    backgroundColor: "{colors.surface-container-high}"
  panel-quiet:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface-variant}"
    rounded: "{rounded.md}"
    padding: "{spacing.stack-sm}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.title-sm}"
    rounded: "{rounded.md}"
    height: 44px
    padding: 0 20px
  button-primary-hover:
    backgroundColor: "{colors.primary-fixed-dim}"
  button-secondary:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface}"
    typography: "{typography.title-sm}"
    rounded: "{rounded.md}"
    height: 44px
    padding: 0 20px
  button-secondary-hover:
    backgroundColor: "{colors.surface-container-high}"
  input-field:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    height: 44px
    padding: 0 14px
  nav-link:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-md}"
  section-label:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-sm}"
  plan-price:
    textColor: "{colors.on-surface}"
    typography: "{typography.headline-lg}"
  stat-value:
    textColor: "{colors.on-surface}"
    typography: "{typography.stat-lg}"
  checklist-item:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-md}"
  citation-mark:
    textColor: "{colors.secondary}"
    typography: "{typography.label-sm}"
  status-success:
    textColor: "{colors.success}"
    typography: "{typography.label-sm}"
  status-error:
    textColor: "{colors.error}"
    typography: "{typography.label-sm}"
  code-chip:
    backgroundColor: "{colors.surface-container-lowest}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.code-md}"
    rounded: "{rounded.sm}"
    padding: 0 6px
---

## Overview

界面是夜里的一张书桌：墨色的桌面，纸白的字，一支琥珀色的笔。

产品的世界是**纸、墨、页边和手写划线**——Renota 陪人读书，它的样子就该像书，而不是像一块发光的玻璃。全站的色相只出现在一个地方：那支笔（{colors.secondary}）。背景、卡片、边框、文字全部取自一条不带色相的中性墨色阶。**内容在墨上，情绪在纸上。**

旧版是「极光 + 毛玻璃」。它的问题不是丑，而是可以被任何 AI 产品替换——紫粉光团、玻璃卡、渐变字标是整套默认值。这一版把氛围的预算全部挪给内容：首屏那台「正在阅读的窗口」、产品页三端各自的真实预览、定价页 Pro 列真正多出来的三行。

信息密度不变：这是一个读得懂的宣传站。每个区块的说明仍然能在 30 秒内扫完；风格是语气，不是借口。

## Colors

系统是**两层**：墨（全部表面与文字）与一笔琥珀（唯一的强调）。

**墨**：页底 {colors.background}，卡片 {colors.surface-container}，抬起一档 {colors.surface-container-high}，输入与井 {colors.surface-container-low}，最暗的代码底 {colors.surface-container-lowest}。层级**只靠明度**，不靠阴影、不靠模糊、不靠透明度叠加。

**三个文字角色**，不多不少：

- **On-surface** {colors.on-surface}：标题与正文。冷白偏一点点蓝，绝不用纯白。
- **On-surface-variant** {colors.on-surface-variant}：导语、卡片正文、未选中的导航。7.8:1。
- **Muted（= {colors.tertiary} 的暗位，实现里是 `#838b9e`）**：时间、计数、脚注、表格表头。只给 meta，不给正文。

**一笔琥珀** {colors.secondary}：8.7:1，全站唯一强调色。分布在两类位置上——唯一的主行动按钮（实心，面积最大），以及笔迹本身：

1. **主行动按钮**（实心底、墨字）——整页最大的色块；
2. 原文划线 `rgba(224, 162, 74, 0.52)`，真正的荧光笔浓度，不是一层灰；
3. 引用角标：实心琥珀小方块 + 墨字数字（签名）；
4. 正文链接与导航当前项的琥珀下划线；


5. 键盘焦点环。

面积从大到小是：按钮、划线、角标、细线。**没有第六处**——把琥珀加到大标题、图标或分隔线上，它就不再是那一笔了。

**主按钮用琥珀**：{colors.secondary} 底 + 墨字（8.4:1）。这是全站最大的一块实体颜色，也是唯一一处大面积用色——页面因此有颜色记忆点。次按钮保持中性表面，不参与。纸白按钮只给需要安静的入口，同一视口里两种主按钮不能并存。

**语义色**只传达含义：{colors.success} 只给清单勾选与成功态，{colors.error} 只给错误与危险操作。两者都压低饱和，不发光。

**禁止**：任何色相渐变（含琥珀到橙的渐变）、渐变文字、彩色阴影、彩色光晕、模糊色团、`backdrop-filter`、噪点与颗粒、霓虹描边。若某处需要"更亮"，提到上一档 surface，不加光。

## Typography

**Inter** 负责拉丁与西里尔。CJK 按 `<html lang>` 切系统字体：简体 `PingFang SC`、繁体 `PingFang TC`、日语 `Hiragino Sans`、韩语 `Apple SD Gothic Neo`，各带 Noto 与 Windows 同类兜底。日文汉字与繁体字形和简体不同（`直`、`骨`、`步`），用中文字体渲染日文页会被一眼看穿。代码、端点、密钥、序号用 **JetBrains Mono**。

字体必须**自托管**（`/assets/fonts/`，woff2 子集，`font-display: swap`）。依赖用户机器上装没装 Inter，等于放弃排版控制。

- **六档，两个半字重**：{typography.display-lg} 只给首屏主张；{typography.headline-lg} 给区块标题；{typography.headline-md} 给卡片标题与价格；{typography.body-lg} 给导语；{typography.body-md} 是正文与导航默认；{typography.label-sm} 给标签、计数、角标。
- **字重只有 400 / 500**，600 只用于正文里真正的强调，全站不超过五处。层级靠**字号与颜色**，不靠笔画粗细——700 会让页面喊叫。
- **不再有大写字距标签**。`BROWSER EXTENSION` → `Browser extension`，`MCP ENDPOINT` → `MCP endpoint`，`PRODUCTS` → `Products`。句首大写，字距 0，颜色 {colors.on-surface-variant}。
- **负字距只给大字号**：≥40px 用 -0.02em，20–36px 用 -0.01em，16px 及以下**一律 0**。小字加负字距等于降低可读性。
- **数字统一 `font-variant-numeric: tabular-nums`**，全站一种格式：价格永远 `$9.90`，计数不加千分位修饰。
- 中文行高不低于 1.65，日文韩文 1.7：假名与谚文字面矮，行高不够会显得行距忽大忽小。
- 不用斜体做强调，不用下划线做强调（链接除外），不用描边字。

## Layout

4px 基础网格，所有 margin / padding / gap / 固定高度都是 4 的倍数。尺度：4、8、12、16、20、24、32、40、48、64、80、96、128。

- 容器最大宽 1120px，两侧 24px；正文测度 62–70ch。
- **区块上下 96px**（{spacing.section-padding}），移动端 56px。卡片之间 16px，卡片内 24px。
- **区块之间不用分割线**。旧版用 8 条 `border-top` 把页面切成 8 段，每段长得一样；现在靠留白分组，只有两处用 {colors.surface-container-low} 的整块交替来表达"换了一个话题"。分组靠空，不靠线。
- **栅格**：功能卡 `minmax(260px, 1fr)`；产品卡给节奏——首推的 Chrome 卡 `1.15fr`，其余 `1fr`；`data-count="4"` 时第一张跨两列。900px 折两列，760px 折一列。
- **首屏**：左文右预览的非对称分栏（0.95 / 1.05），文案垂直居中于预览。左边只有定位词、一句主张、一段导语、两个动作和三行事实；右边是【阅读预览】—— 这个站唯一被允许"富"的地方。860px 以下折为单栏，预览落在动作之后。
- **导航高度 64px**，行高 32–36；导航项间距 20，语言按钮 32 高。移动端折叠：同一组链接渲染两次，桌面显示 `.site-nav`、760px 以下显示 `<details class="nav-menu">` 里的那份，两态互斥，纯 CSS，不违反内容页无 JS 的约束。header 始终单行 64px。
- 表格：hairline 边框、`surface-container-low` 表头、数字右对齐。

## Elevation & Depth

**深度来自明度台阶与发丝线，不来自阴影与模糊。**

- **三级台阶**，唯一的分层语法：
  - **L1 页底** {colors.background} `#0b0c0f`
  - **L2 面板** {colors.surface-container} `#171a21` + 1px `rgba(238,240,245,0.08)` 发丝线
  - **L3 抬起**（悬停、输入、选中）{colors.surface-container-high} `#1f232b`
- **没有 `backdrop-filter`**。旧版全站 28 处毛玻璃，滚动时每帧都要重算模糊，换来的是内容读不清；这一版一处不留。
- **没有彩色阴影**。浮层（语言菜单、预览里浮出的回答卡）允许一层中性阴影 `0 12px 32px rgba(0, 0, 0, 0.45)`，因为它是真的浮在别的东西上面；平铺卡片只许一层极浅的 `0 1px 2px rgba(0,0,0,.3)`，甚至可以没有。
- **悬停**：底色上一档 + 边框亮到 `rgba(238,240,245,0.16)`，**不位移**。
- 选中项：底色 {colors.surface-container-high} + 左侧 2px 琥珀竖线（或导航下一段 2px 琥珀下划线）。这是全站唯一的"位置提示"。
- 禁止：发光描边、`drop-shadow` 做霓虹、渐变描边、玻璃高光 `inset`。

## Shapes

- **按钮与输入** {rounded.md} 10px；**卡片** {rounded.lg} 12px；**面板与浮层** {rounded.xl} 16px；**标签、角标、代码块** {rounded.sm} 6px。
- **嵌套半径**：内 = 外 − 间距，且不小于 4。16px 面板装 8px 内距，内层取 8。
- **不再有胶囊**。旧版按钮、徽标、语言按钮、步骤序号全是 `999px`；只有计费周期切换器这一处分段控件保留 {rounded.full}，因为它本质是一段轨道。
- 图标与插图：线条 1.5px、圆头端点，与发丝线同一视觉重量。

## Components

### 面板

`panel` 承载所有平级内容（功能卡、步骤卡、FAQ 条目）：{colors.surface-container} 底、1px `rgba(238,240,245,0.08)` 发丝线、{rounded.lg}、24px 内距。**没有模糊、没有光晕、没有内高光**。

`panel-raised` 用于需要单独争取注意力的单块（定价推荐档、账号面板）：明度上一档 {colors.surface-container-high}、{rounded.xl}。

**推荐档不发光**。旧版用淡紫双圈描边 + 外扩光晕抢注意力；这一版用一条 1px 琥珀发丝线 `rgba(224, 162, 74, 0.42)` 加左上角一行 12px 的 `{colors.secondary}` 小字说明它为什么推荐。琥珀只这一处。

悬停只提亮一档，**不变边框颜色、不位移**。

### 动作元素

`button-primary`：{colors.primary} 纸白底、{colors.on-primary} 墨字、{rounded.md}、44px 高、左右 20px。它是页面上唯一的主行动。悬停压到 {colors.primary-fixed-dim}；按下 `scale(0.98)`。

`button-secondary`：{colors.surface-container-low} 底、发丝线、{colors.on-surface} 字。并列时主按钮在左，两者同高。

没有链接的按钮（未上架产品）保持外观但去掉悬停反馈与手型光标——看起来还能点，但不给假承诺。

### 获取方式浮层

已上架的产品点「Get」时展开的选择层，给两条真实入口（商店 / 自托管 .crx）。它是浮层，所以允许 Elevation 章节里那一层中性阴影，除此之外不加任何光。

- **遮罩**：72% 墨色（`rgba(6, 7, 10, 0.72)`），不做模糊。遮罩本身是可点的关闭链接。
- **面板**：{colors.surface-container} + 1px 发丝线 + {rounded.xl} + 24px 内距，宽 `min(100%, 420px)`，垂直水平居中，两侧留 24px；窄屏收到 16px（面板内距同时收到 20px），免得在 320px 宽的屏上被两侧挤扁。
- **选项行**：{colors.surface-container-low} 底（与 `input-field` 同一档）+ 发丝线 + {rounded.md}，14–16px 内距；上行是入口名，下行是 12px {colors.on-surface-variant} 的说明。悬停抬到 {colors.surface-container-high}，不位移。
- **关闭**：面板底部一行 12px 文字链接，和右上角的选项行对齐。
- **打开方式**：内容页零 JS，用 `:target` 打开、用指向安装区的锚点关闭。收起后停在本页安装区，不跳走。

### 输入与表格

`input-field`：最暗一档 {colors.surface-container-low} + 1px 发丝线 + {rounded.md}。聚焦时用 2px {colors.secondary} 描边，不换底色、不加阴影。占位符用 `#6b7180`，不能用 outline 色（太浅会读成禁用态）。

### 文字承载

- `plan-price` 用 {typography.headline-lg} 承载价格，这是页面第二大的字，`tabular-nums`。
- `stat-value` 用 {typography.stat-lg}，说明用 12px {colors.on-surface-variant}。**指标卡里没有 sparkline、没有迷你柱、没有图标**，就是数字、标签、一句话。
- `section-label`：每个区块最多一个，12px，{colors.on-surface-variant}，句首大写，**不是琥珀、不是大写字母**。
- `code-chip`：MCP 端点、配置片段、`rnk_` 前缀密钥。最暗一档 + {typography.code-md}，永远横向可滚动而不换行。


### 阅读预览（视觉主角）

`readingPreview()`（`src/render/ui.ts`）是全站唯一的产品视觉，出现在首页首屏与三个产品页的右栏，**别处不再重复**。

- **结构**：一层窗口（顶栏三点 + 书名）里放两段正文，第二段带一道琥珀划线和一个引用角标 `1`；窗口右下角外侧浮出一张回答卡（问题、回答、来源 + 角标）。
- **划线**用 `linear-gradient(transparent 62%, rgba(224,162,74,.22) 62%)` 配 `box-decoration-break: clone`，是笔尖走过的一道光，不是背景色块。
- **回答卡**只叠住窗口 30px，挂在右下角外 12px：它要读起来像"从这一页里长出来的"，不是第二个卡片。
- **四个变体**只改界面饰件，不改内容：`chrome` 多一条五个动作的工具栏（第一个选中）、`zotero` 多一枚 EPUB 书脊标签、`android` 换成 320px 手机机身 + 悬浮球、`home` 就是阅读窗口本身。
- 示例文案在字典 `home.hero.preview`（十语种），**书名与段落是虚构的**，不引用任何真实作品。改文案要改十个文件。
- 移动端：卡片落回窗口下方，变静态，窗口正文收窄。

### 引用角标（签名）

`citation-mark`：12px、{colors.secondary}、`vertical-align: super`、`tabular-nums` 的方括号数字，如 `[1]`，hover 时显示原文摘要。

它是这个产品的差异点（"Shows its sources"）落地成的最小视觉单位。**只出现在三处**：首屏预览的回答卡、产品页的示例回答、MCP 段落里说明 agent 引用来源的那一行。别处不出现——出现得少，它才有意义。

### 目录徽章（第三方）

`shapelessai.com` 的「Featured on ShapelessAI」收录徽章，深色版，只挂首页页脚底行右侧（`src/render/layout.ts` 的 `SHAPELESS_BADGE`）。

它是外部资产：内联样式、蓝调描边、大写宽字距的 `FEATURED ON` 都由对方给定，**不套本站 token**，也是上面「不用大写字母 + 宽字距做标签」的唯一例外。不要改写它的文案、`href` 或 `rel` —— 对方用「服务端 HTML 里的真实文本 + 一条普通外链」校验收录，改了就不算数。要换外观只能整体换成对方给的另一版。

它只出现在首页：每多一页输出，就多一次到第三方的图片请求。

## Do's and Don'ts

- **Don't** 用 `backdrop-filter`。毛玻璃在深色页上只有两个结果：内容读不清，滚动掉帧。
- **Don't** 在内容后面放模糊色团或色相渐变。背景是墨，墨不发光。
- **Don't** 把琥珀用成按钮底色、大面积填充或装饰线。它是笔，只能划在字上。
- **Don't** 用渐变方块做 logo。品牌标记是 1px 描边方片 + 实心琥珀字母，无渐变、无内高光。
- **Don't** 一屏放两个纸白实心按钮。主行动只能有一个。
- **Don't** 用 700 以上字重。层级交给字号与颜色。
- **Don't** 用大写字母 + 宽字距当标签。句首大写，字距 0。
- **Don't** 用小于 4px 倍数的间距值，或同一排卡片用不同内距。
- **Don't** 用弹跳、回弹、超过 320ms 的过渡，或宽度 / 高度 / top / left 的动画。
- **Don't** 给标题加渐变、发光、描边字。
- **Do** 每个面板都带一条 1px 发丝线：没有线的卡片在墨底上会糊成一片。
- **Do** 让数字等宽（`tabular-nums`），价格、计数、序号全站一种格式。
- **Do** 用 `text-wrap: pretty` 而不是 `balance` 处理标题断行：`balance` 为求两行等长会割开中文词组（「有用的」断成「有用 / 的」）。
- **Do** 保证正文 ≥ 4.5:1、大字号 ≥ 3:1，改 token 后重跑 `npm run design:lint`。
- **Do** 用 `prefers-reduced-motion` 把所有过渡与入场降为 0。
- **Do** 把插图、图标、发丝线、焦点环放在同一套 1.5–2px 视觉重量上，界面才像一个整体。
- **Do** 记住产品的长相：一个阅读窗口、一段被划线的原文、一张带角标的回答。任何与这三样无关的装饰都是要删的。
