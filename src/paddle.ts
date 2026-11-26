// Paddle 环境配置与套餐定义。
//
// 两条原则：
// 1. 套餐只在这里改 —— 页面、脚本、按钮全部由 tiers 驱动，加一档不用碰模板。
// 2. 环境绝不设默认值 —— 读不到 PADDLE_ENVIRONMENT 就直接抛错。
//    默认值一旦写错，沙箱和线上会长得一模一样，出错时才发现就晚了。



/**
 * 试用天数。Paddle 侧的 price 已经按这个值配置，改这里的同时要改 Paddle。
 * 注意：结算页的「N 天免费试用」文案在 i18n 字典的 `plan.features` 里，
 * 改这个常量要连带改十份字面量，否则两个数字会对不上。
 */
export const TRIAL_DAYS = 3;

export interface Tier {
  /** 套餐名，同时用于页面上展示（`Pro` 不翻译） */
  name: string;
  /**
   * 标价，只用于「拿不到 PricePreview 时」的兜底展示（沙箱的 Paddle 目录里没有这些价，
   * 而 Waffo 这条主渠道的价格正是这两个数）。有 PricePreview 结果时一律以它为准。
   */
  amount: { currency: string; month: number; year: number };
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

/** 当前在售套餐。金额以 Paddle 的 formattedTotals 为准，这里的 `amount` 只在取不到时兜底。 */
export const tiers: Tier[] = [
  {
    name: "Pro",
    amount: { currency: "USD", month: 9.9, year: 100 },
    // 套餐卡片的描述与功能清单在 i18n 字典的 `plan` 段 —— 十种语言都要有，
    // 放在这里就得跟着语言表一起长。
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
