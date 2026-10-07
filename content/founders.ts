/**
 * ASOSCHILAR
 * Tartib muhim: saytda shu ro'yxatdagi tartibda, chapdan o'ngga, teng turadi.
 * Bosh sahifadagi umumiy surat (asoschilar-birga.webp) — uchalasi birga tushgan surat:
 * yangi surat bo‘lsa, menga yuboring, fondan ajratib qo‘yaman.
 *
 * slug    — sahifa manzili: turonclub.uz/uz/founders/<slug>
 *           faqat kichik lotin harflari va chiziqcha: "ilxom-begimqulov"
 * name    — ism va familiya. Bo'sh ("") bo'lsa, rasm ostida faqat lavozim chiqadi.
 * company — kompaniyasi (bo'lmasa "").
 * photo   — public/images/founders/ papkasidagi fayl nomi.
 *           Fonsiz (shaffof) kvadrat rasm bo'lishi kerak; yangi rasm bo'lsa,
 *           menga yuboring, fondan ajratib, bir xil o'lchamga keltiraman.
 * bio     — qisqa tarjimai hol. Yozilgandan keyin asoschining alohida sahifasi ochiladi.
 * quote   — asoschining bir-ikki jumlali so'zi (birinchi asoschiniki bosh sahifada chiqadi).
 * focus   — faoliyat sohalari.
 * Bo'sh qoldirilgan maydonlar saytda ko'rinmaydi.
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

const empty = { uz: "", ru: "", en: "" };
const none = { uz: [], ru: [], en: [] };

export const founders: Founder[] = [
  {
    slug: "ilxom-begimqulov",
    name: { uz: "Ilhom Begimqulov", ru: "Илхом Бегимкулов", en: "Ilkhom Begimkulov" },
    role: { uz: "Klub prezidenti", ru: "Президент клуба", en: "President of the club" },
    company: "",
    photo: "ilxom-begimqulov.webp",
    focus: none,
    bio: empty,
    quote: empty,
  },
  {
    slug: "farrux-fazliyev",
    name: { uz: "Farrux Fazliyev", ru: "Фаррух Фазлиев", en: "Farrukh Fazliev" },
    role: {
      uz: "O‘zbekiston Milliy iqtisodiy hamkorlik uyushmasi raisi",
      ru: "Председатель Национальной ассоциации экономического сотрудничества Узбекистана",
      en: "Chairman of the National Association for Economic Cooperation of Uzbekistan",
    },
    company: "",
    photo: "farrux-fazliyev.webp",
    focus: none,
    bio: empty,
    quote: empty,
  },
  {
    slug: "shavkat-dadajonov",
    name: { uz: "Shavkat Dadajonov", ru: "Шавкат Дадажонов", en: "Shavkat Dadajonov" },
    role: { uz: "Biznesmen, investor, ustoz", ru: "Бизнесмен, инвестор, наставник", en: "Businessman, investor, mentor" },
    company: "",
    photo: "shavkat-dadajonov.webp",
    focus: none,
    bio: empty,
    quote: empty,
  },
];

/** Saytda ko'rsatish tartibi: ro'yxatdagi tartibda, chapdan o'ngga, hammasi teng */
export function foundersOnStage(): Founder[] {
  return founders;
}

/** Tarjimai holi yozilgan asoschilargina alohida sahifaga ega */
export function hasPage(f: Founder): boolean {
  return f.bio.uz.trim().length > 0;
}
