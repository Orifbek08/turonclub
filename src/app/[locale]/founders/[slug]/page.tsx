import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Portrait } from "@/components/Portrait";
import { Line, Reveal, Words } from "@/components/motion";
import { ApplySection, FounderQuote } from "@/components/sections";
import { getTexts, href, locales, pick, type Locale } from "@/lib/i18n";
import { findFounder } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { site } from "@content/site";
import { founders, hasPage } from "@content/founders";

export const dynamicParams = false;

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => founders.filter(hasPage).map((f) => ({ locale, slug: f.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const f = findFounder(slug);
  if (!f) return {};
  return pageMeta({
    locale,
    path: `/founders/${slug}`,
    title: [pick(f.name, locale), pick(f.role, locale), f.company].filter(Boolean).join(", "),
    description: pick(f.bio, locale).slice(0, 160),
  });
}

export default async function FounderPage({ params }: Props) {
  const { locale, slug } = await params;
  const f = findFounder(slug);
  if (!f || !hasPage(f)) notFound();
  const t = getTexts(locale);

  return (
    <>
      <section className="pb-24 pt-36 md:pb-36 md:pt-48">
        <div className="shell">
          <Reveal y={12}>
            <Link href={href(locale, "/founders")} className="text-link">
              {t.founders.back}
            </Link>
          </Reveal>
          <div className="mt-12 grid gap-12 md:grid-cols-[minmax(0,26rem)_1fr] md:gap-20">
            <Reveal>
              <Portrait
                file={f.photo}
                name={pick(f.name, locale)}
                alt={[pick(f.name, locale), pick(f.role, locale), f.company].filter(Boolean).join(", ")}
                sizes="(min-width: 768px) 416px, 92vw"
                priority
              />
            </Reveal>
            <div>
              <h1 className="h-display">
                <Words text={pick(f.name, locale)} delay={0.1} />
              </h1>
              <Reveal delay={0.4}>
                <p className="mt-5 text-xl text-gold-light">
                  {[pick(f.role, locale), f.company].filter(Boolean).join(", ")}
                </p>
              </Reveal>
              <Line className="mt-12" delay={0.5} />
              <Reveal delay={0.55}>
                <h2 className="muted mt-10 text-lg">{t.founders.bio}</h2>
                <p className="mt-4 max-w-2xl text-xl leading-relaxed">{pick(f.bio, locale)}</p>
                <h2 className="muted mt-12 text-lg">{t.founders.focus}</h2>
                <ul className="mt-5 flex flex-wrap gap-3">
                  {pick(f.focus, locale).map((item) => (
                    <li key={item} className="border border-[var(--hair)] px-5 py-2.5">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {pick(f.quote, locale) && (
        <section className="on-light section bg-ivory text-ink">
          <div className="shell">
            <FounderQuote locale={locale} founder={f} />
          </div>
        </section>
      )}

      <ApplySection locale={locale} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: pick(f.name, locale),
          jobTitle: pick(f.role, locale),
          worksFor: { "@type": "Organization", name: f.company },
          description: pick(f.bio, locale),
          url: `${site.url}/${locale}/founders/${f.slug}`,
          ...(f.photo && { image: `${site.url}/images/founders/${f.photo}` }),
        }}
      />
    </>
  );
}
