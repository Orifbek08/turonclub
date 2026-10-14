/*****************************************************************
 * TURON — MAXFIY TAKLIF HAVOLASI (bepul bilet, ID 4000 dan)
 *
 * Bu ALOHIDA skript: eski «Билет / Таклифнома» skriptiga tegmaydi.
 * Sayt (turonclub.uz/taklif/...) ro'yxatdan o'tganlarni shu skript orqali
 * jadvaldagi 4-listga yozadi. List o'zi yaratiladi.
 *
 * O'RNATISH (bir marta):
 *  1. script.google.com → «Новый проект». Nomini «Турон — таклиф билети» qo'ying.
 *  2. Shu kodni to'liq qo'ying → Ctrl+S.
 *  3. Pastdagi SHEET_ID jadvalingiz manzilidagi ID bilan bir xilligini tekshiring:
 *     docs.google.com/spreadsheets/d/  <SHU QISM>  /edit
 *  4. Tepada funksiya ro'yxatidan SOZLASH ni tanlab «Выполнить» → ruxsat bering.
 *     (Jadvalda «Сайт таклиф билети» listi paydo bo'ladi.)
 *  5. «Развертывание» → «Новое развертывание» → turi: «Веб-приложение»
 *       Выполнять от имени: «Я»
 *       У кого есть доступ: «Все»
 *     → «Развернуть». Berilgan «.../exec» manzilini menga yuboring
 *     (yoki saytdagi content/invite.ts → endpoint ga yozing).
 *
 * KEYIN KODNI YANGILASANGIZ:
 *  «Развертывание» → «Управление развертываниями» → ✏️ → Версия: «Новая версия» → «Развернуть»
 *  (manzil o'zgarmaydi).
 *****************************************************************/

// ═════════ SOZLAMALAR ═════════
var SHEET_ID = "10gv_-vXvluX5nbcGujCZc67jF3Kojp6-iPHloPnoIKU";
var SHEET    = "Сайт таклиф билети";
var START_ID = 4000;          // birinchi bilet ID si
var COLOR    = "#7a1734";     // sarlavha rangi (bilet rangi bilan bir xil — bordo)

var H = ["ID", "Исм фамилия", "Телефон", "Сана", "Манба", "Балл", "Жавоблар",
         "Тўлов (100 $)", "Давомат", "Келган вақти", "Ким белгилади", "Изоҳ"];
var C = { ID: 0, NAME: 1, PHONE: 2, DATE: 3, SRC: 4, SCORE: 5, ANS: 6 };


// ═════════ API ═════════
function doGet() {
  return out({ ok: true, msg: "Турон таклиф API ишлаяпти" });
}

function doPost(e) {
  try {
    var p = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (p.website) return out({ ok: true, id: 0 });                 // bot (yashirin maydon to'ldirilgan)
    if (p.action === "register") return out(register(p));
    return out({ ok: false, error: "Номаълум амал" });
  } catch (err) {
    return out({ ok: false, error: "Сервер хатоси: " + String(err && err.message || err) });
  }
}

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}


// ═════════ RO'YXATDAN O'TKAZISH ═════════
function register(p) {
  var name = String(p.name || "").replace(/\s+/g, " ").trim().slice(0, 120);
  if (name.length < 3) return { ok: false, error: "Исм фамилия тўлиқ ёзилмаган" };

  var phone = normPhone(p.phone);
  if (!phone) return { ok: false, error: "Телефон рақами нотўғри" };

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(25000)) return { ok: false, error: "Сервер банд — қайта уриниб кўринг" };
  try {
    // Internet sekin bo'lsa sayt so'rovni qayta yuboradi — ikkinchi marta yozilmaydi
    var cache = CacheService.getScriptCache();
    var rkey = p.rid ? "rid_" + String(p.rid).slice(0, 40) : "";
    if (rkey) { var done = cache.get(rkey); if (done) return JSON.parse(done); }

    var sh = sheet(), vals = rows(sh), max = START_ID - 1;
    for (var i = 0; i < vals.length; i++) {
      var id = parseInt(vals[i][C.ID], 10);
      if (!isNaN(id) && id > max) max = id;
      // 1 telefon = 1 bilet
      if (normPhone(vals[i][C.PHONE]) === phone) {
        var same = String(vals[i][C.NAME]).trim().toLowerCase() === name.toLowerCase();
        if (same) return { ok: true, existing: true, id: vals[i][C.ID], name: String(vals[i][C.NAME]).trim() };
        return { ok: false, dup: true, error: "Бу телефон рақамига билет аллақачон берилган. Саволлар бўлса: +998 92 001 32 57" };
      }
    }

    var newId = max + 1;
    var row = [];
    for (var k = 0; k < H.length; k++) row.push("");
    row[C.ID]    = newId;
    row[C.NAME]  = name;
    row[C.PHONE] = prettyPhone(phone);
    row[C.DATE]  = Utilities.formatDate(new Date(), "Asia/Tashkent", "dd.MM.yyyy HH:mm");
    row[C.SRC]   = [String(p.source || ""), String(p.utm || "")].filter(String).join(" · ").slice(0, 200);
    row[C.SCORE] = Number(p.score) || 0;
    row[C.ANS]   = (Array.isArray(p.answers) ? p.answers : []).map(String).join("\n").slice(0, 2000);
    sh.appendRow(row);

    var res = { ok: true, id: newId, name: name };
    if (rkey) cache.put(rkey, JSON.stringify(res), 900);
    return res;
  } finally {
    lock.releaseLock();
  }
}

/** "+998 90 123-45-67" | "901234567" | "998901234567" → "998901234567" ; noto'g'ri bo'lsa "" */
function normPhone(v) {
  var d = String(v === null || v === undefined ? "" : v).replace(/\D/g, "");
  if (d.length === 9) d = "998" + d;
  return /^998\d{9}$/.test(d) ? d : "";
}
function prettyPhone(d) {
  return "+998 " + d.slice(3, 5) + " " + d.slice(5, 8) + " " + d.slice(8, 10) + " " + d.slice(10, 12);
}


// ═════════ LIST ═════════
function sheet() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sh = ss.getSheetByName(SHEET);
  if (!sh) sh = ss.insertSheet(SHEET);
  if (String(sh.getRange(1, 1).getValue()).trim() !== H[0]) {
    sh.getRange(1, 1, 1, H.length).setValues([H])
      .setFontWeight("bold").setBackground(COLOR).setFontColor("#ffffff");
    sh.setFrozenRows(1);
    sh.setColumnWidth(2, 240);
    sh.setColumnWidth(3, 150);
    sh.setColumnWidth(7, 360);
    // telefon va sana matn bo'lib tursin
    sh.getRange(2, C.PHONE + 1, sh.getMaxRows() - 1, 1).setNumberFormat("@");
    sh.getRange(2, C.DATE + 1, sh.getMaxRows() - 1, 1).setNumberFormat("@");
  }
  return sh;
}

function rows(sh) {
  var n = sh.getLastRow() - 1;
  return n < 1 ? [] : sh.getRange(2, 1, n, H.length).getValues();
}

/** Birinchi marta ishga tushirish: ruxsat beriladi va list yaratiladi */
function SOZLASH() {
  var sh = sheet();
  Logger.log("Тайёр: «" + sh.getName() + "» листи. Ёзувлар сони: " + Math.max(sh.getLastRow() - 1, 0));
}

/** Sinov: jadvalga test yozuv qo'shadi (keyin qo'lda o'chirib qo'ying) */
function SINOV() {
  Logger.log(JSON.stringify(register({ name: "Тест Тестов", phone: "901234567", source: "Синов", answers: ["тест"], score: 0 })));
}
