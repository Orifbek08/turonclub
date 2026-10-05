"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const languages = [
  { code: "uz", label: "O‘zb" },
  { code: "uz-cyrl", label: "Ўзб" },
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
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const rest = pathname.replace(/^\/(uz-cyrl|uz|ru|en)(?=\/|$)/, "");
  const isActive = (target: string) => pathname === target || pathname.startsWith(`${target}/`);

  const langs = (
    <ul className="flex items-center gap-1" aria-label={labels.language}>
      {languages.map((l) => (
        <li key={l.code}>
          <Link
            href={`/${l.code}${rest}`}
            hrefLang={l.code === "uz-cyrl" ? "uz-Cyrl" : l.code}
            lang={l.code === "uz-cyrl" ? "uz-Cyrl" : l.code}
            aria-current={l.code === locale ? "true" : undefined}
            className={`block px-2 py-1 text-sm transition-colors ${
              l.code === locale ? "text-gold-light" : "text-ivory/55 hover:text-ivory"
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
      <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
            className={`group relative py-2 text-[0.97rem] transition-colors ${
              isActive(item.href) ? "text-gold-light" : "text-ivory/75 hover:text-ivory"
            }`}
          >
            {item.label}
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 bottom-0 h-px origin-left bg-gold-light transition-transform duration-500 ease-out ${
                isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          </Link>
        ))}
      </nav>

      <div className="hidden items-center gap-6 lg:flex">
        {langs}
        <Link href={cta.href} className="btn btn-ghost btn-sm">
          {cta.label}
        </Link>
      </div>

      <button
        type="button"
        className="-mr-2 px-3 py-2 font-medium text-ivory lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? labels.close : labels.menu}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-5rem)] overflow-y-auto bg-night pb-10 lg:hidden"
          >
            <nav className="shell flex h-full flex-col" aria-label="Main">
              {items.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`block border-b border-[var(--hair)] py-5 font-display text-4xl ${
                      isActive(item.href) ? "text-gold-light" : "text-ivory"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-auto flex items-center justify-between gap-4 pt-10">
                {langs}
                <Link href={cta.href} className="btn btn-gold btn-sm">
                  {cta.label}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
