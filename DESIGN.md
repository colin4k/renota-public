---
version: alpha
name: Renota — Atmospheric Glass
description: Renota（睿记）宣传站的视觉系统。雾面玻璃层承载内容，极光渐变承载气氛。
colors:
  # —— 画布：深空底色 ——
  background: "#070b16"
  on-background: "#e8edfb"
  surface: "#0a1020"
  surface-dim: "#070b16"
  surface-bright: "#2a3350"
  surface-container-lowest: "#060a14"
  surface-container-low: "#1a2130"
  surface-container: "#1e2637"
  surface-container-high: "#252d3e"
  surface-container-highest: "#2f3748"
  surface-variant: "#2f3748"
  on-surface: "#e8edfb"
  on-surface-variant: "#9aa6c0"
  inverse-surface: "#e8edfb"
  inverse-on-surface: "#16203a"
  outline: "#4a5578"
  outline-variant: "#29324c"
  surface-tint: "#8b7cf6"

  # —— 主色：霜白。唯一的高对比动作色 ——
  primary: "#f3f6ff"
  on-primary: "#0a1020"
  primary-container: "#dbe4fb"
  on-primary-container: "#1b2338"
  inverse-primary: "#55617f"
  primary-fixed: "#dbe4fb"
  primary-fixed-dim: "#bcc9e6"
  on-primary-fixed: "#111a2c"
  on-primary-fixed-variant: "#45516c"

  # —— 次色：冰蓝。链接、编号、次要强调 ——
  secondary: "#a9c7f0"
  on-secondary: "#0d2035"
  secondary-container: "#24405f"
  on-secondary-container: "#c2d8f5"
  secondary-fixed: "#d5e6ff"
  secondary-fixed-dim: "#a9c7f0"
  on-secondary-fixed: "#001c33"
  on-secondary-fixed-variant: "#2b4868"

  # —— 第三色：淡紫。来自品牌标记，只做气氛与 kicker ——
  tertiary: "#d8b4fe"
  on-tertiary: "#2e0a52"
  tertiary-container: "#4c1d95"
  on-tertiary-container: "#e9d5ff"
  tertiary-fixed: "#f0d9ff"
  tertiary-fixed-dim: "#d8b4fe"
  on-tertiary-fixed: "#2b0050"
  on-tertiary-fixed-variant: "#5a2196"

  # —— 语义色 ——
  success: "#6ee7a8"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"

typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: "700"
    lineHeight: 54px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: "600"
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: "500"
    lineHeight: 32px
    letterSpacing: -0.01em
  title-sm:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: "600"
    lineHeight: 24px
  stat-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: "700"
    lineHeight: 34px
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 30px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 26px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "600"
    lineHeight: 16px
    letterSpacing: 0.08em
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 22px

rounded:
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px

spacing:
  unit: 8px
  container-padding: 24px
  card-gap: 20px
  glass-padding: 24px
  section-padding: 80px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 40px

components:
  glass-panel:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.glass-padding}"
  glass-panel-elevated:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.glass-padding}"
  glass-panel-hover:
    backgroundColor: "{colors.surface-container-highest}"
  glass-panel-quiet:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface-variant}"
    rounded: "{rounded.md}"
    padding: "{spacing.stack-sm}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.title-sm}"
    rounded: "{rounded.full}"
    height: 48px
    padding: 0 24px
  button-primary-hover:
    backgroundColor: "{colors.primary-fixed-dim}"
  button-ghost:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface}"
    typography: "{typography.title-sm}"
    rounded: "{rounded.full}"
    height: 48px
    padding: 0 24px
  button-ghost-hover:
    backgroundColor: "{colors.surface-container}"
  input-field:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    height: 48px
    padding: 0 16px
  nav-link:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-md}"
  kicker-label:
    textColor: "{colors.tertiary}"
    typography: "{typography.label-sm}"
  plan-price:
    textColor: "{colors.on-surface}"
    typography: "{typography.headline-lg}"
  stat-value:
    textColor: "{colors.on-surface}"
    typography: "{typography.stat-lg}"
  checklist-item:
    textColor: "{colors.success}"
    typography: "{typography.body-md}"
  code-chip:
    backgroundColor: "{colors.surface-container-lowest}"
    textColor: "{colors.secondary}"
    typography: "{typography.code-md}"
    rounded: "{rounded.sm}"
    padding: 0 6px
---

## Overview

界面是一层雾面玻璃，罩在一片缓慢流动的极光之上。

参照物是一台高端光学仪器的取景器：深色哑光机身，正面覆一片镀膜玻璃；光只从玻璃边缘和底部的景深里进来，机身本体从不发亮。整块界面因此显得安静、精密、有一点冷。

极光是这层玻璃唯一的"活物"：靛蓝、紫、品红三色在不同页面位置缓慢漂移，提供色彩与深度；玻璃负责让文字始终可读。两者的分工是绝对的——**内容永远在玻璃上，气氛永远在玻璃下**。任何一次判断只要威胁到这条分工（文字发灰、玻璃发亮、光晕穿透正文），都选可读性。

信息密度上，这仍然是一个"读得懂的宣传站"而不是艺术装置：段落成块、标题有明确层级、每个功能的说明都能在 30 秒内扫完。玻璃是语气，不是借口。

## Colors

系统是**三层**：极光底、玻璃层、霜白动作色。三者不混用。

**极光底（不进 token，写在 CSS 背景里）**：`#0a1020` 全局底上放三个**被模糊的实心色团**，不是纯 `radial-gradient`。

```css
.aurora i { position: fixed; border-radius: 50%; filter: blur(70px); opacity: .62; }
.a1 { width: 760px; height: 760px; top: -280px; left: 52%;   background: radial-gradient(circle, #4f46e5, transparent 68%); } /* 靛蓝 */
.a2 { width: 660px; height: 660px; top: 120px;  left: -180px; background: radial-gradient(circle, #a855f7, transparent 66%); } /* 紫罗兰 */
.a3 { width: 560px; height: 560px; bottom: -160px; right: -80px; background: radial-gradient(circle, #db2777, transparent 64%); } /* 品红 */
```

色团用 `position: fixed` 铺满视口，滚动时错位会被玻璃层折射出来——这是深度感的来源。每个色团独立计算模糊与透明度，**不要**把所有颜色压进一条 `linear-gradient`：那样背景是平的，玻璃层模糊一片均匀色，界面会退化成半透明色块。

再叠一层自顶向下的压暗，保证首屏文字对比稳定：

```css
body::before { background: linear-gradient(180deg, rgba(7,11,22,.48) 0%, rgba(7,11,22,.08) 42%, rgba(7,11,22,.22) 100%); }
```

压暗层在中段必须降到 0.10 以下，否则色团被压死，玻璃又变得没东西可折射。

**玻璃必须够“霜”**。品红 `#db2777` 这类高饱和色团透过 9% 的白玻璃会显脏，读起来像屏幕污渍；12% 起干净。宁可让极光少透一点，也不要在玻璃里看到脏色。

**唯一的硬约束**：正文所在的横向区域内，色团叠加后的亮度必须让 {colors.on-surface} 仍保持 4.5:1 以上。改极光参数后重新跑 `npm run design:lint` 校验 token，并在浏览器里实际读一段文字确认。

**玻璃层**：玻璃不是一块透明的板，是一片**被照亮的**玻璃。每层都用自顶向下的渐变承担这份光照——顶部接天光更亮，底部更暗：

```css
background: linear-gradient(160deg, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0.09) 100%);
```

单色 `rgba(255, 255, 255, .12)` 会让背后的色团直接决定卡面颜色，卡就变成一块“色团过滤布”，显灰、显脏。渐变给玻璃自身的光，读起来才像玻璃。

所有面板的基础层等效 `surface-container-high` {colors.surface-container-high}；更靠前的层用 `surface-container` {colors.surface-container}，更靠后的用 `surface-container-low` {colors.surface-container-low}。层级靠明度递进，不靠阴影。

- **On-surface** {colors.on-surface}：玻璃上的正文与标题，冷白偏蓝，绝不使用纯白。
- **On-surface-variant** {colors.on-surface-variant}：次要说明、辅助文字、导航未选中态。
- **Outline** {colors.outline}：1px 结构线。玻璃边缘另用 `rgba(255, 255, 255, 0.14)`，见 Elevation & Depth。
- **Primary（霜白）** {colors.primary}：**只**给唯一的主行动——"获取 / 安装 / 订阅"。整屏最多出现一次实心霜白按钮。
- **Secondary（冰蓝）** {colors.secondary}：链接、编号、代码内联、MCP 端点。它承担"可点"的语义。
- **Tertiary（淡紫）** {colors.tertiary}：kicker 小标、品牌标记、光晕的颜色来源。它**不**用于正文，也不用于按钮。
- **Success** {colors.success}：清单勾选标记。仅此一处。
- **Error** {colors.error}：表单错误与危险操作提示。

玻璃面板上的文字对比度必须 ≥ 4.5:1。因为玻璃是半透明的，**不要在 token 里写 `rgba(255,255,255,0.1)` 这类值**——那些透明度属于 CSS 实现，token 记录的是"合成之后的实际观感色"（也就是上面这些不透明值），这样对比度才可校验、可复现。

## Typography

**Inter** 负责拉丁与西里尔字母，CJK 按 `<html lang>` 切到对应语言的系统字体：简体中文 `PingFang SC`、繁体中文 `PingFang TC`、日语 `Hiragino Sans`、韩语 `Apple SD Gothic Neo`，各自再带 Noto 与 Windows 侧同类字体兜底。这不是可选项 —— 日文汉字与繁体字形和简体不同（`直`、`骨`、`步` 的写法都不一样），用中文字体渲染日文页会被读者一眼看穿。代码与端点用 **JetBrains Mono**。

- **阶梯**：{typography.display-lg} 48px 只给首屏主张；{typography.headline-lg} 36px 给章节标题；{typography.headline-md} 24px 给卡片标题；{typography.body-lg} 18px 给导语；{typography.body-md} 16px 是正文默认。
- **玻璃上要加一档字重**。背景有位移的彩色，Regular 在雾面玻璃上会显脏；正文用 400 但配 `line-height` 1.6，卡片标题用 600 而不是 500。
- **Kicker** {typography.label-sm}：12px / 600 / 0.08em 字距 / 全大写，只用 tertiary 色。它是每个区块唯一的"技术感"来源，一屏不超过两个。
- **指标说明整句不折行**。首页 3 / 0 / 10 三个数字下面的说明是完整一句话，不设 `max-width`：十种语言里最长的一条（葡语、德语）约 300px，限宽会把中文、德文断成两行，三个数字的底边就对不齐了。放不下时由整条 `flex-wrap` 换到下一排，绝不把一句话切成两截；只在 760px 以下允许说明内部折行。
- **中文行高不低于 1.6**。西文 26px 的行高在 16px 中文上会挤，中文段落一律取 1.65–1.7。日文与韩文同样取 1.7：假名和谚文的字面比汉字矮，行高给不够会显得行间距忽大忽小。
- **不用斜体、不用 800 以上字重、不用下划线做强调**。层级只靠字号、字重、颜色三个维度，最多同时用两个。
- 大字号（≥ 36px）配负字距 `-0.02em` 到 `-0.03em`；小字号（≤ 14px）配正字距 `0.02em` 起。

## Layout

8px 基础网格。容器最大宽 1120px，两侧内边距 24px；正文测度控制在 62–70ch。

- **块的节奏**：区块上下留 80px（{spacing.section-padding}），卡片之间 20px，卡片内 24px。手机端区块降到 48px。
- **留白是给光晕的**。区块之间不留空，极光就没有位置显形，页面会退化成一片灰。宁可内容少一段，不要把上下边距压缩。
- **栅格**：功能卡片三列（`minmax(260px, 1fr)`），产品卡片三列，定价两到三列，步骤三列。任何栅格在 900px 以下折成两列，760px 以下折成一列。
- **首屏**：左侧文案 / 右侧插图的双栏在 860px 折为单栏，插图置于文案之后。
- 段落之间用 margin，不用空 `<p>`；列表项间距 10px。

## Elevation & Depth

**深度来自光的折射，不来自阴影。**

- **三层玻璃**，唯一的分层语法：
  - **L1 基础面板**（功能卡、步骤卡、FAQ）：`blur(16px)` + `linear-gradient(160deg, rgba(255,255,255,.17), rgba(255,255,255,.09))`，等效 {colors.surface-container-high}
  - **L2 抬升面板**（定价推荐档、账号面板、弹层）：`blur(28px)` + `linear-gradient(160deg, rgba(255,255,255,.21), rgba(255,255,255,.12))`，等效 {colors.surface-container}
  - **L3 焦点层**（模态、悬浮工具栏）：`blur(44px)` + `linear-gradient(160deg, rgba(255,255,255,.24), rgba(255,255,255,.15))`
- **每块玻璃必须有 1px 描边**：`border: 1px solid rgba(255, 255, 255, 0.18)`。这是玻璃成形的唯一手段——去掉描边，面板就塌成一块脏色。
- **顶边内侧高光**（可选，只给 L2/L3）：`inset 0 1px 0 rgba(255, 255, 255, 0.10)`，模拟光源在上方。
- **阴影极软极散**：`0 8px 32px rgba(0, 0, 0, 0.22)`，配内侧顶光 `inset 0 1px 0 rgba(255, 255, 255, 0.09)`。不要用紧贴的深阴影，那会让玻璃变成实体卡片。
- **光晕只从边缘和底部进入视口**。不要把渐变光晕放到某个玻璃面板的正后方——那会让面板内的正文失去稳定对比。
- 禁止：发光边框、`filter: drop-shadow` 做霓虹、渐变描边、玻璃上的噪点纹理。

## Shapes

圆角有机、统一，没有直角，也没有混合半径的卡片。

- **面板**：{rounded.lg} 16px。抬升面板可用 {rounded.xl} 24px。
- **按钮与输入**：{rounded.full} 胶囊。按钮 48px 高、24px 横向内边距，保证点按面积。
- **小元素**：标签、代码块、徽标用 {rounded.sm} 8px 到 {rounded.md} 12px。
- **图标与插图**：一律线条、2px 描边、圆头端点与圆角连接，与玻璃描边的视觉重量对齐。插图内部用色块表达，不用写实纹理。
- **不混用**：同一视图里所有面板取同一档圆角。只有"抬升"这一个语义允许换档。

## Components

### 玻璃面板

`glass-panel` 承载所有平级内容（功能卡、步骤卡、FAQ 条目）。默认 L1：16px 模糊、`linear-gradient(160deg, rgba(255,255,255,.17), rgba(255,255,255,.09))` 底色、{rounded.lg} 圆角、1px 白色描边。鼠标悬停时只提亮背景一档（`glass-panel-hover`）并轻微上浮 `translateY(-2px)`，**不变描边颜色、不加阴影**。

`glass-panel-elevated` 用于需要争取注意力的单块面板（定价推荐档、账号面板）：L2 模糊、更高明度、{rounded.xl}。

推荐档靠**两圈淡紫描边**争取注意力，不靠发光：`border-color: rgba(233, 213, 255, .55)` 配外扩一圈 `box-shadow: 0 0 0 1px rgba(233, 213, 255, .26)`。因为推荐档背后往往正好压着最亮的色团，单靠 `border` 会被光吃掉，必须外扩。

悬停只提亮背景一档并上浮 `translateY(-2px)`，**不改描边、不加阴影**。

### 动作元素

`button-primary` 是实心霜白胶囊，深墨文字（{colors.primary} / {colors.on-primary}），对比度约 16:1。它承担页面上唯一的主行动。悬停时底色压向 {colors.primary-fixed-dim}，不要改字号、不要加位移。

`button-ghost` 是玻璃按钮：{colors.surface-container-low} 底、白色描边、白字。用于次要动作与所有并列选项。它和主按钮高度必须一致（48px），并列时主按钮在左。

没有链接的按钮（未上架产品）保持主按钮外观但去掉悬停反馈与手型光标——**看起来还能点，但不给假承诺**。

### 输入与表格

`input-field` 用最暗的玻璃层 `surface-container-low` + {rounded.md}，聚焦时用 2px 冰蓝描边（`outline: 2px solid {colors.secondary}`）而不是换底色。占位符用 {colors.on-surface-variant} 的 60% 明度，不能用 `outline` 色——太浅会读成禁用态。

计费周期切换器是胶囊分段控件，选中段用实心霜白反色，未选中段透明。

### 文字承载

`plan-price` 用 display-lg 直接承载价格数字，这是页面第二大的字。`stat-value` 用 headline-md 承载统计数字，配 12px 的 label 说明。

`kicker-label` 每个区块最多一个，颜色锁死 tertiary。

`code-chip` 只用于 MCP 端点、配置片段和 `rnk_` 前缀的密钥。它是最暗的一层玻璃（`surface-container-lowest`）+ 冰蓝等宽字，永远横向可滚动而不是换行。

## Do's and Don'ts

- **Don't** 在白玻璃上放白字。半透明白底 + 纯白文字的实际对比度是 1:1，lint 与真实用户看到的是同一个问题。
- **Don't** 把 `rgba()` 透明度写进颜色 token。token 存合成后的观感色，透明度属于 Elevation 章节的 CSS 配方。
- **Don't** 用单色 `rgba(255, 255, 255, .1)` 当玻璃面板的背景。玻璃必须有上亮下暗的自身光照，否则背后的色团会把它染成脏灰。
- **Don't** 用一条 `linear-gradient` 充当极光底。背景必须是几个独立、被模糊的色团，否则玻璃层没有可折射的形状。
- **Don't** 用 `#000000` 做底、`#ffffff` 做字。纯黑底会让玻璃失去"存在感"，纯白字会让页面发刺。底是 `#070b16`，字是 {colors.on-surface}。
- **Don't** 给玻璃面板加大于 44px 的模糊——超过之后内容边界消失，面板读起来像脏污。
- **Don't** 在玻璃上用小号（≤ 13px）且低对比（低于 4.5:1）的文字。雾面会让小字先糊掉。
- **Don't** 给正文加渐变文字、发光、描边字。
- **Don't** 一屏放两个实心霜白按钮。主行动只能有一个。
- **Don't** 用弹跳、回弹、超过 300ms 的过渡。状态变化要像拨开关，不像拉抽屉。
- **Do** 用 `text-wrap: pretty` 而不是 `balance` 处理标题断行。`balance` 为求两行等长会割开中文词组（“有用的”断成“有用 / 的”）。
- **Do** 每个面板都带 1px 白色描边，且玻璃背后一定有可见的色团或插图。没有描边、或背后没有形状，都不成其为玻璃。
- **Do** 让色团的 `position: fixed`，滚动时背景与内容错位，折射感才成立。
- **Do** 用 `prefers-reduced-motion` 把持续漂浮的光晕动画与所有过渡降为 0。
- **Do** 给卡片悬停只做"提亮一档 + 上浮 2px"，不做缩放。
- **Do** 让插图、图标、描边共享同一套 2px 视觉重量，界面才会像一个整体。
- **Do** 在深色玻璃上保证正文对比度 ≥ 4.5:1、大字号 ≥ 3:1，改 tokens 之后重新跑 `npm run design:lint`。
