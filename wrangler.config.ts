import { defineWranglerConfig } from "wrangler/experimental-config";

// 静态资源目录。`npm run build` 会把多语言页面生成到 dist/。
export default defineWranglerConfig({
  assetsDirectory: "dist",
});
