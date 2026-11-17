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
  },
});
