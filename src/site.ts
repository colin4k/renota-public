// 站点级配置。改这里就能改所有页面里的链接与品牌信息。

// 两个环境（生产 / sandbox）共用一套代码，靠构建期环境变量区分子域。
const SITE_URL = (process.env.SITE_URL ?? "https://www.werenota.com").replace(/\/+$/, "");
const CLOUD_API = (process.env.CLOUD_API_BASE ?? "https://cloud.werenota.com").replace(/\/+$/, "");

export const site = {
  /** 线上域名，用于 canonical / sitemap / OG。 */
  url: SITE_URL,
  /** 后端 API 基址（account / billing / sync 都打到这里）。 */
  apiBase: CLOUD_API,
  /** 英文名（其余语言一律用它）。 */
  name: "Renota",
  /** 中文名。 */
  nameZh: "睿记",
  tagline: {
    en: "Read anything. Keep what matters. Ask your own notes.",
    "zh-CN": "读任何东西，留下有用的，然后问自己的笔记。",
  },
  email: "support@werenota.com",
  /**
   * 社区频道（Discord）。深链指向 #社区-support 频道：
   * 未加入服务器的人会先落到邀请/加入页，已加入的直接进频道。
   */
  discord: "https://discord.com/channels/1572220924869083206/1572221083614978138",
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
