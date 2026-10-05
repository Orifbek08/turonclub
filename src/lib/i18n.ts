import { uz, type Texts } from "@content/texts/uz";
import { ru } from "@content/texts/ru";
import { en } from "@content/texts/en";

export const locales = ["uz", "ru", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uz";

export type Localized<T = string> = Record<Locale, T>;

const texts: Record<Locale, Texts> = { uz, ru, en };

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

/** "12-noyabr" / "12 ноября" / "12 November" */
export function shortDate(iso: string, locale: Locale): string {
  const { day, month } = dateParts(iso, locale);
  return locale === "uz" ? `${day}-${month}` : `${day} ${month}`;
}

/** Toshkent vaqti bilan bugungi sana, "YYYY-MM-DD" */
export function todayInTashkent(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tashkent" }).format(new Date());
}

export const ogLocale: Record<Locale, string> = { uz: "uz_UZ", ru: "ru_RU", en: "en_US" };
