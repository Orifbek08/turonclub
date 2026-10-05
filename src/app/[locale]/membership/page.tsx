import type { Metadata } from "next";
import { Reveal, Words } from "@/components/motion";
import { ApplySection, FaqList, Formats, PageHead, SectionHead, Steps } from "@/components/sections";
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
      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-24">
          <h2 className="h-section">
            <Words text={t.membership.forWhoTitle} />
          </h2>
          <ul className="border-t border-[var(--hair)]">
            {t.membership.forWho.map((item, i) => (
              <li key={item} className="row-hover border-b border-[var(--hair)]">
                <Reveal delay={i * 0.08}>
                  <p className="row-shift h-item py-9 md:py-11">{item}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Formats locale={locale} />
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
