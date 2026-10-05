import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ApplySection, EventRows, PageHead, SectionHead } from "@/components/sections";
import { getTexts, type Locale } from "@/lib/i18n";
import { splitEvents } from "@/lib/content";
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
      <section className="section">
        <div className="shell">
          <SectionHead title={t.events.upcoming} />
          <div className="mt-14">
            {upcoming.length > 0 ? (
              <EventRows locale={locale} items={upcoming} />
            ) : (
              <p className="lead muted">{t.events.empty}</p>
            )}
          </div>
        </div>
      </section>
      {past.length > 0 && (
        <section className="section bg-deep">
          <div className="shell">
            <SectionHead title={t.events.past} />
            <div className="mt-14">
              <EventRows locale={locale} items={past} withAction={false} />
            </div>
          </div>
        </section>
      )}
      <ApplySection locale={locale} />
      {upcoming.map((e) => (
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
            url: `${site.url}/${locale}/events#${e.slug}`,
          }}
        />
      ))}
    </>
  );
}
