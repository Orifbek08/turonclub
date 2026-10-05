import Link from "next/link";
import { getTexts, href, type Locale } from "@/lib/i18n";
import { site } from "@content/site";
import { HeaderNav } from "./HeaderNav";
import { StarMark } from "./Tiles";

export function Header({ locale }: { locale: Locale }) {
  const t = getTexts(locale);
  return (
    <header className="on-dark sticky top-0 z-40 bg-lapis text-white">
      <div className="shell relative flex h-[4.5rem] items-center justify-between gap-6">
        <Link href={href(locale)} className="flex items-center gap-2.5" aria-label={site.name}>
          <StarMark className="h-7 w-7 text-glaze-light" />
          <span className="font-display text-[1.6rem] leading-none tracking-wide">{site.name}</span>
        </Link>
        <HeaderNav
          locale={locale}
          items={[
            { href: href(locale, "/about"), label: t.nav.about },
            { href: href(locale, "/speakers"), label: t.nav.speakers },
            { href: href(locale, "/events"), label: t.nav.events },
            { href: href(locale, "/membership"), label: t.nav.membership },
            { href: href(locale, "/contact"), label: t.nav.contact },
          ]}
          cta={{ href: href(locale, "/membership#apply"), label: t.cta.join }}
          labels={{ menu: t.nav.menu, close: t.nav.close, language: t.nav.language }}
        />
      </div>
    </header>
  );
}
