import { en, type Content } from "./en.js";
import { zhCN } from "./zh-CN.js";
import type { Locale } from "./locales.js";

export type { Content };

const dictionaries: Record<Locale, Content> = {
  en,
  "zh-CN": zhCN,
};

export function content(locale: Locale): Content {
  return dictionaries[locale];
}

/** 语言在 <html lang> 与 hreflang 里的写法。 */
export function htmlLang(locale: Locale): string {
  return locale;
}

/** OG locale 格式（zh-CN → zh_CN）。 */
export function ogLocale(locale: Locale): string {
  return locale.replace("-", "_");
}
