// 站点级配置。改这里就能改所有页面里的链接与品牌信息。

export const site = {
  /** 线上域名，用于 canonical / sitemap / OG。部署到别的域名时改这一处。 */
  url: "https://renota.app",
  /** 英文名（其余语言一律用它）。 */
  name: "Renota",
  /** 中文名。 */
  nameZh: "睿记",
  tagline: {
    en: "Read anything. Keep what matters. Ask your own notes.",
    "zh-CN": "读任何东西，留下有用的，然后问自己的笔记。",
  },
  email: "support@werenota.com",
  github: {
    chrome: "https://github.com/colin4k/contextflow",
    zotero: "https://github.com/colin4k/contextflow-zotero",
    android: "https://github.com/colin4k/FloatReader",
    cloud: "https://github.com/colin4k/renota-cloud",
  },
  /** 安装/下载入口。上架后把 store 链接填进来即可，页面不用改。 */
  links: {
    chromeStore: "",
    zoteroXpi: "https://github.com/colin4k/contextflow-zotero/releases/latest",
    androidApk: "https://github.com/colin4k/FloatReader/releases/latest",
  },
} as const;

export type ProductKey = "chrome" | "zotero" | "android";
