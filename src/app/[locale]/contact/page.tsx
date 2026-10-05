import type { Metadata } from "next";
import { socialLinks } from "@/components/Footer";
import { Reveal } from "@/components/motion";
import { ApplySection, PageHead } from "@/components/sections";
import { getTexts, type Locale } from "@/lib/i18n";
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
  const socials = socialLinks();
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
    { label: t.contact.address, value: site.address[locale] },
    { label: t.contact.hours, value: site.hours[locale] },
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
            {socials.length > 0 && (
              <div className="grid gap-1 border-b border-[var(--hair)] py-8 md:grid-cols-[14rem_1fr] md:items-baseline md:gap-10">
                <dt className="muted">{t.contact.socials}</dt>
                <dd className="flex flex-wrap gap-x-6 gap-y-2">
                  {socials.map((s) => (
                    <a key={s.name} href={s.url} rel="noopener" target="_blank" className="text-link">
                      {s.name}
                    </a>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </section>
      <ApplySection locale={locale} />
    </>
  );
}
