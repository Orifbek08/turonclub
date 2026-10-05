/**
 * KO'P BERILADIGAN SAVOLLAR
 * Javoblarni klubning haqiqiy qoidalariga moslab yozing.
 */
import type { Localized } from "@/lib/i18n";

export const faq: { q: Localized; a: Localized }[] = [
  {
    q: {
      uz: "Klubga kimlar a’zo bo‘la oladi?",
      ru: "Кто может стать членом клуба?",
      en: "Who can become a member?",
    },
    a: {
      uz: "Bu yerga a’zolik talablari yoziladi: masalan, biznes egasi yoki yuqori lavozimdagi rahbar bo‘lish, klub a’zosining tavsiyasi.",
      ru: "Здесь будут требования к кандидатам: например, владелец бизнеса или руководитель высшего звена, рекомендация члена клуба.",
      en: "Membership criteria go here: for example, being a business owner or senior executive, and a recommendation from a current member.",
    },
  },
  {
    q: {
      uz: "Ariza qancha vaqtda ko‘rib chiqiladi?",
      ru: "Как быстро рассматривается заявка?",
      en: "How long does it take to review an application?",
    },
    a: {
      uz: "Bu yerga arizani ko‘rib chiqish muddati va bosqichlari yoziladi.",
      ru: "Здесь будут сроки и этапы рассмотрения заявки.",
      en: "The review timeline and stages go here.",
    },
  },
  {
    q: {
      uz: "Tadbirlarda a’zo bo‘lmaganlar qatnasha oladimi?",
      ru: "Могут ли участвовать в событиях те, кто не состоит в клубе?",
      en: "Can non-members attend events?",
    },
    a: {
      uz: "Bu yerga mehmonlar uchun qoidalar yoziladi: qaysi tadbirlar ochiq, qanday ro‘yxatdan o‘tiladi.",
      ru: "Здесь будут правила для гостей: какие события открыты и как зарегистрироваться.",
      en: "Guest rules go here: which events are open and how to register.",
    },
  },
  {
    q: {
      uz: "A’zolik badali qancha?",
      ru: "Какова стоимость членства?",
      en: "What does membership cost?",
    },
    a: {
      uz: "Bu yerga badal miqdori yoki “shartlar suhbat davomida ma’lum qilinadi” degan izoh yoziladi.",
      ru: "Здесь будет размер взноса или пояснение, что условия сообщаются на собеседовании.",
      en: "The fee goes here, or a note that terms are shared during the interview.",
    },
  },
];
