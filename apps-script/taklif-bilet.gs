/*****************************************************************
 * TURON — MAXFIY TAKLIF HAVOLASI (bepul bilet, ID 4000 dan)
 *
 * Bu fayl ESKI «Билет / Таклифнома» skripti bilan BIR LOYIHADA turadi
 * (alohida fayl: taklif.gs). Unda doGet/doPost YO'Q — so'rovni eski
 * Код.gs dagi doPost qabul qiladi va «register» amalini shu faylga uzatadi.
 * Sayt (turonclub.uz/taklif/...) ro'yxatdan o'tganlarni jadvaldagi
 * «Сайт таклиф билети» listiga yozadi. List o'zi yaratiladi.
 *
 * Код.gs dagi doPost ichida, «var p = JSON.parse(...)» qatoridan KEYIN
 * (login tekshiruvidan OLDIN) bitta qator turishi kerak:
 *
 *     if (p.action === "register") return out(TK_register(p));
 *
 * Kodni o'zgartirgandan keyin:
 *  «Развертывание» → «Управление развертываниями» → ✏️ → Версия: «Новая версия» → «Развернуть»
 *  (manzil o'zgarmaydi).
 *****************************************************************/

// ═════════ SOZLAMALAR ═════════
var TK_SHEET_ID = "10gv_-vXvluX5nbcGujCZc67jF3Kojp6-iPHloPnoIKU";
var TK_SHEET    = "Сайт таклиф билети";
var TK_START = 4000;          // birinchi bilet ID si
var TK_COLOR    = "#7a1734";     // sarlavha rangi (bilet rangi bilan bir xil — bordo)

var TK_H = ["ID", "Исм фамилия", "Телефон", "Сана", "Манба", "Балл", "Жавоблар",
         "Тўлов (100 $)", "Давомат", "Келган вақти", "Ким белгилади", "Изоҳ"];
var TK_C = { ID: 0, NAME: 1, PHONE: 2, DATE: 3, SRC: 4, SCORE: 5, ANS: 6 };


// ═════════ RO'YXATDAN O'TKAZISH ═════════
function TK_register(p) {
  if (p.website) return { ok: true, id: 0 };              // bot (yashirin maydon to'ldirilgan)
  var name = String(p.name || "").replace(/\s+/g, " ").trim().slice(0, 120);
  if (name.length < 3) return { ok: false, error: "Исм фамилия тўлиқ ёзилмаган" };

  var phone = TK_normPhone(p.phone);
  if (!phone) return { ok: false, error: "Телефон рақами нотўғри" };

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(25000)) return { ok: false, error: "Сервер банд — қайта уриниб кўринг" };
  try {
    // Internet sekin bo'lsa sayt so'rovni qayta yuboradi — ikkinchi marta yozilmaydi
    var cache = CacheService.getScriptCache();
    var rkey = p.rid ? "tk_rid_" + String(p.rid).slice(0, 40) : "";
    if (rkey) { var done = cache.get(rkey); if (done) return JSON.parse(done); }

    var sh = TK_sheet(), vals = TK_rows(sh), max = TK_START - 1;
    for (var i = 0; i < vals.length; i++) {
      var id = parseInt(vals[i][TK_C.ID], 10);
      if (!isNaN(id) && id > max) max = id;
      // 1 telefon = 1 bilet
      if (TK_normPhone(vals[i][TK_C.PHONE]) === phone) {
        var same = String(vals[i][TK_C.NAME]).trim().toLowerCase() === name.toLowerCase();
        if (same) return { ok: true, existing: true, id: vals[i][TK_C.ID], name: String(vals[i][TK_C.NAME]).trim() };
        return { ok: false, dup: true, error: "Бу телефон рақамига билет аллақачон берилган. Саволлар бўлса: +998 92 001 32 57" };
      }
    }

    var newId = max + 1;
    var row = [];
    for (var k = 0; k < TK_H.length; k++) row.push("");
    row[TK_C.ID]    = newId;
    row[TK_C.NAME]  = name;
    row[TK_C.PHONE] = TK_prettyPhone(phone);
    row[TK_C.DATE]  = Utilities.formatDate(new Date(), "Asia/Tashkent", "dd.MM.yyyy HH:mm");
    row[TK_C.SRC]   = [String(p.source || ""), String(p.utm || "")].filter(String).join(" · ").slice(0, 200);
    row[TK_C.SCORE] = Number(p.score) || 0;
    row[TK_C.ANS]   = (Array.isArray(p.answers) ? p.answers : []).map(String).join("\n").slice(0, 2000);
    sh.appendRow(row);

    var res = { ok: true, id: newId, name: name };
    if (rkey) cache.put(rkey, JSON.stringify(res), 900);
    return res;
  } finally {
    lock.releaseLock();
  }
}

/** "+998 90 123-45-67" | "901234567" | "998901234567" → "998901234567" ; noto'g'ri bo'lsa "" */
function TK_normPhone(v) {
  var d = String(v === null || v === undefined ? "" : v).replace(/\D/g, "");
  if (d.length === 9) d = "998" + d;
  return /^998\d{9}$/.test(d) ? d : "";
}
function TK_prettyPhone(d) {
  return "+998 " + d.slice(3, 5) + " " + d.slice(5, 8) + " " + d.slice(8, 10) + " " + d.slice(10, 12);
}


// ═════════ LIST ═════════
function TK_sheet() {
  var ss = SpreadsheetApp.openById(TK_SHEET_ID);
  var sh = ss.getSheetByName(TK_SHEET);
  if (!sh) sh = ss.insertSheet(TK_SHEET);
  if (String(sh.getRange(1, 1).getValue()).trim() !== TK_H[0]) {
    sh.getRange(1, 1, 1, TK_H.length).setValues([TK_H])
      .setFontWeight("bold").setBackground(TK_COLOR).setFontColor("#ffffff");
    sh.setFrozenRows(1);
    sh.setColumnWidth(2, 240);
    sh.setColumnWidth(3, 150);
    sh.setColumnWidth(7, 360);
    // telefon va sana matn bo'lib tursin
    sh.getRange(2, TK_C.PHONE + 1, sh.getMaxRows() - 1, 1).setNumberFormat("@");
    sh.getRange(2, TK_C.DATE + 1, sh.getMaxRows() - 1, 1).setNumberFormat("@");
  }
  return sh;
}

function TK_rows(sh) {
  var n = sh.getLastRow() - 1;
  return n < 1 ? [] : sh.getRange(2, 1, n, TK_H.length).getValues();
}

/** Birinchi marta ishga tushirish: ruxsat beriladi va list yaratiladi */
function TAKLIF_SOZLASH() {
  var sh = TK_sheet();
  Logger.log("Тайёр: «" + sh.getName() + "» листи. Ёзувлар сони: " + Math.max(sh.getLastRow() - 1, 0));
}

/** Sinov: jadvalga test yozuv qo'shadi (keyin qo'lda o'chirib qo'ying) */
function TAKLIF_SINOV() {
  Logger.log(JSON.stringify(TK_register({ name: "Тест Тестов", phone: "901234567", source: "Синов", answers: ["тест"], score: 0 })));
}
