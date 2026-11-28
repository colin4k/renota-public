// 把 dist/sitemap.xml 里的全部 URL 提交给 IndexNow，让 Bing / Yandex 直接来抓。
//
// 为什么读 sitemap 而不是维护一份手写清单：页面 × 语言由 src/build.ts 生成，
// 多一门语言、加一个页面都会自动进 sitemap，这里跟着走就不会漏推送。
//
// key 从 public/ 自动发现，而不是写死在代码里 —— 换 key 只需替换那份
// <key>.txt，文件名与文件内容必须逐字相同（搜索引擎会拿文件名比对内容）。
//
// 部署完成、URL 已经可访问之后再跑。用法：
//
//   npm run indexnow              # 推送 sitemap 全量
//   npm run indexnow -- --dry-run # 只打印要推的 URL，不发请求
//   npm run indexnow -- --limit=5 # 只推前 5 条，用于验证链路
//
// 成功退出码 0；任何一批失败即退出码 1，方便串在部署脚本后面。

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

/** IndexNow 公共端点：一次提交会分发给 Bing、Yandex、Seznam、Naver 等参与方。 */
const ENDPOINT = "https://api.indexnow.org/indexnow";

/** 单个请求的 URL 上限，超出要分批。 */
const MAX_PER_REQUEST = 10_000;

const SITEMAP = "dist/sitemap.xml";
const KEY_DIR = "public";

const argv = process.argv.slice(2);
const dryRun = argv.includes("--dry-run");
/** --limit=N：只取前 N 条，联调用。 */
const limit = Number(argv.find((a) => a.startsWith("--limit="))?.split("=")[1] ?? NaN) || Infinity;
/** --endpoint=…：换成站点专属端点（如 https://www.bing.com/indexnow）。 */
const endpoint = argv.find((a) => a.startsWith("--endpoint="))?.split("=")[1] ?? ENDPOINT;

/** XML 文本节点里只可能出现这几个实体，按最小集合还原。 */
function unescapeXml(text) {
  return text
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&amp;", "&");
}

function parseLocs(xml) {
  // 只取 <loc>，不要匹配 <xhtml:link href>：那份是 hreflang 备用链接。
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => unescapeXml(m[1]).trim());
}

/**
 * 在 public/ 下找 KeyNow 的 key 文件。
 * IndexNow 的 key 是 8–128 个 [A-Za-z0-9-]，文件名 `<key>.txt`，内容就是 key 本身。
 * public/ 根目录还有 llms.txt，靠「内容等于文件名」这一条把它排除掉。
 */
async function findKey() {
  if (process.env.INDEXNOW_KEY) {
    return { key: process.env.INDEXNOW_KEY, source: "INDEXNOW_KEY 环境变量" };
  }

  for (const name of await readdir(KEY_DIR)) {
    const match = /^([A-Za-z0-9-]{8,128})\.txt$/.exec(name);
    if (!match) continue;
    const [, key] = match;
    const content = (await readFile(path.join(KEY_DIR, name), "utf8")).trim();
    if (content === key) return { key, source: path.join(KEY_DIR, name) };
  }
  return null;
}

/** 一个接口失败时的常见原因，直接写进报错里，省得再去翻文档。 */
const HINTS = {
  400: "请求格式错误：payload 不是合法 JSON",
  403: "key 不被接受：keyLocation 那份文件必须存在，且内容与文件名逐字相同",
  422: "URL 与 host 不匹配，或其中有不合法 URL",
  429: "请求太频繁，稍后重试（IndexNow 限制每天 10k 条）",
};

async function submit(urls, key, keyLocation) {
  const body = JSON.stringify({
    host: new URL(urls[0]).host,
    key,
    keyLocation,
    urlList: urls,
  });

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body,
  });

  // 200 与 202 都算接受：202 表示已入队，具体抓取时间不保证。
  if (res.ok) return { ok: true, status: res.status };

  const text = (await res.text()).trim();
  return { ok: false, status: res.status, text, hint: HINTS[res.status] };
}

const sitemapXml = await readFile(SITEMAP, "utf8").catch(() => {
  console.error(`读不到 ${SITEMAP} —— 先跑 npm run build`);
  process.exit(1);
});

const allUrls = parseLocs(sitemapXml);
if (allUrls.length === 0) {
  console.error(`${SITEMAP} 里没有 <loc>，没什么可推的`);
  process.exit(1);
}

// host 以 sitemap 为准：canonical / sitemap / keyLocation 三处必须同一个主机名，
// 否则搜索引擎会认为 key 不属于这个站点。
const host = new URL(allUrls[0]).host;
const urls = allUrls.filter((u) => {
  try {
    return new URL(u).host === host;
  } catch {
    return false;
  }
});
const skipped = allUrls.length - urls.length;
if (skipped > 0) console.warn(`跳过 ${skipped} 条不属于 ${host} 的 URL`);

const target = Number.isFinite(limit) ? urls.slice(0, limit) : urls;

const found = await findKey();
if (!found) {
  console.error(`在 ${KEY_DIR}/ 下没找到 IndexNow key 文件（<key>.txt，内容与文件名一致）`);
  process.exit(1);
}
const { key } = found;
const keyLocation = `https://${host}/${key}.txt`;

console.log(`key      ${key}  ← ${found.source}`);
console.log(`keyLoc   ${keyLocation}`);
console.log(`endpoint ${endpoint}`);
console.log(`URL      ${target.length} 条（sitemap 共 ${allUrls.length} 条，host ${host}）`);

if (dryRun) {
  for (const u of target) console.log(`  ${u}`);
  console.log("--dry-run：没有发送任何请求");
  process.exit(0);
}

let sent = 0;
for (let i = 0; i < target.length; i += MAX_PER_REQUEST) {
  const batch = target.slice(i, i + MAX_PER_REQUEST);
  const result = await submit(batch, key, keyLocation);

  if (!result.ok) {
    console.error(`第 ${i / MAX_PER_REQUEST + 1} 批失败：HTTP ${result.status}${result.hint ? ` — ${result.hint}` : ""}`);
    if (result.text) console.error(result.text.slice(0, 500));
    process.exit(1);
  }
  sent += batch.length;
  console.log(`第 ${i / MAX_PER_REQUEST + 1} 批：${batch.length} 条 → HTTP ${result.status} 已接受`);
}

console.log(`完成：${sent} 条已提交 IndexNow（抓取时间以搜索引擎侧为准）`);
