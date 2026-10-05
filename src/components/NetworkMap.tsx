"use client";

/**
 * XALQARO TARMOQ XARITASI
 * Mamlakatlar birin-ketin "yonadi" va O'zbekistondan ularga chiziq tortiladi.
 * Mamlakat qo'shish: map-data.ts dagi POINTS ga koordinata, content/texts dagi
 * network.countries ro'yxatiga nom qo'shiladi (kalitlari bir xil bo'lishi kerak).
 */
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { LAND, MAP_H, MAP_W, POINTS } from "./map-data";

type Country = { key: string; name: string };

// Yozuvlarning nuqtaga nisbatan joylashuvi (bir-birini yopib qo'ymasligi uchun)
const LABEL: Record<string, { dx: number; dy: number; anchor: "start" | "middle" | "end" }> = {
  uz: { dx: -13, dy: 5, anchor: "end" },
  kz: { dx: 12, dy: -7, anchor: "start" },
  kg: { dx: 13, dy: 5, anchor: "start" },
  tj: { dx: -11, dy: 18, anchor: "end" },
  tr: { dx: 0, dy: -15, anchor: "middle" },
  cn: { dx: 0, dy: -15, anchor: "middle" },
  sa: { dx: 0, dy: 26, anchor: "middle" },
  kr: { dx: 0, dy: 26, anchor: "middle" },
  pl: { dx: 0, dy: -15, anchor: "middle" },
};

const R = 2.1;
const landPath = LAND.split(" ")
  .map((p) => {
    const [x, y] = p.split(",").map(Number) as [number, number];
    return `M${x - R} ${y}a${R} ${R} 0 1 0 ${R * 2} 0a${R} ${R} 0 1 0 ${-R * 2} 0`;
  })
  .join("");

function arc(from: [number, number], to: [number, number]): string {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - Math.hypot(x2 - x1, y2 - y1) * 0.22;
  return `M${x1} ${y1}Q${mx} ${my} ${x2} ${y2}`;
}

export function NetworkMap({
  countries,
  more,
  directionsTitle,
  directions,
}: {
  countries: Country[];
  more: string;
  directionsTitle: string;
  directions: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);
  const list = useMemo(() => countries.filter((c) => POINTS[c.key]), [countries]);
  const total = list.length;

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setShown(total + 1);
      return;
    }
    const id = window.setInterval(() => {
      setShown((n) => {
        if (n > total) window.clearInterval(id);
        return n + 1;
      });
    }, 620);
    return () => window.clearInterval(id);
  }, [inView, reduce, total]);

  const home = POINTS.uz!;

  return (
    <div ref={ref} className="grid items-center gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
      <div>
        <ol className="grid grid-cols-2 gap-x-6 border-t border-[var(--hair)]">
          {list.map((c, i) => (
            <li
              key={c.key}
              className={`flex items-center gap-3 border-b border-[var(--hair)] py-4 font-display text-xl transition-all duration-700 md:text-2xl ${
                i < shown ? "text-ivory" : "text-ivory/25"
              }`}
            >
              <span
                aria-hidden="true"
                className={`h-2 w-2 shrink-0 rounded-full transition-colors duration-700 ${
                  i < shown ? "bg-gold" : "bg-white/15"
                }`}
              />
              {c.name}
            </li>
          ))}
          <li
            className={`col-span-2 py-4 text-mist transition-opacity duration-700 ${
              shown > total ? "opacity-100" : "opacity-0"
            }`}
          >
            {more}
          </li>
        </ol>

        <h3 className="muted mt-8 text-lg">{directionsTitle}</h3>
        <ul className="mt-4 flex flex-wrap gap-2.5">
          {directions.map((d, i) => (
            <li
              key={d}
              className={`border border-[var(--hair)] px-4 py-2 text-[0.95rem] transition-all duration-700 ${
                shown > Math.min(total, 2 + i) ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              {d}
            </li>
          ))}
        </ul>
      </div>

      <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="h-auto w-full overflow-visible" role="img" aria-label={list.map((c) => c.name).join(", ")}>
        <defs>
          <linearGradient id="arc-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#f1e0b4" />
            <stop offset="1" stopColor="#c9a96a" />
          </linearGradient>
        </defs>
        <path d={landPath} fill="#2b2f74" />

        {list.map((c, i) => {
          if (c.key === "uz" || i >= shown) return null;
          return (
            <motion.path
              key={`arc-${c.key}`}
              d={arc(home, POINTS[c.key]!)}
              fill="none"
              stroke="url(#arc-gold)"
              strokeWidth="1.4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
          );
        })}

        {list.map((c, i) => {
          if (i >= shown) return null;
          const [x, y] = POINTS[c.key]!;
          const label = LABEL[c.key] ?? { dx: 0, dy: -15, anchor: "middle" as const };
          const isHome = c.key === "uz";
          return (
            <g key={c.key}>
              <motion.circle
                cx={x}
                cy={y}
                fill="none"
                stroke="#f1e0b4"
                strokeWidth="1"
                initial={{ r: 3, opacity: 0.9 }}
                animate={{ r: isHome ? 30 : 20, opacity: 0 }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.circle
                cx={x}
                cy={y}
                fill="#f1e0b4"
                initial={{ r: 0 }}
                animate={{ r: isHome ? 7 : 5 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.text
                x={x + label.dx}
                y={y + label.dy}
                textAnchor={label.anchor}
                className="hidden md:block"
                fill={isHome ? "#f1e0b4" : "#f5f0e6"}
                fontSize={isHome ? 19 : 16}
                fontWeight={isHome ? 600 : 500}
                style={{ paintOrder: "stroke", stroke: "#04051a", strokeWidth: 5, strokeLinejoin: "round" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.25 }}
              >
                {c.name}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
