"use client";

/**
 * SAYT ANIMATSIYALARI
 * Hammasi shu faylda. "Harakatni kamaytirish" sozlamasi yoqilgan
 * qurilmalarda animatsiyalar o'zi o'chadi.
 */
import Lenis from "lenis";
import {
  MotionConfig,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Kirish ekrani hali ko'rsatilayaptimi */
function introPending(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if ((window as unknown as { __turonIntroDone?: boolean }).__turonIntroDone) return false;
  return !document.documentElement.classList.contains("intro-seen");
}

/**
 * Bosh sahifa animatsiyasi kirish ekrani erishni boshlagandagina ishga tushadi
 * (Intro.tsx "turon:intro-done" xabarini yuboradi). `enabled` bo'lmasa, darhol tayyor.
 */
function useIntroDone(enabled: boolean): boolean {
  const [done, setDone] = useState(() => !enabled || !introPending());
  useEffect(() => {
    if (done) return;
    if (!introPending()) {
      setDone(true);
      return;
    }
    const go = () => setDone(true);
    window.addEventListener("turon:intro-done", go, { once: true });
    // Ehtiyot chorasi: xabar kelmasa ham sahifa bo'sh qolmasin
    const safety = window.setTimeout(go, 7000);
    return () => {
      window.removeEventListener("turon:intro-done", go);
      window.clearTimeout(safety);
    };
  }, [done]);
  return done;
}

/** Silliq skroll va umumiy sozlamalar */
export function MotionRoot({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ anchors: true, lerp: 0.09 });
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Ko'ringanda pastdan suzib chiqadi */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  intro = false,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  intro?: boolean;
  className?: string;
}) {
  const ready = useIntroDone(intro);
  const shown = { opacity: 1, y: 0 };
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      {...(intro ? { animate: ready ? shown : undefined } : { whileInView: shown })}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, ease: EASE, delay: delay + (intro ? 0.1 : 0) }}
    >
      {children}
    </motion.div>
  );
}

/** Sarlavha: so'zlar birin-ketin "niqob" ortidan ko'tariladi */
export function Words({
  text,
  delay = 0,
  stagger = 0.075,
  intro = false,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  intro?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const ready = useIntroDone(intro);
  return (
    <span ref={ref}>
      {text.split(" ").map((w, i) => (
        <span key={i}>
          <span className="-mb-[0.18em] inline-block overflow-hidden pb-[0.18em] align-bottom">
            <motion.span
              data-reveal
              className="inline-block"
              initial={{ y: "118%" }}
              animate={inView && ready ? { y: 0 } : undefined}
              transition={{ duration: 1.15, ease: EASE, delay: delay + (intro ? 0.1 : 0) + i * stagger }}
            >
              {w}
            </motion.span>
          </span>{" "}
        </span>
      ))}
    </span>
  );
}

function ScrubWord({ word, progress, from, to }: { word: string; progress: MotionValue<number>; from: number; to: number }) {
  const opacity = useTransform(progress, [from, to], [0.14, 1]);
  return (
    <motion.span data-reveal style={{ opacity }}>
      {word}{" "}
    </motion.span>
  );
}

/** Skroll qilingan sari so'zma-so'z "yonadigan" matn */
export function Scrub({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <ScrubWord key={i} word={w} progress={scrollYProgress} from={i / words.length} to={(i + 1) / words.length} />
      ))}
    </p>
  );
}

/** Chapdan o'ngga chiziladigan oltin chiziq */
export function Line({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.span
      aria-hidden="true"
      data-reveal
      className={`block h-px origin-left ${className}`}
      style={{ background: "var(--gold-grad)" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.6, ease: EASE, delay }}
    />
  );
}

/** Raqam ko'ringanda noldan sanab chiqadi */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: EASE,
      onUpdate: (v) => (node.textContent = Math.round(v).toLocaleString("ru-RU") + suffix),
    });
    return () => controls.stop();
  }, [inView, value, suffix]);
  return (
    <span ref={ref}>
      {value.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}

/** Sichqoncha va skrollga qarab sekin siljiydigan qatlam (bosh sahifa foni) */
export function Drift({ children, className, strength = 22 }: { children: ReactNode; className?: string; strength?: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 40, damping: 18 });
  const y = useSpring(my, { stiffness: 40, damping: 18 });
  const { scrollY } = useScroll();
  const scrollShift = useTransform(scrollY, [0, 900], [0, 140]);
  const fade = useTransform(scrollY, [0, 700], [1, 0.25]);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * -strength);
      my.set((e.clientY / window.innerHeight - 0.5) * -strength);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, strength]);

  return (
    <motion.div className={className} style={{ y: scrollShift, opacity: fade }}>
      <motion.div className="h-full w-full" style={{ x, y, scale: 1.08 }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Skrollda kontentdan sekinroq harakatlanadigan qatlam */
export function Parallax({ children, className, amount = 80 }: { children: ReactNode; className?: string; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/** Tepadagi menyu: pastga skrollda yashirinadi, tepaga skrollda qaytadi */
export function HeaderShell({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(v > 30);
    setHidden(v > prev && v > 500);
  });
  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
        solid ? "border-[var(--hair)] bg-night/80 backdrop-blur-xl" : "border-transparent"
      }`}
    >
      {children}
    </motion.header>
  );
}

/** Tadbirgacha qolgan vaqt: kun, soat, daqiqa, soniya */
export function Countdown({
  target,
  labels,
}: {
  /** ISO vaqt, masalan "2026-10-27T10:00:00+05:00" */
  target: string;
  labels: { days: string; hours: string; minutes: string; seconds: string };
}) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const end = new Date(target).getTime();
    const tick = () => setLeft(Math.max(0, end - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const total = Math.floor((left ?? 0) / 1000);
  const parts = [
    { value: Math.floor(total / 86400), label: labels.days },
    { value: Math.floor((total % 86400) / 3600), label: labels.hours },
    { value: Math.floor((total % 3600) / 60), label: labels.minutes },
    { value: total % 60, label: labels.seconds },
  ];
  if (left === 0) return null;
  return (
    <dl className="grid max-w-xl grid-cols-4 border border-[var(--hair)]" role="timer">
      {parts.map((p, i) => (
        <div
          key={p.label}
          className={`flex flex-col-reverse items-center py-5 md:py-7 ${i > 0 ? "border-l border-[var(--hair)]" : ""}`}
        >
          <dt className="mt-2 text-[0.8rem] text-mist md:text-[0.9rem]">{p.label}</dt>
          <dd className="gold-text font-display text-4xl leading-none tabular-nums md:text-6xl">
            {left === null ? "--" : String(p.value).padStart(2, "0")}
          </dd>
        </div>
      ))}
    </dl>
  );
}
