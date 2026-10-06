/**
 * KLUB HAQIDA ASOSIY MA'LUMOTLAR
 * Shu faylni to'ldiring: telefon, manzil, ijtimoiy tarmoqlar.
 * Har bir matn uch tilda yoziladi: uz (lotin), ru, en.
 * O'zbek kirill varianti lotinchadan avtomatik hosil bo'ladi.
 */
import type { Localized } from "@/lib/i18n";

export const site = {
  name: "Turon",

  /** Qidiruv tizimlari va brauzer sarlavhasi uchun to'liq nom */
  brand: "Turon Club",

  /** Odamlar qidiruvda yozishi mumkin bo'lgan boshqa nomlar */
  alternateNames: [
    "Turon xalqaro biznes klubi",
    "Turon International Business Club",
    "Международный бизнес-клуб Turon",
    "Turon biznes klubi",
    "Turon klub",
    "Турон клуб",
  ],

  /** Logotip ostidagi yozuv */
  descriptor: {
    uz: "Xalqaro biznes klubi",
    ru: "Международный бизнес-клуб",
    en: "International Business Club",
  } satisfies Localized,

  /** Sayt manzili. Oxirida "/" bo'lmasin. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://turonclub.uz",

  /**
   * Sayt qidiruv tizimlariga (Google, Yandex) ochiq.
   * Yopish kerak bo'lsa, `false` qiling.
   */
  indexable: true,

  /**
   * Google Search Console va Yandex Webmaster tasdiqlash kodlari.
   * Xizmat bergan kodni (faqat content="..." ichidagi qismini) shu yerga yozing.
   */
  verification: {
    google: "",
    yandex: "",
  },

  /**
   * Aloqa ma'lumotlari. Bo'sh ("") qoldirilgani saytda ko'rinmaydi.
   * Telefon namunasi: "+998 90 123 45 67"
   */
  phone: "",
  email: "",

  address: {
    uz: "",
    ru: "",
    en: "",
  } satisfies Localized,

  /** Ish vaqti, masalan uz: "Dushanba – shanba, 10:00 – 19:00" */
  hours: {
    uz: "",
    ru: "",
    en: "",
  } satisfies Localized,

  /**
   * Bosh sahifaning birinchi ekranidagi rasm: uch asoschi birga turgan surat.
   * Faylni public/images/founders/ papkasiga qo'ying va nomini shu yerga yozing,
   * masalan "asoschilar.png". Bo'sh bo'lsa, o'rnida uch asoschining alohida
   * portretlari yonma-yon chiqadi.
   * Tavsiya: fonsiz (shaffof PNG) yoki to'q fonli, kamida 2000 piksel kenglikda.
   */
  heroPhoto: "asoschilar.webp",

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
