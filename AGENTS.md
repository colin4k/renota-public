# AGENTS.md — renota-public

面向在本仓库里动手的 agent。人看 [README.md](README.md)。

## 先做什么

**改任何视觉之前，读 [DESIGN.md](DESIGN.md)。** 它定义本站的视觉契约：色板、字号阶梯、间距、玻璃层配方、组件外观。DESIGN.md 是唯一来源，`src/styles.ts` 是它的实现。

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
```

## 硬性约束

- **不引入 CSS 框架**。全站样式是 `src/styles.ts` 里一个模板字符串，这是刻意选择：无构建步骤、可长缓存、首屏无 JS。
- **不加客户端 JS 到内容页**。唯一允许有 JS 的是账号页与结账页（Paddle 要求），以及 `src/serve.ts`（仅本地预览）。
- **文案必须双语同步**。`src/i18n/en.ts` 是结构源头，漏字段会编译失败；中文只写 `src/i18n/zh-CN.ts`。
- **产品名**：中文「睿记」，其余语言一律 `Renota`。
- **告警即缺陷**。构建输出里不应有 TypeScript 报错。

## 样式落地规则

DESIGN.md 的颜色 token 记录的是**合成后的观感色**（不透明），`src/styles.ts` 里要用 `rgba()` 表达玻璃，因为 `backdrop-filter` 需要底色带 alpha 才透光。

两边不是字面相等，而是视觉等效：

```css
/* token: surface-container-high #252d3e —— 在 #0a1020 底上叠白玻璃的观感 */
.card {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.09);
}
```

改其中一边时，另一边必须同步；如果观感变了，重跑 `design:lint` 确认对比度仍然达标。

**玻璃背后必须有形状。** `backdrop-filter` 只有在背后有可模糊的内容时才看得出效果。本站的做法是三个 `position: fixed` 的模糊色团（见 DESIGN.md 的 Colors 章节）。如果你把某块区域的背景简化成纯色，那里的玻璃就会退化成一块半透明色块 —— 这不是 bug，是缺了折射对象。

## 已知坑

- 极光层 `.aurora` 由 `src/render/layout.ts` 注入三个 `<i>` 色团。删掉它们，全站玻璃会立刻退化成半透明色块——`backdrop-filter` 没有可模糊的对象了。
- `public/og/*.png` 是提交进仓库的。改标题文案后要**本地**删掉对应 PNG 再 `npm run build` 重新出图（CI 镜像可能没有中文字体）。
- `dist/` 被 gitignore，部署走 `npx cf deploy`（见记忆/README），不要提交构建产物。
