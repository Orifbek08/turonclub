/**
 * FORUM: OCHILISH MAROSIMI
 * /forum sahifasi va bosh sahifadagi forum bo'limi shu yerdan olinadi.
 *
 * date    — "YYYY-MM-DD". Sana o'tgach, bosh sahifadagi forum bo'limi o'zi yashirinadi.
 * time    — boshlanish vaqti, masalan "10:00". Aniq bo'lmaguncha "" qoldiring.
 * venue   — o'tkaziladigan joy. Aniq bo'lmaguncha uchala tilda "" qoldiring,
 *           saytda "Tez orada e'lon qilinadi" deb chiqadi.
 * ambassadors — kutilayotgan elchilar soni (saytda "50+" ko'rinishida chiqadi).
 * guests  — kutilayotgan mehmonlar. Rasm public/images/guests/ papkasida turadi.
 *           Rasmi (photo) yozilmagan mehmon saytda ko'rinmaydi.
 * program — kun tartibi (soat va mavzular). Bo'sh bo'lsa, "Dastur" bo'limi saytda ko'rinmaydi.
 *           Namuna:
 *           { time: "10:00", title: { uz: "Ro‘yxatdan o‘tish", ru: "Регистрация", en: "Registration" } },
 */
import type { Localized } from "@/lib/i18n";

export const forum = {
  date: "2026-10-27",
  /** Ishtirokchilar soni (bosh sahifada katta raqam bilan chiqadi) */
  participants: 600,
  time: "",
  venue: {
    uz: "Yoshlar ijodiyot saroyi",
    ru: "Дворец творчества молодёжи",
    en: "Youth Creativity Palace",
  } as Localized,
  ambassadors: 50,
  /** Tashrif buyuradigan telekanallar soni ("10+" ko'rinishida chiqadi) */
  tvChannels: 10,
  guests: [
    {
      name: { uz: "Abror Muxtor Aliy", ru: "Аброр Мухтор Алий", en: "Abror Mukhtor Aliy" },
      about: { uz: "Bloger", ru: "Блогер", en: "Blogger" },
      photo: "abror-muxtor-aliy.webp",
    },
    {
      name: { uz: "Muhammadali Eshonqulov", ru: "Мухаммадали Эшонкулов", en: "Muhammadali Eshonqulov" },
      about: {
        uz: "Biznes-murabbiy, xalqaro iqtisodchi",
        ru: "Бизнес-тренер, экономист-международник",
        en: "Business mentor, international economist",
      },
      photo: "muhammadali-eshonqulov.webp",
    },
    {
      name: { uz: "Jahongir Ortiqxo‘jayev", ru: "Джахонгир Артыкходжаев", en: "Jakhongir Artikkhodjayev" },
      about: {
        uz: "Tadbirkor, Toshkent shahrining sobiq hokimi",
        ru: "Предприниматель, бывший хоким города Ташкента",
        en: "Entrepreneur, former mayor of Tashkent",
      },
      photo: "jahongir-ortiqxojayev.webp",
    },
    {
      name: { uz: "Rasul Kusherbayev", ru: "Расул Кушербаев", en: "Rasul Kusherbayev" },
      about: {
        uz: "Jurnalist va bloger, Oliy Majlis Qonunchilik palatasining sobiq deputati",
        ru: "Журналист и блогер, бывший депутат Законодательной палаты Олий Мажлиса",
        en: "Journalist and blogger, former member of the Legislative Chamber of the Oliy Majlis",
      },
      photo: "rasul-kusherbayev.webp",
    },
  ] as { name: Localized; about: Localized; photo: string }[],
  program: [] as { time: string; title: Localized }[],
};
