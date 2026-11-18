# Renota 公共站 · 视觉改造方案（unslop）

审计对象：`renota-public` 全站 11 类页面（home / chrome / zotero / android / pricing / privacy / terms / account / checkout / welcome），
十语种，1440 与 390 两个断点。审计依据为实际渲染截图（1440×1000 与 390×844）+ `src/styles.ts` + `src/render/*`。

---

## 0. 判断：slop 重，但只重在一层

- **不 slop 的部分**：信息架构、文案（无感叹号、无 hype、无假数据、"0 API keys stored on our servers" 这种真有性格的指标）、SEO/结构化数据、十语种工程、无客户端 JS 的取舍。这些**不动**。
- **slop 的部分**：氛围层（紫粉极光 + 毛玻璃 + 渐变 logo）、首屏结构（全居中堆叠、无产品视觉）、排版纪律（7 档字重混用、字号阶梯被 12 个破碎值取代）、间距（大量非 4 倍数）、组件（全站胶囊、紫色描边抢注意力）。

结论：**重 slop，跑完整九道关**。现有 `DESIGN.md`（Atmospheric Glass）是有论证的体系，但它的结论正好落在 AI 落地页的默认外观上；方向本身要换，工程与内容全部保留。

---

## 1. 审计清单（按 signs.md 分组，带位置）

### 1.1 表面与颜色

| # | 症状 | 位置 |
|---|---|---|
| 1 | 靛蓝 `#4f46e5` + 紫罗兰 `#a855f7` + 品红 `#db2777` 三个 `blur(70px)` 色团铺满全站，透明度 0.62 | `src/styles.ts:45-49`、`DESIGN.md` Colors |
| 2 | 玻璃卡：白色内高光 + 背后彩色 + 彩色软阴影，全站 28 处 `backdrop-filter` | `styles.ts` 全文（`.card` 210、`.panel` 360、`.plan.featured` 237 等） |
| 3 | Logo 是紫色渐变方块 + 白色 R，账号页头像复用同一渐变 | `styles.ts:115-119`、`.account-avatar` |
| 4 | 推荐档用淡紫双圈描边 + 紫光晕抢注意力 | `styles.ts:237-243` |
| 5 | 一屏内每样东西都在强调：badge、3 个 kicker、3 个步骤序号、5 个 FAQ 加号、7 个链接全是淡紫/冰蓝 | 首页整屏 |
| 6 | `--muted: #a6b2cb` 与 DESIGN token `on-surface-variant #9aa6c0` 已经分叉 | `styles.ts:30` vs `DESIGN.md` |

### 1.2 字体

| # | 症状 | 位置 |
|---|---|---|
| 7 | **站点没有加载任何 webfont**，Inter 只在名单第一位；没装 Inter 的用户看到 Segoe UI / Roboto | `dist` 无 `@font-face`，`layout.ts` 无 font link |
| 8 | 权重混用：`h1` 700、`h2` 600、`h3` 600、`.stats strong` 700、`.plan-price strong` 700、`.brand` 700、`.step-num` 700、FAQ 加号 700 | `styles.ts:91, 194, 246, 113, 345` |
| 9 | 字号阶梯被 12 个破碎值取代：0.74 / 0.78 / 0.8 / 0.82 / 0.84 / 0.86 / 0.88 / 0.9 / 0.92 / 0.94 / 1.0625 rem | `styles.ts` 全文 |
| 10 | 5 处 uppercase + 宽字距标签：`BROWSER EXTENSION`、`FREE`/`PRO`、`PRODUCTS`/`SUPPORT`/`LEGAL`、`MCP ENDPOINT`、账号页 `dt` | `styles.ts:154, 244, 535, 223, 417` |
| 11 | 数字无 `tabular-nums`（stats / 价格 / 账号统计） | `styles.ts:194, 246` |

### 1.3 图标

| # | 症状 | 位置 |
|---|---|---|
| 12 | 没有图标集。"图标"是字形：`✓`（清单）、`+`/`−`（FAQ）、`→`（产品卡 CTA ×3）、`1/2/3` 数字套紫圈 | `styles.ts:334, 345`、`ui.ts` |

无 emoji——这一组只有"缺统一图标"和"箭头是文本字符"两条。

### 1.4 间距

| # | 症状 | 位置 |
|---|---|---|
| 13 | 非 4 倍数：`gap` 10/14/18、`padding` 11/13/15/18/22/28、`margin` 26、`min-height` 40/42/34 | 全站 40 余处 |
| 14 | 兄弟卡内边距不一：`.card` 24 / `.plan` 28 / `.steps li` 20 / `.panel` 28 / `.faq-item` 4 18 | `styles.ts:210, 236, 318, 360, 341` |
| 15 | 移动端 header 高 **125px**（导航六项 + 语言按钮换行两排），首屏被吃掉 15% | `styles.ts:558-565`，实测 390×844 |
| 16 | 移动端 stats 竖排占 **277px**（3 / 0 / 10 各占一行） | `styles.ts:192-196` |

### 1.5 首屏与布局

| # | 症状 | 位置 |
|---|---|---|
| 17 | 首屏一切居中堆叠：kicker → h1（3 行）→ 208 字副文 → 两按钮 → 三数字。**没有任何产品视觉** | `pages.ts` renderHome、`styles.ts:146-147` |
| 18 | 按钮上方有一枚胶囊 badge「For people who read a lot」 | `styles.ts:148-153` |
| 19 | 产品页 hero 插图是灰条骨架 SVG（浏览器窗口里 8 条灰块 + 一根紫色条），读起来像未完成的占位符 | `ui.ts:85-160` |
| 20 | 8 个区块用同一条 `border-top` 切成 8 段，每段都是"标题 + 副文 + 三张等宽卡" | `styles.ts:198` |
| 21 | 产品/功能卡一律等宽三列、等内边距，没有节奏 | `.grid` 系列 |

### 1.6 组件与动效

| # | 症状 | 位置 |
|---|---|---|
| 22 | 全站胶囊：按钮、badge、语言按钮、计费切换器、步骤序号、`.a-brand` 小条全是 `999px` | `styles.ts` 多处 |
| 23 | 卡片 hover 上浮 2px + 换背景，与"深度来自光"的表述重复了一层动效 | `styles.ts:216, 307` |
| 24 | 文档与实现分叉：DESIGN 说极光"缓慢漂移"，实现是静态的；README/AGENTS 描述的是玻璃与极光配方 | `DESIGN.md`、`AGENTS.md`「已知坑」 |

**未发现**：emoji、渐变文字、`transition-all`、`hover:scale`、循环动画、假数据、感叹号、hype 词。

---

## 2. 方向（五行）

- **Product**：给「读得很多」的人用的三端阅读助手（浏览器 / Zotero / 手机）；读到的东西变成一份本地优先、可被追问的私人知识库。
- **Character**：`quiet, exact, a little scholarly` —— 安静、精确、带一点书卷气。不是 clean / modern / premium。
- **World**：夜里的一本书和一支笔——纸、墨、页边、手写划线、书签。**不是**极光，也**不是**玻璃。（现方向"高端光学仪器取景器"原本成立，但落地成了紫粉极光，纪律丢了。）
- **Moments**：
  1. 首屏右栏那台"正在阅读的窗口"：真实段落、两行琥珀划线、旁边浮出一张带动画角标的回答卡。
  2. 产品页三端各自的真实预览：划词工具条 / 双栏书页带批注 / 手机悬浮球 + OCR 框。
  3. 定价页 Pro 列真正多出来的三行，用同一支笔的墨色标出。
- **Signature**：**引用角标 `1`**。12px mono 上标、琥珀色、永远连回原文。产品真正的差异点是 "Shows its sources"，它成为最小视觉单位，只出现在三处，别处不出现。

---

## 3. 九道关（具体值）

### 3.1 颜色

单一中性墨色 ramp，去掉一切色相渐变、光晕、彩色阴影：

```
--bg:        #0c0d10   页面底          --hairline:  rgba(238,240,245,.08)
--surface:   #14161a   卡片 / 交替块    --border:    rgba(238,240,245,.12)
--surface-2: #1a1d23   hover / 输入    --text:      #eef0f5   17:1
--text-2:    #a3a9b8   次要            --text-3:    #838b9e   4.9:1（仅 meta）
--accent:    #e0a24a   琥珀 · 唯一强调色（8.5:1）
--marker:    rgba(224,162,74,.20)   原文划线
--ok: #4cc38a   --danger: #e5484d
```

- accent 按面积分布：**主行动按钮**（实心底、墨字 8.4:1）> 原文划线（52% 浓度）> 引用角标（实心小方块）> 链接与导航下划线、focus ring。
  金额顺序即视觉顺序，**没有第六处**。（最初版本把 accent 排除在主按钮之外，结果全站琥珀只占 0.003%，页面读起来是黑白的——这条已撤回。）
- 删掉 `.aurora` 三个色团与 `body::before` 压暗层；删掉全部 `backdrop-filter`（28 处）；深度改为 surface 台阶 + hairline。
- `--bg-soft` 从 `rgba(255,255,255,.03)` 改成 `--surface`，交替块靠台阶而不是透明白。
- Logo：`.brand-mark` 去掉渐变与内高光，改为 1px 描边圆角方片 + 实心琥珀 R；wordmark 500 字重。

### 3.2 字体

- 自托管 Inter（woff2 子集，latin + latin-ext + cyrillic，`font-display: swap`），`/assets/fonts/` 长缓存；CJK 仍走系统字体链（现有日/韩/繁的 `html:lang()` 覆盖保留，这是对的）。
- 权重只有 400 / 500，600 仅用于正文内的强调（全站 ≤ 5 处）。
- 阶梯收敛成 6 档：

| 用途 | 尺寸/行高 | 字重 |
|---|---|---|
| 首屏主张 | 56 / 60（≥40px 才 `-0.02em`），移动 36 / 40 | 500 |
| 区块标题 h2 | 32 / 40，移动 26 / 34 | 500 |
| 卡片标题 h3 | 18 / 26 | 500 |
| 正文 / 导航 | 16 / 26 | 400 |
| 小字 meta | 14 / 22 | 400 |
| 标签 / 角标 / 计数 | 12 / 16，字距 0，**句首大写** | 500 |

- 去掉 5 处 uppercase + 宽字距标签，`BROWSER EXTENSION` → `Browser extension`，`MCP ENDPOINT` → `MCP endpoint`，`PRODUCTS` → `Products`。
- 数字统一 `font-variant-numeric: tabular-nums`，价格保持 `$9.90` 一种格式。

### 3.3 图标

- 手写 6 个内联 SVG（arrow-right、check、plus、minus、chevron-down、external），统一 16×16 / `stroke-width: 1.5` / 圆头。不引新依赖（项目无构建步骤，必须内联）。
- 16px 图标盒固定宽度，图标与文字间距 8，标签在一列对齐。
- 删掉 `.step-num` 的紫圈数字：步骤改用 mono 序号 `01 / 02 / 03`，12px `--text-3`。
- `✓` 清单项改成 16px `check` 图标，`--text-3` 色，不抢正文。

### 3.4 文案

- badge「For people who read a lot」去掉，改为 h1 上方 12px `--text-3` 的一行定位词（非胶囊）。
- 首屏副文压到 ≤ 110 字（现 208 字 3 行），只留"三个表面、一份知识库、带引用"。
- `Explore the Chrome extension →` 里的 `→` 换成图标，文案本身保留。
- 文案结构性改动一律 ×10 语种，**P0 阶段不动 i18n**。

### 3.5 类型（同 3.2，独立成篇是因为它依赖字号阶梯重排）

见上表。另：撤掉所有 `letter-spacing: -0.03em` 在小字号上的使用（现 `h1` 48→56 才可 -0.02em）。

### 3.6 布局

- **首屏改为左文右预览的非对称分栏**：左栏 44%（文案），右栏 56%（产品预览），桌面顶距 96px，预览从视口底边溢出，形成滚动邀请。移动端堆叠，预览在 CTA 之后。
- **首屏预览用代码画，不是图**：一个阅读窗口（书名 / 正文 6 行 / 两行琥珀划线）+ 右侧浮出的回答卡（"Explain this passage" + 2 行回答 + `source · ch. 3` + 引用角标 `1`）。窗口顶栏三点、右上角小 Renota 标。
- 删掉 8 条 `border-top` 分割线，区块靠 96px 留白 + 两处 `--surface` 交替块区分。区块留白：桌面 96 / 移动 56。
- 卡片给节奏：产品三卡改为 `1.15fr 1fr 1fr`（Chrome 首推更宽）；功能卡 2 列时第一张跨两列。
- 移动端导航折叠成 `<details>` 菜单按钮（**纯 CSS，不违反"内容页无 JS"**），header 回到 64px；stats 改三列一行（数字 18 / 说明 11-12）。

### 3.7 细节

- 半径按尺寸分层：输入 / 按钮 10，卡片 12，面板 16，标签 6，`.lang` 按钮 8。全站不再有 `999px` 胶囊（保留计费切换器一段是不可少的除外，可给 10）。
- 嵌套半径：16 面板 + 8 内距 → 内层 8。
- FAQ 的 `+`/`−` 换成图标，去掉 700 权重与紫色。
- 表格（privacy / terms 的 `.prose table`）用 hairline 边框、`--surface` 表头、数字右对齐。
- 焦点样式统一：`outline: 2px solid var(--accent); outline-offset: 2px`。
- 章节序号统一 mono 小字，`01 / 02 / 03` 一种格式。

### 3.8 视觉

- 首屏不需要生成图：它的视觉是真实界面（unslop：应用/产品界面几乎从不该用生成图）。三张 SVG 骨架图重画为"墨线 + 琥珀划线"的真实预览，或直接换成 HTML 预览（推荐后者）。
- 可选加一张 hero 氛围图（书桌夜读），仅在确认要"场景型 hero"时生成。prompt 见 §6。
- **不做**：噪点、颗粒、玻璃、霓虹、3D 球、全息。

### 3.9 动效

- 一条曲线 `cubic-bezier(.22,1,.36,1)`；hover/press 140ms，展开/浮层 180ms，入场 320ms。
- 卡片 hover 只改 `border-color` 与 `background`，去掉 `translateY(-2px)`；按钮 press `scale(.98)`。
- 去掉 `html { scroll-behavior: smooth }`（移动端与 reduced-motion 都不稳）。
- 保留一处入场：主内容 320ms 淡入上移 8px，stagger 40ms，最多 4 个。
- `prefers-reduced-motion` 下全部归零（现有规则保留并扩展到新增动效）。

---

## 4. 落地顺序（受 AGENTS.md 契约约束）

1. 改 `DESIGN.md`：重写 Colors / Typography / Layout / Elevation & Depth / Shapes / Components / Do's-Don'ts 七章；`version: alpha` 保留，token 名沿用 schema。
2. `npm run design:lint` 必须 0 error 0 warning（当前基线已验证为 0/0）。
3. 重写 `src/styles.ts`（约 574 行，改 ~70%）。
4. `ui.ts` 加图标集 + 首屏预览组件；`illustration()` 三张图或替换。
5. `pages.ts` 改首页 hero 结构；`layout.ts` 加导航折叠。
6. `npm run typecheck` → `npm run build` → 1440 / 390 两断点截图复核（最多三轮）。
7. `public/og/*.png` 全删后本地重出（60 张，中文字体只有本机有）。
8. 同步 `AGENTS.md`「已知坑」与 `README.md`：删掉 aurora / 玻璃配方段落，否则文档说谎。

---

## 5. 分期与成本

| 阶段 | 内容 | 触碰 i18n | 预估 |
|---|---|---|---|
| **P0 收敛** | 颜色、字体、字号、间距、图标、半径、动效（即 3.1 / 3.2 / 3.3 / 3.5 / 3.7 / 3.9） | 否 | 1 天 |
| **P1 首屏** | hero 非对称分栏 + 代码预览 + 移动端导航折叠 + stats 重排（3.6 / 3.8） | 是（+3 条 ×10） | 1–1.5 天 |
| **P2 可选** | 三端产品页预览、定价对照表、og 重出、story 视频 | 是 | 2–3 天 |

P0 就能把"AI 落地页"的观感拿掉；P1 让这页只属于这个产品。

### P1 执行记录（已完成）

- 首屏改成左文右预览分栏（0.95 / 1.05，56px 间距）；左边只剩定位词、主张、导语、两个动作与三行事实。
- 新增 `readingPreview()`（`src/render/ui.ts`）：窗口 + 一段被琥珀划线的正文 + 右下角浮出的回答卡 + 引用角标。四个变体只改界面饰件——`chrome` 五动作工具栏、`zotero` EPUB 书脊、`android` 320px 手机机身 + 悬浮球。
- 字典新增 `home.hero.preview` 六个字段（句题、书名、两句正文、回答、来源）+ `nav.menu`，十语种同步；示例书名与段落**虚构**。
- 移动端导航改为"同一组链接渲染两次 + CSS 互斥"：桌面 `.site-nav`、760px 以下 `<details class="nav-menu">`，header 从 117px 回到 65px 单行。
- 中文标题单独降一档（1440 时 38px），断行因此落在标点后而不是"留下有用 / 的"。

## 6. 风险

- `DESIGN.md` 是仓库契约，重写会让 `AGENTS.md` / `README.md` 里"极光层必须存在""玻璃背后必须有形状"的说明作废，必须同步改，否则下一个 agent 会按旧文档把玻璃加回来。
- 十语种：任何文案改动 ×10，`en.ts` 是结构源头，漏字段即 `typecheck` 失败。
- og 图 60 张要本地重出，CI 镜像可能没有中文字体。
- 去掉 28 处 `backdrop-filter` 是纯收益（滚动性能），但会失去"氛围感"；替代方案是首屏一张静态氛围图，其余全中性。

## 7. 可选：hero 氛围图 prompt（如走"场景型 hero"）

> One open paperback book on a dark matte desk at night, lit by a single warm desk lamp from the upper left; deep charcoal background (#0c0d10) fading to black at the edges; the book on the right half, calm empty desk space on the left third for the headline; cinematic photograph, soft contact shadow, no text, no logos, no people; 16:9, 2x.

生成工具：`mmx-cli`（MiniMax）可用，跑前需确认尺寸与费用。存为 `public/hero-desk.webp`。

---

*方法：unslop by Damir Sokolovsky (@heydamir)，CC BY 4.0。*
