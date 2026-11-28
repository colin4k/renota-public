// 全站样式。手动写比起引入框架更适合这种纯静态的宣传站：一个文件、无 JS、可缓存。
//
// 视觉契约在 DESIGN.md（Ink & Margin）。这里是它的实现：
// 墨色台阶 + 一条琥珀强调 + 发丝线，没有模糊、没有渐变、没有光晕。
// 改视觉先改 DESIGN.md 再改这里，`npm run design:lint` 把关。

export const css = `
/* ---------- 字体：自托管子集 ----------
   依赖用户机器装没装 Inter 等于放弃排版控制。四个拉丁/西里尔子集按 unicode-range
   分片，只有页面真的用到的字符才会下载；CJK 仍走系统字体链（见下面的 html:lang 段）。 */
@font-face {
  font-family: "Inter"; font-style: normal; font-weight: 400 600; font-display: swap;
  src: url("/assets/fonts/inter-latin.woff2") format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: "Inter"; font-style: normal; font-weight: 400 600; font-display: swap;
  src: url("/assets/fonts/inter-latin-ext.woff2") format("woff2");
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
@font-face {
  font-family: "Inter"; font-style: normal; font-weight: 400 600; font-display: swap;
  src: url("/assets/fonts/inter-cyrillic.woff2") format("woff2");
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
@font-face {
  font-family: "Inter"; font-style: normal; font-weight: 400 600; font-display: swap;
  src: url("/assets/fonts/inter-cyrillic-ext.woff2") format("woff2");
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
@font-face {
  font-family: "JetBrains Mono"; font-style: normal; font-weight: 400 500; font-display: swap;
  src: url("/assets/fonts/jetbrains-mono-latin.woff2") format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

:root {
  /* 墨：全部表面与文字，不带色相 */
  --bg: #0b0c0f;
  --surface-low: #12141a;
  --surface: #171a21;
  --surface-2: #1f232b;
  --well: #06070a;
  --hairline: rgba(238, 240, 245, 0.09);
  --border: rgba(238, 240, 245, 0.14);
  --border-strong: rgba(238, 240, 245, 0.20);
  --text: #eef0f5;
  --text-2: #b7bfcd;
  --muted: #838b9e;
  --link: #b9c0cf;

  /* 一笔琥珀：唯一强调色，占比只有几个百分点 */
  --accent: #e0a24a;
  --accent-line: rgba(224, 162, 74, 0.42);
  --accent-soft: rgba(224, 162, 74, 0.12);
  --marker: rgba(224, 162, 74, 0.52);
  --link-line: rgba(224, 162, 74, 0.45);

  --primary: #eef0f5;
  --on-primary: #0c0d10;
  --ok: #4cc38a;
  --danger: #ff8b84;

  /* 配方 */
  --radius-sm: 6px;
  --radius: 10px;
  --radius-card: 12px;
  --radius-panel: 16px;
  --wrap: 1120px;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --t-fast: 140ms;
  --t-base: 180ms;
  --t-slow: 320ms;

  /* 图标：一套 16px / 1.5 描边的线条，用 mask 上色，永远跟随 currentColor */
  --icon-check: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E");
  --icon-plus: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 5v14M5 12h14'/%3E%3C/svg%3E");
  --icon-minus: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12h14'/%3E%3C/svg%3E");
  --icon-arrow: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12h14M13 6l6 6-6 6'/%3E%3C/svg%3E");
  --icon-chevron: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  --icon-arrow-left: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19 12H5M11 18l-6-6 6-6'/%3E%3C/svg%3E");
  --icon-menu: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 7h16M4 12h16M4 17h16'/%3E%3C/svg%3E");
  --icon-message: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 14a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z'/%3E%3C/svg%3E");
  --icon-search: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cpath d='M20 20l-3.6-3.6'/%3E%3C/svg%3E");
  --icon-globe: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='9'/%3E%3Cpath d='M3 12h18M12 3c2.5 2.4 2.5 15.6 0 18M12 3c-2.5 2.4-2.5 15.6 0 18'/%3E%3C/svg%3E");
  --icon-link: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9 15l6-6'/%3E%3Cpath d='M8.5 12.5l-2 2a3.5 3.5 0 0 0 5 5l2-2'/%3E%3Cpath d='M15.5 11.5l2-2a3.5 3.5 0 0 0-5-5l-2 2'/%3E%3C/svg%3E");
  --icon-pen: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 20h9'/%3E%3Cpath d='M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z'/%3E%3C/svg%3E");
}

* { box-sizing: border-box; }

html { -webkit-text-size-adjust: 100%; }

body {
  margin: 0;
  overflow-x: hidden;
  background: var(--bg);
  color: var(--text);
  font: 400 16px/1.65 Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
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

/* 链接：纸白字 + 一道琥珀下划线。这样「可点」有明确语义，又不必让整屏变彩色。 */
a {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: var(--link-line);
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  transition: text-decoration-color var(--t-fast) var(--ease), color var(--t-fast) var(--ease);
}
a:hover { text-decoration-color: var(--accent); }

:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 2px; }

/* 用 pretty 不用 balance：balance 为求两行等长会割开中文词（「有用的」断成「有用」「的」），
   pretty 只在行末留孤字时收敛，中英文都安全。 */
/* 每页只有最大的那个标题是琥珀色：它是品牌的颜色记忆点。
   h2 / h3 保持纸白 —— 如果每个标题都强调，就等于没有强调。 */
h1, h2, h3 { margin: 0 0 0.5em; font-weight: 500; line-height: 1.2; text-wrap: pretty; }
h1 { color: var(--accent); }
h1 { font-size: clamp(1.875rem, 3vw, 2.25rem); line-height: 1.2; letter-spacing: -0.01em; }
/* 只有首页那句主张用大字号，其余页面的 h1 是页面标题，28–36 就够 */
.hero.home h1 { font-size: clamp(2rem, 3.4vw, 3rem); line-height: 1.1; letter-spacing: -0.02em; }
/* CJK 标题：汉字的信息密度比拉丁高，同字号看起来更大；负字距在方块字上会挤，
   行高给到 1.35 才不显得密。日文假名与韩文谚文字面更矮，同样取这一档。 */
html:lang(zh-CN) h1, html:lang(zh-TW) h1, html:lang(ja) h1, html:lang(ko) h1 { letter-spacing: 0; line-height: 1.35; }
/* 中文标题再小一档：一是方块的视觉重量比拉丁大，二是 505px 的左栏里，
   44px 会把「留下有用的」断成「留下有用 / 的，」，38px 正好落在标点后。 */
html:lang(zh-CN) .hero.home h1, html:lang(zh-TW) .hero.home h1,
html:lang(ja) .hero.home h1, html:lang(ko) .hero.home h1 { font-size: clamp(1.75rem, 2.8vw, 2.375rem); }
h2 { font-size: clamp(1.5rem, 2.6vw, 2rem); line-height: 1.25; letter-spacing: -0.01em; }
h3 { font-size: 1.125rem; line-height: 1.4; }
p { margin: 0 0 1em; }

code, pre, kbd { font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace; }

.wrap { width: 100%; max-width: var(--wrap); margin: 0 auto; padding: 0 24px; }

.skip {
  position: absolute; left: -9999px; top: 0; background: var(--primary); color: var(--on-primary);
  padding: 12px 16px; border-radius: 0 0 var(--radius) 0; z-index: 20; font-weight: 500;
}
.skip:focus { left: 0; }

/* ---------- header ---------- */
/* 导航是最沉默的部分：实色底 + 一条发丝线，没有模糊、没有半透明叠色。 */
.site-header {
  position: sticky; top: 0; z-index: 10;
  background: var(--bg);
  border-bottom: 1px solid var(--hairline);
}
.header-inner { display: flex; align-items: center; gap: 24px; min-height: 64px; }
.brand { display: inline-flex; align-items: center; gap: 12px; color: var(--text); font-weight: 500; text-decoration: none; }
.brand:hover { text-decoration: none; }
/* 标记：1px 描边的方片 + 实心琥珀字母。没有渐变、没有内高光、没有球。 */
.brand-mark {
  display: inline-grid; place-items: center; width: 28px; height: 28px; border-radius: var(--radius-sm);
  border: 1px solid var(--accent-line); color: var(--accent);
  font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 0.875rem; font-weight: 500; line-height: 1;
}
.brand-name { font-size: 1rem; letter-spacing: -0.01em; }
.site-nav { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; margin-left: auto; }
.header-actions { display: flex; align-items: center; gap: 12px; position: relative; }
.site-nav a { color: var(--text-2); font-size: 1rem; text-decoration: none; transition: color var(--t-fast) var(--ease); }
.site-nav a:hover { color: var(--text); }
/* 当前项：一段 2px 琥珀下划线。全站唯一的「你在这里」。 */
.site-nav a[aria-current="page"] { color: var(--text); box-shadow: inset 0 -2px 0 var(--accent); padding-bottom: 2px; }

/* 窄屏折叠菜单：同一组链接渲染两次，桌面显示 .site-nav、移动端显示这里，
   两态互斥，纯 CSS，不加客户端 JS。 */
.nav-menu { display: none; }
.nav-menu summary {
  display: inline-flex; align-items: center; justify-content: center;
  width: 36px; height: 32px; cursor: pointer; list-style: none;
  border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-2);
  transition: border-color var(--t-fast) var(--ease), color var(--t-fast) var(--ease);
}
.nav-menu summary::-webkit-details-marker { display: none; }
.nav-menu summary:hover { color: var(--text); border-color: var(--border-strong); }
.nav-menu-icon {
  width: 16px; height: 16px; background-color: currentColor;
  -webkit-mask: var(--icon-menu) center / 16px 16px no-repeat;
  mask: var(--icon-menu) center / 16px 16px no-repeat;
}
.nav-menu-panel {
  position: absolute; right: 0; top: calc(100% + 8px); z-index: 5;
  display: grid; gap: 2px; min-width: 200px; padding: 4px;
  background: var(--surface-2); border: 1px solid var(--border); border-radius: var(--radius-card);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
}
.nav-menu-panel a {
  padding: 8px 10px; border-radius: var(--radius-sm); color: var(--text-2);
  font-size: 0.9375rem; text-decoration: none;
}
.nav-menu-panel a:hover { background: var(--surface-low); color: var(--text); }
.nav-menu-panel a[aria-current="page"] { color: var(--text); box-shadow: inset 2px 0 0 var(--accent); }

.lang { position: relative; }
.lang summary {
  display: inline-flex; align-items: center; gap: 6px;
  cursor: pointer; list-style: none; color: var(--text-2); font-size: 0.875rem;
  border: 1px solid var(--border); border-radius: var(--radius); padding: 4px 10px;
  transition: border-color var(--t-fast) var(--ease), color var(--t-fast) var(--ease);
}
.lang summary::-webkit-details-marker { display: none; }
.lang summary::after {
  content: ""; width: 12px; height: 12px; background-color: currentColor;
  -webkit-mask: var(--icon-chevron) center / 12px 12px no-repeat;
  mask: var(--icon-chevron) center / 12px 12px no-repeat;
}
.lang summary:hover { color: var(--text); border-color: var(--border-strong); }
.lang-menu {
  position: absolute; right: 0; top: calc(100% + 8px); background: var(--surface-2);
  border: 1px solid var(--border); border-radius: var(--radius-card); padding: 4px; min-width: 150px;
  /* 十种语言一列排下来比菜单还高：限高并让它自己滚，别把页面撑出滚动条。 */
  max-height: min(70vh, 420px); overflow-y: auto;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
}
.lang-menu a { display: block; padding: 8px 10px; border-radius: var(--radius-sm); color: var(--text); text-decoration: none; }
.lang-menu a:hover { background: var(--surface-low); }

/* ---------- hero ---------- */
.hero { padding: 80px 0 32px; }
/* 产品页的预览卡同样挂在窗口右下角外，下沿要留够，否则会压到下一个区块 */
.hero.product { padding-bottom: 140px; }
/* 首屏是左文右预览的非对称分栏：左边一句主张加两个动作，右边那台阅读窗口
   撑起整屏，从底边溢出一点，页面因此邀请滚动。 */
.hero.home { text-align: left; padding: 96px 0 140px; }
.hero.home .lede { max-width: 42ch; font-size: 1.0625rem; line-height: 1.75; margin: 0 0 24px; }
.hero-split { display: grid; grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr); gap: 56px; align-items: center; }
.hero.home .cta-row { justify-content: flex-start; }
.hero.home .stats {
  display: grid; grid-template-columns: minmax(0, 1fr);
  gap: 8px; justify-content: initial; margin-top: 40px;
}
.hero.home .stats li { flex-direction: row; align-items: baseline; gap: 12px; }
.hero.home .stats strong { font-size: 1rem; min-width: 24px; }
.hero.home .stats span { text-align: left; white-space: normal; }
/* 旧版的胶囊定位词去掉，只留一行小字：不发光，也不与主行动争注意力。 */
.badge { display: block; margin: 0 0 16px; color: var(--muted); font-size: 0.75rem; font-weight: 500; }
.kicker { margin: 0 0 8px; color: var(--muted); font-size: 0.75rem; font-weight: 500; }
.lede { font-size: clamp(1rem, 1.6vw, 1.125rem); line-height: 1.7; color: var(--text); max-width: 62ch; text-wrap: pretty; }
.body-text { color: var(--text); max-width: 68ch; }

.hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center; }
.hero-art { display: flex; justify-content: center; }
.hero.plain { padding-bottom: 24px; }


/* ---------- 阅读预览：这个站唯一的「那一刻」 ---------- */
/* 一页正文、一道琥珀划线、一张浮出来的回答卡、一个连回原文的引用角标。
   全站只有这里和产品页有它，别处不再重复。 */
.hero-visual { min-width: 0; }
.preview { position: relative; margin: 0; }
.preview-window {
  position: relative;
  background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-panel);
  overflow: hidden;
  box-shadow: 0 28px 56px -32px rgba(0, 0, 0, 0.9);
}
.preview-bar { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-bottom: 1px solid var(--hairline); }
.preview-dots { display: inline-flex; gap: 6px; }
.preview-dots i { width: 8px; height: 8px; border-radius: 50%; background: var(--border-strong); }
.preview-book { font-size: 0.8125rem; color: var(--muted); }
.preview-page {
  padding: 44px 36px 92px; display: flex; flex-direction: column; justify-content: flex-start;
}
.preview-lead { font-size: 1.0625rem; line-height: 1.9; color: var(--text); margin: 0 0 10px; max-width: 44ch; }
.preview-marked { font-size: 1.125rem; line-height: 1.9; color: var(--text); margin: 0; max-width: 44ch; }
/* 划线不是背景色块：只在字的下 40% 铺一道琥珀，换行处左右各留一点，像笔尖走过。 */
/* 一道真正的笔迹：厚 46% 字高，压在基线上方，只从字的下半部穿过。
   换行处 clone 让每一行都有自己的那一段。 */
.preview-marked span {
  background-image: linear-gradient(var(--marker), var(--marker));
  background-size: 100% 46%;
  background-position: 0 88%;
  background-repeat: no-repeat;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}
/* 引用角标是签名：一枚实心琥珀小方块，数字用墨色。它是页面上最小的实体色块，
   也是唯一允许出现在正文行内的高饱和元素。 */
.cite {
  display: inline-grid; place-items: center; min-width: 13px; height: 13px; padding: 0 2px;
  vertical-align: super; margin-left: 3px;
  background: var(--accent); color: #1a1206;
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 0.625rem; line-height: 1; border-radius: 3px;
}
.preview-card {
  position: absolute; right: -12px; bottom: -120px; width: 340px;
  background: var(--surface-2); border: 1px solid var(--border); border-radius: var(--radius-card);
  padding: 20px; box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.85);
}
.preview-prompt {
  display: flex; align-items: baseline; justify-content: space-between; gap: 12px;
  margin: 0 0 8px; font-size: 0.75rem; color: var(--muted);
}
.preview-mark {
  display: inline-grid; place-items: center; width: 16px; height: 16px; border-radius: 4px;
  background: var(--accent); color: #1a1206;
  font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 0.625rem; line-height: 1;
}
.preview-answer { margin: 0 0 12px; font-size: 0.9375rem; line-height: 1.6; color: var(--text); }
.preview-source {
  display: flex; align-items: baseline; justify-content: space-between; gap: 12px;
  margin: 0; padding-top: 12px; border-top: 1px solid var(--hairline);
  font-size: 0.75rem; color: var(--muted);
}

/* chrome：窗口下多一条动作栏，第一个动作（解释）是选中的那个 */
.preview-toolbar { display: flex; gap: 4px; padding: 8px 12px; border-bottom: 1px solid var(--hairline); }
.preview-tool { display: grid; place-items: center; width: 32px; height: 32px; border-radius: var(--radius-sm); }
.preview-tool i { width: 16px; height: 16px; background-color: var(--muted); }
.preview-tool.is-on { background: rgba(224, 162, 74, 0.2); }
.preview-tool.is-on i { background-color: var(--accent); }
.pv-message { -webkit-mask: var(--icon-message) center / 16px 16px no-repeat; mask: var(--icon-message) center / 16px 16px no-repeat; }
.pv-search { -webkit-mask: var(--icon-search) center / 16px 16px no-repeat; mask: var(--icon-search) center / 16px 16px no-repeat; }
.pv-globe { -webkit-mask: var(--icon-globe) center / 16px 16px no-repeat; mask: var(--icon-globe) center / 16px 16px no-repeat; }
.pv-pen { -webkit-mask: var(--icon-pen) center / 16px 16px no-repeat; mask: var(--icon-pen) center / 16px 16px no-repeat; }
.pv-link { -webkit-mask: var(--icon-link) center / 16px 16px no-repeat; mask: var(--icon-link) center / 16px 16px no-repeat; }

/* zotero：书脊标签 + 回答卡停在正文右侧 */
.preview-spine {
  display: inline-block; align-self: flex-start; margin-bottom: 16px;
  font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 0.6875rem; letter-spacing: 0.04em;
  color: var(--muted); border: 1px solid var(--hairline); border-radius: var(--radius-sm); padding: 2px 6px;
}
.preview--zotero .preview-card { right: 0; top: auto; bottom: -120px; transform: none; }

/* android：手机框 + 悬浮球，回答卡落在框下方 */
.preview--android { max-width: 320px; margin: 0 auto; padding-bottom: 0; }
/* 手机要有手机的重量：一圈 6px 的机身，不是又一个圆角窗口 */
.preview--android .preview-window { border: 6px solid var(--surface-2); border-radius: 32px; }
/* Android 的回答面板落在手机下方、不溢出，所以这个页面不需要那 140px 的下沿 */
.hero.product:has(.preview--android) { padding-bottom: 32px; }
.preview--android .preview-page { min-height: 300px; padding: 32px 24px 72px; }
.preview--android .preview-lead { font-size: 0.9375rem; }
.preview--android .preview-card { position: static; width: 100%; margin-top: 16px; transform: none; }
.preview-ball {
  position: absolute; right: 16px; bottom: 16px; display: grid; place-items: center;
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--surface-2); border: 1px solid var(--accent-line); color: var(--accent);
  font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 0.875rem;
}

/* ---------- buttons ---------- */
.cta-row { display: flex; gap: 12px; flex-wrap: wrap; margin: 24px 0 0; }
.hero.home .cta-row { justify-content: center; }
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 44px; padding: 0 20px; border-radius: var(--radius); border: 1px solid var(--border);
  background: var(--surface-low); color: var(--text);
  font-weight: 500; font-size: 0.9375rem; text-decoration: none;
  transition: background-color var(--t-fast) var(--ease), border-color var(--t-fast) var(--ease),
    color var(--t-fast) var(--ease);
}
.btn:hover { text-decoration: none; background: var(--surface-2); border-color: var(--border-strong); }
.btn:active { transform: scale(0.98); }
.btn.primary { background: var(--accent); border-color: transparent; color: #1a1206; }
.btn.primary:hover { background: #c98d38; }
/* 还是按钮的样子，但没有链接：不给 hover 反馈，光标也不变手型 */
.btn-static, .btn-static:hover { cursor: default; }
.btn-static:hover { background: var(--surface-low); border-color: var(--border); }
.btn.primary.btn-static:hover { background: var(--accent); }

/* ---------- stats ---------- */
/* 三项指标各占一条，数字在上、说明在下。
   说明不设 max-width：十种语言的长短差一倍以上，硬限宽会把中文/德文/俄文断成两行，
   而折行后三个色块的底边就对不齐了。整条换行交给 flex-wrap。 */
.stats { display: flex; gap: 48px; justify-content: center; list-style: none; padding: 0; margin: 40px 0 0; flex-wrap: wrap; }
.stats li { display: flex; flex-direction: column; align-items: center; }
.stats strong {
  font-size: 1.5rem; font-weight: 500; color: var(--text); line-height: 1.2;
  font-variant-numeric: tabular-nums;
}
.stats span { color: var(--muted); font-size: 0.8125rem; text-align: center; white-space: nowrap; }

/* ---------- sections ---------- */
/* 区块之间不用分割线：靠留白与两处整块台阶分组。 */
.section { padding: 96px 0; }
.section.alt { background: var(--surface-low); }
.section-lede { color: var(--text); max-width: 70ch; margin-bottom: 32px; }

.grid { display: grid; gap: 16px; }
.grid.cards { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
.grid.products { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
.grid.steps { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); margin: 16px 0 0; }
/* 产品三卡给节奏：首推的 Chrome 卡更宽，不是三块等宽的模板块。 */
@media (min-width: 900px) {
  .grid.products { grid-template-columns: 1.15fr 1fr 1fr; }
  .grid.cards[data-count="4"] { grid-template-columns: repeat(2, 1fr); }
}

.card {
  background: var(--surface); border: 1px solid var(--hairline); border-radius: var(--radius-card);
  padding: 24px;
  transition: background-color var(--t-fast) var(--ease), border-color var(--t-fast) var(--ease);
}
.card:hover { background: var(--surface-2); border-color: var(--border); }
.card h3 { margin-bottom: 8px; }
.card p { margin: 0; color: var(--text); font-size: 0.9375rem; }

/* ---------- MCP block ---------- */
.mcp-endpoint {
  display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px 16px;
  margin: 24px 0 0; padding: 16px 20px; border-radius: var(--radius-card);
  border: 1px solid var(--hairline); background: var(--well);
}
.mcp-endpoint-label { font-size: 0.75rem; color: var(--muted); }
.mcp-endpoint code { font-size: 0.875rem; overflow-wrap: anywhere; color: var(--link); }
.mcp-link { margin: 16px 0 0; font-size: 0.9375rem; }
.mcp-link a::after {
  content: ""; display: inline-block; width: 16px; height: 16px; margin-left: 6px; vertical-align: -3px;
  background-color: var(--accent);
  -webkit-mask: var(--icon-arrow) center / 16px 16px no-repeat;
  mask: var(--icon-arrow) center / 16px 16px no-repeat;
}

/* ---------- pricing ---------- */
.grid.plans { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); align-items: stretch; }
.plan { display: flex; flex-direction: column; gap: 12px; padding: 24px; }
/* 推荐档不发光：一条琥珀发丝线说明它是推荐，注意力由位置与那一行小字承担。 */
.plan.featured { background: var(--surface-2); border-color: var(--accent-line); }
.plan h3 { margin: 0; color: var(--muted); font-size: 0.75rem; font-weight: 500; }
.plan-price { display: flex; align-items: baseline; gap: 8px; margin: 0; }
.plan-price strong {
  font-size: 2rem; font-weight: 500; color: var(--text); letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
}
.plan-price span { color: var(--muted); font-size: 0.875rem; }
.plan-summary { margin: 0; color: var(--text); font-size: 0.9375rem; }
.plan-features { margin: 8px 0 16px; }
.plan-features li { font-size: 0.9375rem; }
.plan .btn { margin-top: auto; align-self: flex-start; }
.plan-note { margin-top: 24px; max-width: 78ch; }

/* ---------- checkout ---------- */
.checkout-section { padding-top: 56px; }
.billing-switch {
  display: inline-flex; gap: 4px; padding: 4px; margin: 8px 0 32px;
  background: var(--well); border: 1px solid var(--hairline); border-radius: 999px;
}
.billing-switch button {
  appearance: none; border: 0; background: transparent; color: var(--text-2);
  font: inherit; font-size: 0.875rem; padding: 8px 16px; border-radius: 999px; cursor: pointer;
  transition: color var(--t-fast) var(--ease), background-color var(--t-fast) var(--ease);
}
.billing-switch button:hover { color: var(--text); }
.billing-switch button.is-active { background: var(--primary); color: var(--on-primary); font-weight: 500; }
.plan-checkout { max-width: 440px; }
/* 两个 CTA 并排：立即订阅 + 开始试用 */
.plan-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: auto; }
.plan-actions .btn { margin-top: 0; align-self: auto; }
.plan-checkout h2 { margin: 0 0 8px; }
.checkout-error { margin-top: 16px; color: var(--danger); font-size: 0.9375rem; }
.checkout-error[hidden] { display: none; }

/* ---------- welcome ---------- */
.welcome-wrap { text-align: center; }
.welcome-mark {
  display: inline-grid; place-items: center; width: 56px; height: 56px; margin: 8px 0 16px;
  border-radius: 50%; background: var(--surface-2); color: var(--ok); font-size: 1.5rem;
  border: 1px solid var(--hairline);
}
.welcome-wrap .cta-row { justify-content: center; }

/* ---------- account: 订阅卡片 ---------- */
.plan-row {
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  flex-wrap: wrap; padding: 16px 20px; border: 1px solid var(--hairline); border-radius: var(--radius-panel);
  background: var(--surface); margin: 24px 0 8px;
}
.plan-row .plan-badge { display: inline-flex; align-items: center; gap: 8px; font-weight: 500; font-size: 0.9375rem; }
.plan-row .plan-badge.pro { color: var(--text); }
.plan-row .plan-when { color: var(--muted); font-size: 0.875rem; }
.plan-row .plan-actions { display: flex; gap: 12px; flex-wrap: wrap; }
.plan-row .plan-actions .btn { font-size: 0.875rem; min-height: 40px; padding: 0 16px; }

/* 云端存储用量：沿用订阅行的外观，只把数字排成等宽；没有任何新色。 */
.storage-row { margin-top: 0; }
.storage-row .plan-badge { font-variant-numeric: tabular-nums; }
.storage-row .plan-when.storage-full { color: var(--danger); }

.product-card {
  display: flex; flex-direction: column; gap: 8px; padding: 24px;
  background: var(--surface); border: 1px solid var(--hairline); border-radius: var(--radius-card); color: var(--text);
  text-decoration: none;
  transition: background-color var(--t-fast) var(--ease), border-color var(--t-fast) var(--ease);
}
.product-card:hover { text-decoration: none; background: var(--surface-2); border-color: var(--border); }
.product-card .kicker { margin-bottom: 0; }
.product-tagline { color: var(--text); font-size: 0.9375rem; margin: 0 0 8px; }
.mini-list { margin: 0 0 16px; padding-left: 16px; color: var(--text-2); font-size: 0.875rem; }
.mini-list li { margin-bottom: 6px; }
.product-link { margin-top: auto; color: var(--text); font-weight: 500; font-size: 0.9375rem; text-decoration: none; }
/* 箭头是一枚 16px 图标，不是文字「→」：与全站其余图标同一套描边。 */
.product-link::after {
  content: ""; display: inline-block; width: 16px; height: 16px; margin-left: 6px; vertical-align: -3px;
  background-color: var(--accent);
  -webkit-mask: var(--icon-arrow) center / 16px 16px no-repeat;
  mask: var(--icon-arrow) center / 16px 16px no-repeat;
  transition: transform var(--t-fast) var(--ease);
}
.product-card:hover .product-link::after { transform: translateX(2px); }

.steps { list-style: none; padding: 0; margin: 0; display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
.steps li {
  display: flex; gap: 16px; background: var(--surface); border: 1px solid var(--hairline);
  border-radius: var(--radius-card); padding: 20px;
}
/* 序号是等宽小字，不是紫圈里的数字。 */
.step-num {
  flex: none; min-width: 24px; padding-top: 2px;
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 0.75rem; font-weight: 500; color: var(--muted); font-variant-numeric: tabular-nums;
}
.steps h3 { margin-bottom: 4px; }
.steps p { margin: 0; color: var(--text); font-size: 0.9375rem; }

.checklist { list-style: none; padding: 0; margin: 16px 0 0; display: grid; gap: 12px; }
.checklist li { position: relative; padding-left: 28px; color: var(--text-2); }
.checklist + p.muted, .checklist + p.small { margin-top: 16px; }
.checklist li::before {
  content: ""; position: absolute; left: 0; top: 5px; width: 16px; height: 16px;
  background-color: var(--muted);
  -webkit-mask: var(--icon-check) center / 16px 16px no-repeat;
  mask: var(--icon-check) center / 16px 16px no-repeat;
}

.faq { display: grid; gap: 8px; max-width: 860px; }
.faq-item {
  background: var(--surface); border: 1px solid var(--hairline); border-radius: var(--radius-card);
  padding: 0 20px;
  transition: border-color var(--t-fast) var(--ease);
}
.faq-item:hover { border-color: var(--border); }
.faq-item summary {
  cursor: pointer; padding: 16px 0; font-weight: 500; font-size: 1rem; list-style: none;
  display: flex; justify-content: space-between; align-items: center; gap: 16px;
}
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item summary::after {
  content: ""; flex: none; width: 16px; height: 16px; background-color: var(--muted);
  -webkit-mask: var(--icon-plus) center / 16px 16px no-repeat;
  mask: var(--icon-plus) center / 16px 16px no-repeat;
}
.faq-item[open] summary::after {
  -webkit-mask: var(--icon-minus) center / 16px 16px no-repeat;
  mask: var(--icon-minus) center / 16px 16px no-repeat;
}
.faq-answer { padding: 0 0 16px; }
.faq-answer p { margin: 0; color: var(--text); }

.install-card { display: flex; flex-direction: column; gap: 12px; margin: 24px 0; max-width: 420px; }
.install-card .btn { align-self: flex-start; margin-top: auto; }

/* ---------- 「获取方式」浮层 ----------
   零 JS：主按钮指向 #chrome-get，:target 命中时浮层出现；遮罩与关闭链接回到 #install，
   地址栏锚点一变即关闭。深度靠一层中性阴影 + 明度台阶，不用模糊（全站无 backdrop-filter）。 */
.get-dialog { display: none; position: fixed; inset: 0; z-index: 60; }
.get-dialog:target { display: grid; place-items: center; padding: 24px; }
/* 遮罩盖满视口，点它任何空白处都回安装区 */
.get-dialog-scrim { position: absolute; inset: 0; background: rgba(6, 7, 10, 0.72); }
.get-dialog-panel {
  position: relative; width: min(100%, 420px); padding: 24px;
  background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-panel);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
}
.get-dialog-panel h3 { margin: 0 0 16px; font-size: 1.0625rem; font-weight: 500; color: var(--text); }
.get-option {
  display: flex; flex-direction: column; gap: 4px; padding: 14px 16px;
  border: 1px solid var(--hairline); border-radius: var(--radius-card); background: var(--surface-low);
  text-decoration: none;
  transition: background-color var(--t-fast) var(--ease), border-color var(--t-fast) var(--ease);
}
.get-option + .get-option { margin-top: 10px; }
.get-option:hover { background: var(--surface-2); border-color: var(--border-strong); text-decoration: none; }
.get-option-label { color: var(--text); font-weight: 500; font-size: 0.9375rem; }
.get-option-note { color: var(--muted); font-size: 0.8125rem; line-height: 1.5; }
.get-dialog-close {
  display: block; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--hairline);
  color: var(--muted); font-size: 0.75rem; text-align: center; text-decoration: none;
}
.get-dialog-close:hover { color: var(--text); text-decoration: none; }

/* ---------- 账号页 ---------- */
.account-hero { padding: 72px 0 16px; }
.account-hero h1 { font-size: 2rem; margin: 0 0 12px; }
.account-hero .lede { margin: 0; max-width: 60ch; }
.account { padding: 8px 0 96px; }

/* 面板：窄卡片，一眼扫完。抬起一档明度，没有模糊。 */
.panel {
  background: var(--surface); border: 1px solid var(--hairline); border-radius: var(--radius-panel);
  padding: 24px; max-width: 560px;
}
.panel-title { margin: 0 0 8px; font-size: 1.125rem; font-weight: 500; }
.panel-lede { margin: 0 0 24px; color: var(--text); font-size: 0.9375rem; line-height: 1.65; }

/* 状态提示 */
.account-status { max-width: 560px; margin: 0 0 16px; padding: 12px 16px; border-radius: var(--radius-card);
  border: 1px solid var(--hairline); font-size: 0.9375rem; background: var(--well); color: var(--text-2); }
.account-status.ok { border-color: rgba(76, 195, 138, 0.42); color: var(--ok); }
.account-status.err { border-color: rgba(255, 139, 132, 0.42); color: var(--danger); }

/* 第三方登录按钮：与站点其余次按钮同一套外观 */
.provider-btn { display: flex; align-items: center; justify-content: center; gap: 10px;
  width: 100%; padding: 12px 16px; font-weight: 500; }
.provider-btn:hover { border-color: var(--border-strong); background: var(--surface-2); }
.provider-icon { flex: 0 0 auto; display: inline-flex; }

/* 分隔线 */
.divider { display: flex; align-items: center; gap: 12px; margin: 20px 0;
  color: var(--muted); font-size: 0.75rem; }
.divider::before, .divider::after { content: ""; flex: 1; height: 1px; background: var(--hairline); }

/* 邮箱表单 */
.auth-form { margin: 0; }
.auth-form label { display: block; font-size: 0.75rem; color: var(--muted); margin-bottom: 8px; }
.auth-input-row { display: flex; gap: 12px; }
.auth-input-row input { flex: 1 1 auto; min-width: 0; min-height: 44px; padding: 0 14px; border-radius: var(--radius);
  border: 1px solid var(--border); background: var(--well); color: inherit; font: inherit; }
.auth-input-row input::placeholder { color: #6b7180; }
.auth-input-row input:focus { outline: 2px solid var(--accent); outline-offset: 1px; border-color: transparent; }
.auth-input-row .btn { flex: 0 0 auto; white-space: nowrap; }
.auth-note { margin: 16px 0 0; font-size: 0.875rem; color: var(--muted); }

/* 已登录：账号栏 */
.account-panel { max-width: 560px; }
.account-head { display: flex; align-items: center; gap: 16px; padding-bottom: 20px;
  border-bottom: 1px solid var(--hairline); }
.account-avatar { width: 44px; height: 44px; flex: 0 0 auto; border-radius: var(--radius); display: grid; place-items: center;
  font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 1rem; font-weight: 500;
  color: var(--accent); border: 1px solid var(--accent-line); }
.account-head-text { min-width: 0; }
.account-email { margin: 0; font-weight: 500; font-size: 1rem; overflow-wrap: anywhere; }
.account-since { margin: 2px 0 0; font-size: 0.75rem; color: var(--muted); }

/* 统计格 */
.account-stats { display: grid; grid-template-columns: 1fr 1fr;
  gap: 1px; margin: 0; background: var(--hairline); border-bottom: 1px solid var(--hairline); }
.account-stats > div { background: var(--surface); padding: 16px 20px; }
.account-stats > div.wide { grid-column: 1 / -1; }
.account-stats dt { font-size: 0.75rem; color: var(--muted); }
.account-stats dd { margin: 4px 0 0; font-size: 1rem; font-weight: 500; font-variant-numeric: tabular-nums; }
.account-stats dd code { font-size: 0.8125rem; font-weight: 400; color: var(--text-2); }

/* 设备列表 */
.account-section { padding-top: 24px; }
.account-section h3 { margin: 0 0 12px; font-size: 0.875rem; color: var(--text-2); font-weight: 500; }
.device-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
.device-row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px;
  padding: 12px 16px; border-radius: var(--radius); background: var(--surface-low); border: 1px solid var(--hairline); }
.device-name { font-size: 0.9375rem; }
.device-meta { font-size: 0.8125rem; color: var(--muted); white-space: nowrap; }
.device-empty { padding: 16px; border-radius: var(--radius); border: 1px dashed var(--border);
  color: var(--muted); font-size: 0.875rem; }

/* API 密钥：给 agent 用的只读凭据 */
.keys-section { padding-top: 24px; border-top: 1px solid var(--hairline); margin-top: 24px; }
.keys-intro { margin: 0 0 16px; color: var(--text-2); font-size: 0.875rem; line-height: 1.65; }
.keys-locked { margin: 0 0 16px; padding: 12px 16px; border-radius: var(--radius); font-size: 0.875rem;
  border: 1px solid var(--accent-line); background: var(--accent-soft); color: var(--accent); }
.key-create-row { display: flex; gap: 12px; }
.key-create-row input { flex: 1 1 auto; min-width: 0; min-height: 44px; padding: 0 14px; border-radius: var(--radius);
  border: 1px solid var(--border); background: var(--well); color: inherit; font: inherit; font-size: 0.9375rem; }
.key-create-row input::placeholder { color: #6b7180; }
.key-create-row input:focus { outline: 2px solid var(--accent); outline-offset: 1px; border-color: transparent; }
.key-create-row .btn { flex: 0 0 auto; white-space: nowrap; }
.key-create-row input:disabled, .key-create-row .btn:disabled { opacity: 0.55; cursor: not-allowed; }

.key-created { margin-top: 16px; padding: 16px; border-radius: var(--radius);
  border: 1px solid rgba(76, 195, 138, 0.35); background: rgba(76, 195, 138, 0.07); }
.key-created code { display: block; font-size: 0.8125rem; word-break: break-all; color: #d6f5e6; }
.key-created .btn { margin-top: 12px; font-size: 0.875rem; min-height: 40px; padding: 0 16px; }
.key-created p { margin: 8px 0 0; }

.key-list { list-style: none; padding: 0; margin: 16px 0 0; display: grid; gap: 8px; }
.key-row { display: flex; justify-content: space-between; align-items: center; gap: 12px;
  padding: 12px 16px; border-radius: var(--radius); background: var(--surface-low); border: 1px solid var(--hairline); }
.key-main { min-width: 0; display: grid; gap: 4px; }
.key-name { font-size: 0.9375rem; overflow-wrap: anywhere; }
.key-meta { font-size: 0.8125rem; color: var(--muted); overflow-wrap: anywhere; }
.key-revoke { flex: 0 0 auto; font-size: 0.8125rem; padding: 6px 12px; min-height: 32px; }
.key-empty { padding: 16px; border-radius: var(--radius); border: 1px dashed var(--border);
  color: var(--muted); font-size: 0.875rem; }

.mcp-box { margin-top: 20px; padding: 16px; border-radius: var(--radius);
  border: 1px solid var(--hairline); background: var(--well); }
.mcp-label { margin: 0 0 8px; font-size: 0.75rem; color: var(--muted); }
.mcp-url { display: block; font-size: 0.8125rem; word-break: break-all; color: var(--link); }
.mcp-box .small { margin: 8px 0 0; }
.mcp-config { margin-top: 12px; }
.mcp-config summary { cursor: pointer; font-size: 0.875rem; color: var(--text-2); }
.mcp-config summary:hover { color: var(--text); }
.mcp-config pre { margin: 12px 0 0; padding: 12px; border-radius: var(--radius); overflow-x: auto;
  background: var(--well); border: 1px solid var(--hairline); font-size: 0.8125rem; line-height: 1.55; }

/* 操作区 */
.account-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px;
  padding-top: 20px; border-top: 1px solid var(--hairline); }
.account-actions .btn { font-size: 0.875rem; min-height: 44px; padding: 0 20px; }

/* 危险操作：默认折叠，避免误触 */
.danger-zone { margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--hairline); }
.danger-zone summary { cursor: pointer; font-size: 0.875rem; color: var(--text-2); }
.danger-zone summary:hover { color: var(--danger); }
.danger-body { margin-top: 12px; }
.danger-body .btn { margin-top: 12px; font-size: 0.875rem; min-height: 44px; padding: 0 20px; }

.account-back { margin-top: 32px; font-size: 0.875rem; }
.account-back a { display: inline-flex; align-items: center; gap: 6px; text-decoration: none; color: var(--text-2); }
.account-back a:hover { color: var(--text); }
.account-back a::before {
  content: ""; width: 16px; height: 16px; background-color: currentColor;
  -webkit-mask: var(--icon-arrow-left) center / 16px 16px no-repeat;
  mask: var(--icon-arrow-left) center / 16px 16px no-repeat;
}

@media (max-width: 560px) {
  .panel { padding: 20px; }
  .account-stats { grid-template-columns: 1fr; }
  .account-stats > div.wide { grid-column: auto; }
  .auth-input-row { flex-direction: column; }
  .auth-input-row .btn { width: 100%; }
  .key-create-row { flex-direction: column; }
  .key-create-row .btn { width: 100%; }
  .key-row { flex-direction: column; align-items: flex-start; }
}

.cta-band { padding: 96px 0; text-align: center; background: var(--surface-low); border-top: 1px solid var(--hairline); }
.cta-band p { color: var(--text); max-width: 60ch; margin: 0 auto; }
.cta-band .cta-row { justify-content: center; }

.crumbs { padding: 20px 24px 0; max-width: var(--wrap); margin: 0 auto; color: var(--muted); font-size: 0.8125rem; display: flex; gap: 8px; }
.crumbs a { color: var(--muted); text-decoration: none; }
.crumbs a:hover { color: var(--text); }

/* ---------- prose (privacy policy) ---------- */
.prose { max-width: 78ch; }
.prose > h2:first-child { margin-top: 0; }
.prose h2 { font-size: 1.5rem; margin-top: 2em; }
.prose h3 { margin-top: 1.6em; }
.prose p, .prose li { color: var(--text); }
.prose ul, .prose ol { padding-left: 1.3em; }
.prose code { background: var(--well); padding: 1px 6px; border-radius: var(--radius-sm); font-size: 0.9em; color: var(--link); }
.prose table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 0.9375rem; }
.prose th, .prose td { border: 1px solid var(--hairline); padding: 12px 16px; text-align: left; color: var(--text-2); }
.prose th { background: var(--surface-low); color: var(--text); font-weight: 500; }
.prose hr { border: none; border-top: 1px solid var(--hairline); margin: 32px 0; }

/* ---------- illustrations ---------- */
/* 抽象示意：墨色窗口 + 一道琥珀划线。颜色跟着 token 走，没有紫色。 */
.art-svg { width: 100%; max-width: 520px; height: auto; }
.a-panel { fill: var(--surface); stroke: var(--border); stroke-width: 1.5; }
.a-popup { fill: var(--surface-2); }
.a-card { fill: var(--surface-low); }
.a-line { fill: var(--border); }
.a-dot { fill: var(--border-strong); }
.a-text { fill: rgba(238, 240, 245, 0.16); }
.a-text-dim { fill: rgba(238, 240, 245, 0.09); }
.a-highlight { fill: rgba(224, 162, 74, 0.18); }
.a-brand { fill: rgba(224, 162, 74, 0.55); }
.a-text-on-brand { fill: #1a1206; }

/* ---------- footer ---------- */
.site-footer { border-top: 1px solid var(--hairline); padding: 56px 0 24px; }
.footer-grid { display: grid; grid-template-columns: 1.6fr repeat(3, 1fr); gap: 32px; }
.footer-brand p { color: var(--text); max-width: 32ch; margin: 12px 0 6px; }
.footer-title { font-size: 0.75rem; color: var(--muted); margin-bottom: 12px; font-weight: 500; }
.site-footer ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
.site-footer a { color: var(--text-2); font-size: 0.875rem; text-decoration: none; transition: color var(--t-fast) var(--ease); }
.site-footer a:hover { color: var(--text); }
.footer-bottom { margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--hairline); color: var(--muted); font-size: 0.8125rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; }
/* 第三方收录徽章：外观由各家自己的内联样式 / SVG 决定，这里只管它们在页脚底行的位置，
   以及不要继承 .site-footer a 的悬停提亮（它们是外链卡片，不是文字链接）。 */
.footer-badges { display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: 12px; }
.footer-badges .footer-badge { flex: none; }
.footer-badges .footer-badge:hover { color: inherit; }
/* 徽章是 <img> 或内联 flex 卡，行内基线会在图下留 4px 空隙，压掉。 */
.footer-badges img { display: block; }
.muted { color: var(--text-2); }
.small { font-size: 0.875rem; }

@media (max-width: 1024px) {
  .hero-split { gap: 40px; }
}

@media (max-width: 860px) {
  .hero-grid { grid-template-columns: 1fr; gap: 32px; }
  .hero-split { grid-template-columns: 1fr; gap: 40px; }
  .preview-card { position: static; width: 100%; margin-top: 16px; transform: none; }
  .preview--zotero .preview-card { transform: none; }
  .preview-page { padding: 28px 24px 32px; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .site-nav { gap: 16px; }
  .site-nav a { font-size: 0.9375rem; }
}

/* 小屏：导航换行到第二行，否则它的最小内容宽度会把页面撑出视口。
   真正收进菜单按钮是首屏重构（P1）的事，这一轮先把密度压下来：header 不再吃掉 15% 视口。 */
@media (max-width: 760px) {
  /* 导航收进菜单按钮，header 回到单行 64px，不再吃掉 15% 视口 */
  .header-inner { flex-wrap: nowrap; gap: 12px; }
  .site-nav { display: none; }
  .nav-menu { display: block; }
  .header-actions { margin-left: auto; }
  .brand-name { font-size: 0.9375rem; }
  .lede { max-width: none; }
  .stats { gap: 32px; }
  /* 手机上没有横向余量：长语言（德/俄）的说明留给折行，别撑破视口 */
  .stats span { white-space: normal; max-width: 24ch; }
  .section { padding: 56px 0; }
  .cta-band { padding: 56px 0; }
}

@media (max-width: 560px) {
  .footer-grid { grid-template-columns: 1fr; }
  /* 三项指标在窄屏不再换行成一加二：给三列，说明允许折行 */
  .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 32px; }
  .stats strong { font-size: 1.125rem; }
  .stats span { white-space: normal; max-width: none; font-size: 0.75rem; line-height: 1.45; }
  .hero-home-cta, .hero.home .cta-row { flex-direction: column; align-items: stretch; }
  .hero.home .cta-row .btn { width: 100%; }
  .hero { padding: 48px 0 32px; }
  .hero.home { padding: 56px 0 40px; }
  .get-dialog:target { padding: 16px; }
  .get-dialog-panel { padding: 20px; }
  /* 窄屏徽章必然换到第二行，靠左站队才跟上面的版权行对齐。 */
  .footer-badges { justify-content: flex-start; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition: none !important; animation: none !important; }
  .btn:active { transform: none; }
  .product-card:hover .product-link::after { transform: none; }
}
`;
