// 全站样式。手动写比起引入框架更适合这种纯静态的宣传站：一个文件、无 JS、可缓存。
//
// 视觉契约在 DESIGN.md（Atmospheric Glass）。这里是它的实现：
// token 记录合成后的观感色，玻璃层在这里用 rgba + backdrop-filter 表达。
// 改视觉先改 DESIGN.md 再改这里，`npm run design:lint` 把关。

export const css = `
:root {
  /* 画布 */
  --bg: #070b16;
  --bg-soft: rgba(255, 255, 255, 0.03);
  /* 玻璃层：L1 面板 / L2 抬升 / L3 焦点 */
  --panel: linear-gradient(160deg, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0.09) 100%);
  --card: linear-gradient(160deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0.12) 100%);
  --card-strong: linear-gradient(160deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.15) 100%);
  --well: rgba(0, 0, 0, 0.22);
  /* 线与字 */
  --border: rgba(255, 255, 255, 0.18);
  --hairline: rgba(255, 255, 255, 0.08);
  --text: #e8edfb;
  --muted: #a6b2cb;
  /* 动作色 */
  --primary: #f3f6ff;
  --on-primary: #0a1020;
  --link: #a9c7f0;
  --accent: #d8b4fe;
  --brand: #8b7cf6;
  --brand-strong: #6f5cf0;
  --brand-soft: rgba(216, 180, 254, 0.12);
  --ok: #6ee7a8;
  --danger: #ffb4ab;
  /* 配方 */
  --shadow-glass: 0 8px 32px rgba(0, 0, 0, 0.22);
  --shine: inset 0 1px 0 rgba(255, 255, 255, 0.09);
  --radius: 16px;
  --wrap: 1120px;
}

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

/* 极光：三个被严重模糊的色团。玻璃层折射它们，深度感全部来自这里。
   必须 position: fixed —— 滚动时背景与内容错位，折射才成立。 */
.aurora { position: fixed; inset: 0; z-index: -2; overflow: hidden; pointer-events: none; }
.aurora i { position: absolute; display: block; border-radius: 50%; filter: blur(70px); opacity: 0.62; }
.aurora .a1 { width: 760px; height: 760px; top: -280px; left: 52%; background: radial-gradient(circle, #4f46e5 0%, rgba(79, 70, 229, 0) 68%); }
.aurora .a2 { width: 660px; height: 660px; top: 120px; left: -180px; background: radial-gradient(circle, #a855f7 0%, rgba(168, 85, 247, 0) 66%); }
.aurora .a3 { width: 560px; height: 560px; bottom: -220px; right: -160px; background: radial-gradient(circle, #db2777 0%, rgba(219, 39, 119, 0) 64%); opacity: 0.5; }

/* 自顶向下压暗：保证首屏文字对比稳定，中段必须降到 0.10 以下，否则色团被压死 */
body::before {
  content: ""; position: fixed; inset: 0; z-index: -1; pointer-events: none;
  background: linear-gradient(180deg, rgba(7, 11, 22, 0.48) 0%, rgba(7, 11, 22, 0.08) 42%, rgba(7, 11, 22, 0.22) 100%);
}

body {
  margin: 0;
  overflow-x: hidden;
  background: var(--bg);
  color: var(--text);
  font: 16px/1.65 Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* CJK 字形不统一：日文汉字、繁体字形与简体不同，按 <html lang> 换掉回退段。
   Inter 依旧排在最前，它只覆盖拉丁与西里尔，缺字形时才落到后面的语言字体。 */
html:lang(ja) body {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Sans", "Hiragino Kaku Gothic ProN",
    "Yu Gothic", "Noto Sans JP", "Apple SD Gothic Neo", sans-serif;
  line-height: 1.7;
}
html:lang(ko) body {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Apple SD Gothic Neo", "Malgun Gothic",
    "Noto Sans KR", sans-serif;
  line-height: 1.7;
}
html:lang(zh-TW) body {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang TC", "Hiragino Sans CNS",
    "Microsoft JhengHei", "Noto Sans TC", sans-serif;
}

a { color: var(--link); text-decoration: none; }
a:hover { text-decoration: underline; }

/* 用 pretty 不用 balance：balance 为求两行等长会割开中文词（「有用的」断成「有用」「的」），
   pretty 只在行末留孤字时收敛，中英文都安全。 */
h1, h2, h3 { line-height: 1.2; margin: 0 0 0.5em; letter-spacing: -0.02em; text-wrap: pretty; }
/* 48px 是为了让中文首屏标题压在 1072px 内容宽里一行放完 —— 56px 会溢出一个「笔记。」的孤行 */
h1 { font-size: clamp(1.9rem, 4.6vw, 3rem); font-weight: 700; letter-spacing: -0.03em; }
h2 { font-size: clamp(1.6rem, 3.2vw, 2.25rem); font-weight: 600; }
h3 { font-size: 1.0625rem; font-weight: 600; }
p { margin: 0 0 1em; }

.wrap { width: 100%; max-width: var(--wrap); margin: 0 auto; padding: 0 24px; }

.skip {
  position: absolute; left: -9999px; top: 0; background: var(--primary); color: var(--on-primary);
  padding: 10px 16px; border-radius: 0 0 8px 0; z-index: 20; font-weight: 600;
}
.skip:focus { left: 0; }

/* ---------- header ---------- */
.site-header {
  position: sticky; top: 0; z-index: 10;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background: rgba(7, 11, 22, 0.55);
  border-bottom: 1px solid var(--hairline);
}
.header-inner { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 64px; }
.brand { display: inline-flex; align-items: center; gap: 10px; color: var(--text); font-weight: 700; }
.brand:hover { text-decoration: none; }
.brand-mark {
  display: inline-grid; place-items: center; width: 30px; height: 30px; border-radius: 9px;
  background: linear-gradient(140deg, var(--brand), #4f3fd0); color: #fff; font-weight: 800;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.28);
}
.brand-name { font-size: 1.05rem; }
.site-nav { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
.site-nav a { color: var(--muted); font-size: 0.94rem; transition: color 0.18s ease; }
.site-nav a:hover, .site-nav a[aria-current="page"] { color: var(--text); text-decoration: none; }
.site-nav a[aria-current="page"] { color: var(--accent); }

.lang { position: relative; }
.lang summary {
  cursor: pointer; list-style: none; color: var(--muted); font-size: 0.94rem;
  border: 1px solid var(--border); border-radius: 999px; padding: 4px 12px;
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
}
.lang summary::-webkit-details-marker { display: none; }
.lang summary:hover { color: var(--text); }
.lang-menu {
  position: absolute; right: 0; top: calc(100% + 8px); background: rgba(16, 23, 40, 0.92);
  border: 1px solid var(--border); border-radius: 12px; padding: 6px; min-width: 140px;
  /* 十种语言一列排下来比菜单还高：限高并让它自己滚，别把页面撑出滚动条。 */
  max-height: min(70vh, 420px); overflow-y: auto;
  box-shadow: var(--shadow-glass); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
}
.lang-menu a { display: block; padding: 6px 10px; border-radius: 6px; color: var(--text); }
.lang-menu a:hover { background: var(--brand-soft); text-decoration: none; }

/* ---------- hero ---------- */
.hero { padding: 80px 0 56px; }
.hero.home { text-align: center; padding: 88px 0 68px; }
.hero.home .lede { max-width: 720px; margin: 0 auto 28px; }
.badge {
  display: inline-block; margin: 0 0 20px; padding: 6px 14px; border-radius: 999px;
  background: var(--brand-soft); color: var(--accent); font-size: 0.82rem; font-weight: 600;
  border: 1px solid rgba(216, 180, 254, 0.28);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
}
.kicker {
  margin: 0 0 12px; color: var(--accent); font-size: 0.82rem; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase;
}
.lede { font-size: clamp(1.05rem, 2vw, 1.125rem); line-height: 1.7; color: var(--muted); max-width: 62ch; text-wrap: pretty; }
.body-text { color: var(--muted); max-width: 68ch; }

.hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center; }
.hero-art { display: flex; justify-content: center; }
.hero.plain { padding-bottom: 24px; }

/* ---------- buttons ---------- */
.cta-row { display: flex; gap: 12px; flex-wrap: wrap; margin: 26px 0 8px; }
.hero.home .cta-row { justify-content: center; }
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 48px; padding: 0 24px; border-radius: 999px; border: 1px solid var(--border);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
  color: var(--text); font-weight: 600; font-size: 0.95rem;
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  box-shadow: var(--shine);
  transition: background 0.18s ease, transform 0.18s ease, border-color 0.18s ease;
}
.btn:hover { text-decoration: none; background: var(--card); }
.btn.primary {
  background: var(--primary); border-color: transparent; color: var(--on-primary);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3);
}
.btn.primary:hover { background: #bcc9e6; transform: translateY(-1px); }
/* 还是按钮的样子，但没有链接：不给 hover 反馈，光标也不变手型 */
.btn-static, .btn-static:hover { cursor: default; }
.btn-static:hover { background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%); border-color: var(--border); }
.btn.primary.btn-static:hover { background: var(--primary); transform: none; }

/* ---------- stats ---------- */
/* 三项指标各占一条，数字在上、说明在下。
   说明不设 max-width：十种语言的长短差一倍以上，硬限宽会把中文/德文/俄文断成两行，
   而折行后三个色块的底边就对不齐了。整条换行交给 flex-wrap。 */
.stats { display: flex; gap: 40px; justify-content: center; list-style: none; padding: 0; margin: 40px 0 0; flex-wrap: wrap; }
.stats li { display: flex; flex-direction: column; align-items: center; }
.stats strong { font-size: 1.75rem; font-weight: 700; color: var(--text); letter-spacing: -0.02em; }
.stats span { color: var(--muted); font-size: 0.86rem; text-align: center; white-space: nowrap; }

/* ---------- sections ---------- */
.section { padding: 80px 0; border-top: 1px solid var(--hairline); }
.section.alt { background: var(--bg-soft); }
.section-lede { color: var(--muted); max-width: 70ch; margin-bottom: 28px; }

.grid { display: grid; gap: 20px; }
.grid.cards { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
.grid.products { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
@media (min-width: 900px) {
  .grid.cards[data-count="4"] { grid-template-columns: repeat(2, 1fr); }
}
.grid.steps { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); margin: 12px 0 0; }

.card {
  background: var(--panel); border: 1px solid var(--border); border-radius: var(--radius);
  padding: 24px;
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  box-shadow: var(--shadow-glass), var(--shine);
  transition: background 0.18s ease, transform 0.18s ease;
}
.card:hover { background: var(--card); transform: translateY(-2px); }
.card h3 { margin-bottom: 8px; }
.card p { margin: 0; color: var(--muted); font-size: 0.94rem; }

/* ---------- MCP block ---------- */
.mcp-endpoint {
  display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px 16px;
  margin: 26px 0 0; padding: 14px 18px; border-radius: 12px;
  border: 1px solid var(--border); background: rgba(6, 10, 20, 0.72);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
}
.mcp-endpoint-label {
  font-size: 0.74rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted);
}
.mcp-endpoint code { font-size: 0.92rem; overflow-wrap: anywhere; color: var(--link); }
.mcp-link { margin: 14px 0 0; font-size: 0.92rem; }

/* ---------- pricing ---------- */
.grid.plans { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); align-items: stretch; }
.plan { display: flex; flex-direction: column; gap: 10px; padding: 28px; }
.plan.featured {
  background: var(--card-strong);
  border-color: rgba(233, 213, 255, 0.55);
  backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px);
  box-shadow: 0 0 0 1px rgba(233, 213, 255, 0.26), 0 10px 40px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
}
.plan h3 { margin: 0; color: var(--accent); font-size: 0.82rem; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600; }
.plan-price { display: flex; align-items: baseline; gap: 8px; margin: 0; }
.plan-price strong { font-size: 2.25rem; font-weight: 700; color: var(--text); letter-spacing: -0.03em; }
.plan-price span { color: var(--muted); font-size: 0.9rem; }
.plan-summary { margin: 0; color: var(--muted); font-size: 0.95rem; }
.plan-features { margin: 6px 0 18px; }
.plan-features li { font-size: 0.92rem; }
.plan .btn { margin-top: auto; align-self: flex-start; }
.plan-note { margin-top: 24px; max-width: 78ch; }

/* ---------- checkout ---------- */
.checkout-section { padding-top: 56px; }
.billing-switch {
  display: inline-flex; gap: 4px; padding: 4px; margin: 8px 0 28px;
  background: var(--well); border: 1px solid var(--border); border-radius: 999px;
}
.billing-switch button {
  appearance: none; border: 0; background: transparent; color: var(--muted);
  font: inherit; font-size: 0.92rem; padding: 8px 18px; border-radius: 999px; cursor: pointer;
}
.billing-switch button:hover { color: var(--text); }
.billing-switch button.is-active {
  background: var(--primary); color: var(--on-primary); font-weight: 600;
}
.plan-checkout { max-width: 440px; }
/* 两个 CTA 并排：立即订阅 + 开始试用 */
.plan-actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: auto; }
.plan-actions .btn { margin-top: 0; align-self: auto; }
.plan-checkout h2 { margin: 0 0 6px; }
.checkout-error { margin-top: 16px; color: var(--danger); font-size: 0.92rem; }
.checkout-error[hidden] { display: none; }

/* ---------- welcome ---------- */
.welcome-wrap { text-align: center; }
.welcome-mark {
  display: inline-grid; place-items: center; width: 56px; height: 56px; margin: 8px 0 18px;
  border-radius: 50%; background: var(--brand-soft); color: var(--ok); font-size: 1.6rem;
  border: 1px solid rgba(216, 180, 254, 0.26);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
}
.welcome-wrap .cta-row { justify-content: center; }

/* ---------- account: 订阅卡片 ---------- */
.plan-row {
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  flex-wrap: wrap; padding: 16px 18px; border: 1px solid var(--border); border-radius: var(--radius);
  background: var(--panel); margin: 22px 0 8px;
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  box-shadow: var(--shadow-glass), var(--shine);
}
.plan-row .plan-badge {
  display: inline-flex; align-items: center; gap: 8px; font-weight: 600; font-size: 0.92rem;
}
.plan-row .plan-badge.pro { color: var(--accent); }
.plan-row .plan-when { color: var(--muted); font-size: 0.86rem; }
.plan-row .plan-actions { display: flex; gap: 10px; flex-wrap: wrap; }
.plan-row .plan-actions .btn { font-size: 0.9rem; min-height: 40px; padding: 0 18px; }

.product-card {
  display: flex; flex-direction: column; gap: 6px; padding: 24px;
  background: var(--panel); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  box-shadow: var(--shadow-glass), var(--shine);
  transition: background 0.18s ease, border-color 0.18s ease, transform 0.18s ease;
}
.product-card:hover { text-decoration: none; background: var(--card); border-color: rgba(216, 180, 254, 0.34); transform: translateY(-2px); }
.product-card .kicker { margin-bottom: 4px; }
.product-tagline { color: var(--muted); font-size: 0.94rem; margin: 0 0 10px; }
.mini-list { margin: 0 0 14px; padding-left: 18px; color: var(--muted); font-size: 0.9rem; }
.mini-list li { margin-bottom: 6px; }
.product-link { margin-top: auto; color: var(--link); font-weight: 600; font-size: 0.9rem; }

.steps { list-style: none; padding: 0; margin: 0; display: grid; gap: 18px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
.steps li {
  display: flex; gap: 14px; background: var(--panel); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 20px;
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  box-shadow: var(--shadow-glass), var(--shine);
}
.step-num {
  flex: none; width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center;
  background: var(--brand-soft); color: var(--accent); font-weight: 700; font-size: 0.9rem;
  border: 1px solid rgba(216, 180, 254, 0.22);
}
.steps h3 { margin-bottom: 6px; }
.steps p { margin: 0; color: var(--muted); font-size: 0.92rem; }

.checklist { list-style: none; padding: 0; margin: 18px 0 0; display: grid; gap: 10px; }
.checklist li { position: relative; padding-left: 28px; color: var(--muted); }
.checklist + p.muted, .checklist + p.small { margin-top: 16px; }
.checklist li::before {
  content: "✓"; position: absolute; left: 0; top: 0; color: var(--ok); font-weight: 700;
}

.faq { display: grid; gap: 10px; max-width: 860px; }
.faq-item {
  background: var(--panel); border: 1px solid var(--border); border-radius: 12px; padding: 4px 18px;
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
}
.faq-item summary { cursor: pointer; padding: 14px 0; font-weight: 600; list-style: none; display: flex; justify-content: space-between; gap: 12px; }
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item summary::after { content: "+"; color: var(--accent); font-weight: 700; }
.faq-item[open] summary::after { content: "−"; }
.faq-answer { padding: 0 0 14px; }
.faq-answer p { margin: 0; color: var(--muted); }

.install-card { display: flex; flex-direction: column; gap: 10px; margin: 20px 0; max-width: 420px; }
.install-card .btn { align-self: flex-start; margin-top: auto; }

/* ---------- 账号页 ---------- */
.account-hero { padding: 72px 0 12px; }
.account-hero h1 { font-size: 2rem; margin: 0 0 10px; }
.account-hero .lede { margin: 0; max-width: 60ch; }
.account { padding: 8px 0 104px; }

/* 面板：窄卡片，一眼扫完 */
.panel {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 28px;
  max-width: 560px;
  backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.12);
}
.panel-title { margin: 0 0 8px; font-size: 1.15rem; font-weight: 600; }
.panel-lede { margin: 0 0 22px; color: var(--muted); font-size: 0.92rem; line-height: 1.65; }

/* 状态提示 */
.account-status { max-width: 560px; margin: 0 0 16px; padding: 11px 15px; border-radius: 12px;
  border: 1px solid var(--border); font-size: 0.9rem; background: var(--well); }
.account-status.ok { border-color: rgba(110, 231, 168, 0.42); color: var(--ok); }
.account-status.err { border-color: rgba(255, 180, 171, 0.42); color: var(--danger); }

/* 第三方登录按钮：玻璃底 + 品牌图标，与站点风格一致又保持识别度 */
.provider-btn { display: flex; align-items: center; justify-content: center; gap: 10px;
  width: 100%; padding: 12px 18px; font-weight: 600; }
.provider-btn:hover { border-color: rgba(216, 180, 254, 0.34); background: var(--card); }
.provider-icon { flex: 0 0 auto; }

/* 分隔线 */
.divider { display: flex; align-items: center; gap: 12px; margin: 20px 0;
  color: var(--muted); font-size: 0.82rem; }
.divider::before, .divider::after { content: ""; flex: 1; height: 1px; background: var(--hairline); }

/* 邮箱表单 */
.auth-form { margin: 0; }
.auth-form label { display: block; font-size: 0.82rem; color: var(--muted); margin-bottom: 8px; }
.auth-input-row { display: flex; gap: 10px; }
.auth-input-row input { flex: 1 1 auto; min-width: 0; padding: 12px 14px; border-radius: 12px;
  border: 1px solid var(--border); background: var(--well); color: inherit; font: inherit; }
.auth-input-row input::placeholder { color: #6b7791; }
.auth-input-row input:focus { outline: 2px solid var(--link); outline-offset: 1px; border-color: transparent; }
.auth-input-row .btn { flex: 0 0 auto; white-space: nowrap; }
.auth-note { margin: 14px 0 0; font-size: 0.86rem; color: var(--muted); }

/* 已登录：账号栏 */
.account-panel { max-width: 560px; }
.account-head { display: flex; align-items: center; gap: 14px; padding-bottom: 20px;
  border-bottom: 1px solid var(--hairline); }
.account-avatar { width: 44px; height: 44px; flex: 0 0 auto; border-radius: 12px;
  display: grid; place-items: center; font-weight: 700; font-size: 1.05rem; color: #fff;
  background: linear-gradient(135deg, #8b7cf6, #4f3fd0);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.28); }
.account-head-text { min-width: 0; }
.account-email { margin: 0; font-weight: 600; font-size: 1rem; overflow-wrap: anywhere; }
.account-since { margin: 2px 0 0; font-size: 0.82rem; color: var(--muted); }

/* 统计格 */
.account-stats { display: grid; grid-template-columns: 1fr 1fr;
  gap: 1px; margin: 0; background: var(--hairline); border-bottom: 1px solid var(--hairline); }
.account-stats > div { background: rgba(10, 16, 32, 0.55); padding: 16px 18px; }
.account-stats > div.wide { grid-column: 1 / -1; }
.account-stats dt { font-size: 0.74rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); }
.account-stats dd { margin: 6px 0 0; font-size: 1.1rem; font-weight: 600; }
.account-stats dd code { font-size: 0.86rem; font-weight: 400; color: var(--muted); }

/* 设备列表 */
.account-section { padding-top: 22px; }
.account-section h3 { margin: 0 0 12px; font-size: 0.9rem; color: var(--muted); font-weight: 600; }
.device-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
.device-row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px;
  padding: 11px 14px; border-radius: 12px; background: var(--well); border: 1px solid var(--border); }
.device-name { font-size: 0.92rem; }
.device-meta { font-size: 0.8rem; color: var(--muted); white-space: nowrap; }
.device-empty { padding: 14px; border-radius: 12px; border: 1px dashed var(--border);
  color: var(--muted); font-size: 0.88rem; }

/* API 密钥：给 agent 用的只读凭据 */
.keys-section { padding-top: 26px; border-top: 1px solid var(--hairline); margin-top: 22px; }
.keys-intro { margin: 0 0 14px; color: var(--muted); font-size: 0.86rem; line-height: 1.65; }
.keys-locked { margin: 0 0 14px; padding: 10px 13px; border-radius: 12px; font-size: 0.84rem;
  border: 1px solid rgba(216, 180, 254, 0.34); background: rgba(216, 180, 254, 0.1); color: var(--accent); }
.key-create-row { display: flex; gap: 10px; }
.key-create-row input { flex: 1 1 auto; min-width: 0; padding: 11px 13px; border-radius: 12px;
  border: 1px solid var(--border); background: var(--well); color: inherit; font: inherit; font-size: 0.9rem; }
.key-create-row input::placeholder { color: #6b7791; }
.key-create-row input:focus { outline: 2px solid var(--link); outline-offset: 1px; border-color: transparent; }
.key-create-row .btn { flex: 0 0 auto; white-space: nowrap; font-size: 0.9rem; }
.key-create-row input:disabled, .key-create-row .btn:disabled { opacity: 0.55; cursor: not-allowed; }

.key-created { margin-top: 14px; padding: 14px; border-radius: 12px;
  border: 1px solid rgba(110, 231, 168, 0.35); background: rgba(110, 231, 168, 0.08); }
.key-created code { display: block; font-size: 0.82rem; word-break: break-all; color: #d8fff0; }
.key-created .btn { margin-top: 10px; font-size: 0.84rem; min-height: 40px; padding: 0 18px; }
.key-created p { margin: 8px 0 0; }

.key-list { list-style: none; padding: 0; margin: 14px 0 0; display: grid; gap: 8px; }
.key-row { display: flex; justify-content: space-between; align-items: center; gap: 12px;
  padding: 11px 14px; border-radius: 12px; background: var(--well); border: 1px solid var(--border); }
.key-main { min-width: 0; display: grid; gap: 3px; }
.key-name { font-size: 0.92rem; overflow-wrap: anywhere; }
.key-meta { font-size: 0.78rem; color: var(--muted); overflow-wrap: anywhere; }
.key-revoke { flex: 0 0 auto; font-size: 0.8rem; padding: 6px 12px; min-height: 34px; }
.key-empty { padding: 14px; border-radius: 12px; border: 1px dashed var(--border);
  color: var(--muted); font-size: 0.88rem; }

.mcp-box { margin-top: 20px; padding: 16px; border-radius: 12px;
  border: 1px solid var(--border); background: var(--well); }
.mcp-label { margin: 0 0 8px; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); }
.mcp-url { display: block; font-size: 0.84rem; word-break: break-all; color: var(--link); }
.mcp-box .small { margin: 8px 0 0; }
.mcp-config { margin-top: 10px; }
.mcp-config summary { cursor: pointer; font-size: 0.84rem; color: var(--muted); }
.mcp-config summary:hover { color: var(--text); }
.mcp-config pre { margin: 10px 0 0; padding: 12px; border-radius: 12px; overflow-x: auto;
  background: rgba(6, 10, 20, 0.72); border: 1px solid var(--border);
  font-size: 0.78rem; line-height: 1.55; }

/* 操作区 */
.account-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px;
  padding-top: 20px; border-top: 1px solid var(--hairline); }
.account-actions .btn { font-size: 0.9rem; min-height: 42px; padding: 0 20px; }

/* 危险操作：默认折叠，避免误触 */
.danger-zone { margin-top: 20px; padding-top: 18px; border-top: 1px solid var(--hairline); }
.danger-zone summary { cursor: pointer; font-size: 0.86rem; color: var(--muted); }
.danger-zone summary:hover { color: var(--danger); }
.danger-body { margin-top: 12px; }
.danger-body .btn { margin-top: 10px; font-size: 0.88rem; min-height: 42px; padding: 0 20px; }

.account-back { margin-top: 28px; font-size: 0.88rem; }

@media (max-width: 560px) {
  .panel { padding: 22px; }
  .account-stats { grid-template-columns: 1fr; }
  .account-stats > div.wide { grid-column: auto; }
  .auth-input-row { flex-direction: column; }
  .auth-input-row .btn { width: 100%; }
  .key-create-row { flex-direction: column; }
  .key-create-row .btn { width: 100%; }
  .key-row { flex-direction: column; align-items: flex-start; }
}

.cta-band { padding: 80px 0; text-align: center; background: var(--bg-soft); border-top: 1px solid var(--hairline); }
.cta-band p { color: var(--muted); max-width: 60ch; margin: 0 auto; }
.cta-band .cta-row { justify-content: center; }

.crumbs { padding: 20px 24px 0; max-width: var(--wrap); margin: 0 auto; color: var(--muted); font-size: 0.86rem; display: flex; gap: 8px; }
.crumbs a { color: var(--muted); }

/* ---------- prose (privacy policy) ---------- */
.prose { max-width: 78ch; }
.prose > h2:first-child { margin-top: 0; }
.prose h2 { font-size: 1.35rem; margin-top: 2em; }
.prose h3 { margin-top: 1.6em; }
.prose p, .prose li { color: var(--muted); }
.prose ul, .prose ol { padding-left: 1.3em; }
.prose code { background: var(--well); padding: 1px 6px; border-radius: 6px; font-size: 0.9em; color: var(--link); }
.prose table { width: 100%; border-collapse: collapse; margin: 18px 0; font-size: 0.92rem; }
.prose th, .prose td { border: 1px solid var(--border); padding: 10px 12px; text-align: left; color: var(--muted); }
.prose th { background: var(--panel); color: var(--text); }
.prose hr { border: none; border-top: 1px solid var(--hairline); margin: 28px 0; }

/* ---------- illustrations ---------- */
.art-svg { width: 100%; max-width: 520px; height: auto; }
.a-panel { fill: rgba(255, 255, 255, 0.09); stroke: rgba(255, 255, 255, 0.16); stroke-width: 1.5; }
.a-popup { fill: rgba(255, 255, 255, 0.13); }
.a-card { fill: rgba(255, 255, 255, 0.06); }
.a-line { fill: rgba(255, 255, 255, 0.16); }
.a-dot { fill: rgba(255, 255, 255, 0.16); }
.a-text { fill: rgba(255, 255, 255, 0.24); }
.a-text-dim { fill: rgba(255, 255, 255, 0.14); }
.a-highlight { fill: rgba(216, 180, 254, 0.22); }
.a-brand { fill: var(--brand); }
.a-text-on-brand { fill: #0a1020; }

/* ---------- footer ---------- */
.site-footer { border-top: 1px solid var(--hairline); padding: 56px 0 24px; background: var(--bg-soft); }
.footer-grid { display: grid; grid-template-columns: 1.6fr repeat(3, 1fr); gap: 32px; }
.footer-brand p { color: var(--muted); max-width: 32ch; margin: 10px 0 6px; }
.footer-title { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin-bottom: 12px; font-weight: 600; }
.site-footer ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
.site-footer a { color: var(--muted); font-size: 0.94rem; }
.site-footer a:hover { color: var(--text); }
.footer-bottom { margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--hairline); color: var(--muted); font-size: 0.82rem; }
.muted { color: var(--muted); }
.small { font-size: 0.86rem; }

@media (max-width: 860px) {
  .hero-grid { grid-template-columns: 1fr; gap: 32px; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .site-nav { gap: 12px; }
}

/* 小屏：导航换行到第二行，否则它的最小内容宽度会把页面撑出视口 */
@media (max-width: 760px) {
  .header-inner { flex-wrap: wrap; row-gap: 6px; padding-top: 10px; padding-bottom: 10px; }
  .site-nav { width: 100%; justify-content: flex-start; gap: 8px 16px; }
  .brand-name { font-size: 1rem; }
  .lede { max-width: none; }
  .stats { gap: 28px 32px; }
  /* 手机上没有横向余量：长语言（德/俄）的说明留给折行，别撑破视口 */
  .stats span { white-space: normal; max-width: 24ch; }
  .section { padding: 56px 0; }
}

@media (max-width: 560px) {
  .footer-grid { grid-template-columns: 1fr; }
  .stats { gap: 24px; }
  .hero { padding: 48px 0 32px; }
  .hero.home { padding: 56px 0 40px; }
  .cta-band { padding: 56px 0; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .aurora i { filter: blur(70px); }
  .product-card, .card, .btn { transition: none; }
}
`;
