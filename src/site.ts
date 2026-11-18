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
   * 社区邀请链接（Discord）。
   * 用邀请链接而不是频道深链：没加入的人也能直接进来，进来后自然停在支持频道。
   */
  discord: "https://discord.gg/wx3NGRDu6Z",
  /**
   * 安装/下载入口。上架后把商店或发行页地址填进来即可，页面不用改；
   * 留空时对应的安装按钮只显示文案、不挂跳转。
   */
  links: {
    chromeStore: "",
    zoteroXpi: "",
    androidApk: "",
  },
} as const;

export type ProductKey = "chrome" | "zotero" | "android";
