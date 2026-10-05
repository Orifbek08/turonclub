import type { Metadata } from "next";
import { ApplySection, Formats, Leader, PageHead, PartnersRow, Stats } from "@/components/sections";
import { getTexts, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

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
      <section className="bg-stone py-20 md:py-28">
        <div className="shell">
          <div className="max-w-3xl space-y-6 text-lg">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>
          <div className="mt-16 empty:hidden">
            <Stats locale={locale} />
          </div>
          <div className="mt-20">
            <Leader locale={locale} />
          </div>
        </div>
      </section>
      <section className="bg-paper py-20 md:py-28">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <h2 className="h-section">{t.about.valuesTitle}</h2>
          <dl className="border-t border-ink/20">
            {t.about.values.map((v) => (
              <div
                key={v.name}
                className="grid gap-2 border-b border-ink/20 py-7 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-10"
              >
                <dt className="h-item">{v.name}</dt>
                <dd className="text-muted">{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <div className="border-t border-line">
        <Formats locale={locale} />
      </div>
      <PartnersRow locale={locale} />
      <ApplySection locale={locale} />
    </>
  );
}
