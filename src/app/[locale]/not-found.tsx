"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getTexts, isLocale } from "@/lib/i18n";

export default function NotFound() {
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale && isLocale(params.locale) ? params.locale : "uz";
  const t = getTexts(locale);
  return (
    <section className="bg-stone py-24 md:py-36">
      <div className="shell">
        <h1 className="h-display">{t.notFound.title}</h1>
        <p className="lead mt-5 text-muted">{t.notFound.text}</p>
        <Link href={`/${locale}`} className="btn btn-primary mt-10">
          {t.cta.home}
        </Link>
      </div>
    </section>
  );
}
