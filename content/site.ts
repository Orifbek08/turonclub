/**
 * KLUB HAQIDA ASOSIY MA'LUMOTLAR
 * Shu faylni to'ldiring: telefon, manzil, ijtimoiy tarmoqlar, rahbar.
 * Har bir matn uch tilda yoziladi: uz, ru, en.
 */
import type { Localized } from "@/lib/i18n";

export const site = {
  name: "Turon Club",

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
    uz: "“Turon Club” MChJ",
    ru: "ООО «Turon Club»",
    en: "Turon Club LLC",
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
   * Klub rahbari. Rasmni public/images/team/ papkasiga qo'ying va fayl nomini
   * `photo` ga yozing, masalan "ism-familiya.jpg". Bo'sh bo'lsa, naqshli ramka ko'rinadi.
   */
  leader: {
    name: "Ism Familiya",
    photo: "",
    role: {
      uz: "Turon Club asoschisi",
      ru: "Основатель Turon Club",
      en: "Founder of Turon Club",
    } satisfies Localized,
    quote: {
      uz: "Bu yerga rahbarning klub maqsadi haqidagi bir-ikki jumlasi yoziladi.",
      ru: "Здесь будут одна-две фразы руководителя о цели клуба.",
      en: "One or two sentences from the founder about the purpose of the club go here.",
    } satisfies Localized,
  },

  /**
   * Bosh sahifadagi raqamlar. Hozir bo'sh, shuning uchun bo'lim ko'rinmaydi.
   * Faqat haqiqiy raqamlarni yozing. Namuna:
   * { value: "120", label: { uz: "klub a’zosi", ru: "членов клуба", en: "club members" } },
   */
  stats: [] as { value: string; label: Localized }[],
};
