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

  minScore: 7,

  /** Forum ma'lumotlari (biletda chiqadi) */
  event: {
    title: "Турон халқаро бизнес клубининг расмий очилиш маросими",
    date: "27.10.2026",
    time: "09:00 – 17:00",
    venue: "Тошкент шаҳри, Юнусобод тумани, Ёшлар ижод саройи",
    fee: "100 $",
    /** Саволлар бўйича телефон (мос келмаганлар саҳифасида) */
    phone: "+998 92 001 32 57",
    /** Билет остидаги рақам: аниқ жойни банд қилиш ва тўлов бўйича */
    seatPhone: "+998 92 001 24 51",
  },

  /** ТЕСТ САВОЛЛАРИ — ҳақиқийлари келгач алмаштирилади */
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
      q: "Бизнесингизнинг йиллик айланмаси қанча?",
      options: [
        { text: "1 млн $ дан юқори", points: 3 },
        { text: "100 минг – 1 млн $", points: 2 },
        { text: "100 минг $ гача", points: 1 },
        { text: "Айтишни истамайман", points: 1 },
      ],
    },
    {
      q: "Форумдан асосан нимани кутасиз?",
      options: [
        { text: "Янги ҳамкорлар ва бизнес алоқалар", points: 2 },
        { text: "Инвестиция жалб қилиш ёки киритиш", points: 2 },
        { text: "Халқаро бозорга чиқиш, экспорт-импорт", points: 2 },
        { text: "Билим ва тажриба", points: 1 },
        { text: "Шунчаки қизиқиш учун", points: 0 },
      ],
    },
    {
      q: "Яқин бир йилда бизнесингизни кенгайтириш режангиз борми?",
      options: [
        { text: "Ҳа, аниқ режам бор", points: 2 },
        { text: "Ҳа, лекин ҳали ўйлаб кўряпман", points: 1 },
        { text: "Йўқ", points: 0 },
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
