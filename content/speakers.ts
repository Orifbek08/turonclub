/**
 * SPIKERLAR
 * Yangi spiker qo'shish: quyidagi bloklardan birini nusxalab, ma'lumotni almashtiring.
 *
 * slug  — sahifa manzili: turonclub.uz/uz/speakers/<slug>
 *         faqat kichik lotin harflari va chiziqcha: "alisher-karimov"
 * photo — rasmni public/images/speakers/ papkasiga qo'ying va fayl nomini shu yerga yozing.
 *         Fayl nomini ham slug kabi yozing: "alisher-karimov.jpg" (SEO uchun).
 *         Tavsiya: vertikal 4:5, kamida 1200×1500 piksel.
 *         photo: "" bo'lsa, o'rnida naqshli ramka va ism bosh harflari ko'rinadi.
 */
import type { Localized } from "@/lib/i18n";

export type Speaker = {
  slug: string;
  name: Localized;
  role: Localized;
  company: string;
  photo: string;
  topics: Localized<string[]>;
  bio: Localized;
};

export const speakers: Speaker[] = [
  {
    slug: "spiker-1",
    name: { uz: "Ism Familiya", ru: "Имя Фамилия", en: "First Last" },
    role: { uz: "Asoschi", ru: "Основатель", en: "Founder" },
    company: "Kompaniya nomi",
    photo: "",
    topics: {
      uz: ["Strategiya", "Investitsiyalar"],
      ru: ["Стратегия", "Инвестиции"],
      en: ["Strategy", "Investment"],
    },
    bio: {
      uz: "Spiker haqida qisqa ma’lumot: tajribasi, asosiy yutuqlari va klubda qaysi mavzuda so‘zlashi.",
      ru: "Краткая информация о спикере: опыт, ключевые достижения и тема выступления в клубе.",
      en: "A short profile of the speaker: background, key achievements and the topic of their talk at the club.",
    },
  },
  {
    slug: "spiker-2",
    name: { uz: "Ism Familiya", ru: "Имя Фамилия", en: "First Last" },
    role: { uz: "Bosh direktor", ru: "Генеральный директор", en: "Chief Executive Officer" },
    company: "Kompaniya nomi",
    photo: "",
    topics: {
      uz: ["Boshqaruv", "Eksport"],
      ru: ["Управление", "Экспорт"],
      en: ["Management", "Export"],
    },
    bio: {
      uz: "Spiker haqida qisqa ma’lumot: tajribasi, asosiy yutuqlari va klubda qaysi mavzuda so‘zlashi.",
      ru: "Краткая информация о спикере: опыт, ключевые достижения и тема выступления в клубе.",
      en: "A short profile of the speaker: background, key achievements and the topic of their talk at the club.",
    },
  },
  {
    slug: "spiker-3",
    name: { uz: "Ism Familiya", ru: "Имя Фамилия", en: "First Last" },
    role: { uz: "Boshqaruv raisi", ru: "Председатель правления", en: "Chairman of the Board" },
    company: "Kompaniya nomi",
    photo: "",
    topics: {
      uz: ["Moliya", "Bank sektori"],
      ru: ["Финансы", "Банковский сектор"],
      en: ["Finance", "Banking"],
    },
    bio: {
      uz: "Spiker haqida qisqa ma’lumot: tajribasi, asosiy yutuqlari va klubda qaysi mavzuda so‘zlashi.",
      ru: "Краткая информация о спикере: опыт, ключевые достижения и тема выступления в клубе.",
      en: "A short profile of the speaker: background, key achievements and the topic of their talk at the club.",
    },
  },
  {
    slug: "spiker-4",
    name: { uz: "Ism Familiya", ru: "Имя Фамилия", en: "First Last" },
    role: { uz: "Hammuassis", ru: "Сооснователь", en: "Co-founder" },
    company: "Kompaniya nomi",
    photo: "",
    topics: {
      uz: ["Texnologiyalar", "Ishlab chiqarish"],
      ru: ["Технологии", "Производство"],
      en: ["Technology", "Manufacturing"],
    },
    bio: {
      uz: "Spiker haqida qisqa ma’lumot: tajribasi, asosiy yutuqlari va klubda qaysi mavzuda so‘zlashi.",
      ru: "Краткая информация о спикере: опыт, ключевые достижения и тема выступления в клубе.",
      en: "A short profile of the speaker: background, key achievements and the topic of their talk at the club.",
    },
  },
];
