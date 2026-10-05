import Link from "next/link";
import { getTexts, href, type Locale } from "@/lib/i18n";
import { site } from "@content/site";
import { LogoMark, LogoWord } from "./Logo";
import { Parallax, Reveal } from "./motion";

const socialNames: Record<string, string> = {
  telegram: "Telegram",
  instagram: "Instagram",
  youtube: "YouTube",
  facebook: "Facebook",
  linkedin: "LinkedIn",
};

export function socialLinks() {
  return Object.entries(site.socials)
    .filter(([, url]) => url)
    .map(([key, url]) => ({ name: socialNames[key] ?? key, url }));
}

export function Footer({ locale }: { locale: Locale }) {
  const t = getTexts(locale);
  const socials = socialLinks();
  const nav = [
    { href: href(locale, "/about"), label: t.nav.about },
    { href: href(locale, "/founders"), label: t.nav.founders },
    { href: href(locale, "/events"), label: t.nav.events },
    { href: href(locale, "/membership"), label: t.nav.membership },
    { href: href(locale, "/contact"), label: t.nav.contact },
  ];
  return (
    <footer className="relative overflow-hidden border-t border-[var(--hair)] bg-night">
      <div className="shell grid gap-12 pb-16 pt-20 md:grid-cols-[1.4fr_1fr_1fr] md:pt-28">
        <Reveal>
          <LogoMark className="h-20 w-auto text-gold" />
          <p className="mt-6 max-w-sm text-mist">{t.footer.tagline}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <nav aria-label="Footer">
            <ul className="space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ivory/80 transition-colors hover:text-gold-light">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>
        <Reveal delay={0.2}>
          <address className="space-y-3 not-italic text-ivory/80">
            <p>
              <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-gold-light">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold-light">
                {site.email}
              </a>
            </p>
            <p>{site.address[locale]}</p>
            {socials.length > 0 && (
              <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-3">
                {socials.map((s) => (
                  <li key={s.name}>
                    <a href={s.url} rel="noopener" target="_blank" className="text-link">
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </address>
        </Reveal>
      </div>

      <Parallax amount={40} className="shell pointer-events-none select-none">
        <LogoWord className="h-auto w-full text-deep" />
      </Parallax>

      <div className="relative border-t border-[var(--hair)] bg-night">
        <div className="shell flex flex-col gap-2 py-6 text-sm text-mist md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName[locale]}. {t.footer.rights}
          </p>
          <Link href={href(locale, "/privacy")} className="transition-colors hover:text-gold-light">
            {t.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
