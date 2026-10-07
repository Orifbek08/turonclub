# Turon — xalqaro biznes klubi sayti

To‘rt tilli (o‘zbek lotin, o‘zbek kirill, rus, ingliz) klub sayti. Next.js + Tailwind CSS + Motion.

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
| `content/site.ts` | Telefon, email, manzil, ijtimoiy tarmoqlar, raqamlar, birinchi ekran rasmi (`heroPhoto`) |
| `content/founders.ts` | Asoschilar (birinchisi bosh sahifada iqtibos bilan chiqadi) |
| `content/forum.ts` | Forum: sana, vaqt, joy, dastur (`/forum` sahifasi) |
| `content/faq.ts` | Savol-javoblar |
| `content/texts/uz.ts`, `ru.ts`, `en.ts` | Sahifalardagi barcha matnlar va SEO sarlavhalari |

Har bir matn uch tilda yoziladi: `uz` (lotin), `ru`, `en`.

**O‘zbek kirill varianti avtomatik hosil bo‘ladi**: lotincha matn qoidalar asosida
kirillga o‘giriladi (`src/lib/cyrillic.ts`), alohida yozish shart emas. Biror so‘z
noto‘g‘ri o‘girilsa, o‘sha matn yoniga qo‘lda `"uz-cyrl": "to‘g‘ri yozuv"` qatorini
qo‘shing yoki so‘zni `cyrillic.ts` dagi `WORDS` ro‘yxatiga kiriting.

## Rasmlar

Rasmni tegishli papkaga qo‘ying va fayl nomini content faylidagi `photo` (yoki `logo`) ga yozing.

| Papka | Nima uchun | Tavsiya |
| --- | --- | --- |
| `public/images/founders/` | Asoschilar portretlari | vertikal 4:5, kamida 1200×1500, JPG, bir xil fon |
| `public/og.png` | Havola ulashilganda chiqadigan rasm | 1200×630 |

SEO uchun fayl nomlari: faqat kichik lotin harflari va chiziqcha, mazmunli nom.
To‘g‘ri: `alisher-karimov.jpg`. Noto‘g‘ri: `IMG_4821.JPG`, `Фото 1.png`.

Rasm ko‘rsatilmagan joyda naqshli ramka chiqadi, sayt buzilmaydi.
Rasmlar avtomatik kichraytiriladi va WebP/AVIF formatida beriladi.

## SEO

- Sayt qidiruv tizimlariga ochiq (`content/site.ts` → `indexable: true`).
- Har bir sahifa to‘rt tilda alohida manzilga ega: `/uz/...`, `/uz-cyrl/...`, `/ru/...`, `/en/...`
- `hreflang`, `canonical`, Open Graph, `sitemap.xml`, `robots.txt` va schema.org
  ma’lumotlari (tashkilot, sayt, forum tadbiri) avtomatik yaratiladi.
- Sarlavha, tavsif va kalit so‘zlar: `content/texts/*.ts` → `meta`.
- Google Search Console va Yandex Webmaster tasdiqlash kodlari:
  `content/site.ts` → `verification`.
- `turonclub.netlify.app` va `www.turonclub.uz` manzillari `turonclub.uz` ga
  yo‘naltiriladi (`netlify.toml`).

## Ariza shakli (Bitrix24)

Shakl ko‘rinishi saytniki, arizalar esa to‘g‘ridan-to‘g‘ri Bitrix24 CRM-formasiga
tushadi. Sozlamalar `content/site.ts` faylida, `bitrix` blokida: portal manzili,
forma raqami va maydon kodlari. Maydon nomlari saytda to‘rt tilda ko‘rsatiladi
(`content/texts/*.ts` → `form`).

Bitrix24’da formaga maydon qo‘shilsa yoki o‘chirilsa, `bitrix.fields` va
`src/components/ApplyForm.tsx` ham yangilanishi kerak.

## Ijtimoiy tarmoqlar

Havolalar `content/site.ts` → `socials`. Faqat havolasi yozilgan tarmoq belgisi
saytda chiqadi.

## Dizayn

- Ranglar va shriftlar: `src/app/globals.css` boshidagi `@theme` bloki.
- Logotip: `public/brand/` (SVG, oq va ko‘k variantlar) va `src/components/Logo.tsx`.
- Animatsiyalar: `src/components/motion.tsx` (silliq skroll, sarlavhalarning ochilishi,
  skrollda “yonadigan” matn, fon parallaksi, sanaladigan raqamlar).
- Naqsh (sakkiz qirrali yulduz koshinlari): `src/components/Tiles.tsx`.
- Harakatlanuvchi yozuv so‘zlari: `content/texts/*.ts` ichida `home.marquee`.
