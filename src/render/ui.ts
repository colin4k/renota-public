// 页面里复用的 HTML 片段与插图。

import { escapeHtml } from "./layout.js";

export interface ListItem {
  title: string;
  body: string;
}

export function section(
  heading: string,
  inner: string,
  options: { id?: string; alt?: boolean; lede?: string; level?: 2 | 3 } = {},
): string {
  const level = options.level ?? 2;
  const idAttr = options.id ? ` id="${options.id}"` : "";
  const lede = options.lede ? `<p class="section-lede">${escapeHtml(options.lede)}</p>` : "";
  return `<section class="section${options.alt ? " alt" : ""}"${idAttr}>
  <div class="wrap">
    <h${level}>${escapeHtml(heading)}</h${level}>
    ${lede}
    ${inner}
  </div>
</section>`;
}

export function featureGrid(items: ListItem[]): string {
  const cards = items
    .map(
      (item) => `<div class="card">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.body)}</p>
      </div>`,
    )
    .join("\n      ");
  return `<div class="grid cards" data-count="${items.length}">\n      ${cards}\n    </div>`;
}

export function steps(items: ListItem[]): string {
  const list = items
    .map(
      (item, index) => `<li>
        <span class="step-num" aria-hidden="true">${index + 1}</span>
        <div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.body)}</p>
        </div>
      </li>`,
    )
    .join("\n      ");
  return `<ol class="steps">\n      ${list}\n    </ol>`;
}

export function checklist(items: string[], className = ""): string {
  const list = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n      ");
  return `<ul class="checklist${className ? ` ${className}` : ""}">\n      ${list}\n    </ul>`;
}

export function faqList(items: Array<{ q: string; a: string }>): string {
  const rows = items
    .map(
      (item) => `<details class="faq-item">
        <summary>${escapeHtml(item.q)}</summary>
        <div class="faq-answer"><p>${escapeHtml(item.a)}</p></div>
      </details>`,
    )
    .join("\n      ");
  return `<div class="faq">\n      ${rows}\n    </div>`;
}

export function breadcrumbs(localePathHome: string, homeLabel: string, crumb: string): string {
  return `<nav class="crumbs" aria-label="Breadcrumb">
    <a href="${localePathHome}">${escapeHtml(homeLabel)}</a>
    <span aria-hidden="true">/</span>
    <span aria-current="page">${escapeHtml(crumb)}</span>
  </nav>`;
}

type IllustrationKind = "chrome" | "zotero" | "android";

/**
 * 用内联 SVG 画一个抽象的产品示意，避免依赖还没准备好的截图。
 * 颜色取自 CSS 变量，跟随主题。
 */
export function illustration(kind: IllustrationKind, label: string): string {
  const frame = `viewBox="0 0 560 420" role="img" aria-label="${escapeHtml(label)}" class="art-svg"`;

  if (kind === "chrome") {
    return `<svg ${frame}>
  <rect x="20" y="20" width="360" height="300" rx="14" class="a-panel"/>
  <circle cx="44" cy="44" r="5" class="a-dot"/><circle cx="62" cy="44" r="5" class="a-dot"/><circle cx="80" cy="44" r="5" class="a-dot"/>
  <rect x="40" y="70" width="320" height="1" class="a-line"/>
  <rect x="44" y="92" width="230" height="12" rx="6" class="a-text"/>
  <rect x="44" y="116" width="280" height="12" rx="6" class="a-text"/>
  <rect x="44" y="140" width="180" height="12" rx="6" class="a-text"/>
  <rect x="44" y="170" width="300" height="52" rx="8" class="a-highlight"/>
  <rect x="58" y="186" width="250" height="10" rx="5" class="a-text-dim"/>
  <rect x="58" y="204" width="200" height="10" rx="5" class="a-text-dim"/>
  <rect x="44" y="240" width="260" height="12" rx="6" class="a-text"/>
  <rect x="44" y="264" width="210" height="12" rx="6" class="a-text"/>
  <rect x="400" y="70" width="140" height="250" rx="14" class="a-panel"/>
  <rect x="416" y="90" width="108" height="10" rx="5" class="a-brand"/>
  <rect x="416" y="112" width="90" height="8" rx="4" class="a-text-dim"/>
  <rect x="416" y="134" width="108" height="60" rx="8" class="a-card"/>
  <rect x="416" y="208" width="108" height="60" rx="8" class="a-card"/>
  <rect x="416" y="282" width="70" height="26" rx="13" class="a-brand"/>
</svg>`;
  }

  if (kind === "zotero") {
    return `<svg ${frame}>
  <rect x="40" y="24" width="300" height="372" rx="10" class="a-panel"/>
  <rect x="64" y="48" width="120" height="10" rx="5" class="a-text"/>
  <rect x="64" y="76" width="250" height="9" rx="4" class="a-text-dim"/>
  <rect x="64" y="94" width="250" height="9" rx="4" class="a-text-dim"/>
  <rect x="64" y="112" width="200" height="9" rx="4" class="a-text-dim"/>
  <rect x="64" y="140" width="250" height="9" rx="4" class="a-text-dim"/>
  <rect x="64" y="158" width="170" height="9" rx="4" class="a-text-dim"/>
  <rect x="64" y="186" width="250" height="9" rx="4" class="a-text-dim"/>
  <rect x="64" y="204" width="230" height="9" rx="4" class="a-text-dim"/>
  <rect x="64" y="232" width="250" height="9" rx="4" class="a-text-dim"/>
  <rect x="64" y="250" width="140" height="9" rx="4" class="a-text-dim"/>
  <rect x="64" y="286" width="250" height="60" rx="8" class="a-highlight"/>
  <rect x="80" y="302" width="190" height="9" rx="4" class="a-text-dim"/>
  <rect x="80" y="320" width="150" height="9" rx="4" class="a-text-dim"/>
  <rect x="352" y="170" width="188" height="120" rx="12" class="a-panel a-popup"/>
  <rect x="368" y="186" width="90" height="8" rx="4" class="a-brand"/>
  <rect x="368" y="206" width="156" height="8" rx="4" class="a-text-dim"/>
  <rect x="368" y="222" width="120" height="8" rx="4" class="a-text-dim"/>
  <rect x="368" y="250" width="48" height="22" rx="11" class="a-brand"/>
  <rect x="424" y="250" width="48" height="22" rx="11" class="a-card"/>
  <rect x="480" y="250" width="44" height="22" rx="11" class="a-card"/>
  <rect x="40" y="404" width="300" height="4" rx="2" class="a-line"/>
  <rect x="40" y="404" width="130" height="4" rx="2" class="a-brand"/>
</svg>`;
  }

  return `<svg ${frame}>
  <rect x="190" y="16" width="180" height="388" rx="24" class="a-panel"/>
  <rect x="204" y="40" width="152" height="88" rx="10" class="a-card"/>
  <rect x="216" y="56" width="90" height="8" rx="4" class="a-text-dim"/>
  <rect x="216" y="72" width="120" height="8" rx="4" class="a-text-dim"/>
  <rect x="216" y="88" width="80" height="8" rx="4" class="a-text-dim"/>
  <rect x="204" y="140" width="152" height="60" rx="10" class="a-highlight"/>
  <rect x="216" y="156" width="100" height="8" rx="4" class="a-text-dim"/>
  <rect x="216" y="174" width="120" height="8" rx="4" class="a-text-dim"/>
  <circle cx="280" cy="330" r="26" class="a-brand"/>
  <rect x="268" y="323" width="24" height="3" rx="1.5" class="a-text-on-brand"/>
  <rect x="268" y="331" width="24" height="3" rx="1.5" class="a-text-on-brand"/>
  <rect x="268" y="339" width="16" height="3" rx="1.5" class="a-text-on-brand"/>
  <rect x="380" y="210" width="150" height="112" rx="12" class="a-panel a-popup"/>
  <rect x="394" y="226" width="60" height="8" rx="4" class="a-brand"/>
  <rect x="394" y="244" width="120" height="7" rx="3.5" class="a-text-dim"/>
  <rect x="394" y="258" width="100" height="7" rx="3.5" class="a-text-dim"/>
  <rect x="394" y="272" width="110" height="7" rx="3.5" class="a-text-dim"/>
  <rect x="394" y="292" width="44" height="18" rx="9" class="a-brand"/>
  <rect x="446" y="292" width="44" height="18" rx="9" class="a-card"/>
</svg>`;
}

/**
 * 主/次两个按钮。主按钮可以没有 href：还没上架的产品先留着位置与文案，
 * 但不给跳转 —— 渲染成 span，辅助技术也知道它暂时不可用。
 */
export function ctaRow(
  primary: { label: string; href?: string },
  secondary: { label: string; href: string },
): string {
  const primaryHtml = primary.href
    ? `<a class="btn primary" href="${escapeHtml(primary.href)}">${escapeHtml(primary.label)}</a>`
    : `<span class="btn primary btn-static" aria-disabled="true">${escapeHtml(primary.label)}</span>`;
  return `<div class="cta-row">
      ${primaryHtml}
      <a class="btn" href="${escapeHtml(secondary.href)}" rel="noopener">${escapeHtml(secondary.label)}</a>
    </div>`;
}

export function stats(items: Array<{ value: string; label: string }>): string {
  const list = items
    .map(
      (item) => `<li>
        <strong>${escapeHtml(item.value)}</strong>
        <span>${escapeHtml(item.label)}</span>
      </li>`,
    )
    .join("\n      ");
  return `<ul class="stats">\n      ${list}\n    </ul>`;
}

/* ------------------------------------------------------------------
 * 首屏与产品页里那台「正在阅读的窗口」。
 *
 * 它是这一版视觉的核心：一个真实的阅读界面、一句被划线的原文、一张浮出来
 * 的回答卡，卡上带一个连回原文的引用角标。示例文案来自字典（十语种同步），
 * 书名与段落是虚构的，不引用任何真实作品。
 * ------------------------------------------------------------------ */

export interface PreviewText {
  prompt: string;
  book: string;
  lead: string;
  marked: string;
  answer: string;
  source: string;
}

export type PreviewKind = "home" | "chrome" | "zotero" | "android";

/** 窗口顶栏：三点 + 书名。chrome 与 zotero 另有各自的界面饰件。 */
function previewBar(t: PreviewText): string {
  return `<div class="preview-bar">
        <span class="preview-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="preview-book">${escapeHtml(t.book)}</span>
      </div>`;
}

/** 工具栏：五个动作各一枚 16px 图标，第一个（解释）是当前选中的那个。 */
function previewToolbar(): string {
  const tools = ["message", "search", "pen", "globe", "link"];
  const items = tools
    .map(
      (name, i) =>
        `<span class="preview-tool${i === 0 ? " is-on" : ""}" aria-hidden="true"><i class="pv-${name}"></i></span>`,
    )
    .join("");
  return `<div class="preview-toolbar">${items}</div>`;
}

export function readingPreview(kind: PreviewKind, t: PreviewText): string {
  const chrome = kind === "chrome" ? previewToolbar() : "";
  const spine = kind === "zotero" ? `<span class="preview-spine" aria-hidden="true">EPUB</span>` : "";
  const ball = kind === "android" ? `<span class="preview-ball" aria-hidden="true">R</span>` : "";

  return `<figure class="preview preview--${kind}">
      <div class="preview-window">
        ${previewBar(t)}
        ${chrome}
        <div class="preview-page">
          ${spine}
          <p class="preview-lead">${escapeHtml(t.lead)}</p>
          <p class="preview-marked"><span>${escapeHtml(t.marked)}</span><sup class="cite">1</sup></p>
        </div>
        ${ball}
      </div>
      <div class="preview-card">
        <p class="preview-prompt"><span>${escapeHtml(t.prompt)}</span><span class="preview-mark" aria-hidden="true">R</span></p>
        <p class="preview-answer">${escapeHtml(t.answer)}</p>
        <p class="preview-source"><span>${escapeHtml(t.book)} · ${escapeHtml(t.source)}</span><sup class="cite">1</sup></p>
      </div>
    </figure>`;
}
