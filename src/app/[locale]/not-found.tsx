"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getTexts, isLocale } from "@/lib/i18n";

export default function NotFound() {
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale && isLocale(params.locale) ? params.locale : "uz";
  const t = getTexts(locale);
  return (
    <section className="pb-32 pt-48 md:pb-48 md:pt-64">
      <div className="shell">
        <h1 className="h-display">{t.notFound.title}</h1>
        <p className="lead muted mt-6">{t.notFound.text}</p>
        <Link href={`/${locale}`} className="btn btn-gold mt-12">
          {t.cta.home}
        </Link>
      </div>
    </section>
  );
}
