/**
 * FORUM: OCHILISH MAROSIMI
 * /forum sahifasi va bosh sahifadagi forum bo'limi shu yerdan olinadi.
 *
 * date    — "YYYY-MM-DD". Sana o'tgach, bosh sahifadagi forum bo'limi o'zi yashirinadi.
 * time    — boshlanish vaqti, masalan "10:00". Aniq bo'lmaguncha "" qoldiring.
 * venue   — o'tkaziladigan joy. Aniq bo'lmaguncha uchala tilda "" qoldiring,
 *           saytda "Tez orada e'lon qilinadi" deb chiqadi.
 * program — kun tartibi. Bo'sh bo'lsa, "Dastur tez orada e'lon qilinadi" deb chiqadi.
 *           Namuna:
 *           { time: "10:00", title: { uz: "Ro‘yxatdan o‘tish", ru: "Регистрация", en: "Registration" } },
 */
import type { Localized } from "@/lib/i18n";

export const forum = {
  date: "2026-10-27",
  time: "",
  venue: { uz: "", ru: "", en: "" } as Localized,
  program: [] as { time: string; title: Localized }[],
};
