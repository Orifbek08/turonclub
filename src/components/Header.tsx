import Link from "next/link";
import { getTexts, href, pick, type Locale } from "@/lib/i18n";
import { site } from "@content/site";
import { HeaderNav } from "./HeaderNav";
import { HeaderShell } from "./motion";
import { LogoMark, LogoWord } from "./Logo";

export function Header({ locale }: { locale: Locale }) {
  const t = getTexts(locale);
  return (
    <HeaderShell>
      <div className="shell relative flex h-20 items-center justify-between gap-6">
        <Link
          href={href(locale)}
          className="flex items-center gap-3 text-ivory"
          aria-label={`${site.name} — ${pick(site.descriptor, locale)}`}
        >
          <LogoMark className="h-11 w-auto" />
          <LogoWord className="h-[1.15rem] w-auto" />
        </Link>
        <HeaderNav
          locale={locale}
          items={[
            { href: href(locale, "/about"), label: t.nav.about },
            { href: href(locale, "/founders"), label: t.nav.founders },
            { href: href(locale, "/forum"), label: t.nav.forum },
            { href: href(locale, "/membership"), label: t.nav.membership },
            { href: href(locale, "/contact"), label: t.nav.contact },
          ]}
          cta={{ href: href(locale, "/membership#apply"), label: t.cta.join }}
          labels={{ menu: t.nav.menu, close: t.nav.close, language: t.nav.language }}
        />
      </div>
    </HeaderShell>
  );
}
