import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ApplySection, EventRows, PageHead } from "@/components/sections";
import { getTexts, type Locale } from "@/lib/i18n";
import { findSpeaker, splitEvents } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { site } from "@content/site";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({ locale, path: "/events", ...getTexts(locale).meta.events });
}

export default async function EventsPage({ params }: Props) {
  const { locale } = await params;
  const t = getTexts(locale);
  const { upcoming, past } = splitEvents();

  return (
    <>
      <PageHead title={t.events.title} lead={t.events.lead} />
      <section className="bg-stone py-16 md:py-24">
        <div className="shell">
          <h2 className="h-section">{t.events.upcoming}</h2>
          <div className="mt-10">
            {upcoming.length > 0 ? (
              <EventRows locale={locale} items={upcoming} />
            ) : (
              <p className="lead text-muted">{t.events.empty}</p>
            )}
          </div>
        </div>
      </section>
      {past.length > 0 && (
        <section className="bg-paper py-16 md:py-24">
          <div className="shell">
            <h2 className="h-section">{t.events.past}</h2>
            <div className="mt-10">
              <EventRows locale={locale} items={past} withAction={false} />
            </div>
          </div>
        </section>
      )}
      <ApplySection locale={locale} />
      {upcoming.map((e) => {
        const speaker = findSpeaker(e.speakerSlug);
        return (
          <JsonLd
            key={e.slug}
            data={{
              "@context": "https://schema.org",
              "@type": "BusinessEvent",
              name: e.title[locale],
              description: e.summary[locale],
              startDate: `${e.date}T${e.time}:00+05:00`,
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              eventStatus: "https://schema.org/EventScheduled",
              location: { "@type": "Place", name: e.venue[locale], address: e.venue[locale] },
              organizer: { "@type": "Organization", name: site.name, url: site.url },
              ...(speaker && { performer: { "@type": "Person", name: speaker.name[locale] } }),
              url: `${site.url}/${locale}/events#${e.slug}`,
            }}
          />
        );
      })}
    </>
  );
}
