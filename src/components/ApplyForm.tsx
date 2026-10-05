"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { Texts } from "@content/texts/uz";

type Status = "idle" | "sending" | "success" | "error";

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
    data.locale = locale;
    data.event = new URLSearchParams(window.location.search).get("event") ?? "";
    setStatus("sending");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="font-display text-3xl leading-snug">
        {t.success}
      </p>
    );
  }

  const fields = [
    { name: "name", label: t.name, type: "text", autoComplete: "name", required: true },
    { name: "company", label: t.company, type: "text", autoComplete: "organization", required: true },
    { name: "position", label: t.position, type: "text", autoComplete: "organization-title", required: true },
    { name: "phone", label: t.phone, type: "tel", autoComplete: "tel", required: true },
  ];

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      {fields.map((f) => (
        <label key={f.name} className="block">
          <span className="mb-1.5 block text-[0.95rem] font-medium">{f.label}</span>
          <input
            className="field"
            name={f.name}
            type={f.type}
            autoComplete={f.autoComplete}
            required={f.required}
            maxLength={120}
            placeholder={f.name === "phone" ? "+998" : undefined}
          />
        </label>
      ))}
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-[0.95rem] font-medium">{t.message}</span>
        <textarea className="field" name="message" rows={3} maxLength={1000} />
      </label>
      {/* Botlarga qarshi yashirin maydon: odam ko'rmaydi va to'ldirmaydi */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === "sending"}>
          {status === "sending" ? t.sending : t.submit}
        </button>
        {status === "error" && (
          <p role="alert" className="mt-4 font-medium text-[#a3261c]">
            {t.error}
          </p>
        )}
        <p className="mt-4 text-sm text-muted">
          {t.consent}{" "}
          <Link href={privacy.href} className="underline underline-offset-4 hover:text-ink">
            {privacy.label}
          </Link>
        </p>
      </div>
    </form>
  );
}
