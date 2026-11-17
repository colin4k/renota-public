// Paddle 环境配置与套餐定义。
//
// 两条原则：
// 1. 套餐只在这里改 —— 页面、脚本、按钮全部由 tiers 驱动，加一档不用碰模板。
// 2. 环境绝不设默认值 —— 读不到 PADDLE_ENVIRONMENT 就直接抛错。
//    默认值一旦写错，沙箱和线上会长得一模一样，出错时才发现就晚了。

export type Localized<T> = { en: T; "zh-CN": T };

/** 试用天数。Paddle 侧的 price 已经按这个值配置，改这里的同时要改 Paddle。 */
export const TRIAL_DAYS = 3;

export interface Tier {
  /** 套餐名，同时用于页面上展示 */
  name: string;
  description: Localized<string>;
  features: Localized<string[]>;
  /**
   * 每档在 Paddle 侧有四个价：同一金额、同一周期，差别只在有没有试用。
   * 试用是绑在 price 上的，没法在结账时开关，所以「订阅」和「试用」
   * 必须各走各的 price id。
   */
  priceId: {
    /** 试用版，到期自动扣费 */
    month: string;
    year: string;
    /** 立即扣费，无试用 */
    monthImmediate: string;
    yearImmediate: string;
  };
}

export type BillingPeriod = "month" | "year";

/** 当前在售套餐。价格展示一律取 Paddle 的 formattedTotals，这里不存金额。 */
export const tiers: Tier[] = [
  {
    name: "Pro",
    description: {
      en: "Full access across Chrome, Zotero and Android.",
      "zh-CN": "Chrome 扩展、Zotero 插件和安卓端的全部功能。",
    },
    features: {
      // 产品只保存原文和笔记，不提供高亮/划线功能 —— 别再写 highlights。
      en: [
        `Save original text and your own notes, without limits`,
        "Ask questions across your own library",
        "Sync between Chrome, Zotero and Android",
        `${TRIAL_DAYS}-day free trial, cancel anytime`,
      ],
      "zh-CN": [
        "原文与笔记不限量保存",
        "在自己的知识库上提问",
        "在 Chrome、Zotero 和安卓之间同步",
        `${TRIAL_DAYS} 天免费试用，随时取消`,
      ],
    },
    priceId: {
      // 试用版（试用结束自动扣费）
      month: "pri_01m7m2w8hefs183bfmtfscqqfh",
      year: "pri_01m7m2wa4v6n188drb5w1q59n2",
      // 立即扣费，无试用
      monthImmediate: "pri_01m7m2wc79cfyez00k0s56xhqv",
      yearImmediate: "pri_01m7m2wfyqrnzbcxn9wh4r2dkc",
    },
  },
];

export type PaddleEnvironment = "sandbox" | "production";

export interface PaddleClientConfig {
  environment: PaddleEnvironment;
  /** client-side token，会出现在页面里，这是它的设计用途 */
  clientToken: string;
}

/** 环境与 token 前缀必须成对出现，否则说明拿错了凭据。 */
const TOKEN_PREFIX: Record<PaddleEnvironment, string> = {
  sandbox: "test_",
  production: "live_",
};

export function readPaddleClientConfig(env: Record<string, string | undefined> = process.env): PaddleClientConfig {
  const rawEnvironment = env.PADDLE_ENVIRONMENT?.trim();
  if (!rawEnvironment) {
    throw new Error(
      "PADDLE_ENVIRONMENT 未设置。请显式设为 sandbox 或 production —— 这里刻意不提供默认值，" +
        "否则一次疏忽就会让页面连到错的 Paddle 账户。",
    );
  }
  if (rawEnvironment !== "sandbox" && rawEnvironment !== "production") {
    throw new Error(`PADDLE_ENVIRONMENT 只能是 sandbox 或 production，当前值是「${rawEnvironment}」。`);
  }

  const clientToken = env.PADDLE_CLIENT_TOKEN?.trim();
  if (!clientToken) {
    throw new Error(
      "PADDLE_CLIENT_TOKEN 未设置。在 Paddle > Developer tools > Authentication 创建 client-side token 后填入 .env。",
    );
  }

  const expected = TOKEN_PREFIX[rawEnvironment];
  if (!clientToken.startsWith(expected)) {
    throw new Error(
      `PADDLE_ENVIRONMENT=${rawEnvironment}，但 PADDLE_CLIENT_TOKEN 不以 ${expected} 开头 —— ` +
        "环境与令牌不匹配，已拒绝构建。",
    );
  }

  return { environment: rawEnvironment, clientToken };
}

/**
 * 合法的国家码判定。
 * 服务端没拿到可靠国家时，宁可什么都不传（交给 Paddle 按 IP 自动判断），
 * 也绝不能把 'unknown' / 'OTHERS' 这类内部占位符当成国家码发给 Paddle。
 */
export function isCountryCode(value: string | null | undefined): value is string {
  return typeof value === "string" && /^[A-Z]{2}$/.test(value);
}
