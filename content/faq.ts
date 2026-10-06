/**
 * KO'P BERILADIGAN SAVOLLAR
 * Ro'yxat bo'sh bo'lsa, bo'lim saytda ko'rinmaydi.
 * Savol qo'shish namunasi:
 * {
 *   q: { uz: "Savol?", ru: "Вопрос?", en: "Question?" },
 *   a: { uz: "Javob.", ru: "Ответ.", en: "Answer." },
 * },
 */
import type { Localized } from "@/lib/i18n";

export const faq: { q: Localized; a: Localized }[] = [];
