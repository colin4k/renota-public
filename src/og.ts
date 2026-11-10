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

/** 粗略估算字符宽度：CJK 按 1 个字号宽，拉丁字母按 0.55。 */
function charWidth(ch: string): number {
  return /[\u3000-\u9fff\uff00-\uffef]/.test(ch) ? 1 : 0.55;
}

/** 按像素宽度贪心断行（英文按词、中文按字）。 */
function wrap(text: string, fontSize: number, maxWidth: number, maxLines: number): string[] {
  const lines: string[] = [];
  let current = "";
  let width = 0;
  const limit = maxWidth / fontSize;

  const push = () => {
    if (current.trim()) lines.push(current.trim());
    current = "";
    width = 0;
  };

  const tokens = text.split(/(\s+)/);
  for (const token of tokens) {
    if (!token) continue;
    // 中文没有空格，逐字处理
    const pieces = /[\u3000-\u9fff]/.test(token) ? [...token] : [token];
    for (const piece of pieces) {
      const w = [...piece].reduce((sum, ch) => sum + charWidth(ch), 0);
      if (width + w > limit && current) push();
      current += piece;
      width += w;
      if (lines.length >= maxLines) break;
    }
    if (lines.length >= maxLines) break;
  }
  if (lines.length < maxLines) push();
  return lines.slice(0, maxLines);
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

  const titleSize = 62;
  const titleLines = wrap(input.title, titleSize, maxWidth, 3);
  const subtitleSize = 27;
  const subtitleLines = wrap(input.subtitle, subtitleSize, maxWidth - 40, 2);

  const titleTop = 232;
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

  const fontStack =
    "PingFang SC, Noto Sans SC, Noto Sans CJK SC, Hiragino Sans GB, Microsoft YaHei, Helvetica, Arial, sans-serif";

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
