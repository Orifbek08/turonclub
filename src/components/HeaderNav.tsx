"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const languages = [
  { code: "uz", label: "O‘zb" },
  { code: "ru", label: "Рус" },
  { code: "en", label: "Eng" },
] as const;

type Item = { href: string; label: string };

export function HeaderNav({
  locale,
  items,
  cta,
  labels,
}: {
  locale: string;
  items: Item[];
  cta: Item;
  labels: { menu: string; close: string; language: string };
}) {
  const pathname = usePathname() ?? `/${locale}`;
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const rest = pathname.replace(/^\/(uz|ru|en)(?=\/|$)/, "");
  const isActive = (target: string) => pathname === target || pathname.startsWith(`${target}/`);

  const langs = (
    <ul className="flex items-center gap-1" aria-label={labels.language}>
      {languages.map((l) => (
        <li key={l.code}>
          <Link
            href={`/${l.code}${rest}`}
            hrefLang={l.code}
            lang={l.code}
            aria-current={l.code === locale ? "true" : undefined}
            className={`block px-2 py-1 text-sm ${
              l.code === locale ? "bg-white/12 text-white" : "text-white/65 hover:text-white"
            }`}
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
            className={`border-b-2 py-1 text-[0.97rem] ${
              isActive(item.href)
                ? "border-glaze-light text-white"
                : "border-transparent text-white/75 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="hidden items-center gap-5 lg:flex">
        {langs}
        <Link href={cta.href} className="btn btn-light min-h-0 px-4 py-2.5 text-[0.95rem]">
          {cta.label}
        </Link>
      </div>

      <button
        type="button"
        className="-mr-2 px-3 py-2 font-medium text-white lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? labels.close : labels.menu}
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-t border-white/10 bg-lapis pb-8 lg:hidden"
        >
          <nav className="shell flex flex-col" aria-label="Main">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="border-b border-white/10 py-4 font-display text-2xl text-white"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-6 flex items-center justify-between gap-4">
              {langs}
              <Link href={cta.href} className="btn btn-light">
                {cta.label}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
