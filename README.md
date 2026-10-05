# Turon Club sayti

Uch tilli (o‘zbek, rus, ingliz) klub sayti. Next.js + Tailwind CSS.

## Ishga tushirish

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # ishlab chiqarish uchun yig‘ish
```

## Ma’lumotlarni qayerda to‘ldirish kerak

Kodga tegish shart emas. Hamma matn va ro‘yxatlar `content/` papkasida:

| Fayl | Nima bor |
| --- | --- |
| `content/site.ts` | Telefon, email, manzil, ijtimoiy tarmoqlar, rahbar, raqamlar |
| `content/speakers.ts` | Spikerlar |
| `content/events.ts` | Tadbirlar (sanasi o‘tgani o‘zi arxivga tushadi) |
| `content/partners.ts` | Hamkorlar |
| `content/faq.ts` | Savol-javoblar |
| `content/texts/uz.ts`, `ru.ts`, `en.ts` | Sahifalardagi barcha matnlar va SEO sarlavhalari |

Har bir matn uch tilda yoziladi: `uz`, `ru`, `en`.

## Rasmlar

Rasmni tegishli papkaga qo‘ying va fayl nomini content faylidagi `photo` (yoki `logo`) ga yozing.

| Papka | Nima uchun | Tavsiya |
| --- | --- | --- |
| `public/images/speakers/` | Spiker portretlari | vertikal 4:5, kamida 1200×1500, JPG |
| `public/images/team/` | Rahbar rasmi | vertikal 4:5, kamida 1200×1500, JPG |
| `public/images/partners/` | Hamkor logotiplari | SVG yoki shaffof fonli PNG |
| `public/og.png` | Havola ulashilganda chiqadigan rasm | 1200×630 |

SEO uchun fayl nomlari: faqat kichik lotin harflari va chiziqcha, mazmunli nom.
To‘g‘ri: `alisher-karimov.jpg`. Noto‘g‘ri: `IMG_4821.JPG`, `Фото 1.png`.

Rasm ko‘rsatilmagan joyda naqshli ramka chiqadi, sayt buzilmaydi.
Rasmlar avtomatik kichraytiriladi va WebP/AVIF formatida beriladi.

## SEO

- Har bir sahifa uch tilda alohida manzilga ega: `/uz/...`, `/ru/...`, `/en/...`
- `hreflang`, `canonical`, Open Graph, `sitemap.xml`, `robots.txt` va schema.org
  ma’lumotlari (tashkilot, tadbir, shaxs, FAQ) avtomatik yaratiladi.
- **Sayt hozir qidiruv tizimlaridan yopiq.** Haqiqiy ma’lumotlarni to‘ldirib bo‘lgach,
  `content/site.ts` faylida `indexable: true` qiling.

## Ariza shakli

Arizalar Telegram chatga yuboriladi. Buning uchun hostingda ikkita o‘zgaruvchi
kerak (`.env.example` ga qarang): `TELEGRAM_BOT_TOKEN` va `TELEGRAM_CHAT_ID`.
Ular sozlanmaguncha shakl “ariza yuborilmadi” xabarini ko‘rsatadi.

## Dizayn

Ranglar va shriftlar `src/app/globals.css` faylining boshidagi `@theme` blokida.
Naqsh (sakkiz qirrali yulduz koshinlari) `src/components/Tiles.tsx` da.
