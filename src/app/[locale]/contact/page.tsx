import type { Metadata } from "next";
import { Socials } from "@/components/Socials";
import { Reveal } from "@/components/motion";
import { ApplySection, PageHead } from "@/components/sections";
import { getTexts, pick, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { site } from "@content/site";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({ locale, path: "/contact", ...getTexts(locale).meta.contact });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = getTexts(locale);
  const rows = [
    {
      label: t.contact.phone,
      value: (
        <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-gold-light">
          {site.phone}
        </a>
      ),
    },
    {
      label: t.contact.email,
      value: (
        <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold-light">
          {site.email}
        </a>
      ),
    },
    { label: t.contact.address, value: pick(site.address, locale) },
    { label: t.contact.hours, value: pick(site.hours, locale) },
  ];
  return (
    <>
      <PageHead title={t.contact.title} lead={t.contact.lead} />
      <section className="section">
        <div className="shell">
          <dl className="max-w-5xl border-t border-[var(--hair)]">
            {rows.map((row, i) => (
              <div key={row.label} className="row-hover border-b border-[var(--hair)]">
                <Reveal delay={i * 0.08}>
                  <div className="grid gap-1 py-8 md:grid-cols-[14rem_1fr] md:items-baseline md:gap-10 md:py-10">
                    <dt className="muted">{row.label}</dt>
                    <dd className="h-item">{row.value}</dd>
                  </div>
                </Reveal>
              </div>
            ))}
            <div className="border-b border-[var(--hair)]">
              <Reveal delay={rows.length * 0.08}>
                <div className="grid gap-4 py-8 md:grid-cols-[14rem_1fr] md:items-center md:gap-10 md:py-10">
                  <dt className="muted">{t.contact.socials}</dt>
                  <dd>
                    <Socials size="lg" label={t.contact.socials} />
                  </dd>
                </div>
              </Reveal>
            </div>
          </dl>
        </div>
      </section>
      <ApplySection locale={locale} />
    </>
  );
}
