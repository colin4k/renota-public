// 语言与 URL 规则。
//
// 只有「有真实翻译」的语言才会生成页面 —— 把英文内容复制到十种语言下会让搜索引擎
// 认为是重复内容，反而伤害排名。加一门语言 = 加一个字典文件 + 加一份法律全文 + 在这里登记。
//
// 语言清单与 contextflow（Chrome 扩展、Zotero 插件）保持一致，顺序也相同：
// 产品矩阵里同一门语言在各端应当是同一个代码。

import { site } from "../site.js";

export const locales = ["en", "zh-CN", "zh-TW", "ja", "ko", "fr", "de", "es", "pt", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** 页面标识（文件名），同时用于 URL 段。 */
export const pages = ["home", "chrome", "zotero", "android", "pricing", "privacy", "terms", "account"] as const;
export type PageKey = (typeof pages)[number];

/**
 * 语言切换器显示的语言名：一律用该语言的原生写法（endonym），
 * 这样界面语言是法语时，用户仍能认出「日本語」，而不是「Japanese」。
 */
export const localeLabels: Record<Locale, string> = {
  en: "English",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  ja: "日本語",
  ko: "한국어",
  fr: "Français",
  de: "Deutsch",
  es: "Español",
  pt: "Português",
  ru: "Русский",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** 某个语言下某页面的站内路径：英文在根，其它语言在 /<locale>/ 下。 */
export function pagePath(locale: Locale, page: PageKey): string {
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  const suffix = page === "home" ? "" : `/${page}`;
  return `${prefix}${suffix}/`.replace(/\/+/g, "/");
}

/** 绝对 URL，用于 canonical / sitemap / OG。 */
export function pageUrl(locale: Locale, page: PageKey): string {
  return `${site.url}${pagePath(locale, page)}`;
}
