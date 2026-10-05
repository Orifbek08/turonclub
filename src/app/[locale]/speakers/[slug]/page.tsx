import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Portrait } from "@/components/Portrait";
import { ApplySection, EventRows } from "@/components/sections";
import { getTexts, href, locales, type Locale } from "@/lib/i18n";
import { findSpeaker, splitEvents } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { site } from "@content/site";
import { speakers } from "@content/speakers";

export const revalidate = 3600;
export const dynamicParams = false;

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => speakers.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const s = findSpeaker(slug);
  if (!s) return {};
  return pageMeta({
    locale,
    path: `/speakers/${slug}`,
    title: `${s.name[locale]}, ${s.role[locale]}, ${s.company}`,
    description: s.bio[locale].slice(0, 160),
  });
}

export default async function SpeakerPage({ params }: Props) {
  const { locale, slug } = await params;
  const s = findSpeaker(slug);
  if (!s) notFound();
  const t = getTexts(locale);
  const { upcoming } = splitEvents();
  const theirEvents = upcoming.filter((e) => e.speakerSlug === s.slug);

  return (
    <>
      <section className="bg-stone py-12 md:py-20">
        <div className="shell">
          <Link href={href(locale, "/speakers")} className="text-link">
            {t.speakers.back}
          </Link>
          <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-16">
            <Portrait
              dir="speakers"
              file={s.photo}
              name={s.name[locale]}
              alt={`${s.name[locale]}, ${s.role[locale]}, ${s.company}`}
              sizes="(min-width: 768px) 352px, 92vw"
              priority
            />
            <div>
              <h1 className="h-display">{s.name[locale]}</h1>
              <p className="mt-4 text-xl text-muted">
                {s.role[locale]}, {s.company}
              </p>
              <h2 className="mt-12 text-2xl">{t.speakers.topics}</h2>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {s.topics[locale].map((topic) => (
                  <li key={topic} className="border border-lapis/30 bg-paper px-3.5 py-1.5 text-[0.95rem]">
                    {topic}
                  </li>
                ))}
              </ul>
              <h2 className="mt-12 text-2xl">{t.speakers.bio}</h2>
              <p className="mt-4 max-w-2xl text-lg">{s.bio[locale]}</p>
            </div>
          </div>
        </div>
      </section>

      {theirEvents.length > 0 && (
        <section className="bg-paper py-16 md:py-24">
          <div className="shell">
            <h2 className="h-section">{t.speakers.events}</h2>
            <div className="mt-10">
              <EventRows locale={locale} items={theirEvents} />
            </div>
          </div>
        </section>
      )}

      <ApplySection locale={locale} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: s.name[locale],
          jobTitle: s.role[locale],
          worksFor: { "@type": "Organization", name: s.company },
          description: s.bio[locale],
          url: `${site.url}/${locale}/speakers/${s.slug}`,
          ...(s.photo && { image: `${site.url}/images/speakers/${s.photo}` }),
        }}
      />
    </>
  );
}
