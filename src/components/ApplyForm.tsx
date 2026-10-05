"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { Texts } from "@content/texts/uz";
import { site } from "@content/site";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Ariza shakli. Ko'rinishi saytniki, ma'lumot esa to'g'ridan-to'g'ri
 * Bitrix24 CRM-formasiga yuboriladi (content/site.ts → bitrix).
 * Bitrix24'ning o'z vidjeti ham xuddi shu manzilga, xuddi shu ko'rinishda yuboradi.
 */
async function sendToBitrix(values: Record<string, string>, lang: string) {
  const { address, formId, sec } = site.bitrix;
  const now = Math.round(Date.now() / 1000);
  const body = new FormData();
  body.set("values", JSON.stringify(Object.fromEntries(Object.entries(values).map(([k, v]) => [k, [v]]))));
  body.set("properties", "{}");
  body.set("consents", "{}");
  body.set("recaptcha", "");
  body.set("yandexSmartCaptcha", "");
  body.set("timeZoneOffset", String(new Date().getTimezoneOffset()));
  body.set("id", formId);
  body.set("sec", sec);
  body.set("lang", lang);
  body.set(
    "trace",
    JSON.stringify({
      url: window.location.href,
      ref: document.referrer,
      device: { isMobile: window.matchMedia("(max-width: 767px)").matches },
      tags: { ts: now, list: {} },
      pages: { list: [[window.location.href, now, document.title]] },
    }),
  );
  body.set("entities", "[]");
  body.set("security_sign", "");

  const res = await fetch(`${address}/bitrix/services/main/ajax.php?action=crm.site.form.fill`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    body,
  });
  const json = await res.json();
  if (json.error || !json.result?.resultId) {
    throw new Error(json.error_description || json.error || "Bitrix24 arizani qabul qilmadi");
  }
}

export function ApplyForm({
  locale,
  t,
  privacy,
}: {
  locale: string;
  t: Texts["form"];
  privacy: { href: string; label: string };
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    // Yashirin maydon to'ldirilgan bo'lsa, bu bot: hech narsa yubormaymiz
    if (data.website) {
      setStatus("success");
      return;
    }
    const f = site.bitrix.fields;
    setStatus("sending");
    try {
      await sendToBitrix(
        {
          [f.name]: data.name.trim(),
          [f.phone]: data.phone.replace(/[^\d+]/g, ""),
          [f.business]: data.business.trim(),
          [f.turnover]: data.turnover.trim(),
        },
        locale === "en" ? "en" : "ru",
      );
      form.reset();
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="font-display text-4xl leading-snug text-gold-light">
        {t.success}
      </p>
    );
  }

  const fields = [
    { name: "name", label: t.name, type: "text", autoComplete: "name", required: true, wide: false },
    { name: "phone", label: t.phone, type: "tel", autoComplete: "tel", required: true, wide: false },
    { name: "business", label: t.business, type: "text", autoComplete: "off", required: false, wide: true },
    { name: "turnover", label: t.turnover, type: "text", autoComplete: "off", required: false, wide: true },
  ];

  return (
    <form onSubmit={onSubmit} className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
      {fields.map((f) => (
        <label key={f.name} className={`block ${f.wide ? "sm:col-span-2" : ""}`}>
          <span className="block text-[0.9rem] text-mist">
            {f.label}
            {f.required && (
              <span aria-hidden="true" className="text-gold">
                {" "}
                *
              </span>
            )}
          </span>
          <input
            className="field"
            name={f.name}
            type={f.type}
            autoComplete={f.autoComplete}
            required={f.required}
            maxLength={120}
            defaultValue={f.name === "phone" ? "+998 " : undefined}
            pattern={f.name === "phone" ? "[+0-9 ()\\-]{9,}" : undefined}
            inputMode={f.name === "phone" ? "tel" : undefined}
          />
        </label>
      ))}
      {/* Botlarga qarshi yashirin maydon: odam ko'rmaydi va to'ldirmaydi */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-gold w-full sm:w-auto" disabled={status === "sending"}>
          {status === "sending" ? t.sending : t.submit}
        </button>
        {status === "error" && (
          <p role="alert" className="mt-5 font-medium text-[#ff9d8f]">
            {t.error}
          </p>
        )}
        <p className="mt-5 text-sm text-mist">
          {t.consent}{" "}
          <Link href={privacy.href} className="underline underline-offset-4 hover:text-gold-light">
            {privacy.label}
          </Link>
        </p>
      </div>
    </form>
  );
}
