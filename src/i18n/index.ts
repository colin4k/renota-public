import { en, type Content } from "./en.js";
import { zhCN } from "./zh-CN.js";
import { zhTW } from "./zh-TW.js";
import { ja } from "./ja.js";
import { ko } from "./ko.js";
import { fr } from "./fr.js";
import { de } from "./de.js";
import { es } from "./es.js";
import { pt } from "./pt.js";
import { ru } from "./ru.js";
import type { Locale } from "./locales.js";

export type { Content };

// 类型是 Record<Locale, Content>：任何一门语言缺字典都会在 typecheck 阶段失败，
// 和单门语言内部漏字段是同一套保护。
const dictionaries: Record<Locale, Content> = {
  en,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  ja,
  ko,
  fr,
  de,
  es,
  pt,
  ru,
};

export function content(locale: Locale): Content {
  return dictionaries[locale];
}

/**
 * <html lang> 里的写法。URL 段用 `pt` 是为了短，但正文是巴西葡语，
 * 声明成 pt-BR 才能让断字、读屏和拼写检查按对的口音处理。
 */
const HTML_LANGS: Record<Locale, string> = {
  en: "en",
  "zh-CN": "zh-CN",
  "zh-TW": "zh-TW",
  ja: "ja",
  ko: "ko",
  fr: "fr",
  de: "de",
  es: "es",
  pt: "pt-BR",
  ru: "ru",
};

export function htmlLang(locale: Locale): string {
  return HTML_LANGS[locale];
}

/**
 * Open Graph 要求 "language_TERRITORY" 形式，裸语言码（ja、fr）不被接受，
 * 所以这里显式映射到主要市场，而不是简单地把 "-" 换成 "_"。
 */
const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  "zh-CN": "zh_CN",
  "zh-TW": "zh_TW",
  ja: "ja_JP",
  ko: "ko_KR",
  fr: "fr_FR",
  de: "de_DE",
  es: "es_ES",
  pt: "pt_BR",
  ru: "ru_RU",
};

export function ogLocale(locale: Locale): string {
  return OG_LOCALES[locale];
}
