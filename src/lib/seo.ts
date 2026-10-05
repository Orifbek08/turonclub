import type { Metadata } from "next";
import { site } from "@content/site";
import { locales, ogLocale, type Locale } from "./i18n";

/**
 * Har bir sahifa uchun SEO ma'lumotlari: title, description, canonical,
 * uch til uchun hreflang va ijtimoiy tarmoqda ulashish kartasi.
 */
export function pageMeta(opts: {
  locale: Locale;
  path: string; // "" bosh sahifa, "/founders" va hokazo
  title: string;
  description: string;
  absoluteTitle?: boolean;
}): Metadata {
  const { locale, path, title, description } = opts;
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}${path}`;
  languages["x-default"] = `/uz${path}`;

  return {
    title: opts.absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: `/${locale}${path}`, languages },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url: `/${locale}${path}`,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}
