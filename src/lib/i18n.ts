import { uz, type Texts } from "@content/texts/uz";
import { ru } from "@content/texts/ru";
import { en } from "@content/texts/en";
import { deepCyrillic } from "./cyrillic";

/** Sayt tillari: o'zbek (lotin), o'zbek (kirill), rus, ingliz */
export const locales = ["uz", "uz-cyrl", "ru", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uz";

/**
 * Uch tilda yoziladigan matn. Kirillcha variant lotinchadan avtomatik
 * hosil bo'ladi; kerak bo'lsa "uz-cyrl" kaliti bilan qo'lda yozish mumkin.
 */
export type Localized<T = string> = { uz: T; ru: T; en: T; "uz-cyrl"?: T };

/** Matnning kerakli tildagi variantini oladi */
export function pick<T>(value: Localized<T>, locale: Locale): T {
  if (locale === "uz-cyrl") return value["uz-cyrl"] ?? deepCyrillic(value.uz);
  return value[locale];
}

const texts: Record<Locale, Texts> = { uz, "uz-cyrl": deepCyrillic(uz), ru, en };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getTexts(locale: Locale): Texts {
  return texts[locale];
}

/** Sayt ichidagi havola: href("ru", "/founders") -> "/ru/founders" */
export function href(locale: Locale, path = ""): string {
  return `/${locale}${path === "/" ? "" : path}`;
}

export function dateParts(iso: string, locale: Locale) {
  const [y, m, d] = iso.split("-").map(Number);
  const month = getTexts(locale).months[m - 1];
  return { day: d, month, year: y };
}

/** "12-noyabr" / "12-ноябрь" / "12 ноября" / "12 November" */
export function shortDate(iso: string, locale: Locale): string {
  const { day, month } = dateParts(iso, locale);
  return locale === "uz" || locale === "uz-cyrl" ? `${day}-${month}` : `${day} ${month}`;
}

/** "2026-yil 27-oktabr" / "27 октября 2026" / "27 October 2026" */
export function longDate(iso: string, locale: Locale): string {
  const { day, month, year } = dateParts(iso, locale);
  if (locale === "uz") return `${year}-yil ${day}-${month}`;
  if (locale === "uz-cyrl") return `${year}-йил ${day}-${month}`;
  return `${day} ${month} ${year}`;
}

/** Toshkent vaqti bilan bugungi sana, "YYYY-MM-DD" */
export function todayInTashkent(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tashkent" }).format(new Date());
}

/** <html lang> va hreflang uchun til kodlari */
export const langTag: Record<Locale, string> = { uz: "uz", "uz-cyrl": "uz-Cyrl", ru: "ru", en: "en" };
export const ogLocale: Record<Locale, string> = { uz: "uz_UZ", "uz-cyrl": "uz_UZ", ru: "ru_RU", en: "en_US" };
