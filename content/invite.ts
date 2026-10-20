/**
 * MAXFIY TAKLIF HAVOLASI — forumga bepul bilet (ID 4000 dan)
 *
 * Manzil: turonclub.uz/taklif/<kod>
 *   Sayt menyusida, sitemap'da va qidiruvda ko'rinmaydi — faqat havolani bilgan odam kiradi.
 *   Har bir reklama uchun alohida kod qo'shish mumkin: Sheets'dagi «Манба» ustunida
 *   qaysi havoladan kelgani yoziladi. Ro'yxatda yo'q kod bilan kirilsa — 404.
 *
 * endpoint — Google Apps Script veb-ilovasi manzili (apps-script/taklif-bilet.gs).
 *            Joylashtirgandan keyin berilgan ".../exec" manzilini shu yerga yozing.
 *
 * Savollar: har bir javobning `points` (ball) bor. Jami ball `minScore` dan kam bo'lmasa
 * va `stop: true` belgilangan javob tanlanmagan bo'lsa — odam formaga o'tadi.
 * Aks holda unga muloyim rad javobi ko'rsatiladi.
 */

export type InviteOption = { text: string; points: number; stop?: boolean };
export type InviteQuestion = { q: string; options: InviteOption[] };

export const invite = {
  endpoint: "https://script.google.com/macros/s/AKfycbx83dTzRFy3sKyxnCTihg1dQnkiSzm6iZrns5ddSqudbDAevi8hThTWGZ5MxUZXEPD7/exec",

  /** kod → Sheets'dagi «Манба» ustunida yoziladigan nom */
  links: {
    f27k9x: "Таргет реклама",
  } as Record<string, string>,

  /**
   * Минимал балл. 3 та саволда энг паст жавоблар ҳам 3 балл беради — демак форумга келолмайдиган
   * ёки 100 $ тўловга рози бўлмаган одамгина рад этилади (уларда `stop: true`).
   */
  minScore: 3,

  /** Forum ma'lumotlari (biletda chiqadi) */
  event: {
    title: "TURON халқаро бизнес клубининг расмий очилиш маросими",
    date: "27.10.2026",
    time: "09:00 – 17:00",
    venue: "Тошкент шаҳри, Юнусобод тумани, Ёшлар ижод саройи",
    fee: "100 $",
    /** Саволлар бўйича телефон (мос келмаганлар саҳифасида) */
    phone: "+998 92 001 32 57",
    /** Билет остидаги рақам: аниқ жойни банд қилиш ва тўлов бўйича */
    seatPhone: "+998 92 001 24 51",
  },

  /** САВОЛЛАР */
  questions: [
    {
      q: "Сиз қайси соҳада фаолият юритасиз?",
      options: [
        { text: "Ўз бизнесим бор (тадбиркорман)", points: 3 },
        { text: "Компания раҳбари ёки топ-менежерман", points: 3 },
        { text: "Инвесторман", points: 3 },
        { text: "Мутахассис ёки ходимман", points: 1 },
      ],
    },
    {
      q: "27 октябрь куни 09:00 дан 17:00 гача форумда қатнаша оласизми?",
      options: [
        { text: "Ҳа, тўлиқ қатнашаман", points: 2 },
        { text: "Қисман қатнаша оламан", points: 1 },
        { text: "Йўқ, бу кун банд", points: 0, stop: true },
      ],
    },
    {
      q: "Билет бепул, лекин ташкилий харажатлар учун 100 $ тўлов қилинади. Бунга тайёрмисиз?",
      options: [
        { text: "Ҳа, тайёрман", points: 1 },
        { text: "Йўқ", points: 0, stop: true },
      ],
    },
  ] as InviteQuestion[],
};
