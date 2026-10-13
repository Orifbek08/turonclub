import type { ReactNode } from "react";
import { FaFacebookF, FaGlobe, FaInstagram, FaLinkedinIn, FaPhone, FaTelegram } from "react-icons/fa6";
import { LogoMark, LogoTag, LogoWord } from "@/components/Logo";
import { Star, Tiles } from "@/components/Tiles";
import { ticket, type TicketBrand } from "@content/ticket";

/**
 * Tadbir kartochkasidagi QR-kod ochadigan sahifa: Turon Club va MIHU kontaktlari.
 * Matnlar va havolalar: content/ticket.ts
 */
export default function TicketPage() {
  return (
    <main className="relative isolate min-h-[100svh] overflow-hidden">
      <h1 className="sr-only">Turon Club × MIHU</h1>
      <Tiles
        cols={8}
        rows={16}
        seed={4}
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-auto w-full opacity-45 [mask-image:linear-gradient(#000,transparent_55%)]"
      />
      <div className="mx-auto w-full max-w-md px-5 pb-16 pt-12">
        <header className="flex flex-col items-center text-center">
          <div className="flex items-center gap-5 text-ivory">
            <LogoMark className="h-12 w-auto" />
            <span className="gold-text font-display text-3xl leading-none">×</span>
            <span className="font-display text-[2.6rem] leading-none tracking-[0.08em]">MIHU</span>
          </div>
          <span aria-hidden="true" className="mt-8 block h-px w-24" style={{ background: "var(--gold-grad)" }} />
        </header>

        <Brand
          brand={ticket.turon}
          logo={
            <span className="flex flex-col items-center gap-3 text-ivory">
              <LogoMark className="h-16 w-auto" />
              <LogoWord className="h-7 w-auto" />
              <LogoTag className="h-[0.55rem] w-auto opacity-80" />
            </span>
          }
        />
        <Brand
          brand={ticket.mihu}
          logo={<span className="font-display text-[3.4rem] leading-none tracking-[0.1em] text-ivory">MIHU</span>}
        />
      </div>
    </main>
  );
}

function Brand({ brand, logo }: { brand: TicketBrand; logo: ReactNode }) {
  const tel = brand.phone.replace(/[^+\d]/g, "");
  const links = [
    { label: "Veb-sayt", value: brand.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/(uz|ru|en)?\/?$/, ""), href: brand.website, Icon: FaGlobe },
    { label: "Instagram", value: handle(brand.instagram), href: brand.instagram, Icon: FaInstagram },
    {
      label: "Telegram",
      value: brand.telegram ? `@${brand.telegram}` : "",
      href: brand.telegram ? `https://t.me/${brand.telegram}` : "",
      Icon: FaTelegram,
    },
    { label: "Facebook", value: brand.facebook ? brand.name : "", href: brand.facebook, Icon: FaFacebookF },
    { label: "LinkedIn", value: brand.linkedin ? brand.name : "", href: brand.linkedin, Icon: FaLinkedinIn },
  ];
  return (
    <section className="relative mt-10 border border-[var(--hair)] bg-deep/80 px-6 pb-7 pt-9 backdrop-blur-sm">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px]" style={{ background: "var(--gold-grad)" }} />
      <div className="flex flex-col items-center text-center">
        {logo}
        <h2 className="sr-only">{brand.name}</h2>
        {brand.tagline && <p className="muted mt-4 text-[0.95rem]">{brand.tagline}</p>}
      </div>

      {brand.phone && (
        <a href={`tel:${tel}`} className="btn btn-gold mt-7 w-full gap-3">
          <FaPhone aria-hidden="true" className="h-4 w-4" />
          {brand.phone}
        </a>
      )}

      <ul className="mt-5 border-t border-[var(--hair)]">
        {links.map(({ label, value, href, Icon }) => {
          const row = (
            <>
              <span className="grid h-11 w-11 shrink-0 place-items-center border border-[var(--hair)] text-gold-light">
                <Icon aria-hidden="true" className="h-[1.05rem] w-[1.05rem]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.95rem]">{label}</span>
                <span className="muted block truncate text-[0.85rem]">{value || "Tez orada"}</span>
              </span>
              {href && <Star className="h-2.5 w-2.5 shrink-0 text-gold" />}
            </>
          );
          return (
            <li key={label} className="border-b border-[var(--hair)]">
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-4 py-3.5 transition-colors hover:text-gold-light"
                >
                  {row}
                </a>
              ) : (
                <span className="flex items-center gap-4 py-3.5 opacity-45">{row}</span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function handle(url: string): string {
  const m = url.match(/instagram\.com\/([^/?#]+)/);
  return m ? `@${m[1]}` : "";
}
