"use client";

/**
 * MAXFIY TAKLIF: savollar → ism va telefon → bepul bilet.
 * Matnlar va savollar: content/invite.ts
 * Ma'lumot Google Sheets'ga Apps Script orqali yoziladi (apps-script/taklif-bilet.gs).
 */
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { invite } from "@content/invite";
import { LogoMark, LogoWord } from "@/components/Logo";
import { Tiles } from "@/components/Tiles";
import { InviteTicket } from "./InviteTicket";
import { track } from "./MetaPixel";

type Ticket = { id: string; name: string; phone: string };
type Step = { kind: "intro" } | { kind: "q"; i: number } | { kind: "fail" } | { kind: "form" } | { kind: "ticket"; t: Ticket };

const STORE = "turon-taklif-bilet";
const EASE = [0.22, 1, 0.36, 1] as const;

function load(): Ticket | null {
  try {
    const raw = localStorage.getItem(STORE);
    return raw ? (JSON.parse(raw) as Ticket) : null;
  } catch {
    return null;
  }
}
function save(t: Ticket) {
  try {
    localStorage.setItem(STORE, JSON.stringify(t));
  } catch {}
}

/** "901234567" → "90 123 45 67" */
function fmtPhone(d: string) {
  return [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean).join(" ");
}

export function InviteFlow({ source }: { source: string }) {
  const qs = invite.questions;
  const [step, setStep] = useState<Step>({ kind: "intro" });
  const [answers, setAnswers] = useState<number[]>([]);

  // Avval bilet olgan bo'lsa — darhol biletini ko'rsatamiz
  useEffect(() => {
    const t = load();
    if (t) setStep({ kind: "ticket", t });
  }, []);

  function choose(i: number, opt: number) {
    const next = [...answers.slice(0, i), opt];
    setAnswers(next);
    window.setTimeout(() => {
      if (i + 1 < qs.length) {
        setStep({ kind: "q", i: i + 1 });
        return;
      }
      const picked = next.map((o, k) => qs[k]!.options[o]!);
      const score = picked.reduce((s, o) => s + o.points, 0);
      const stopped = picked.some((o) => o.stop);
      setStep(!stopped && score >= invite.minScore ? { kind: "form" } : { kind: "fail" });
    }, 260);
  }

  const score = answers.reduce((s, o, k) => s + (qs[k]?.options[o]?.points ?? 0), 0);

  return (
    <main className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <Tiles
        cols={10}
        rows={12}
        seed={7}
        live
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-auto w-full opacity-40 [mask-image:linear-gradient(#000,transparent_70%)]"
      />
      <header className="mx-auto flex w-full max-w-3xl items-center gap-3 px-5 pt-6 text-ivory">
        <LogoMark className="h-9 w-auto" />
        <LogoWord className="h-5 w-auto" />
      </header>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.kind === "q" ? `q${step.i}` : step.kind}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {step.kind === "intro" && (
              <Intro
                onStart={() => {
                  track("ViewContent", { content_name: "Taklif savollari" });
                  setStep({ kind: "q", i: 0 });
                }}
              />
            )}
            {step.kind === "q" && (
              <Question
                i={step.i}
                total={qs.length}
                chosen={answers[step.i]}
                onChoose={(o) => choose(step.i, o)}
                onBack={() => setStep(step.i === 0 ? { kind: "intro" } : { kind: "q", i: step.i - 1 })}
              />
            )}
            {step.kind === "fail" && (
              <Fail
                onRetry={() => {
                  setAnswers([]);
                  setStep({ kind: "intro" });
                }}
              />
            )}
            {step.kind === "form" && (
              <Form
                source={source}
                answers={answers.map((o, k) => `${k + 1}) ${qs[k]!.options[o]!.text}`)}
                score={score}
                onDone={(t) => {
                  save(t);
                  setStep({ kind: "ticket", t });
                }}
              />
            )}
            {step.kind === "ticket" && <TicketView t={step.t} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  const e = invite.event;
  return (
    <div className="text-center">
      <p className="text-[0.95rem] tracking-[0.18em] text-gold-light uppercase">Шахсий таклиф</p>
      <h1 className="mx-auto mt-6 max-w-2xl font-display text-[clamp(2.1rem,6vw,3.6rem)] leading-[1.05]">{e.title}</h1>
      <div className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-x-8 gap-y-3 text-[1.05rem]">
        <span className="gold-text font-display text-2xl">{e.date}</span>
        <span className="gold-text font-display text-2xl">{e.time}</span>
      </div>
      <p className="muted mx-auto mt-3 max-w-xl">{e.venue}</p>
      <span aria-hidden="true" className="mx-auto mt-10 block h-px w-24" style={{ background: "var(--gold-grad)" }} />
      <p className="mx-auto mt-10 max-w-xl text-lg leading-relaxed">
        Форумда қатнашиш сизга тўғри келадими? Буни билиш учун {invite.questions.length} та қисқа саволга жавоб беринг —
        бир дақиқа вақт олади. Мос келсангиз, сизга <span className="text-gold-light">бепул билет</span> берилади.
      </p>
      <button type="button" onClick={onStart} className="btn btn-gold mt-10 w-full sm:w-auto sm:px-14">
        Саволларни бошлаш
      </button>
    </div>
  );
}

function Question({
  i,
  total,
  chosen,
  onChoose,
  onBack,
}: {
  i: number;
  total: number;
  chosen: number | undefined;
  onChoose: (o: number) => void;
  onBack: () => void;
}) {
  const q = invite.questions[i]!;
  return (
    <div>
      <div className="flex items-center justify-between text-[0.95rem]">
        <button type="button" onClick={onBack} className="muted transition-colors hover:text-ivory">
          ← Орқага
        </button>
        <span className="text-gold-light">
          Савол {i + 1} / {total}
        </span>
      </div>
      <div className="mt-4 h-[3px] w-full bg-white/10">
        <motion.div
          className="h-full"
          style={{ background: "var(--gold-grad)" }}
          initial={{ width: `${(i / total) * 100}%` }}
          animate={{ width: `${((i + 1) / total) * 100}%` }}
          transition={{ duration: 0.6, ease: EASE }}
        />
      </div>
      <h2 className="mt-10 font-display text-[clamp(1.8rem,4.6vw,2.8rem)] leading-[1.12]">{q.q}</h2>
      <ul className="mt-8 space-y-3">
        {q.options.map((o, k) => {
          const on = chosen === k;
          return (
            <li key={o.text}>
              <button
                type="button"
                onClick={() => onChoose(k)}
                className={`flex w-full items-center gap-4 border px-5 py-4 text-left text-[1.08rem] transition-colors duration-300 md:px-6 md:py-5 ${
                  on ? "border-gold bg-gold/15 text-ivory" : "border-[var(--hair)] bg-deep/60 hover:border-gold/70 hover:bg-deep"
                }`}
              >
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border ${on ? "border-gold" : "border-white/30"}`}
                >
                  {on && <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--gold-grad)" }} />}
                </span>
                {o.text}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Fail({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="text-center">
      <h2 className="mx-auto max-w-2xl font-display text-[clamp(2rem,5vw,3rem)] leading-[1.1]">Жавобларингиз учун раҳмат!</h2>
      <p className="muted mx-auto mt-6 max-w-xl text-lg leading-relaxed">
        Жавобларингизга кўра, бу форум ҳозирча сизнинг мақсадларингизга тўлиқ мос келмаслиги мумкин. Клуб ҳақида батафсил
        маълумотни сайтимиздан олишингиз ёки бизга қўнғироқ қилишингиз мумкин.
      </p>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <a href="https://turonclub.uz" className="btn btn-gold">
          turonclub.uz
        </a>
        <a href={`tel:${invite.event.phone.replace(/[^+\d]/g, "")}`} className="btn btn-ghost">
          {invite.event.phone}
        </a>
      </div>
      <button type="button" onClick={onRetry} className="muted mt-8 text-[0.95rem] underline-offset-4 hover:text-ivory hover:underline">
        Жавобларни қайта кўриб чиқиш
      </button>
    </div>
  );
}

function Form({
  source,
  answers,
  score,
  onDone,
}: {
  source: string;
  answers: string[];
  score: number;
  onDone: (t: Ticket) => void;
}) {
  const [name, setName] = useState("");
  const [digits, setDigits] = useState("");
  /** Xorijiy raqam: davlat kodi bilan to'liq yoziladi (+7…, +90…, +1…) */
  const [foreign, setForeign] = useState(false);
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const rid = useRef(`${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const clean = name.replace(/\s+/g, " ").trim();
    if (clean.length < 3 || !/\s/.test(clean)) return setError("Исм ва фамилиянгизни тўлиқ ёзинг.");
    if (!foreign && digits.length !== 9) return setError("Телефон рақамини тўлиқ киритинг: 9 та рақам.");
    if (foreign && (digits.length < 10 || digits.length > 15))
      return setError("Телефон рақамини давлат коди билан тўлиқ киритинг, масалан: +7 912 345 67 89.");
    if (!agree) return setError(`${invite.event.fee} ташкилий тўлов ҳақидаги шартни тасдиқланг.`);
    if (!invite.endpoint) return setError("Рўйхатдан ўтиш ҳали уланмаган. Бироздан сўнг қайта уриниб кўринг.");

    const honeypot = (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    const params = new URLSearchParams(window.location.search);
    const body = JSON.stringify({
      action: "register",
      rid: rid.current,
      name: clean,
      phone: foreign ? digits : `998${digits}`,
      source,
      utm: ["utm_source", "utm_campaign", "utm_content"].map((k) => params.get(k)).filter(Boolean).join(" / "),
      answers,
      score,
      website: honeypot,
    });

    setBusy(true);
    try {
      let res: Response | null = null;
      for (let attempt = 0; attempt < 2 && !res; attempt++) {
        try {
          // text/plain — brauzer qo'shimcha (preflight) so'rov yubormaydi, Apps Script uchun shart
          res = await fetch(invite.endpoint, { method: "POST", body, headers: { "Content-Type": "text/plain;charset=utf-8" } });
        } catch (err) {
          if (attempt === 1) throw err;
          await new Promise((r) => setTimeout(r, 1200));
        }
      }
      const json = (await res!.json()) as { ok: boolean; id?: string | number; name?: string; error?: string; existing?: boolean };
      if (!json.ok || !json.id) {
        setError(json.error || "Хатолик юз берди. Қайта уриниб кўринг.");
        return;
      }
      // Reklama uchun: yangi bilet = yangi lid (eski biletini qayta olgani hisoblanmaydi)
      if (!json.existing) track("Lead", { content_name: "Taklif bileti" });
      onDone({ id: String(json.id), name: json.name || clean, phone: foreign ? `+${digits}` : `+998 ${fmtPhone(digits)}` });
    } catch {
      setError("Интернет билан алоқа йўқ. Қайта уриниб кўринг.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <p className="text-[0.95rem] tracking-[0.18em] text-gold-light uppercase">Табриклаймиз!</p>
      <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3rem)] leading-[1.1]">Сиз форум учун мос номзодсиз</h2>
      <p className="muted mt-4 max-w-xl text-lg">Билетни олиш учун исм-фамилиянгиз ва телефон рақамингизни ёзинг.</p>

      <form onSubmit={submit} noValidate className="mt-10 space-y-6">
        <label className="block">
          <span className="text-[0.95rem] text-gold-light">Исм ва фамилия</span>
          <input
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Масалан: Азизов Жасур"
            className="mt-2 w-full border border-[var(--hair)] bg-deep/70 px-5 py-4 text-lg text-ivory outline-none transition-colors placeholder:text-white/30 focus:border-gold"
          />
        </label>
        <label className="block">
          <span className="text-[0.95rem] text-gold-light">Телефон рақами</span>
          <span className="mt-2 flex border border-[var(--hair)] bg-deep/70 transition-colors focus-within:border-gold">
            <span className="grid place-items-center border-r border-[var(--hair)] px-4 text-lg text-gold-light">
              {foreign ? "+" : "+998"}
            </span>
            <input
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete={foreign ? "tel" : "tel-national"}
              value={foreign ? digits : fmtPhone(digits)}
              onChange={(e) => {
                let d = e.target.value.replace(/\D/g, "");
                if (foreign) return setDigits(d.slice(0, 15));
                if (d.length > 9 && d.startsWith("998")) d = d.slice(3);
                setDigits(d.slice(0, 9));
              }}
              placeholder={foreign ? "7 912 345 67 89" : "90 123 45 67"}
              className="w-full bg-transparent px-4 py-4 text-lg tracking-wide text-ivory outline-none placeholder:text-white/30"
            />
          </span>
          <button
            type="button"
            onClick={() => {
              setForeign(!foreign);
              setDigits("");
            }}
            className="mt-2 text-[0.92rem] text-gold-light underline-offset-4 hover:underline"
          >
            {foreign ? "Ўзбекистон рақами" : "Хорижий рақам (бошқа давлат)"}
          </button>
        </label>
        {/* Botlar uchun yashirin maydon */}
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

        <label className="flex cursor-pointer gap-4 border border-gold/60 bg-gold/10 p-5">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#c9a96a]" />
          <span className="leading-relaxed">
            <b className="text-gold-light">Диққат:</b> билет бепул берилади, лекин форумга кириш учун{" "}
            <b className="text-gold-light">ташкилий харажатларга {invite.event.fee}</b> тўлов қилиниши шарт. Шартга розиман.
          </span>
        </label>

        {error && (
          <p role="alert" className="border border-red-400/40 bg-red-500/10 px-5 py-3 text-red-200">
            {error}
          </p>
        )}

        <button type="submit" disabled={busy} className="btn btn-gold w-full disabled:opacity-60">
          {busy ? "Юборилмоқда…" : "Билетни олиш"}
        </button>
        <p className="muted text-center text-[0.9rem]">Битта телефон рақамига битта билет берилади.</p>
      </form>
    </div>
  );
}

function TicketView({ t }: { t: Ticket }) {
  const ref = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);

  async function download() {
    if (!ref.current) return;
    setSaving(true);
    try {
      const { toBlob } = await import("html-to-image");
      const node = ref.current;
      const blob = await toBlob(node, { pixelRatio: 2000 / node.offsetWidth, cacheBust: true });
      if (!blob) throw new Error("rasm yaratilmadi");
      const file = new File([blob], `turon-bilet-${t.id}.png`, { type: "image/png" });
      const nav = navigator as Navigator & { canShare?: (d: { files: File[] }) => boolean };
      if (nav.canShare?.({ files: [file] }) && window.matchMedia("(pointer: coarse)").matches) {
        await navigator.share({ files: [file], title: "Турон — билет" });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 4000);
      }
    } catch (err) {
      if ((err as Error)?.name !== "AbortError") console.error(err);
    } finally {
      setSaving(false);
    }
  }

  const e = invite.event;
  return (
    <div>
      <p className="text-center text-[0.95rem] tracking-[0.18em] text-gold-light uppercase">Билетингиз тайёр</p>
      <h2 className="mt-4 text-center font-display text-[clamp(2rem,5vw,3rem)] leading-[1.1]">{t.name}</h2>
      <div className="mt-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,.7)]">
        <InviteTicket ref={ref} name={t.name} id={t.id} />
      </div>

      <div className="mt-8 border border-gold/60 bg-gold/10 p-5 leading-relaxed">
        <b className="text-gold-light">Муҳим:</b> билет бепул берилди, лекин форумга кириш учун ташкилий харажатларга{" "}
        <b className="text-gold-light">{e.fee}</b> тўлов қилиниши шарт.
        <span className="mt-3 block">
          Залдаги аниқ жойингизни банд қилиб қўйиш ва тўлов бўйича қўнғироқ қилинг:
        </span>
        <a
          href={`tel:${e.seatPhone.replace(/[^+\d]/g, "")}`}
          className="mt-2 inline-block font-display text-2xl text-gold-light underline underline-offset-4"
        >
          {e.seatPhone}
        </a>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={download} disabled={saving} className="btn btn-gold flex-1 disabled:opacity-60">
          {saving ? "Тайёрланмоқда…" : "Билетни сақлаб олиш"}
        </button>
        <a href="https://turonclub.uz" className="btn btn-ghost flex-1">
          Клуб ҳақида
        </a>
      </div>
      <p className="muted mt-5 text-center text-[0.9rem]">
        Форумга келганда билетни (ID: {t.id}) кўрсатинг. Билет {t.phone} рақамига берилган.
      </p>
    </div>
  );
}
