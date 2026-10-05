/**
 * KLUB HAQIDA ASOSIY MA'LUMOTLAR
 * Shu faylni to'ldiring: telefon, manzil, ijtimoiy tarmoqlar.
 * Har bir matn uch tilda yoziladi: uz (lotin), ru, en.
 * O'zbek kirill varianti lotinchadan avtomatik hosil bo'ladi.
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

  /**
   * Ijtimoiy tarmoqlar. Havolani to'liq yozing: "https://instagram.com/..."
   * Instagram, LinkedIn va Facebook belgisi doim ko'rinadi (havola bo'lmasa, bosilmaydi).
   * Telegram va YouTube faqat havola yozilganda chiqadi.
   */
  socials: {
    instagram: "",
    linkedin: "",
    facebook: "",
    telegram: "",
    youtube: "",
  },

  /**
   * Bitrix24 CRM-forma: saytdagi arizalar shu formaga tushadi.
   * Qiymatlar Bitrix24 bergan koddan olingan (data-b24-form="inline/386/amnir2").
   * Bitrix24'da formaga maydon qo'shsangiz yoki o'chirsangiz, shu yerni ham yangilang.
   */
  bitrix: {
    address: "https://asia-holding.bitrix24.kz",
    formId: "386",
    sec: "amnir2",
    fields: {
      name: "CONTACT_NAME",
      phone: "CONTACT_PHONE",
      business: "DEAL_UF_CRM_67972930C4E4A",
      turnover: "DEAL_UF_CRM_1763981293632",
    },
  },

  /**
   * Bosh sahifadagi raqamlar. Hozir bo'sh, shuning uchun bo'lim ko'rinmaydi.
   * Faqat haqiqiy raqamlarni yozing (sahifada ular sanab chiqiladi). Namuna:
   * { value: 120, suffix: "+", label: { uz: "klub a’zosi", ru: "членов клуба", en: "club members" } },
   */
  stats: [] as { value: number; suffix: string; label: Localized }[],
};
