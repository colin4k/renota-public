import { defineConfig } from "cf/config";

// 一套代码，两个部署目标：
//
//   DEPLOY_TARGET=sandbox cf deploy      → sandbox.werenota.com
//   cf deploy                            → www.werenota.com + werenota.com（默认）
//
// 构建时的 SITE_URL / CLOUD_API_BASE 也要跟着切（见 .env.sandbox）。

const sandbox = process.env.DEPLOY_TARGET === "sandbox";

export default defineConfig({
  worker: {
    name: sandbox ? "renota-public-sandbox" : "renota-public",
    compatibilityDate: "2026-09-21",
    observability: { enabled: true },
    domains: sandbox ? ["sandbox.werenota.com"] : ["www.werenota.com", "werenota.com"],
    // 裸域 301 → www（避免同一套页面被 Google 当成两份）与结算页的国家注入都在这里，
    // 不接 entrypoint 的话 src/worker.ts 不会被部署，两条逻辑都不会生效。
    entrypoint: "./src/worker.ts",
    // Worker 要自己分发静态资源（裸域 301 必须在大盘之前判断），所以显式声明资产绑定；
    // 不声明的话来源 only 的 worker 拿不到 env.ASSETS，runWorkerFirst 会把全站打成 500。
    env: { ASSETS: { type: "assets" } },
    // 全部请求先进 Worker：资产层默认会先吃掉命中的静态文件，那样裸域 301 永远不触发。
    assets: { runWorkerFirst: true },
  },
});
