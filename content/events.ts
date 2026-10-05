/**
 * TADBIRLAR
 * date — "YYYY-MM-DD" ko'rinishida. Sana o'tib ketgach, tadbir o'zi
 *        "O'tgan tadbirlar" bo'limiga tushadi.
 * time — boshlanish vaqti, masalan "18:30".
 * speakerSlug — content/speakers.ts dagi spikerning slug'i (bo'lmasa "").
 * photo — public/images/events/ papkasidagi rasm nomi. Hozircha saytda ishlatilmaydi,
 *         ijtimoiy tarmoqda ulashilganda chiqadigan rasm uchun saqlab qo'yilgan.
 */
import type { Localized } from "@/lib/i18n";

export type ClubEvent = {
  slug: string;
  date: string;
  time: string;
  title: Localized;
  summary: Localized;
  venue: Localized;
  speakerSlug: string;
  photo: string;
};

export const events: ClubEvent[] = [
  {
    slug: "tadbir-1",
    date: "2026-11-12",
    time: "18:30",
    title: {
      uz: "Tadbir nomi: spiker bilan yopiq uchrashuv",
      ru: "Название события: закрытая встреча со спикером",
      en: "Event title: a closed evening with a speaker",
    },
    summary: {
      uz: "Tadbir mavzusi va unda nimalar muhokama qilinishi haqida ikki jumla.",
      ru: "Два предложения о теме события и о том, что будет обсуждаться.",
      en: "Two sentences on the topic of the event and what will be discussed.",
    },
    venue: {
      uz: "Toshkent, o‘tkaziladigan joy",
      ru: "Ташкент, место проведения",
      en: "Tashkent, venue",
    },
    speakerSlug: "spiker-1",
    photo: "",
  },
  {
    slug: "tadbir-2",
    date: "2026-11-26",
    time: "19:00",
    title: {
      uz: "Tadbir nomi: soha rahbarlari davra suhbati",
      ru: "Название события: круглый стол руководителей отрасли",
      en: "Event title: a round table of industry leaders",
    },
    summary: {
      uz: "Tadbir mavzusi va unda nimalar muhokama qilinishi haqida ikki jumla.",
      ru: "Два предложения о теме события и о том, что будет обсуждаться.",
      en: "Two sentences on the topic of the event and what will be discussed.",
    },
    venue: {
      uz: "Toshkent, o‘tkaziladigan joy",
      ru: "Ташкент, место проведения",
      en: "Tashkent, venue",
    },
    speakerSlug: "spiker-2",
    photo: "",
  },
  {
    slug: "tadbir-3",
    date: "2026-12-10",
    time: "18:30",
    title: {
      uz: "Tadbir nomi: yil yakuni uchrashuvi",
      ru: "Название события: итоговая встреча года",
      en: "Event title: the year-end meeting",
    },
    summary: {
      uz: "Tadbir mavzusi va unda nimalar muhokama qilinishi haqida ikki jumla.",
      ru: "Два предложения о теме события и о том, что будет обсуждаться.",
      en: "Two sentences on the topic of the event and what will be discussed.",
    },
    venue: {
      uz: "Toshkent, o‘tkaziladigan joy",
      ru: "Ташкент, место проведения",
      en: "Tashkent, venue",
    },
    speakerSlug: "spiker-3",
    photo: "",
  },
];
