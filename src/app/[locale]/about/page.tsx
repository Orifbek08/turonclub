import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Scrub } from "@/components/motion";
import {
  ApplySection,
  DefinitionRows,
  Formats,
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
          <Scrub
            text={t.home.manifesto}
            className="max-w-6xl font-display text-[clamp(1.9rem,4vw,3.8rem)] leading-[1.12]"
          />
          <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-2 md:gap-20">
            <Reveal>
              <p className="text-lg text-ivory/85">{t.about.p1}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-lg text-ivory/85">{t.about.p2}</p>
            </Reveal>
          </div>
          <div className="mt-20 empty:hidden md:mt-28">
            <Stats locale={locale} />
          </div>
        </div>
      </section>
      <section className="section bg-deep">
        <DefinitionRows title={t.about.valuesTitle} items={t.about.values} />
      </section>
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
      <Formats locale={locale} />
      <PartnersRow locale={locale} />
      <ApplySection locale={locale} />
    </>
  );
}
