import type { Metadata } from "next";
import Link from "next/link";
import { Tiles } from "@/components/Tiles";
import {
  ApplySection,
  EventRows,
  FaqList,
  Formats,
  Leader,
  PartnersRow,
  SpeakerGrid,
  Stats,
  Steps,
} from "@/components/sections";
import { getTexts, href, shortDate, type Locale } from "@/lib/i18n";
import { splitEvents } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { speakers } from "@content/speakers";

// Tadbir sanasi o'tganda sahifa o'zi yangilanishi uchun (soatiga bir marta)
export const revalidate = 3600;

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getTexts(locale);
  return pageMeta({ locale, path: "", ...t.meta.home, absoluteTitle: true });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = getTexts(locale);
  const { upcoming } = splitEvents();
  const next = upcoming[0];

  return (
    <>
      <section className="on-dark relative bg-lapis text-white">
        <div className="absolute inset-y-0 right-0 hidden w-[40%] overflow-hidden lg:block">
          <Tiles cols={6} rows={8} seed={2} animate className="h-full w-full" />
        </div>
        <Tiles cols={12} rows={2} seed={2} animate className="block h-24 w-full sm:h-32 lg:hidden" />

        <div className="shell relative">
          <div className="max-w-[44rem] pb-16 pt-12 lg:w-[58%] lg:pb-28 lg:pt-24">
            <h1 className="h-display">{t.home.title}</h1>
            <p className="lead mt-7 text-white/80">{t.home.lead}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href={href(locale, "/membership#apply")} className="btn btn-light">
                {t.cta.join}
              </Link>
              <Link href={href(locale, "/events")} className="btn btn-outline">
                {t.nav.events}
              </Link>
            </div>
          </div>

          {next && (
            <Link
              href={`${href(locale, "/events")}#${next.slug}`}
              className="group relative -mb-12 grid gap-x-10 gap-y-2 bg-paper p-6 text-ink shadow-[0_18px_40px_-24px_rgba(15,31,71,0.55)] md:grid-cols-[auto_1fr_auto] md:items-center md:p-8"
            >
              <p className="text-[0.95rem] text-muted">{t.home.nextEvent}</p>
              <p className="font-display text-2xl leading-tight group-hover:text-glaze md:text-[1.7rem]">
                {next.title[locale]}
              </p>
              <p className="font-medium text-lapis">
                <time dateTime={`${next.date}T${next.time}`}>
                  {shortDate(next.date, locale)}, {next.time}
                </time>
              </p>
            </Link>
          )}
        </div>
      </section>

      <section className={`bg-stone pb-20 md:pb-28 ${next ? "pt-32 md:pt-40" : "pt-20 md:pt-28"}`}>
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <h2 className="h-section">{t.about.title}</h2>
            <div>
              <p className="font-display text-[1.75rem] leading-snug md:text-[2.1rem]">{t.about.lead}</p>
              <p className="mt-6 max-w-2xl text-muted">{t.about.p1}</p>
              <p className="mt-8">
                <Link href={href(locale, "/about")} className="text-link">
                  {t.cta.aboutClub}
                </Link>
              </p>
            </div>
          </div>
          <div className="mt-16 empty:hidden">
            <Stats locale={locale} />
          </div>
        </div>
      </section>

      <Formats locale={locale} />

      <section className="bg-stone py-20 md:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="h-section">{t.speakers.title}</h2>
              <p className="lead mt-4 text-muted">{t.speakers.lead}</p>
            </div>
            <Link href={href(locale, "/speakers")} className="text-link">
              {t.cta.allSpeakers}
            </Link>
          </div>
          <div className="mt-12">
            <SpeakerGrid locale={locale} items={speakers.slice(0, 4)} />
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="h-section">{t.events.upcoming}</h2>
            <Link href={href(locale, "/events")} className="text-link">
              {t.cta.allEvents}
            </Link>
          </div>
          <div className="mt-10">
            {upcoming.length > 0 ? (
              <EventRows locale={locale} items={upcoming.slice(0, 3)} />
            ) : (
              <p className="lead text-muted">{t.events.empty}</p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-stone py-20 md:py-28">
        <div className="shell">
          <Leader locale={locale} />
          <h2 className="h-section mt-20 md:mt-28">{t.membership.stepsTitle}</h2>
          <div className="mt-10">
            <Steps locale={locale} />
          </div>
        </div>
      </section>

      <PartnersRow locale={locale} />
      <FaqList locale={locale} />
      <ApplySection locale={locale} />
    </>
  );
}
