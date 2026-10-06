import type { Metadata } from "next";
import { site } from "@content/site";
import { getTexts, langTag, locales, ogLocale, type Locale } from "./i18n";

/**
 * Har bir sahifa uchun SEO ma'lumotlari: title, description, canonical,
 * barcha tillar uchun hreflang va ijtimoiy tarmoqda ulashish kartasi.
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
  for (const l of locales) languages[langTag[l]] = `/${l}${path}`;
  languages["x-default"] = `/uz${path}`;

  return {
    title: opts.absoluteTitle ? { absolute: title } : title,
    description,
    keywords: getTexts(locale).meta.keywords,
    alternates: { canonical: `/${locale}${path}`, languages },
    openGraph: {
      type: "website",
      siteName: site.brand,
      title,
      description,
      url: `/${locale}${path}`,
      locale: ogLocale[locale],
      alternateLocale: [...new Set(locales.map((l) => ogLocale[l]))].filter((l) => l !== ogLocale[locale]),
      images: [{ url: "/og.png", width: 1200, height: 630, alt: site.brand }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}
