# AGENTS.md — renota-public

面向在本仓库里动手的 agent。人看 [README.md](README.md)。

## 先做什么

**改任何视觉之前，读 [DESIGN.md](DESIGN.md)。** 它定义本站的视觉契约：色板、字号阶梯、间距、表面台阶、组件外观。DESIGN.md 是唯一来源，`src/styles.ts` 是它的实现。

改视觉的顺序固定：

1. 改 `DESIGN.md` 的 token 或 prose
2. `npm run design:lint` 必须 0 error 0 warning
3. 再按新值改 `src/styles.ts`
4. `npm run build` 出图检查

不要跳过第 1、2 步直接改 CSS —— 那会让样式表和文档分叉，下一个 agent 读到的是谎话。

## 命令

```bash
npm run dev          # 构建 + 预览 http://127.0.0.1:4321
npm run build        # 只构建到 dist/
npm run typecheck
npm run design:lint  # 校验 DESIGN.md（0 error 0 warning 是底线）
npm run design:tokens  # 按 DESIGN.md 导出 CSS 变量，供人工核对，不是构建产物
npm run deploy       # 构建 + 上线 Cloudflare + 推送 IndexNow（见 README）
npm run indexnow     # 只推送 sitemap 里的 URL；加 -- --dry-run 只打印不发送
```

## 硬性约束

- **不引入 CSS 框架**。全站样式是 `src/styles.ts` 里一个模板字符串，这是刻意选择：无构建步骤、可长缓存、首屏无 JS。
- **内容页只允许一个统计脚本**。全站唯一的客户端 JS 是 `src/render/layout.ts` 里 `analyticsTag()` 输出的 Umami tracker（`defer`，不进首屏关键路径，配置缺失时整段不输出），外加账号页与结账页本来就要的 Paddle/登录脚本，以及 `src/serve.ts`（仅本地预览）。除此之外不要往内容页加任何客户端 JS —— 首屏无 JS 是刻意选择，加之前先问。
- **文案必须十语言同步**。`src/i18n/en.ts` 是结构源头，`Content` 类型挂在 `en` 上，九份译文都标 `: Content` —— 任何一份漏字段或结构走样，`npm run typecheck` 会直接失败。改一条文案就是改十个文件。
- **产品名**：简体中文「睿记」，繁体中文「睿記」，其余语言一律 `Renota`。
- **法律全文也是内容**：`privacy.md` / `terms.md` 有九份正式译本，构建时按 `privacy.<locale>.md` 加载，缺文件即失败 —— 不要用英文兜底糊过去。
- **告警即缺陷**。构建输出里不应有 TypeScript 报错。

## 样式落地规则

DESIGN.md 的颜色 token 记录的是**合成之后的观感色**（不透明），`src/styles.ts` 用同名 CSS 变量实现。
两边不是字面相等，而是视觉等效：token 是"看起来是什么色"，变量是"怎么算出来"。改其中一边，另一边必须同步。

全站只有三层表面，层级靠明度，不靠阴影与模糊：

```
L1 页底    #0b0c0f
L2 面板    #171a21  + 1px rgba(238,240,245,0.09) 发丝线
L3 抬起    #1f232b  （悬停、输入、选中）
```

**这个站点没有 `backdrop-filter`，也没有色相渐变、光晕和模糊色团。** 旧版的「极光 + 毛玻璃」已经整体移除：
模糊层在深色页上只会让内容读不清，而且滚动时每帧都要重算。需要"更亮"就提到上一档表面，不要加光。

强调色只有 {colors.secondary} 琥珀，见 DESIGN.md 的 Colors 章节列出的五处用途；**它不进按钮底色**。

## 已知坑

- 字体是**自托管**的：`public/assets/fonts/*.woff2`（Inter 四个子集 + JetBrains Mono），`src/styles.ts` 顶部的 `@font-face` 按 `unicode-range` 分片。删掉这些文件，拉丁字母会掉回系统字体，排版控制立刻失效。
- `public/og/*.png` 是提交进仓库的。改标题文案后要**本地**删掉对应 PNG 再 `npm run build` 重新出图（CI 镜像可能没有中文字体）。
- 改色板会影响 60 张 OG 图，它们不会自动重出。
- `dist/` 被 gitignore，部署走 `npx cf deploy`（见记忆/README），不要提交构建产物。
- `npm run build` 需要 `PADDLE_ENVIRONMENT` 与 `PADDLE_CLIENT_TOKEN`：`set -a && . ./.env && set +a && npm run build`。
- 首屏与三个产品页右栏的视觉是 `readingPreview()`（`src/render/ui.ts`），示例文案在字典 `home.hero.preview`。**书名与段落是虚构的**，别换成真实作品；改一个字要改十个语言文件。
- 移动端导航折叠靠"同一组链接渲染两次 + CSS 互斥"，不是 JS。改导航请同时看 `navLinks()` 与 `.nav-menu` 的样式，否则窄屏会出现两套导航或一套都没有。
