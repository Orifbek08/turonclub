import Link from "next/link";
import { getTexts, href, type Locale } from "@/lib/i18n";
import { site } from "@content/site";
import { StarMark, Tiles } from "./Tiles";

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
    { href: href(locale, "/speakers"), label: t.nav.speakers },
    { href: href(locale, "/events"), label: t.nav.events },
    { href: href(locale, "/membership"), label: t.nav.membership },
    { href: href(locale, "/contact"), label: t.nav.contact },
  ];
  return (
    <footer className="on-dark bg-lapis text-white">
      <Tiles cols={24} rows={1} seed={3} className="block h-10 w-full md:h-14" />
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <StarMark className="h-7 w-7 text-glaze-light" />
            <span className="font-display text-[1.6rem] leading-none tracking-wide">{site.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-white/70">{t.footer.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <address className="space-y-2.5 not-italic text-white/80">
          <p>
            <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="hover:text-white">
              {site.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${site.email}`} className="hover:text-white">
              {site.email}
            </a>
          </p>
          <p>{site.address[locale]}</p>
          {socials.length > 0 && (
            <ul className="flex flex-wrap gap-x-5 gap-y-1 pt-2">
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
      </div>
      <div className="border-t border-white/12">
        <div className="shell flex flex-col gap-2 py-6 text-sm text-white/60 md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName[locale]}. {t.footer.rights}
          </p>
          <Link href={href(locale, "/privacy")} className="hover:text-white">
            {t.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
