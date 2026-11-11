import { defineConfig } from "cf/config";

// 纯静态站：没有 entrypoint，由 dist/ 里的文件直接提供服务。
export default defineConfig({
  worker: {
    name: "renota-public",
    compatibilityDate: "2026-09-21",
    observability: { enabled: true },
    domains: ["www.werenota.com"],
  },
});
