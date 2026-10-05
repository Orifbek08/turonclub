import type { Metadata } from "next";
import { socialLinks } from "@/components/Footer";
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
        <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="hover:text-glaze">
          {site.phone}
        </a>
      ),
    },
    {
      label: t.contact.email,
      value: (
        <a href={`mailto:${site.email}`} className="hover:text-glaze">
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
      <section className="bg-stone py-16 md:py-24">
        <div className="shell">
          <dl className="max-w-4xl border-t border-ink/20">
            {rows.map((row) => (
              <div
                key={row.label}
                className="grid gap-1 border-b border-ink/20 py-6 md:grid-cols-[14rem_1fr] md:items-baseline md:gap-10"
              >
                <dt className="text-muted">{row.label}</dt>
                <dd className="font-display text-2xl leading-snug md:text-[1.75rem]">{row.value}</dd>
              </div>
            ))}
            {socials.length > 0 && (
              <div className="grid gap-1 border-b border-ink/20 py-6 md:grid-cols-[14rem_1fr] md:items-baseline md:gap-10">
                <dt className="text-muted">{t.contact.socials}</dt>
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
