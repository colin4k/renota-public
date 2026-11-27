// 极薄的 Worker 入口：只做两件事 —— 裸域归一到 www、把访客国家写进结算页。
//
// 其余请求一律直接交给静态资源，不经过这里处理逻辑，
// 所以静态站的性能和缓存行为保持不变。
//
// Cloudflare 在边缘把访客国家放进 `cf-ipcountry`（等价于 Vercel 的
// `x-vercel-ip-country`）。拿不到、或拿到的是 Cloudflare 的占位值时，
// 保持 data-country 为空 —— 客户端会省略 address，让 Paddle 按 IP 自行判断。

interface Env {
  ASSETS: {
    fetch(input: Request): Promise<Response>;
  };
}

/**
 * 两个主机名都绑在同一个 Worker 上（见 cloudflare.config.ts）。
 * 站点只认 www 这一个主机名：canonical / hreflang / sitemap 全部指向它，
 * 裸域必须 301 过去，否则同一套页面在 Google 眼里是两份，裸域那份会被
 * 判成「备用网页（有适当的规范标记）」，稀释掉本该集中的信号。
 */
const APEX_HOST = "werenota.com";
const CANONICAL_HOST = "www.werenota.com";

/**
 * Cloudflare 用它表示「未知」和「Tor 出口」，都不能当国家码发给 Paddle。
 */
const NON_COUNTRY_VALUES = new Set(["XX", "T1", ""]);

/**
 * 结算页在根路径和每一种语言的 /<locale>/checkout/ 下各有一份
 * （见 build.ts 的功能页生成）。这里只按 URL 形状匹配，不维护语言清单：
 * 多一种语言不需要回来改这个 Worker。
 */
const CHECKOUT_PATH = /^\/(?:[A-Za-z]{2,3}(?:-[A-Za-z]{2,4})?\/)?checkout\/?$/;

function isCheckoutPath(pathname: string): boolean {
  return CHECKOUT_PATH.test(pathname);
}

function isRealCountryOf(value: string | null): value is string {
  if (!value) return false;
  const normalized = value.trim().toUpperCase();
  if (NON_COUNTRY_VALUES.has(normalized)) return false;
  return /^[A-Z]{2}$/.test(normalized);
}

/** 裸域 → www 的永久重定向；已经在 www 上、或本地/沙箱域名时返回 null。 */
function apexRedirect(url: URL): Response | null {
  if (url.hostname !== APEX_HOST) return null;
  const target = new URL(`${url.pathname}${url.search}`, `https://${CANONICAL_HOST}`);
  return new Response(null, {
    status: 301,
    headers: {
      location: target.toString(),
      // 301 本身就是可缓存的；显式给一年，省掉每个访客一次边缘跳转。
      "cache-control": "public, max-age=31536000",
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    const redirect = apexRedirect(url);
    if (redirect) return redirect;

    const isCheckoutPage = isCheckoutPath(url.pathname);

    const response = await env.ASSETS.fetch(request);

    if (!isCheckoutPage) return response;

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) return response;

    const countryHeader = request.headers.get("cf-ipcountry");
    const country = isRealCountryOf(countryHeader) ? countryHeader.toUpperCase() : "";

    // 没有可信国家时原样返回，省掉一次字符串复制。
    if (!country) return response;

    const html = await response.text();
    const injected = html.replace('data-country=""', `data-country="${country}"`);

    const headers = new Headers(response.headers);
    // 长度变了，交给运行时重算，否则会被截断。
    headers.delete("content-length");

    return new Response(injected, { status: response.status, headers });
  },
};
