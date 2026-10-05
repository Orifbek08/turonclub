import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Countdown, Reveal } from "@/components/motion";
import {
  ApplySection,
  ForumExpect,
  ForumFacts,
  ForumGuests,
  NetworkSection,
  PageHead,
  SectionHead,
  forumTarget,
} from "@/components/sections";
import { getTexts, pick, todayInTashkent, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { forum } from "@content/forum";
import { site } from "@content/site";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({ locale, path: "/forum", ...getTexts(locale).meta.forum });
}

export default async function ForumPage({ params }: Props) {
  const { locale } = await params;
  const t = getTexts(locale);
  const upcoming = forum.date >= todayInTashkent();
  const venue = pick(forum.venue, locale);

  return (
    <>
      <PageHead title={t.forum.title} lead={t.forum.lead} />

      <section className="section">
        <div className="shell">
          <ForumFacts locale={locale} />
          {upcoming && (
            <Reveal delay={0.2} className="mt-14 md:mt-20">
              <Countdown target={forumTarget()} labels={t.forum.countdown} />
            </Reveal>
          )}
        </div>
      </section>

      <ForumExpect locale={locale} />
      <NetworkSection locale={locale} />
      <ForumGuests locale={locale} />

      <section className="section bg-deep">
        <div className="shell">
          <SectionHead title={t.forum.programTitle} />
          <div className="mt-14">
            {forum.program.length > 0 ? (
              <ol className="border-t border-[var(--hair)]">
                {forum.program.map((item, i) => (
                  <li key={`${item.time}-${i}`} className="row-hover border-b border-[var(--hair)]">
                    <Reveal delay={i * 0.06}>
                      <div className="row-shift grid gap-2 py-8 md:grid-cols-[10rem_1fr] md:items-baseline md:gap-10">
                        <span className="gold-text font-display text-4xl leading-none">{item.time}</span>
                        <span className="h-item">{pick(item.title, locale)}</span>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            ) : (
              <Reveal>
                <p className="font-display text-[clamp(1.7rem,2.6vw,2.5rem)] leading-tight text-ivory/80">
                  {t.forum.programTbd}
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <ApplySection locale={locale} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BusinessEvent",
          name: t.forum.title,
          description: t.forum.lead,
          startDate: forum.time ? `${forum.date}T${forum.time}:00+05:00` : forum.date,
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          ...(venue && { location: { "@type": "Place", name: venue, address: venue } }),
          organizer: { "@type": "Organization", name: `${site.name} — ${pick(site.descriptor, locale)}`, url: site.url },
          url: `${site.url}/${locale}/forum`,
        }}
      />
    </>
  );
}
