/**
 * TADBIR KARTOCHKASIDAGI QR-KOD SAHIFASI: turonclub.uz/ticket
 * Saytning menyusida, sitemap'da va qidiruvda ko'rinmaydi — faqat QR-kod orqali ochiladi.
 *
 * Havolani to'liq yozing. Bo'sh ("") qoldirilgan tugma ko'rinadi, lekin bosilmaydi;
 * havola yozilgach o'zi faollashadi.
 * tagline  — logotip ostidagi qisqa yozuv (bo'sh bo'lsa chiqmaydi)
 * telegram — faqat foydalanuvchi nomi, @ belgisisiz: "mihu_uz"
 * phone    — "+998 95 760 00 00" ko'rinishida
 */
export type TicketBrand = {
  name: string;
  tagline: string;
  website: string;
  instagram: string;
  telegram: string;
  facebook: string;
  linkedin: string;
  email: string;
  phone: string;
};

export const ticket = {
  turon: {
    name: "Turon Club",
    tagline: "",
    website: "https://turonclub.uz",
    instagram: "https://www.instagram.com/turonclub/",
    telegram: "Ilxombegimkulov",
    facebook: "",
    linkedin: "",
    email: "turonclub@gmail.com",
    phone: "+998 92 001 32 57",
  },
  mihu: {
    name: "MIHU",
    tagline: "",
    website: "https://mihu.uz/uz",
    instagram: "https://www.instagram.com/mihu_uz/",
    telegram: "mihu_uz",
    facebook: "https://www.facebook.com/share/182RwsAQWC/",
    linkedin: "",
    email: "uzmihu@gmail.com",
    phone: "+998 95 760 00 00",
  },
} satisfies Record<string, TicketBrand>;
