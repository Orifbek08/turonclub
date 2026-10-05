import { NextResponse } from "next/server";

/**
 * A'zolik arizasini Telegram chatga yuboradi.
 * Ishlashi uchun TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID o'zgaruvchilari
 * kerak (.env.example fayliga qarang).
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const text = (key: string, max = 120) => String(body[key] ?? "").trim().slice(0, max);

  // Yashirin maydon to'ldirilgan bo'lsa, bu bot: jimgina "ok" qaytaramiz
  if (text("website")) return NextResponse.json({ ok: true });

  const name = text("name");
  const company = text("company");
  const position = text("position");
  const phone = text("phone", 40);
  if (!name || !company || !position || phone.replace(/\D/g, "").length < 7) {
    return NextResponse.json({ ok: false }, { status: 422 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("Ariza yuborilmadi: TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID sozlanmagan");
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const lines = [
    "Yangi ariza — turonclub.uz",
    "",
    `Ism: ${name}`,
    `Kompaniya: ${company}`,
    `Lavozim: ${position}`,
    `Telefon: ${phone}`,
    text("event") && `Tadbir: ${text("event")}`,
    text("message", 1000) && `Izoh: ${text("message", 1000)}`,
    `Til: ${text("locale", 5)}`,
  ].filter(Boolean);

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: lines.join("\n") }),
  });
  if (!res.ok) {
    console.error("Telegram xatosi:", res.status, await res.text());
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
