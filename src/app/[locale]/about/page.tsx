import type { Metadata } from "next";
import Link from "next/link";
import { Scrub, Words } from "@/components/motion";
import {
  ApplySection,
  Benefits,
  Formula,
  FounderGrid,
  PageHead,
  PartnersRow,
  SectionHead,
  Stats,
} from "@/components/sections";
import { getTexts, href, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { founders } from "@content/founders";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({ locale, path: "/about", ...getTexts(locale).meta.about });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = getTexts(locale);
  return (
    <>
      <PageHead title={t.about.title} lead={t.about.lead} />
      <section className="section">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-24">
            <h2 className="h-section">
              <Words text={t.about.missionTitle} />
            </h2>
            <Scrub text={t.about.mission} className="font-display text-[clamp(1.6rem,2.7vw,2.6rem)] leading-[1.18]" />
          </div>
          <div className="mt-20 md:mt-28">
            <h2 className="muted text-lg">{t.about.formulaTitle}</h2>
            <div className="mt-8">
              <Formula items={t.home.formula} />
            </div>
          </div>
          <div className="mt-20 empty:hidden md:mt-28">
            <Stats locale={locale} />
          </div>
        </div>
      </section>
      <Benefits locale={locale} />
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
          <div className="mt-16">
            <FounderGrid locale={locale} items={founders.slice(0, 4)} />
          </div>
        </div>
      </section>
      <PartnersRow locale={locale} />
      <ApplySection locale={locale} />
    </>
  );
}
