// 本地预览：一个极简静态文件服务器，只为 `npm run dev` 服务。

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

async function resolveFile(root: string, urlPath: string): Promise<string | null> {
  const clean = decodeURIComponent(urlPath.split("?")[0] ?? "/");
  const candidates = path.join(clean) === "/"
    ? [path.join(root, "index.html")]
    : clean.endsWith("/")
      ? [path.join(root, clean, "index.html")]
      : [path.join(root, clean), path.join(root, clean, "index.html")];

  for (const candidate of candidates) {
    const resolved = path.resolve(candidate);
    if (!resolved.startsWith(path.resolve(root))) continue; // 防目录穿越
    try {
      const info = await stat(resolved);
      if (info.isFile()) return resolved;
    } catch {
      /* try next */
    }
  }
  return null;
}

export async function serve(root: string, port = 4321): Promise<void> {
  const server = createServer(async (req, res) => {
    const file = await resolveFile(root, req.url ?? "/");
    if (!file) {
      res.statusCode = 404;
      res.setHeader("content-type", "text/html; charset=utf-8");
      res.end("<h1>404</h1><p><a href=\"/\">Back home</a></p>");
      return;
    }
    const body = await readFile(file);
    res.setHeader("content-type", MIME[path.extname(file)] ?? "application/octet-stream");
    res.end(body);
  });

  await new Promise<void>((resolve) => server.listen(port, "127.0.0.1", resolve));
  console.log(`\n▶ preview: http://127.0.0.1:${port}\n`);
}
