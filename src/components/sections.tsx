import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { dateParts, getTexts, href, pick, type Locale } from "@/lib/i18n";
import { site } from "@content/site";
import { partners } from "@content/partners";
import { faq } from "@content/faq";
import type { Founder } from "@content/founders";
import type { ClubEvent } from "@content/events";
import { Portrait } from "./Portrait";
import { Star, Tiles } from "./Tiles";
import { ApplyForm } from "./ApplyForm";
import { Socials } from "./Socials";
import { CountUp, Line, Reveal, Words } from "./motion";

const fadeLeft = {
  maskImage: "linear-gradient(to left, #000 15%, transparent 95%)",
  WebkitMaskImage: "linear-gradient(to left, #000 15%, transparent 95%)",
};

/** Ichki sahifalar sarlavhasi */
export function PageHead({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="relative isolate overflow-hidden">
      <Tiles
        cols={8}
        rows={5}
        seed={6}
        live
        className="absolute bottom-0 right-0 top-20 -z-10 w-full md:w-[62%]"
        style={fadeLeft}
      />
      <div className="shell pb-16 pt-40 md:pb-24 md:pt-56">
        <h1 className="h-display max-w-4xl">
          <Words text={title} />
        </h1>
        {lead && (
          <Reveal delay={0.35}>
            <p className="lead mt-7 text-ivory/80">{lead}</p>
          </Reveal>
        )}
      </div>
      <div className="shell">
        <Line delay={0.4} />
      </div>
    </div>
  );
}

/** Bo'lim sarlavhasi: chapda nom, o'ngda havola */
export function SectionHead({ title, lead, action }: { title: string; lead?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
      <div>
        <h2 className="h-section">
          <Words text={title} />
        </h2>
        {lead && (
          <Reveal delay={0.2}>
            <p className="lead muted mt-5">{lead}</p>
          </Reveal>
        )}
      </div>
      {action && <Reveal delay={0.3}>{action}</Reveal>}
    </div>
  );
}

/** Harakatlanuvchi yirik yozuv */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((word, i) => (
        <li key={i} className="flex items-center">
          <span className={`px-[0.45em] font-display ${i % 2 ? "outline-text" : "text-ivory"}`}>{word}</span>
          <Star className="h-[0.28em] w-[0.28em] text-gold" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden border-y border-[var(--hair)] py-7 text-[clamp(3rem,8vw,7.5rem)] leading-none md:py-10">
      <div className="marquee-track" style={{ ["--dur" as string]: `${items.length * 7}s` }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export function FounderGrid({ locale, items }: { locale: Locale; items: Founder[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-9">
      {items.map((f, i) => (
        <li key={f.slug}>
          <Reveal delay={(i % 4) * 0.1}>
            <Link href={href(locale, `/founders/${f.slug}`)} className="group block">
              <Portrait
                file={f.photo}
                name={pick(f.name, locale)}
                alt={`${pick(f.name, locale)}, ${pick(f.role, locale)}, ${f.company}`}
                sizes="(min-width: 1024px) 300px, 46vw"
                seed={i * 5}
              />
              <h3 className="mt-6 text-[1.6rem] leading-tight md:text-[1.9rem]">{pick(f.name, locale)}</h3>
              <p className="muted mt-1.5 text-[0.95rem]">
                {pick(f.role, locale)}, {f.company}
              </p>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

/** Asoschining yirik iqtibosi */
export function FounderQuote({ locale, founder }: { locale: Locale; founder: Founder }) {
  if (!pick(founder.quote, locale)) return null;
  return (
    <figure className="max-w-5xl">
      <Star className="h-8 w-8 text-gold" />
      <blockquote className="mt-8 font-display text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.14]">
        <p>
          <Words text={pick(founder.quote, locale)} stagger={0.035} />
        </p>
      </blockquote>
      <Reveal delay={0.4}>
        <figcaption className="mt-10 flex items-center gap-5">
          <span aria-hidden="true" className="h-px w-14" style={{ background: "var(--gold-grad)" }} />
          <span>
            <span className="block font-semibold">{pick(founder.name, locale)}</span>
            <span className="muted text-[0.95rem]">
              {pick(founder.role, locale)}, {founder.company}
            </span>
          </span>
        </figcaption>
      </Reveal>
    </figure>
  );
}

export function EventRows({
  locale,
  items,
  withAction = true,
}: {
  locale: Locale;
  items: ClubEvent[];
  withAction?: boolean;
}) {
  const t = getTexts(locale);
  return (
    <ul className="border-t border-[var(--hair)]">
      {items.map((e, i) => {
        const d = dateParts(e.date, locale);
        return (
          <li key={e.slug} id={e.slug} className="row-hover border-b border-[var(--hair)]">
            <Reveal delay={i * 0.08}>
              <div className="grid gap-x-10 gap-y-5 py-10 md:grid-cols-[11rem_1fr_auto] md:items-center md:py-12">
                <time dateTime={`${e.date}T${e.time}`} className="flex items-baseline gap-4 md:block">
                  <span className="gold-text font-display text-7xl leading-none md:text-8xl">{d.day}</span>
                  <span className="muted block text-[0.95rem] md:mt-3">
                    {d.month} {d.year}, {e.time}
                  </span>
                </time>
                <div className="row-shift">
                  <h3 className="h-item">{pick(e.title, locale)}</h3>
                  <p className="muted mt-3 max-w-2xl">{pick(e.summary, locale)}</p>
                  <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-1 text-[0.95rem]">
                    {pick(e.guest, locale) && (
                      <div className="flex gap-2">
                        <dt className="muted">{t.events.guest}:</dt>
                        <dd>{pick(e.guest, locale)}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="sr-only">{t.contact.address}</dt>
                      <dd className="text-ivory/80">{pick(e.venue, locale)}</dd>
                    </div>
                  </dl>
                </div>
                {withAction && (
                  <Link
                    href={`${href(locale, "/membership")}?event=${e.slug}#apply`}
                    className="btn btn-ghost btn-sm justify-self-start"
                  >
                    {t.cta.register}
                  </Link>
                )}
              </div>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}

/** Ikki ustunli ro'yxat: nom va tavsif (a'zolik afzalliklari, tamoyillar) */
export function DefinitionRows({ title, items }: { title: string; items: { name: string; text: string }[] }) {
  return (
    <div className="shell grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-24">
      <h2 className="h-section lg:sticky lg:top-32 lg:self-start">
        <Words text={title} />
      </h2>
      <dl className="border-t border-[var(--hair)]">
        {items.map((item, i) => (
          <div key={item.name} className="row-hover border-b border-[var(--hair)]">
            <Reveal delay={i * 0.06}>
              <div className="row-shift grid gap-3 py-9 md:grid-cols-[minmax(0,19rem)_1fr] md:gap-12 md:py-11">
                <dt className="h-item">{item.name}</dt>
                <dd className="muted self-center">{item.text}</dd>
              </div>
            </Reveal>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Formats({ locale }: { locale: Locale }) {
  const t = getTexts(locale);
  return (
    <section className="section bg-deep">
      <DefinitionRows title={t.formats.title} items={t.formats.items} />
    </section>
  );
}

export function Stats({ locale }: { locale: Locale }) {
  if (site.stats.length === 0) return null;
  return (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-12 border-t border-[var(--hair)] pt-14 md:grid-cols-4">
      {site.stats.map((s, i) => (
        <Reveal key={s.label.uz} delay={i * 0.1} className="flex flex-col-reverse">
          <dt className="muted mt-2">{pick(s.label, locale)}</dt>
          <dd className="gold-text font-display text-6xl leading-none md:text-8xl">
            <CountUp value={s.value} suffix={s.suffix} />
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}

export function Steps({ locale }: { locale: Locale }) {
  const t = getTexts(locale);
  return (
    <ol className="grid gap-12 md:grid-cols-4 md:gap-0">
      {t.membership.steps.map((step, i) => (
        <li key={step.name} className="md:pr-10">
          <Reveal delay={i * 0.14}>
            <div className="flex items-center gap-5">
              <span className="gold-text font-display text-7xl leading-none">{i + 1}</span>
              <Line className="hidden flex-1 md:block" delay={0.3 + i * 0.14} />
            </div>
            <h3 className="h-item mt-6">{step.name}</h3>
            <p className="muted mt-3">{step.text}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export function PartnersRow({ locale }: { locale: Locale }) {
  if (partners.length === 0) return null;
  const t = getTexts(locale);
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {partners.map((p, i) => {
        const inner = p.logo ? (
          <Image
            src={`/images/partners/${p.logo}`}
            alt={hidden ? "" : p.name}
            width={200}
            height={72}
            className="h-12 w-auto object-contain opacity-70 brightness-0 invert transition-opacity hover:opacity-100"
          />
        ) : (
          <span className="font-display text-3xl text-ivory/45">{p.name}</span>
        );
        return (
          <li key={i} className="px-10 md:px-16">
            {p.url && !hidden ? (
              <a href={p.url} rel="noopener" target="_blank">
                {inner}
              </a>
            ) : (
              inner
            )}
          </li>
        );
      })}
    </ul>
  );
  return (
    <section className="border-y border-[var(--hair)] py-16 md:py-20">
      <div className="shell">
        <h2 className="muted text-lg">{t.partners.title}</h2>
      </div>
      <div className="mt-10 overflow-hidden">
        <div className="marquee-track reverse" style={{ ["--dur" as string]: `${Math.max(partners.length, 4) * 6}s` }}>
          {row(false)}
          {row(true)}
          {row(true)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}

export function FaqList({ locale }: { locale: Locale }) {
  const t = getTexts(locale);
  return (
    <section className="section">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-24">
        <h2 className="h-section">
          <Words text={t.faq.title} />
        </h2>
        <div className="border-t border-[var(--hair)]">
          {faq.map((item, i) => (
            <Reveal key={item.q.uz} delay={i * 0.06}>
              <details className="group border-b border-[var(--hair)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-8 font-display text-2xl transition-colors hover:text-gold-light md:text-[1.75rem] [&::-webkit-details-marker]:hidden">
                  {pick(item.q, locale)}
                  <span
                    aria-hidden="true"
                    className="relative h-5 w-5 shrink-0 before:absolute before:inset-x-0 before:top-1/2 before:h-px before:-translate-y-1/2 before:bg-gold after:absolute after:inset-y-0 after:left-1/2 after:w-px after:-translate-x-1/2 after:bg-gold after:transition-transform after:duration-500 group-open:after:rotate-90"
                  />
                </summary>
                <p className="muted max-w-2xl pb-9">{pick(item.a, locale)}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ApplySection({ locale }: { locale: Locale }) {
  const t = getTexts(locale);
  return (
    <section id="apply" className="section relative isolate overflow-hidden bg-deep">
      <Tiles
        cols={6}
        rows={8}
        seed={9}
        live
        className="absolute inset-y-0 left-0 -z-10 hidden h-full w-[45%] opacity-70 lg:block"
        style={{
          maskImage: "linear-gradient(to right, #000 0%, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to right, #000 0%, transparent 85%)",
        }}
      />
      <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-24">
        <div>
          <h2 className="h-display">
            <Words text={t.form.title} />
          </h2>
          <Reveal delay={0.3}>
            <p className="lead mt-7 text-ivory/80">{t.form.lead}</p>
            <dl className="mt-12 space-y-4 border-t border-[var(--hair)] pt-8">
              <div className="flex gap-4">
                <dt className="muted w-28 shrink-0">{t.contact.phone}</dt>
                <dd>
                  <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="text-link">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="muted w-28 shrink-0">{t.contact.hours}</dt>
                <dd>{pick(site.hours, locale)}</dd>
              </div>
            </dl>
            <div className="mt-8">
              <Socials label={t.contact.socials} />
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <div className="border border-[var(--hair)] bg-night/70 p-7 backdrop-blur-sm md:p-12">
            <ApplyForm
              locale={locale}
              t={t.form}
              privacy={{ href: href(locale, "/privacy"), label: t.footer.privacy }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
