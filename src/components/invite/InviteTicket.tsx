"use client";

import { forwardRef } from "react";
import { invite } from "@content/invite";
import { LogoMark } from "@/components/Logo";

/**
 * Taklif bileti (bepul, ID 4000 dan). Asosiy biletdan farqi — to'q qizil (bordo) rang
 * va pastida 100 $ to'lov haqida ogohlantirish.
 * O'lchamlar konteyner kengligiga nisbatan (cqw) — telefonda ham, yuklab olinganda ham bir xil ko'rinadi.
 */
export const InviteTicket = forwardRef<HTMLDivElement, { name: string; id: string | number }>(function InviteTicket(
  { name, id },
  ref,
) {
  const e = invite.event;
  return (
    <div className="@container w-full">
      <div
        ref={ref}
        className="relative grid aspect-[2000/960] w-full grid-cols-[1fr_20%] overflow-hidden text-[#fff7e6]"
        style={{
          background:
            "radial-gradient(120% 90% at 30% 0%, #5b1028 0%, #3a0718 45%, #22040e 100%)",
          fontFamily: "var(--font-display)",
        }}
      >
        {/* ASOSIY QISM */}
        <div className="relative flex flex-col px-[3.2cqw] pb-[2.4cqw] pt-[2.6cqw]">
          <LogoMark className="pointer-events-none absolute -left-[6cqw] top-[2cqw] h-[44cqw] w-auto text-[#fff] opacity-[0.05]" />
          <div className="flex items-start justify-between gap-[2cqw]">
            <p
              className="max-w-[56cqw] text-[3.1cqw] uppercase leading-[1.08]"
              style={{ background: "var(--gold-grad)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
            >
              {e.title}
            </p>
            <span
              className="shrink-0 border px-[1.2cqw] py-[0.6cqw] text-[1.25cqw] uppercase tracking-[0.18em]"
              style={{ borderColor: "#c9a96a", color: "#f1e0b4" }}
            >
              Таклиф билети
            </span>
          </div>

          <div className="mt-[2cqw] grid flex-1 grid-cols-[17%_1fr_17%] items-stretch gap-[1.6cqw]">
            <InfoBox label="Сана" value={e.date.replace(/\.(\d{4})$/, "\n$1")} />
            <div
              className="relative overflow-hidden border"
              style={{
                borderColor: "rgba(201,169,106,.55)",
                clipPath: "polygon(6% 0, 94% 0, 100% 12%, 100% 88%, 94% 100%, 6% 100%, 0 88%, 0 12%)",
                background: "radial-gradient(90% 80% at 50% 30%, #6d1a33, #2a0612)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/founders/asoschilar-birga.webp"
                alt=""
                className="absolute inset-x-0 bottom-0 mx-auto h-[96%] w-auto max-w-none"
              />
            </div>
            <InfoBox label="Вақт" value={e.time.replace(" – ", "\n")} />
          </div>

          <p
            className="mt-[1.6cqw] border px-[1.6cqw] py-[0.9cqw] text-[1.7cqw] leading-tight"
            style={{ borderColor: "rgba(201,169,106,.45)", fontFamily: "var(--font-sans)" }}
          >
            {e.venue}
          </p>
          <p
            className="mt-[1cqw] px-[1.6cqw] py-[0.8cqw] text-[1.35cqw] font-semibold leading-snug text-[#22040e]"
            style={{ background: "var(--gold-grad)", fontFamily: "var(--font-sans)" }}
          >
            ⚠ Билет бепул берилди. Ташкилий харажатлар учун {e.fee} тўлов қилиниши шарт.
          </p>
        </div>

        {/* QIRQIM (stub) */}
        <div
          className="relative flex flex-col items-center justify-between border-l-2 border-dashed px-[1.6cqw] py-[2.6cqw]"
          style={{ borderColor: "rgba(201,169,106,.6)", background: "#2a0612" }}
        >
          <LogoMark className="h-[6cqw] w-auto text-[#f1e0b4]" />
          <div className="w-full text-center">
            <p className="text-[1.15cqw] uppercase tracking-[0.2em] text-[#c9a96a]" style={{ fontFamily: "var(--font-sans)" }}>
              ФИО
            </p>
            <p className="mt-[0.6cqw] break-words text-[2.1cqw] leading-tight">{name}</p>
          </div>
          <div className="w-full border-t pt-[1.4cqw] text-center" style={{ borderColor: "rgba(201,169,106,.45)" }}>
            <p className="text-[1.15cqw] uppercase tracking-[0.2em] text-[#c9a96a]" style={{ fontFamily: "var(--font-sans)" }}>
              ID
            </p>
            <p
              className="mt-[0.4cqw] text-[5.2cqw] leading-none"
              style={{ background: "var(--gold-grad)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
            >
              {id}
            </p>
          </div>
          <p className="text-center text-[1.05cqw] leading-snug text-[#f1e0b4]/80" style={{ fontFamily: "var(--font-sans)" }}>
            Кириш учун {e.fee} тўлов шарт
          </p>
        </div>
      </div>
    </div>
  );
});

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center border text-center"
      style={{ borderColor: "rgba(201,169,106,.45)", background: "rgba(34,4,14,.55)" }}
    >
      <p className="text-[1.2cqw] uppercase tracking-[0.2em] text-[#c9a96a]" style={{ fontFamily: "var(--font-sans)" }}>
        {label}
      </p>
      <p className="mt-[0.8cqw] whitespace-pre-line text-[3.3cqw] leading-[1.05]">{value}</p>
    </div>
  );
}
