import type { Metadata } from "next";
import { ApplySection, FounderGrid, FounderQuote, PageHead } from "@/components/sections";
import { getTexts, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { founders } from "@content/founders";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({ locale, path: "/founders", ...getTexts(locale).meta.founders });
}

export default async function FoundersPage({ params }: Props) {
  const { locale } = await params;
  const t = getTexts(locale);
  return (
    <>
      <PageHead title={t.founders.title} lead={t.founders.lead} />
      <section className="section">
        <div className="shell">
          <FounderGrid locale={locale} items={founders} />
          {founders[0] && (
            <div className="mt-24 md:mt-36">
              <FounderQuote locale={locale} founder={founders[0]} />
            </div>
          )}
        </div>
      </section>
      <ApplySection locale={locale} />
    </>
  );
}
