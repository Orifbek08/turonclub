/**
 * ASOSCHILAR
 * Yangi asoschi qo'shish: quyidagi bloklardan birini nusxalab, ma'lumotni almashtiring.
 * Ro'yxatdagi BIRINCHI asoschi bosh sahifada katta iqtibos bilan chiqadi.
 *
 * slug  — sahifa manzili: turonclub.uz/uz/founders/<slug>
 *         faqat kichik lotin harflari va chiziqcha: "alisher-karimov"
 * photo — rasmni public/images/founders/ papkasiga qo'ying va fayl nomini shu yerga yozing.
 *         Fayl nomini ham slug kabi yozing: "alisher-karimov.jpg" (SEO uchun).
 *         Tavsiya: vertikal 4:5, kamida 1200×1500 piksel, bir xil fon va yorug'lik.
 *         photo: "" bo'lsa, o'rnida naqshli ramka va ism bosh harflari ko'rinadi.
 * quote — asoschining bir-ikki jumlali so'zi (bo'lmasa uchala tilda "" qoldiring).
 */
import type { Localized } from "@/lib/i18n";

export type Founder = {
  slug: string;
  name: Localized;
  role: Localized;
  company: string;
  photo: string;
  focus: Localized<string[]>;
  bio: Localized;
  quote: Localized;
};

export const founders: Founder[] = [
  {
    slug: "asoschi-1",
    name: { uz: "Ism Familiya", ru: "Имя Фамилия", en: "First Last" },
    role: { uz: "Asoschi", ru: "Основатель", en: "Founder" },
    company: "Kompaniya nomi",
    photo: "",
    focus: {
      uz: ["Strategiya", "Investitsiyalar"],
      ru: ["Стратегия", "Инвестиции"],
      en: ["Strategy", "Investment"],
    },
    bio: {
      uz: "Asoschi haqida qisqa ma’lumot: qaysi biznesni qurgani, asosiy yutuqlari va klubdagi o‘rni.",
      ru: "Краткая информация об основателе: какой бизнес он построил, ключевые достижения и роль в клубе.",
      en: "A short profile of the founder: the business they built, key achievements and their role in the club.",
    },
    quote: {
      uz: "Bu yerga asoschining klub maqsadi haqidagi bir-ikki jumlasi yoziladi.",
      ru: "Здесь будут одна-две фразы основателя о цели клуба.",
      en: "One or two sentences from the founder about the purpose of the club go here.",
    },
  },
  {
    slug: "asoschi-2",
    name: { uz: "Ism Familiya", ru: "Имя Фамилия", en: "First Last" },
    role: { uz: "Bosh direktor", ru: "Генеральный директор", en: "Chief Executive Officer" },
    company: "Kompaniya nomi",
    photo: "",
    focus: {
      uz: ["Boshqaruv", "Eksport"],
      ru: ["Управление", "Экспорт"],
      en: ["Management", "Export"],
    },
    bio: {
      uz: "Asoschi haqida qisqa ma’lumot: qaysi biznesni qurgani, asosiy yutuqlari va klubdagi o‘rni.",
      ru: "Краткая информация об основателе: какой бизнес он построил, ключевые достижения и роль в клубе.",
      en: "A short profile of the founder: the business they built, key achievements and their role in the club.",
    },
    quote: {
      uz: "Bu yerga asoschining klub maqsadi haqidagi bir-ikki jumlasi yoziladi.",
      ru: "Здесь будут одна-две фразы основателя о цели клуба.",
      en: "One or two sentences from the founder about the purpose of the club go here.",
    },
  },
  {
    slug: "asoschi-3",
    name: { uz: "Ism Familiya", ru: "Имя Фамилия", en: "First Last" },
    role: { uz: "Boshqaruv raisi", ru: "Председатель правления", en: "Chairman of the Board" },
    company: "Kompaniya nomi",
    photo: "",
    focus: {
      uz: ["Moliya", "Bank sektori"],
      ru: ["Финансы", "Банковский сектор"],
      en: ["Finance", "Banking"],
    },
    bio: {
      uz: "Asoschi haqida qisqa ma’lumot: qaysi biznesni qurgani, asosiy yutuqlari va klubdagi o‘rni.",
      ru: "Краткая информация об основателе: какой бизнес он построил, ключевые достижения и роль в клубе.",
      en: "A short profile of the founder: the business they built, key achievements and their role in the club.",
    },
    quote: {
      uz: "Bu yerga asoschining klub maqsadi haqidagi bir-ikki jumlasi yoziladi.",
      ru: "Здесь будут одна-две фразы основателя о цели клуба.",
      en: "One or two sentences from the founder about the purpose of the club go here.",
    },
  },
  {
    slug: "asoschi-4",
    name: { uz: "Ism Familiya", ru: "Имя Фамилия", en: "First Last" },
    role: { uz: "Hammuassis", ru: "Сооснователь", en: "Co-founder" },
    company: "Kompaniya nomi",
    photo: "",
    focus: {
      uz: ["Texnologiyalar", "Ishlab chiqarish"],
      ru: ["Технологии", "Производство"],
      en: ["Technology", "Manufacturing"],
    },
    bio: {
      uz: "Asoschi haqida qisqa ma’lumot: qaysi biznesni qurgani, asosiy yutuqlari va klubdagi o‘rni.",
      ru: "Краткая информация об основателе: какой бизнес он построил, ключевые достижения и роль в клубе.",
      en: "A short profile of the founder: the business they built, key achievements and their role in the club.",
    },
    quote: {
      uz: "Bu yerga asoschining klub maqsadi haqidagi bir-ikki jumlasi yoziladi.",
      ru: "Здесь будут одна-две фразы основателя о цели клуба.",
      en: "One or two sentences from the founder about the purpose of the club go here.",
    },
  },
];
