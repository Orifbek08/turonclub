/**
 * TADBIRLAR
 * date  — "YYYY-MM-DD" ko'rinishida. Sana o'tib ketgach, tadbir o'zi
 *         "O'tgan tadbirlar" bo'limiga tushadi.
 * time  — boshlanish vaqti, masalan "18:30". Hali aniq bo'lmasa "" qoldiring.
 * venue — joy. Hali aniq bo'lmasa uchala tilda "" qoldiring.
 * guest — taklif etilgan mehmon yoki so'zlovchi (bo'lmasa uchala tilda "").
 * link  — tadbirning saytdagi alohida sahifasi (bo'lmasa ""), masalan "/forum".
 */
import type { Localized } from "@/lib/i18n";

export type ClubEvent = {
  slug: string;
  date: string;
  time: string;
  title: Localized;
  summary: Localized;
  venue: Localized;
  guest: Localized;
  link: string;
};

export const events: ClubEvent[] = [
  {
    slug: "ochilish-marosimi-forum",
    date: "2026-10-27",
    time: "",
    title: {
      uz: "Turon xalqaro biznes klubining ochilish marosimi va forum",
      ru: "Церемония открытия международного бизнес-клуба Turon и форум",
      en: "Opening ceremony of Turon International Business Club and forum",
    },
    summary: {
      uz: "Klubning rasmiy ochilishi va bir kunlik biznes forum.",
      ru: "Официальное открытие клуба и однодневный бизнес-форум.",
      en: "The official opening of the club and a one-day business forum.",
    },
    venue: { uz: "", ru: "", en: "" },
    guest: { uz: "", ru: "", en: "" },
    link: "/forum",
  },
];
