// 语言与 URL 规则。
//
// 只有「有真实翻译」的语言才会生成页面 —— 把英文内容复制到十种语言下会让搜索引擎
// 认为是重复内容，反而伤害排名。加一门语言 = 加一个字典文件 + 在这里登记。

import { site } from "../site.js";

export const locales = ["en", "zh-CN"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** 页面标识（文件名），同时用于 URL 段。 */
export const pages = ["home", "chrome", "zotero", "android", "privacy"] as const;
export type PageKey = (typeof pages)[number];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  "zh-CN": "简体中文",
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
