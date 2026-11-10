// 全站样式。手动写比起引入框架更适合这种纯静态的宣传站：一个文件、无 JS、可缓存。

export const css = `
:root {
  --bg: #0d0d14;
  --bg-soft: #14141f;
  --panel: #1a1a2b;
  --card: #202034;
  --border: #2c2c44;
  --text: #ececf3;
  --muted: #9a9ab0;
  --brand: #8b7cf6;
  --brand-strong: #6f5cf0;
  --brand-soft: rgba(139, 124, 246, 0.14);
  --ok: #6ee7a8;
  --radius: 14px;
  --wrap: 1120px;
}

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  overflow-x: hidden;
  background: radial-gradient(1200px 600px at 70% -10%, rgba(111, 92, 240, 0.16), transparent 60%), var(--bg);
  color: var(--text);
  font: 16px/1.65 -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}

a { color: var(--brand); text-decoration: none; }
a:hover { text-decoration: underline; }

h1, h2, h3 { line-height: 1.2; margin: 0 0 0.5em; letter-spacing: -0.02em; }
h1 { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 800; }
h2 { font-size: clamp(1.5rem, 3vw, 2.1rem); font-weight: 700; }
h3 { font-size: 1.05rem; font-weight: 650; }
p { margin: 0 0 1em; }

.wrap { width: 100%; max-width: var(--wrap); margin: 0 auto; padding: 0 24px; }

.skip {
  position: absolute; left: -9999px; top: 0; background: var(--brand); color: #fff;
  padding: 10px 16px; border-radius: 0 0 8px 0; z-index: 20;
}
.skip:focus { left: 0; }

/* ---------- header ---------- */
.site-header {
  position: sticky; top: 0; z-index: 10;
  backdrop-filter: blur(12px);
  background: rgba(13, 13, 20, 0.72);
  border-bottom: 1px solid var(--border);
}
.header-inner { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 64px; }
.brand { display: inline-flex; align-items: center; gap: 10px; color: var(--text); font-weight: 700; }
.brand:hover { text-decoration: none; }
.brand-mark {
  display: inline-grid; place-items: center; width: 30px; height: 30px; border-radius: 9px;
  background: linear-gradient(140deg, var(--brand), #4f3fd0); color: #fff; font-weight: 800;
}
.brand-name { font-size: 1.05rem; }
.site-nav { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
.site-nav a { color: var(--muted); font-size: 0.94rem; }
.site-nav a:hover, .site-nav a[aria-current="page"] { color: var(--text); text-decoration: none; }
.site-nav a[aria-current="page"] { color: var(--brand); }
.nav-github { color: var(--muted); }

.lang { position: relative; }
.lang summary {
  cursor: pointer; list-style: none; color: var(--muted); font-size: 0.94rem;
  border: 1px solid var(--border); border-radius: 999px; padding: 4px 12px;
}
.lang summary::-webkit-details-marker { display: none; }
.lang summary:hover { color: var(--text); }
.lang-menu {
  position: absolute; right: 0; top: calc(100% + 8px); background: var(--panel);
  border: 1px solid var(--border); border-radius: 10px; padding: 6px; min-width: 140px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
}
.lang-menu a { display: block; padding: 6px 10px; border-radius: 6px; color: var(--text); }
.lang-menu a:hover { background: var(--brand-soft); text-decoration: none; }

/* ---------- hero ---------- */
.hero { padding: 72px 0 56px; }
.hero.home { text-align: center; padding: 96px 0 64px; }
.hero.home .lede { max-width: 720px; margin: 0 auto 28px; }
.badge {
  display: inline-block; margin: 0 0 20px; padding: 6px 14px; border-radius: 999px;
  background: var(--brand-soft); color: var(--brand); font-size: 0.82rem; font-weight: 600;
  border: 1px solid rgba(139, 124, 246, 0.3);
}
.kicker {
  margin: 0 0 12px; color: var(--brand); font-size: 0.82rem; font-weight: 700;
  letter-spacing: 0.08em; text-transform: uppercase;
}
.lede { font-size: clamp(1.05rem, 2vw, 1.3rem); color: var(--muted); max-width: 62ch; }
.body-text { color: var(--muted); max-width: 68ch; }

.hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center; }
.hero-art { display: flex; justify-content: center; }
.hero.plain { padding-bottom: 24px; }

/* ---------- buttons ---------- */
.cta-row { display: flex; gap: 12px; flex-wrap: wrap; margin: 26px 0 8px; }
.hero.home .cta-row { justify-content: center; }
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 11px 20px; border-radius: 10px; border: 1px solid var(--border);
  background: var(--panel); color: var(--text); font-weight: 600; font-size: 0.95rem;
}
.btn:hover { text-decoration: none; border-color: var(--brand); }
.btn.primary { background: linear-gradient(140deg, var(--brand), var(--brand-strong)); border-color: transparent; color: #fff; }
.btn.primary:hover { filter: brightness(1.08); }

/* ---------- stats ---------- */
.stats { display: flex; gap: 40px; justify-content: center; list-style: none; padding: 0; margin: 40px 0 0; flex-wrap: wrap; }
.stats li { display: flex; flex-direction: column; align-items: center; }
.stats strong { font-size: 1.9rem; font-weight: 800; color: var(--text); }
.stats span { color: var(--muted); font-size: 0.86rem; max-width: 20ch; text-align: center; }

/* ---------- sections ---------- */
.section { padding: 64px 0; border-top: 1px solid var(--border); }
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
  padding: 22px;
}
.card h3 { margin-bottom: 8px; }
.card p { margin: 0; color: var(--muted); font-size: 0.94rem; }

.product-card {
  display: flex; flex-direction: column; gap: 6px; padding: 24px;
  background: linear-gradient(180deg, var(--panel), var(--bg-soft));
  border: 1px solid var(--border); border-radius: var(--radius); color: var(--text);
  transition: border-color 0.15s ease, transform 0.15s ease;
}
.product-card:hover { text-decoration: none; border-color: var(--brand); transform: translateY(-2px); }
.product-card .kicker { margin-bottom: 4px; }
.product-tagline { color: var(--muted); font-size: 0.94rem; margin: 0 0 10px; }
.mini-list { margin: 0 0 14px; padding-left: 18px; color: var(--muted); font-size: 0.9rem; }
.mini-list li { margin-bottom: 6px; }
.product-link { margin-top: auto; color: var(--brand); font-weight: 600; font-size: 0.9rem; }

.steps { list-style: none; padding: 0; margin: 0; display: grid; gap: 18px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
.steps li { display: flex; gap: 14px; background: var(--panel); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; }
.step-num { flex: none; width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; background: var(--brand-soft); color: var(--brand); font-weight: 700; font-size: 0.9rem; }
.steps h3 { margin-bottom: 6px; }
.steps p { margin: 0; color: var(--muted); font-size: 0.92rem; }

.checklist { list-style: none; padding: 0; margin: 18px 0 0; display: grid; gap: 10px; }
.checklist li { position: relative; padding-left: 28px; color: var(--muted); }
.checklist + p.muted, .checklist + p.small { margin-top: 16px; }
.checklist li::before {
  content: "✓"; position: absolute; left: 0; top: 0; color: var(--ok); font-weight: 700;
}

.faq { display: grid; gap: 10px; max-width: 860px; }
.faq-item { background: var(--panel); border: 1px solid var(--border); border-radius: 12px; padding: 4px 18px; }
.faq-item summary { cursor: pointer; padding: 14px 0; font-weight: 600; list-style: none; display: flex; justify-content: space-between; gap: 12px; }
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item summary::after { content: "+"; color: var(--brand); font-weight: 700; }
.faq-item[open] summary::after { content: "−"; }
.faq-answer { padding: 0 0 14px; }
.faq-answer p { margin: 0; color: var(--muted); }

.install-grid { display: grid; gap: 18px; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); margin: 20px 0; }
.install-card { display: flex; flex-direction: column; gap: 10px; }
.install-card .btn { align-self: flex-start; margin-top: auto; }

.cta-band { padding: 72px 0; text-align: center; background: linear-gradient(180deg, var(--bg-soft), var(--bg)); border-top: 1px solid var(--border); }
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
.prose code { background: var(--card); padding: 1px 6px; border-radius: 5px; font-size: 0.9em; }
.prose table { width: 100%; border-collapse: collapse; margin: 18px 0; font-size: 0.92rem; }
.prose th, .prose td { border: 1px solid var(--border); padding: 10px 12px; text-align: left; color: var(--muted); }
.prose th { background: var(--panel); color: var(--text); }
.prose hr { border: none; border-top: 1px solid var(--border); margin: 28px 0; }

/* ---------- illustrations ---------- */
.art-svg { width: 100%; max-width: 520px; height: auto; }
.a-panel { fill: var(--panel); stroke: var(--border); stroke-width: 1.5; }
.a-popup { fill: var(--card); }
.a-card { fill: var(--card); }
.a-line { fill: var(--border); }
.a-dot { fill: var(--border); }
.a-text { fill: #3a3a58; }
.a-text-dim { fill: #2f2f4a; }
.a-highlight { fill: rgba(139, 124, 246, 0.22); }
.a-brand { fill: var(--brand); }
.a-text-on-brand { fill: #14141f; }

/* ---------- footer ---------- */
.site-footer { border-top: 1px solid var(--border); padding: 56px 0 24px; background: var(--bg-soft); }
.footer-grid { display: grid; grid-template-columns: 1.6fr repeat(3, 1fr); gap: 32px; }
.footer-brand p { color: var(--muted); max-width: 32ch; margin: 10px 0 6px; }
.footer-title { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin-bottom: 12px; }
.site-footer ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
.site-footer a { color: var(--muted); font-size: 0.94rem; }
.site-footer a:hover { color: var(--text); }
.footer-bottom { margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--border); color: var(--muted); font-size: 0.82rem; }
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
}

@media (max-width: 560px) {
  .footer-grid { grid-template-columns: 1fr; }
  .stats { gap: 24px; }
  .hero { padding: 48px 0 32px; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .product-card { transition: none; }
}
`;
