"use client";

/**
 * KIRISH EKRANI
 * Sayt birinchi ochilganda logotip videosi o'ynaydi (public/brand/intro.mp4).
 * Telefon videoni o'zi boshlashga ruxsat bermasa (masalan, iPhone'da quvvat
 * tejash rejimi), video o'rniga logotipning o'zi silliq paydo bo'ladi —
 * "play" tugmasi hech qachon ko'rinmaydi.
 * Ekran erishni boshlaganda "turon:intro-done" xabari yuboriladi,
 * bosh sahifa animatsiyasi aynan shundan keyin boshlanadi.
 */
import { useEffect, useRef } from "react";

const VIDEO_MS = 3600; // video uzunligi
const STILL_MS = 2400; // video o'ynamasa, logotip shuncha turadi
const WAIT_MS = 1600; // sekin internetda videoning boshlanishini shuncha kutamiz

export function Intro() {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = box.current;
    if (!el || root.classList.contains("intro-seen")) return;

    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));
    let finished = false;
    let started = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      root.classList.add("intro-out");
      (window as unknown as { __turonIntroDone?: boolean }).__turonIntroDone = true;
      window.dispatchEvent(new Event("turon:intro-done"));
      later(() => root.classList.add("intro-seen"), 1000);
    };

    // Video o'ynamasa: uni olib tashlab, logotipning o'zini ko'rsatamiz
    const still = () => {
      if (started || finished || el.classList.contains("is-still")) return;
      video.remove();
      el.classList.add("is-still");
      later(finish, STILL_MS);
    };

    // Video faqat shu yerda, brauzerda yaratiladi: "muted" belgisi aniq turadi,
    // aks holda iPhone uni ovozli video deb hisoblab, o'zi boshlamaydi.
    const video = document.createElement("video");
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("disablepictureinpicture", "");
    video.preload = "auto";
    video.className = "intro-video";

    const sources = ["/brand/intro.mp4", "/brand/intro.webm"];
    const tryNext = () => {
      const src = sources.shift();
      if (!src) return still();
      video.src = src;
      // Brauzer ruxsat bermasa (quvvat tejash rejimi) yoki format ochilmasa
      video.play().catch((err: unknown) => {
        if (started || finished) return;
        if ((err as { name?: string })?.name === "NotSupportedError") tryNext();
        else still();
      });
    };

    video.addEventListener(
      "playing",
      () => {
        if (finished || started || !video.isConnected) return;
        started = true;
        el.classList.add("is-video");
        later(finish, VIDEO_MS);
      },
      { once: true },
    );
    el.appendChild(video);
    tryNext();
    later(still, WAIT_MS);

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      video.remove();
    };
  }, []);

  return (
    <div ref={box} className="intro" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="intro-still" src="/brand/intro-poster.webp" alt="" decoding="async" />
    </div>
  );
}
