import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Tiles } from "@/components/Tiles";
import { LogoMark } from "@/components/Logo";
import { Drift, Line, Parallax, Reveal, Scrub, Words } from "@/components/motion";
import {
  ApplySection,
  Benefits,
  FaqList,
  ForumBand,
  ForumJsonLd,
  Formula,
  FounderGrid,
  FounderTrio,
  FounderQuote,
  Marquee,
  SectionHead,
  Stats,
  Tiers,
} from "@/components/sections";
import { getTexts, href, pick, shortDate, todayInTashkent, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { founders } from "@content/founders";
import { forum } from "@content/forum";
import { site } from "@content/site";

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
  const forumAhead = forum.date >= todayInTashkent();

  return (
    <>
      {/* ---------- Birinchi ekran ---------- */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
        <Drift className="absolute inset-0 -z-20">
          <Tiles cols={16} rows={10} seed={2} live className="h-full w-full" />
        </Drift>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(90deg, #04051a 0%, rgba(4,5,26,0.92) 34%, rgba(4,5,26,0.35) 72%, rgba(4,5,26,0.15) 100%), linear-gradient(0deg, #04051a 2%, transparent 38%), linear-gradient(180deg, #04051a 0%, rgba(4,5,26,0.85) 9%, transparent 20%)",
          }}
        />

        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-night/60 md:hidden" />

        <div className="shell flex flex-1 flex-col justify-end pb-8 pt-28 md:pb-10 lg:justify-between lg:pt-36">
          {/* Telefonda tartib: sarlavha → asoschilar → matn va tugmalar.
              Kompyuterda: chapda matn, o'ngda asoschilar. */}
          <div className="grid gap-x-8 gap-y-8 lg:grid-cols-[0.92fr_1.08fr] lg:grid-rows-[auto_auto] lg:gap-y-0">
            <div className="lg:col-start-1 lg:row-start-1">
              <Reveal intro y={16}>
                <p className="text-lg text-gold-light">{pick(site.descriptor, locale)}</p>
              </Reveal>
              <h1 className="h-hero mt-6">
                <Words text={t.home.title} intro delay={0.15} />
              </h1>
            </div>

            <Reveal
              intro
              delay={0.5}
              y={50}
              className="mx-auto w-full max-w-xl self-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:-mr-6 lg:max-w-none xl:-mr-12"
            >
              <FounderTrio locale={locale} />
            </Reveal>

            <div className="lg:col-start-1 lg:row-start-2">
              <Reveal intro delay={0.75}>
                <p className="lead text-ivory/80 lg:mt-10">{t.home.lead}</p>
              </Reveal>
              <Reveal intro delay={0.9}>
                <div className="mt-8 flex flex-wrap gap-4 lg:mt-10">
                  <Link href={href(locale, "/membership#apply")} className="btn btn-gold">
                    {t.cta.join}
                  </Link>
                  <Link href={href(locale, "/about")} className="btn btn-ghost">
                    {t.nav.about}
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal intro delay={1.1} y={0}>
            <div className="mt-12 md:mt-14">
              <Line delay={2.6} />
              <div className="flex items-center justify-between gap-8 pt-6">
                {forumAhead ? (
                  <Link href={href(locale, "/forum")} className="group flex flex-wrap items-baseline gap-x-6 gap-y-1">
                    <span className="muted text-[0.95rem]">{t.home.nextEvent}</span>
                    <span className="font-display text-xl transition-colors group-hover:text-gold-light md:text-2xl">
                      {t.forum.title}
                    </span>
                    <time dateTime={forum.date} className="text-gold-light">
                      {shortDate(forum.date, locale)}
                      {forum.time && `, ${forum.time}`}
                    </time>
                  </Link>
                ) : (
                  <span />
                )}
                <span className="muted hidden shrink-0 items-center gap-4 text-[0.95rem] md:flex">
                  {t.home.scroll}
                  <span aria-hidden="true" className="scroll-cue relative block h-12 w-px overflow-hidden bg-white/15" />
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee items={t.home.marquee} />
      <ForumBand locale={locale} />

      {/* ---------- Klub haqida: skrollda ochiladigan matn ---------- */}
      <section className="section relative overflow-hidden">
        <Parallax amount={120} className="pointer-events-none absolute -right-24 top-10 hidden lg:block">
          <LogoMark className="h-[38rem] w-auto text-deep" />
        </Parallax>
        <div className="shell relative">
          <h2 className="muted text-lg">{t.about.title}</h2>
          <Scrub
            text={t.home.manifesto}
            className="mt-8 max-w-6xl font-display text-[clamp(2rem,4.6vw,4.4rem)] leading-[1.1]"
          />
          <div className="mt-14 md:mt-20">
            <Formula items={t.home.formula} />
          </div>
          <Reveal delay={0.1}>
            <p className="mt-12">
              <Link href={href(locale, "/about")} className="text-link">
                {t.cta.aboutClub}
              </Link>
            </p>
          </Reveal>
          <div className="mt-20 empty:hidden md:mt-28">
            <Stats locale={locale} />
          </div>
        </div>
      </section>

      <Benefits locale={locale} />

      {/* ---------- Asoschilar (och bo'lim) ---------- */}
      <section className="on-light section bg-ivory text-ink">
        <div className="shell">
          <SectionHead
            title={t.founders.title}
            lead={t.founders.lead}
            action={
              <Link href={href(locale, "/founders")} className="text-link">
                {t.cta.allFounders}
              </Link>
            }
          />
          {founders[0] && (
            <div className="mt-16 md:mt-24">
              <FounderQuote locale={locale} founder={founders[0]} />
            </div>
          )}
          <div className="mt-16 md:mt-24">
            <FounderGrid locale={locale} />
          </div>
        </div>
      </section>

      {/* ---------- A'zolik paketlari ---------- */}
      <section className="section bg-deep">
        <div className="shell">
          <SectionHead
            title={t.membership.tiersTitle}
            lead={t.membership.lead}
            action={
              <Link href={href(locale, "/membership")} className="text-link">
                {t.cta.membership}
              </Link>
            }
          />
          <div className="mt-16 md:mt-20">
            <Tiers locale={locale} />
          </div>
        </div>
      </section>

      <FaqList locale={locale} />
      <ApplySection locale={locale} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${site.url}/#website`,
          name: site.brand,
          alternateName: site.alternateNames,
          url: site.url,
          inLanguage: ["uz", "uz-Cyrl", "ru", "en"],
          publisher: { "@id": `${site.url}/#organization` },
        }}
      />
      {forumAhead && <ForumJsonLd locale={locale} />}
    </>
  );
}
