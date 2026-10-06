import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { dateParts, getTexts, href, longDate, pick, todayInTashkent, type Locale } from "@/lib/i18n";
import { site } from "@content/site";
import { faq } from "@content/faq";
import { forum } from "@content/forum";
import { foundersOnStage, hasPage, type Founder } from "@content/founders";
import { JsonLd } from "./JsonLd";
import { Portrait } from "./Portrait";
import { Star, Tiles } from "./Tiles";
import { ApplyForm } from "./ApplyForm";
import { Socials } from "./Socials";
import { NetworkMap } from "./NetworkMap";
import { CountUp, Countdown, Line, Reveal, Words } from "./motion";

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

/** Asoschining ismi, lavozimi va kompaniyasi bitta qatorda (bor ma'lumotlardan) */
function founderLine(f: Founder, locale: Locale): string {
  return [pick(f.role, locale), f.company].filter(Boolean).join(", ");
}

function founderAlt(f: Founder, locale: Locale): string {
  return [pick(f.name, locale), founderLine(f, locale)].filter(Boolean).join(", ");
}

export function FounderGrid({ locale }: { locale: Locale }) {
  return (
    <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-3 md:gap-x-12">
      {foundersOnStage().map((f, i) => {
        const card = (
          <>
            <Portrait
              file={f.photo}
              name={pick(f.name, locale)}
              alt={founderAlt(f, locale)}
              sizes="(min-width: 640px) 400px, 92vw"
              seed={i * 5}
            />
            {pick(f.name, locale) && (
              <h3 className="mt-6 text-[1.7rem] leading-tight md:text-[2rem]">{pick(f.name, locale)}</h3>
            )}
            <p className={`muted ${pick(f.name, locale) ? "mt-1.5" : "mt-6 text-lg"}`}>{founderLine(f, locale)}</p>
          </>
        );
        return (
          <li key={f.slug} className={i === 1 ? "sm:-mt-6" : ""}>
            <Reveal delay={i * 0.12}>
              {hasPage(f) ? (
                <Link href={href(locale, `/founders/${f.slug}`)} className="group block">
                  {card}
                </Link>
              ) : (
                <div className="group">{card}</div>
              )}
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Bosh sahifaning birinchi ekrani uchun: uch asoschi yonma-yon.
 * content/site.ts da heroPhoto yozilgan bo'lsa, o'rniga bitta umumiy surat chiqadi.
 */
export function FounderTrio({ locale }: { locale: Locale }) {
  const t = getTexts(locale);
  const stage = foundersOnStage();
  if (site.heroPhoto) {
    return (
      <Link href={href(locale, "/founders")} className="relative block aspect-[1400/660] w-full" aria-label={t.founders.title}>
        <Image
          src={`/images/founders/${site.heroPhoto}`}
          alt={`${t.founders.title}: ${stage.map((f) => founderAlt(f, locale)).join("; ")}`}
          fill
          priority
          sizes="(min-width: 1024px) 52vw, 96vw"
          className="object-contain object-bottom"
        />
      </Link>
    );
  }
  return (
    <Link href={href(locale, "/founders")} className="flex items-end justify-center" aria-label={t.founders.title}>
      {stage.map((f, i) => (
        <div
          key={f.slug}
          className={`group relative ${i === 1 ? "z-10 w-[40%]" : "w-[33%]"} ${i === 0 ? "-mr-[5%]" : ""} ${
            i === 2 ? "-ml-[5%]" : ""
          }`}
        >
          <Portrait
            file={f.photo}
            name={pick(f.name, locale)}
            alt={founderAlt(f, locale)}
            sizes="(min-width: 1024px) 18vw, 36vw"
            seed={i * 5 + 1}
            priority
          />
        </div>
      ))}
    </Link>
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
            <span className="muted text-[0.95rem]">{founderLine(founder, locale)}</span>
          </span>
        </figcaption>
      </Reveal>
    </figure>
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

/** A'zolikning 12 ta qiymati */
export function Benefits({ locale }: { locale: Locale }) {
  const t = getTexts(locale);
  return (
    <section className="section bg-deep">
      <div className="shell">
        <SectionHead title={t.benefits.title} lead={t.benefits.lead} />
        <ol className="mt-16 grid border-l border-t border-[var(--hair)] sm:grid-cols-2 lg:grid-cols-3">
          {t.benefits.items.map((item, i) => (
            <li key={item.code} className="row-hover border-b border-r border-[var(--hair)]">
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <div className="flex h-full flex-col p-7 md:p-9">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="gold-text font-display text-4xl leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-right text-[0.8rem] font-semibold tracking-[0.14em] text-gold-light">
                      {item.code}
                    </span>
                  </div>
                  <h3 className="mt-8 text-[1.65rem] leading-tight">{item.name}</h3>
                  <p className="muted mt-3 text-[0.98rem]">{item.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 12" className="h-3 w-10 shrink-0 text-gold md:w-12">
      <path d="M0 6h45M40 1l6 5-6 5" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** Klub formulasi: bosqichlar zanjiri */
export function Formula({ items }: { items: string[] }) {
  return (
    <ol className="flex flex-col gap-x-6 gap-y-4 md:flex-row md:flex-wrap md:items-center">
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-6">
          <Reveal delay={i * 0.15}>
            <span className="font-display text-[clamp(1.7rem,2.6vw,2.5rem)] leading-tight">{item}</span>
          </Reveal>
          {i < items.length - 1 && (
            <Reveal delay={i * 0.15 + 0.1}>
              <Arrow />
            </Reveal>
          )}
        </li>
      ))}
    </ol>
  );
}

/** A'zolik zanjiri: NETWORK → ACCESS → ... → GROWTH */
export function Chain({ locale }: { locale: Locale }) {
  const t = getTexts(locale);
  return (
    <ol className="grid grid-cols-2 border-l border-t border-[var(--hair)] md:grid-cols-3 lg:grid-cols-6">
      {t.membership.chain.map((step, i) => (
        <li key={step.code} className="border-b border-r border-[var(--hair)]">
          <Reveal delay={i * 0.1}>
            <div className="p-6 md:p-7">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[0.8rem] font-semibold tracking-[0.14em] text-gold-light">{step.code}</span>
                {i < t.membership.chain.length - 1 && <Arrow />}
              </div>
              <p className="mt-6 font-display text-3xl leading-none">{step.name}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/** A'zolik paketlari */
export function Tiers({ locale }: { locale: Locale }) {
  const t = getTexts(locale);
  const last = t.membership.tiers.length - 1;
  return (
    <ul className="grid gap-6 lg:grid-cols-3">
      {t.membership.tiers.map((tier, i) => (
        <li key={tier.name}>
          <Reveal delay={i * 0.12} className="h-full">
            <article
              className={`relative flex h-full flex-col p-8 md:p-10 ${
                i === last ? "bg-night" : "border border-[var(--hair)] bg-night/50"
              }`}
              style={i === last ? { border: "1px solid var(--color-gold)" } : undefined}
            >
              {i === last && (
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ background: "var(--gold-grad)" }} />
              )}
              <h3 className={`font-display text-4xl leading-none ${i === last ? "gold-text" : ""}`}>{tier.name}</h3>
              <p className="muted mt-3">{tier.note}</p>
              <ul className="mt-8 flex-1 space-y-3.5 border-t border-[var(--hair)] pt-8">
                {tier.items.map((item) => (
                  <li key={item} className="flex gap-3.5">
                    <Star className="mt-[0.45em] h-2.5 w-2.5 shrink-0 text-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="#apply" className={`btn mt-10 ${i === last ? "btn-gold" : "btn-ghost"}`}>
                {t.cta.apply}
              </Link>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

/** Forum haqidagi asosiy faktlar: sana, format, joy */
export function ForumFacts({ locale }: { locale: Locale }) {
  const t = getTexts(locale);
  const venue = pick(forum.venue, locale);
  const rows = [
    { label: t.forum.dateLabel, value: longDate(forum.date, locale) },
    ...(forum.time ? [{ label: t.forum.timeLabel, value: forum.time }] : []),
    { label: t.forum.formatLabel, value: t.forum.format },
    { label: t.forum.participantsLabel, value: t.forum.participants },
    { label: t.forum.venueLabel, value: venue || t.forum.venueTbd },
  ];
  return (
    <dl className="grid border-l border-t border-[var(--hair)] sm:grid-cols-2 lg:grid-cols-4">
      {rows.map((row, i) => (
        <Reveal key={row.label} delay={i * 0.1} className="border-b border-r border-[var(--hair)]">
          <div className="flex flex-col-reverse p-6 md:p-8">
            <dd className="mt-3 font-display text-[1.7rem] leading-tight md:text-[2rem]">{row.value}</dd>
            <dt className="muted text-[0.95rem]">{row.label}</dt>
          </div>
        </Reveal>
      ))}
    </dl>
  );
}

/** Xalqaro tarmoq: mamlakatlar xaritasi */
export function NetworkSection({ locale }: { locale: Locale }) {
  const t = getTexts(locale);
  return (
    <section className="section overflow-hidden">
      <div className="shell">
        <SectionHead title={t.network.title} lead={t.network.lead} />
        <div className="mt-14 md:mt-20">
          <NetworkMap
            countries={t.network.countries}
            more={t.network.more}
            directionsTitle={t.network.directionsTitle}
            directions={t.network.directions}
          />
        </div>
      </div>
    </section>
  );
}

/** Forumda kutilayotganlar: asosiy raqamlar va jihatlar */
export function ForumExpect({ locale }: { locale: Locale }) {
  const t = getTexts(locale);
  const numbers = [
    { value: forum.participants, suffix: "", label: t.forum.participantsShort },
    { value: forum.ambassadors, suffix: "+", label: t.forum.ambassadorsLabel },
    { value: forum.tvChannels, suffix: "+", label: t.forum.tvLabel },
  ];
  return (
    <section className="section bg-deep">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="h-section">
            <Words text={t.forum.expectTitle} />
          </h2>
          <dl className="mt-12 grid grid-cols-3 gap-6">
            {numbers.map((n, i) => (
              <Reveal key={n.label} delay={0.2 + i * 0.12} className="flex flex-col-reverse">
                <dt className="muted mt-2 text-[0.95rem]">{n.label}</dt>
                <dd className="gold-text font-display text-5xl leading-none md:text-6xl xl:text-7xl">
                  <CountUp value={n.value} suffix={n.suffix} />
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
        <dl className="border-t border-[var(--hair)]">
          {t.forum.highlights.map((item, i) => (
            <div key={item.name} className="row-hover border-b border-[var(--hair)]">
              <Reveal delay={i * 0.06}>
                <div className="row-shift py-9 md:py-11">
                  <dt className="h-item">{item.name}</dt>
                  <dd className="muted mt-3 max-w-xl">{item.text}</dd>
                </div>
              </Reveal>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Kutilayotgan mehmonlar (faqat rasmi qo'yilganlari ko'rinadi) */
export function ForumGuests({ locale }: { locale: Locale }) {
  const guests = forum.guests.filter((g) => g.photo);
  if (guests.length === 0) return null;
  const t = getTexts(locale);
  // Ustunlar soni mehmonlar soniga moslashadi: qator doim to'la turadi
  const n = guests.length;
  const cols =
    n === 1
      ? "mx-auto max-w-sm grid-cols-1"
      : n === 2
        ? "mx-auto max-w-3xl grid-cols-2"
        : n === 3
          ? "grid-cols-2 md:grid-cols-3"
          : "grid-cols-2 lg:grid-cols-4";
  return (
    <section className="on-light section bg-ivory text-ink">
      <div className="shell">
        <SectionHead title={t.forum.guestsTitle} />
        <ul className={`mt-16 grid gap-x-6 gap-y-12 lg:gap-x-12 ${cols}`}>
          {guests.map((g, i) => (
            <li
              key={g.photo}
              className={
                n % 2 === 1 && n > 1 && i === n - 1
                  ? "col-span-2 mx-auto w-[calc(50%-0.75rem)] md:col-span-1 md:w-auto"
                  : undefined
              }
            >
              <Reveal delay={i * 0.12}>
                <div className="group">
                  <Portrait
                    dir="guests"
                    file={g.photo}
                    name={pick(g.name, locale)}
                    alt={`${pick(g.name, locale)}. ${pick(g.about, locale)}`}
                    sizes="(min-width: 1024px) 420px, 46vw"
                    seed={i * 7 + 2}
                  />
                  <h3 className="mt-6 text-[1.45rem] leading-tight md:text-[1.7rem]">{pick(g.name, locale)}</h3>
                  <p className="muted mt-2">{pick(g.about, locale)}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Forum haqida qidiruv tizimlari uchun tuzilgan ma'lumot (schema.org Event) */
export function ForumJsonLd({ locale }: { locale: Locale }) {
  const t = getTexts(locale);
  const venue = pick(forum.venue, locale);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BusinessEvent",
        name: t.forum.title,
        description: t.meta.forum.description,
        startDate: forum.time ? `${forum.date}T${forum.time}:00+05:00` : forum.date,
        endDate: forum.date,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        image: [`${site.url}/og.png`],
        inLanguage: locale === "uz-cyrl" ? "uz-Cyrl" : locale,
        maximumAttendeeCapacity: forum.participants,
        ...(venue && {
          location: {
            "@type": "Place",
            name: venue,
            address: { "@type": "PostalAddress", addressCountry: "UZ" },
          },
        }),
        organizer: { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.brand, url: site.url },
        url: `${site.url}/${locale}/forum`,
      }}
    />
  );
}

export function forumTarget() {
  return `${forum.date}T${forum.time || "00:00"}:00+05:00`;
}

/** Bosh sahifadagi forum bo'limi. Forum sanasi o'tgach, o'zi yashirinadi. */
export function ForumBand({ locale }: { locale: Locale }) {
  if (forum.date < todayInTashkent()) return null;
  const t = getTexts(locale);
  const d = dateParts(forum.date, locale);
  return (
    <section className="section relative isolate overflow-hidden bg-deep">
      <Tiles
        cols={7}
        rows={8}
        seed={4}
        live
        className="absolute inset-y-0 right-0 -z-10 hidden h-full w-[48%] opacity-80 lg:block"
        style={fadeLeft}
      />
      <div className="shell grid gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
        <Reveal>
          <time dateTime={forum.date} className="block">
            <span className="gold-text block font-display text-[clamp(7rem,16vw,14rem)] leading-[0.82]">{d.day}</span>
            <span className="mt-4 block font-display text-3xl md:text-4xl">
              {d.month} {d.year}
            </span>
          </time>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-[var(--hair)] pt-6">
            <div className="flex flex-col-reverse">
              <dt className="muted mt-2">{t.forum.participantsShort}</dt>
              <dd className="font-display text-5xl leading-none">
                <CountUp value={forum.participants} />
              </dd>
            </div>
            <div className="flex flex-col-reverse">
              <dt className="muted mt-2">{t.forum.ambassadorsLabel}</dt>
              <dd className="font-display text-5xl leading-none">
                <CountUp value={forum.ambassadors} suffix="+" />
              </dd>
            </div>
          </dl>
        </Reveal>
        <div className="max-w-2xl">
          <p className="text-lg text-gold-light">{t.forum.band}</p>
          <h2 className="h-section mt-5">
            <Words text={t.forum.title} />
          </h2>
          <Reveal delay={0.25}>
            <p className="lead mt-6 text-ivory/80">{t.forum.lead}</p>
            <div className="mt-10">
              <Countdown target={forumTarget()} labels={t.forum.countdown} />
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href={`${href(locale, "/forum")}#apply`} className="btn btn-gold">
                {t.cta.forumRegister}
              </Link>
              <Link href={href(locale, "/forum")} className="btn btn-ghost">
                {t.cta.forum}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
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

export function FaqList({ locale }: { locale: Locale }) {
  if (faq.length === 0) return null;
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
            {(site.phone || pick(site.hours, locale)) && (
              <dl className="mt-12 space-y-4 border-t border-[var(--hair)] pt-8">
                {site.phone && (
                  <div className="flex gap-4">
                    <dt className="muted w-28 shrink-0">{t.contact.phone}</dt>
                    <dd>
                      <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="text-link">
                        {site.phone}
                      </a>
                    </dd>
                  </div>
                )}
                {pick(site.hours, locale) && (
                  <div className="flex gap-4">
                    <dt className="muted w-28 shrink-0">{t.contact.hours}</dt>
                    <dd>{pick(site.hours, locale)}</dd>
                  </div>
                )}
              </dl>
            )}
            <div className="mt-8">
              <Socials label={t.contact.socials} />
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <div className="border border-[var(--hair)] bg-night/70 p-7 backdrop-blur-sm md:p-12">
            <ApplyForm locale={locale} t={t.form} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
