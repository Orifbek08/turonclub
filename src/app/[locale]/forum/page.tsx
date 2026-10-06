import type { Metadata } from "next";
import { Countdown, Reveal } from "@/components/motion";
import {
  ApplySection,
  ForumExpect,
  ForumFacts,
  ForumGuests,
  ForumJsonLd,
  NetworkSection,
  PageHead,
  SectionHead,
  forumTarget,
} from "@/components/sections";
import { getTexts, pick, todayInTashkent, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { forum } from "@content/forum";

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

      {forum.program.length > 0 && (
        <section className="section bg-deep">
          <div className="shell">
            <SectionHead title={t.forum.programTitle} />
            <ol className="mt-14 border-t border-[var(--hair)]">
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
          </div>
        </section>
      )}

      <ApplySection locale={locale} />

      <ForumJsonLd locale={locale} />
    </>
  );
}
