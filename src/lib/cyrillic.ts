/**
 * O'ZBEK LOTIN → KIRILL
 * Saytning kirillcha varianti lotincha matnlardan avtomatik hosil qilinadi,
 * shuning uchun matnlarni faqat bir marta (lotinda) yozish kifoya.
 *
 * Avtomatik o'girish biror so'zda xato qilsa, content faylida o'sha matn
 * yoniga qo'lda "uz-cyrl": "to'g'ri yozuv" qatorini qo'shing — u ustun turadi.
 */

const SINGLE: Record<string, string> = {
  a: "а", b: "б", c: "к", d: "д", e: "е", f: "ф", g: "г", h: "ҳ", i: "и", j: "ж",
  k: "к", l: "л", m: "м", n: "н", o: "о", p: "п", q: "қ", r: "р", s: "с", t: "т",
  u: "у", v: "в", w: "в", x: "х", y: "й", z: "з",
};

// Tartib muhim: uzunroq birikmalar oldin tekshiriladi
const PAIRS: [string, string][] = [
  ["o‘", "ў"], ["g‘", "ғ"],
  ["yo", "ё"], ["yu", "ю"], ["ya", "я"], ["ye", "е"],
  ["sh", "ш"], ["ch", "ч"],
];

const VOWELS = "aeiouAEIOU‘";

/** Rus tilidan kirgan, kirillda boshqacha yoziladigan so'zlar */
const WORDS: Record<string, string> = {
  yanvar: "январь", fevral: "февраль", aprel: "апрель", iyun: "июнь", iyul: "июль",
  sentabr: "сентябрь", oktabr: "октябрь", noyabr: "ноябрь", dekabr: "декабрь",
  rubl: "рубль", sirk: "цирк", sement: "цемент", fakultet: "факультет",
};

/** Lotincha qoladigan bo'laklar: havolalar, pochta, domenlar */
const KEEP = /\S*[@/]\S*|\b[\w-]+\.(?:uz|com|org|net|ru)\b/g;

function matchCase(source: string, target: string): string {
  if (source === source.toUpperCase() && source.length > 1 && /[A-Z]/.test(source)) {
    return target.toUpperCase();
  }
  return /^[A-Z]/.test(source) ? target[0]!.toUpperCase() + target.slice(1) : target;
}

function word(w: string): string {
  const known = WORDS[w.toLowerCase()];
  if (known) return matchCase(w, known);

  let out = "";
  let i = 0;
  while (i < w.length) {
    const prev = i > 0 ? w[i - 1]! : "";
    const two = w.slice(i, i + 2);
    const lower2 = two.toLowerCase();
    const upper = /[A-Z]/.test(w[i]!);
    const put = (s: string) => (out += upper ? s.toUpperCase() : s);

    // "ts" → "ц" faqat -tsiya, -tsion, -tsial kabi o'zlashma qo'shimchalarda
    if (lower2 === "ts" && /^i[yao]/i.test(w.slice(i + 2))) {
      put("ц");
      i += 2;
      continue;
    }
    // "yo‘l" → "йўл": bu yerda "y" alohida, "o‘" esa "ў"
    if (lower2 === "yo" && w[i + 2] === "‘") {
      put("й");
      i += 1;
      continue;
    }
    const pair = PAIRS.find(([latin]) => latin === lower2);
    if (pair) {
      // "ye" so'z ichida undoshdan keyin "ье" emas, "е" bo'lib qoladi
      put(pair[1]);
      i += 2;
      continue;
    }
    const ch = w[i]!;
    const low = ch.toLowerCase();
    if (low === "e") {
      // so'z boshida va unlidan keyin "э", boshqa joyda "е"
      put(i === 0 || VOWELS.includes(prev) ? "э" : "е");
    } else if (ch === "’") {
      out += "ъ";
    } else if (ch === "‘") {
      // yolg'iz qolgan belgi (kutilmagan holat)
    } else if (SINGLE[low]) {
      put(SINGLE[low]!);
    } else {
      out += ch;
    }
    i += 1;
  }
  return out;
}

export function toCyrillic(text: string): string {
  // Apostroflarni bir xil ko'rinishga keltiramiz
  const normalized = text
    .replace(/([oOgG])[ʻ'`‘]/g, "$1‘")
    .replace(/[ʼ']/g, "’");

  const kept: string[] = [];
  const masked = normalized.replace(KEEP, (m) => {
    kept.push(m);
    return `\u0000${kept.length - 1}\u0000`;
  });
  const converted = masked.replace(/[A-Za-z‘’]+/g, word);
  return converted.replace(/\u0000(\d+)\u0000/g, (_, n) => kept[Number(n)]!);
}

/** Obyekt ichidagi barcha matnlarni kirillga o'giradi */
export function deepCyrillic<T>(value: T): T {
  if (typeof value === "string") return toCyrillic(value) as T;
  if (Array.isArray(value)) return value.map(deepCyrillic) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, deepCyrillic(v)])) as T;
  }
  return value;
}
