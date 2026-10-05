"use client";

import { useEffect, useRef } from "react";

/**
 * Kirish ekrani: logotip chizilib chiqadigan qisqa video.
 * Video qora fonda oq rangda tayyorlangan va "screen" aralashtirish bilan
 * qo'yilgan, shuning uchun uning foni sayt foniga singib ketadi.
 * Bir tashrifda faqat bir marta ko'rsatiladi (layout.tsx dagi skriptga qarang).
 */
export function Intro() {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("intro-seen")) return;
    // Sanoq video boshlanganda ishga tushadi; video kechiksa yoki
    // qurilma avtomatik ijroni taqiqlasa, 1,2 soniyadan keyin baribir boshlanadi.
    const go = () => root.classList.add("intro-go");
    const el = video.current;
    el?.addEventListener("playing", go, { once: true });
    el?.play().catch(() => {});
    const fallback = window.setTimeout(() => {
      // Video boshlanmagan bo'lsa (masalan, telefonda quvvat tejash rejimi),
      // o'rniga tayyor logotip rasmi ko'rsatiladi
      if (el && el.paused) el.poster = "/brand/intro-poster.webp";
      go();
    }, 1200);
    return () => {
      window.clearTimeout(fallback);
      el?.removeEventListener("playing", go);
    };
  }, []);

  return (
    <div className="intro" aria-hidden="true">
      <video
        ref={video}
        className="intro-video"
        muted
        playsInline
        autoPlay
        preload="auto"
        disablePictureInPicture
      >
        <source src="/brand/intro.mp4" type="video/mp4" />
        <source src="/brand/intro.webm" type="video/webm" />
      </video>
    </div>
  );
}
