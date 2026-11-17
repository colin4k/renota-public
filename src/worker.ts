// 极薄的 Worker 入口：只做一件事 —— 把访客国家写进结算页。
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

/** Cloudflare 用它表示「未知」和「Tor 出口」，都不能当国家码发给 Paddle。 */
const NON_COUNTRY_VALUES = new Set(["XX", "T1", ""]);

function isRealCountryOf(value: string | null): value is string {
  if (!value) return false;
  const normalized = value.trim().toUpperCase();
  if (NON_COUNTRY_VALUES.has(normalized)) return false;
  return /^[A-Z]{2}$/.test(normalized);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const isCheckoutPage = /^\/(zh-CN\/)?checkout\/?$/.test(url.pathname);

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
