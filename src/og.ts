// 社交预览图（1200×630）。先生成 SVG，再由 resvg 渲染成 PNG。
//
// 中文标题需要构建机上有中文字体：本仓库把生成好的 PNG 放在 public/og/ 下，
// 构建时优先复用，避免在缺少字体的 CI 镜像里渲染出方框。

const WIDTH = 1200;
const HEIGHT = 630;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * 全宽字符：CJK 统一表意文字、假名、谚文、全角符号。
 * 韩文谚文（U+AC00–D7A3、U+1100–11FF）单独列出，它不在 CJK 部首区段里。
 */
const WIDE_CHAR = /[\u1100-\u11ff\u2e80-\u303f\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7a3\uff00-\uffef]/;

/** 粗略估算字符宽度：全宽字符按 1 个字号宽，其余（拉丁、西里尔）按 0.55。 */
function charWidth(ch: string): number {
  return WIDE_CHAR.test(ch) ? 1 : 0.55;
}

/**
 * 按像素宽度贪心断行（拉丁与西里尔按词、中日韩按字）。
 * 超出 maxLines 的部分会被裁掉 —— 返回 truncated 让调用方补个省略号，
 * 悄悄吞掉半句话比多一行更糟。
 */
function wrap(
  text: string,
  fontSize: number,
  maxWidth: number,
  maxLines: number,
): { lines: string[]; truncated: boolean } {
  const lines: string[] = [];
  let current = "";
  let width = 0;
  let consumed = false;
  const limit = maxWidth / fontSize;

  const push = () => {
    if (current.trim()) lines.push(current.trim());
    current = "";
    width = 0;
  };

  const tokens = text.split(/(\s+)/);
  for (const token of tokens) {
    if (!token) continue;
    // 中日韩没有空格分词，逐字断行；拉丁与西里尔按词断行
    const pieces = WIDE_CHAR.test(token) ? [...token] : [token];
    for (const piece of pieces) {
      const w = [...piece].reduce((sum, ch) => sum + charWidth(ch), 0);
      if (width + w > limit && current) push();
      if (lines.length >= maxLines) {
        consumed = true;
        break;
      }
      current += piece;
      width += w;
    }
    if (lines.length >= maxLines) {
      consumed = true;
      break;
    }
  }
  if (lines.length < maxLines) {
    push();
    return { lines, truncated: false };
  }
  return { lines: lines.slice(0, maxLines), truncated: consumed };
}

export interface OgInput {
  title: string;
  subtitle: string;
  brand: string;
  locale: string;
}

export function renderOgSvg(input: OgInput): string {
  const padding = 84;
  const maxWidth = WIDTH - padding * 2;

  // 先按最大字号排标题；排不下三行就缩一档，把纵向空间让给副标题。
  // 俄语、德语这类长标题会真的用满三行，不预留空间就会压到底部装饰线。
  let titleSize = 62;
  let titleWrap = wrap(input.title, titleSize, maxWidth, 3);
  if (titleWrap.truncated) {
    titleSize = 56;
    titleWrap = wrap(input.title, titleSize, maxWidth, 3);
  }
  const titleLines = titleWrap.lines;
  const subtitleSize = titleLines.length >= 3 ? 25 : 27;
  const subtitleWrap = wrap(input.subtitle, subtitleSize, maxWidth - 40, 2);
  const subtitleLines = subtitleWrap.lines.map((line, index) =>
    subtitleWrap.truncated && index === subtitleWrap.lines.length - 1 ? `${line}…` : line,
  );

  const titleTop = 214;
  const titleLineHeight = titleSize * 1.18;

  const titleSpans = titleLines
    .map((line, index) => {
      const y = titleTop + index * titleLineHeight;
      return `<text x="${padding}" y="${y}" class="title">${escapeXml(line)}</text>`;
    })
    .join("\n  ");

  const subtitleTop = titleTop + titleLines.length * titleLineHeight + 26;
  const subtitleSpans = subtitleLines
    .map((line, index) => {
      const y = subtitleTop + index * subtitleSize * 1.5;
      return `<text x="${padding}" y="${y}" class="subtitle">${escapeXml(line)}</text>`;
    })
    .join("\n  ");

  // 每种文字挑一款构建机上真实存在的字体排在最前：resvg 的字体回退
  // 不如浏览器可靠，让错误的字体先命中就会渲染出方框。
  // 构建机是 macOS 时对应 PingFang TC/SC、Hiragino Sans、Apple SD Gothic Neo，
  // 其余平台靠 Noto 系列兜底；拉丁与西里尔用 Helvetica 即可。
  const CJK_FALLBACK = "Noto Sans CJK SC, Helvetica, Arial, sans-serif";
  const fontStacks: Record<string, string> = {
    "zh-CN": `PingFang SC, Noto Sans SC, Hiragino Sans GB, Microsoft YaHei, ${CJK_FALLBACK}`,
    "zh-TW": `PingFang TC, Noto Sans TC, Hiragino Sans CNS, Microsoft JhengHei, ${CJK_FALLBACK}`,
    ja: `Hiragino Sans, Hiragino Kaku Gothic ProN, Yu Gothic, Noto Sans JP, ${CJK_FALLBACK}`,
    ko: `Apple SD Gothic Neo, Malgun Gothic, Noto Sans KR, ${CJK_FALLBACK}`,
  };
  const fontStack =
    fontStacks[input.locale] ?? "Helvetica Neue, Helvetica, Arial, Segoe UI, Noto Sans, sans-serif";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#14141f"/>
      <stop offset="1" stop-color="#0d0d14"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.1" r="0.7">
      <stop offset="0" stop-color="#8b7cf6" stop-opacity="0.42"/>
      <stop offset="1" stop-color="#8b7cf6" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="mark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8b7cf6"/>
      <stop offset="1" stop-color="#4f3fd0"/>
    </linearGradient>
    <style>
      .title { fill: #f4f4fa; font-family: ${fontStack}; font-size: ${titleSize}px; font-weight: 700; letter-spacing: -1px; }
      .subtitle { fill: #9a9ab0; font-family: ${fontStack}; font-size: ${subtitleSize}px; font-weight: 400; }
      .brand { fill: #ececf3; font-family: ${fontStack}; font-size: 30px; font-weight: 700; }
      .host { fill: #6f6f88; font-family: ${fontStack}; font-size: 22px; }
      .markletter { fill: #ffffff; font-family: ${fontStack}; font-size: 34px; font-weight: 700; }
    </style>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>

  <rect x="${padding}" y="${padding - 8}" width="58" height="58" rx="16" fill="url(#mark)"/>
  <text x="${padding + 29}" y="${padding + 31}" class="markletter" text-anchor="middle">R</text>
  <text x="${padding + 76}" y="${padding + 32}" class="brand">${escapeXml(input.brand)}</text>

  ${titleSpans}
  ${subtitleSpans}

  <rect x="${padding}" y="${HEIGHT - 96}" width="64" height="4" rx="2" fill="#8b7cf6"/>
  <text x="${padding}" y="${HEIGHT - 52}" class="host">renota.app · ${escapeXml(input.locale)}</text>
</svg>`;
}
