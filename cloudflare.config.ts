import { defineConfig } from "cf/config";

// 纯静态站：没有 entrypoint，由 dist/ 里的文件直接提供服务。
export default defineConfig({
  worker: {
    name: "renota-public",
    compatibilityDate: "2026-09-21",
    observability: { enabled: true },
    // 裸域与 www 同时绑定到同一个 Worker：两边都能直接打开，canonical 仍统一指向 www。
    domains: ["www.werenota.com", "werenota.com"],
  },
});
