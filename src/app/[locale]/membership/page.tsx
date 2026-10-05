import type { Metadata } from "next";
import { ApplySection, FaqList, PageHead, Steps } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { getTexts, type Locale } from "@/lib/i18n";
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
      <section className="bg-stone py-16 md:py-24">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <h2 className="h-section">{t.membership.forWhoTitle}</h2>
            <ul className="border-t border-ink/20">
              {t.membership.forWho.map((item) => (
                <li key={item} className="border-b border-ink/20 py-6 font-display text-2xl leading-snug">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <h2 className="h-section mt-20 md:mt-28">{t.membership.stepsTitle}</h2>
          <div className="mt-10">
            <Steps locale={locale} />
          </div>
        </div>
      </section>
      <ApplySection locale={locale} />
      <FaqList locale={locale} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q[locale],
            acceptedAnswer: { "@type": "Answer", text: item.a[locale] },
          })),
        }}
      />
    </>
  );
}
