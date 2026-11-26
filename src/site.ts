// 站点级配置。改这里就能改所有页面里的链接与品牌信息。

// 两个环境（生产 / sandbox）共用一套代码，靠构建期环境变量区分子域。
const SITE_URL = (process.env.SITE_URL ?? "https://www.werenota.com").replace(/\/+$/, "");
const CLOUD_API = (process.env.CLOUD_API_BASE ?? "https://cloud.werenota.com").replace(/\/+$/, "");

export type ProductKey = "chrome" | "zotero" | "android";

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
   *
   * chromeCrx 是本站自托管的 .crx：必须用**商店发布的那份**（扩展 ID 与商店一致），
   * 不要拿本地 `npm run package:crx` 的产物替换 —— 本地签名是另一把钥匙，
   * 装出来是第二个扩展，本地数据不互通。商店每次发版后覆盖这个文件即可。
   */
  links: {
    chromeStore: "https://chromewebstore.google.com/detail/renota/iebpcobgihlbcndpbmjcjdloegoedbel",
    chromeCrx: "/downloads/renota-extension.crx",
    zoteroXpi: "/downloads/renota-zotero-1.1.0.xpi",
    androidApk: "",
  },
  /**
   * 已上架的产品。为 true 时：安装按钮挂真实入口（Chrome 是打开获取方式的浮层），
   * 页面上的状态写「可用」而不是「即将推出」。为 false 的仍是不可点的占位按钮。
   */
  released: {
    chrome: true,
    zotero: true,
    android: false,
  },
  /**
   * 自建 Umami 的页面统计。两者都为空时页面里不会出现任何脚本 ——
   * 本地预览、没有配置的构建产物依然是纯静态站。
   *
   * 构建期从环境变量读（`UMAMI_SRC` / `UMAMI_WEBSITE_ID`），不写死在仓库里：
   * 站点 id 不是秘密，但换实例时不该改代码。
   */
  umami: {
    src: (process.env.UMAMI_SRC ?? "").replace(/\/+$/, ""),
    websiteId: process.env.UMAMI_WEBSITE_ID ?? "",
  },
} as const;
