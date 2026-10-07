import type { Metadata } from "next";
import {
  ForWho,
  ApplySection,
  Benefits,
  Chain,
  FaqList,
  PageHead,
  SectionHead,
  Steps,
  Tiers,
} from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { getTexts, pick, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { faq } from "@content/faq";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({ locale, path: "/membership", ...getTexts(locale).meta.membership });
}

export default async function MembershipPage({ params }: Props) {
  const { locale } = await params;
  const t = getTexts(locale);
  return (
    <>
      <PageHead title={t.membership.title} lead={t.membership.lead} />
      <section className="section">
        <div className="shell">
          <SectionHead title={t.membership.ideaTitle} />
          <div className="mt-14">
            <Chain locale={locale} />
          </div>
        </div>
      </section>
      <Benefits locale={locale} />
      <section className="section">
        <div className="shell">
          <SectionHead title={t.membership.tiersTitle} />
          <div className="mt-16 md:mt-20">
            <Tiers locale={locale} />
          </div>
        </div>
      </section>
      <ForWho locale={locale} to="#apply" />
      <section className="section">
        <div className="shell">
          <SectionHead title={t.membership.stepsTitle} />
          <div className="mt-16 md:mt-20">
            <Steps locale={locale} />
          </div>
        </div>
      </section>
      <ApplySection locale={locale} />
      <FaqList locale={locale} />
      {faq.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: pick(item.q, locale),
              acceptedAnswer: { "@type": "Answer", text: pick(item.a, locale) },
            })),
          }}
        />
      )}
    </>
  );
}
