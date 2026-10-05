/**
 * KLUB HAQIDA ASOSIY MA'LUMOTLAR
 * Shu faylni to'ldiring: telefon, manzil, ijtimoiy tarmoqlar, rahbar.
 * Har bir matn uch tilda yoziladi: uz, ru, en.
 */
import type { Localized } from "@/lib/i18n";

export const site = {
  name: "Turon",

  /** Logotip ostidagi yozuv */
  descriptor: {
    uz: "Xalqaro biznes klubi",
    ru: "Международный бизнес-клуб",
    en: "International Business Club",
  } satisfies Localized,

  /** Sayt manzili. Oxirida "/" bo'lmasin. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://turonclub.uz",

  /**
   * MUHIM: hozir sayt qidiruv tizimlaridan yashirilgan (namunaviy matnlar
   * Google va Yandex'ga tushib qolmasligi uchun).
   * Haqiqiy ma'lumotlarni to'ldirib bo'lgach, `true` qiling.
   */
  indexable: false,

  /** Yuridik shaxs nomi, masalan: "TURON CLUB" MChJ */
  legalName: {
    uz: "“Turon” MChJ",
    ru: "ООО «Turon»",
    en: "Turon LLC",
  } satisfies Localized,

  phone: "+998 00 000 00 00",
  email: "info@turonclub.uz",

  address: {
    uz: "Toshkent shahri, ko‘cha va uy raqami",
    ru: "г. Ташкент, улица и номер дома",
    en: "Tashkent, street and building number",
  } satisfies Localized,

  hours: {
    uz: "Dushanba – shanba, 10:00 – 19:00",
    ru: "Понедельник – суббота, 10:00 – 19:00",
    en: "Monday – Saturday, 10:00 – 19:00",
  } satisfies Localized,

  /** Bo'sh qoldirilgan tarmoq saytda ko'rinmaydi. */
  socials: {
    telegram: "",
    instagram: "",
    youtube: "",
    facebook: "",
    linkedin: "",
  },

  /**
   * Bosh sahifadagi raqamlar. Hozir bo'sh, shuning uchun bo'lim ko'rinmaydi.
   * Faqat haqiqiy raqamlarni yozing (sahifada ular sanab chiqiladi). Namuna:
   * { value: 120, suffix: "+", label: { uz: "klub a’zosi", ru: "членов клуба", en: "club members" } },
   */
  stats: [] as { value: number; suffix: string; label: Localized }[],
};
