// 把商店当前发布的 .crx 拉到 public/downloads/renota-extension.crx。
//
// 为什么要用商店那份而不是本地打包：扩展 ID 由签名密钥决定。商店用它的密钥签，
// 本地 `npm run package:crx` 是另一把钥匙，装出来是第二个扩展，本地数据不互通。
//
// 商店每次发版后跑一次 `npm run crx:sync`，页面与链接都不用动。

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

/** 商店版的 Renota 扩展 ID（浏览器地址栏里 /detail/renota/ 后面那串）。 */
const EXT_ID = "iebpcobgihlbcndpbmjcjdloegoedbel";
const OUT = "public/downloads/renota-extension.crx";

const url =
  "https://clients2.google.com/service/update2/crx" +
  `?response=redirect&prodversion=130.0&acceptformat=crx2,crx3&x=id%3D${EXT_ID}%26uc`;

const res = await fetch(url, { redirect: "follow" });
if (!res.ok) {
  console.error(`下载失败：HTTP ${res.status}`);
  process.exit(1);
}

const buf = Buffer.from(await res.arrayBuffer());
if (buf.subarray(0, 4).toString("latin1") !== "Cr24") {
  console.error("下载到的不是有效的 .crx（缺少 Cr24 头），没有覆盖旧文件");
  process.exit(1);
}

// 响应最后落在 IEBP…_1_0_5_0.crx，文件名里的四段就是版本号
const version = /_(\d+(?:_\d+){1,3})\.crx$/.exec(new URL(res.url).pathname)?.[1]?.replaceAll("_", ".");

await mkdir(path.dirname(OUT), { recursive: true });
await writeFile(OUT, buf);
console.log(`已更新 ${OUT} — ${(buf.length / 1024).toFixed(0)} KB${version ? `，版本 ${version}` : ""}`);
