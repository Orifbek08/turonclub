import Image from "next/image";
import Link from "next/link";
import { dateParts, getTexts, href, type Locale } from "@/lib/i18n";
import { findSpeaker } from "@/lib/content";
import { site } from "@content/site";
import { partners } from "@content/partners";
import { faq } from "@content/faq";
import type { Speaker } from "@content/speakers";
import type { ClubEvent } from "@content/events";
import { Portrait } from "./Portrait";
import { Tiles } from "./Tiles";
import { ApplyForm } from "./ApplyForm";

/** Ichki sahifalar sarlavhasi */
export function PageHead({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="on-dark relative overflow-hidden bg-lapis text-white">
      <Tiles
        cols={5}
        rows={4}
        seed={6}
        className="absolute inset-y-0 right-0 hidden h-full w-[34%] md:block"
      />
      <div className="shell relative py-14 md:py-20">
        <h1 className="h-display max-w-3xl">{title}</h1>
        {lead && <p className="lead mt-5 text-white/80">{lead}</p>}
      </div>
    </div>
  );
}

export function SpeakerGrid({ locale, items }: { locale: Locale; items: Speaker[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
      {items.map((s, i) => (
        <li key={s.slug}>
          <Link href={href(locale, `/speakers/${s.slug}`)} className="group block">
            <Portrait
              dir="speakers"
              file={s.photo}
              name={s.name[locale]}
              alt={`${s.name[locale]}, ${s.role[locale]}, ${s.company}`}
              sizes="(min-width: 1024px) 280px, 46vw"
              seed={i * 5}
            />
            <h3 className="mt-4 text-[1.45rem] leading-tight group-hover:text-glaze">
              {s.name[locale]}
            </h3>
            <p className="mt-1 text-[0.95rem] text-muted">
              {s.role[locale]}, {s.company}
            </p>
          </Link>
        </li>
      ))}
    </ul>
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
    <ul className="border-t border-ink/20">
      {items.map((e) => {
        const d = dateParts(e.date, locale);
        const speaker = findSpeaker(e.speakerSlug);
        return (
          <li
            key={e.slug}
            id={e.slug}
            className="grid gap-x-8 gap-y-4 border-b border-ink/20 py-8 md:grid-cols-[9rem_1fr_auto] md:items-start"
          >
            <time dateTime={`${e.date}T${e.time}`} className="flex items-baseline gap-3 md:block">
              <span className="font-display text-6xl leading-none text-lapis">{d.day}</span>
              <span className="block text-[0.95rem] text-muted md:mt-2">
                {d.month} {d.year}
                <br className="hidden md:block" />
                <span className="md:hidden">, </span>
                {e.time}
              </span>
            </time>
            <div>
              <h3 className="h-item">{e.title[locale]}</h3>
              <p className="mt-2 max-w-2xl text-muted">{e.summary[locale]}</p>
              <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-1 text-[0.95rem]">
                {speaker && (
                  <div className="flex gap-2">
                    <dt className="text-muted">{t.events.speaker}:</dt>
                    <dd>
                      <Link href={href(locale, `/speakers/${speaker.slug}`)} className="text-link">
                        {speaker.name[locale]}
                      </Link>
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="sr-only">{t.contact.address}</dt>
                  <dd>{e.venue[locale]}</dd>
                </div>
              </dl>
            </div>
            {withAction && (
              <Link
                href={`${href(locale, "/membership")}?event=${e.slug}#apply`}
                className="btn btn-outline justify-self-start text-lapis"
              >
                {t.cta.register}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function Formats({ locale }: { locale: Locale }) {
  const t = getTexts(locale);
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="shell grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <h2 className="h-section lg:sticky lg:top-28 lg:self-start">{t.formats.title}</h2>
        <dl className="border-t border-ink/20">
          {t.formats.items.map((item) => (
            <div
              key={item.name}
              className="grid gap-2 border-b border-ink/20 py-7 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-10"
            >
              <dt className="h-item">{item.name}</dt>
              <dd className="text-muted">{item.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Leader({ locale }: { locale: Locale }) {
  const { leader } = site;
  return (
    <figure className="grid items-center gap-8 sm:grid-cols-[13rem_1fr] md:gap-12">
      <Portrait
        dir="team"
        file={leader.photo}
        name={leader.name}
        alt={`${leader.name}, ${leader.role[locale]}`}
        sizes="208px"
        seed={11}
      />
      <div>
        <blockquote className="font-display text-[1.75rem] leading-snug md:text-[2.1rem]">
          <p>{leader.quote[locale]}</p>
        </blockquote>
        <figcaption className="mt-6 border-l-2 border-brass pl-4">
          <span className="block font-semibold">{leader.name}</span>
          <span className="text-muted">{leader.role[locale]}</span>
        </figcaption>
      </div>
    </figure>
  );
}

export function Stats({ locale }: { locale: Locale }) {
  if (site.stats.length === 0) return null;
  return (
    <dl className="grid grid-cols-2 gap-8 border-t border-ink/20 pt-10 md:grid-cols-4">
      {site.stats.map((s) => (
        <div key={s.label.uz} className="flex flex-col-reverse">
          <dt className="mt-1 text-muted">{s.label[locale]}</dt>
          <dd className="font-display text-5xl text-lapis">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Steps({ locale }: { locale: Locale }) {
  const t = getTexts(locale);
  return (
    <ol className="grid gap-8 md:grid-cols-4 md:gap-0">
      {t.membership.steps.map((step, i) => (
        <li key={step.name} className="relative md:pr-8">
          <div className="flex items-center gap-4">
            <span className="font-display text-5xl leading-none text-glaze">{i + 1}</span>
            <span aria-hidden="true" className="hidden h-px flex-1 bg-brass md:block" />
          </div>
          <h3 className="h-item mt-4">{step.name}</h3>
          <p className="mt-2 text-muted">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function PartnersRow({ locale }: { locale: Locale }) {
  if (partners.length === 0) return null;
  const t = getTexts(locale);
  return (
    <section className="border-y border-line bg-stone py-14">
      <div className="shell">
        <h2 className="text-2xl">{t.partners.title}</h2>
        <ul className="mt-8 grid grid-cols-2 items-center gap-x-10 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {partners.map((p, i) => {
            const inner = p.logo ? (
              <Image
                src={`/images/partners/${p.logo}`}
                alt={p.name}
                width={180}
                height={64}
                className="h-12 w-auto object-contain"
              />
            ) : (
              <span className="font-display text-xl text-muted">{p.name}</span>
            );
            return (
              <li key={`${p.name}-${i}`}>
                {p.url ? (
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
      </div>
    </section>
  );
}

export function FaqList({ locale }: { locale: Locale }) {
  const t = getTexts(locale);
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="shell grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <h2 className="h-section">{t.faq.title}</h2>
        <div className="border-t border-ink/20">
          {faq.map((item) => (
            <details key={item.q.uz} className="group border-b border-ink/20">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {item.q[locale]}
                <span
                  aria-hidden="true"
                  className="relative h-4 w-4 shrink-0 before:absolute before:inset-x-0 before:top-1/2 before:h-0.5 before:-translate-y-1/2 before:bg-glaze after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 after:-translate-x-1/2 after:bg-glaze after:transition-transform group-open:after:rotate-90"
                />
              </summary>
              <p className="max-w-2xl pb-7 text-muted">{item.a[locale]}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ApplySection({ locale }: { locale: Locale }) {
  const t = getTexts(locale);
  return (
    <section id="apply" className="on-dark bg-lapis py-20 text-white md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="h-section">{t.form.title}</h2>
          <p className="lead mt-5 text-white/80">{t.form.lead}</p>
          <dl className="mt-10 space-y-4 border-t border-white/15 pt-8">
            <div className="flex gap-3">
              <dt className="w-28 shrink-0 text-white/60">{t.contact.phone}</dt>
              <dd>
                <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="text-link">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-28 shrink-0 text-white/60">{t.contact.hours}</dt>
              <dd>{site.hours[locale]}</dd>
            </div>
          </dl>
        </div>
        <div className="bg-stone p-6 text-ink md:p-10">
          <ApplyForm locale={locale} t={t.form} privacy={{ href: href(locale, "/privacy"), label: t.footer.privacy }} />
        </div>
      </div>
    </section>
  );
}
