import type { MetadataRoute } from "next";
import { langTag, locales } from "@/lib/i18n";
import { site } from "@content/site";
import { founders, hasPage } from "@content/founders";

/** turonclub.uz/sitemap.xml — barcha sahifalar to‘rt tilda, hreflang bilan */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/founders",
    "/forum",
    "/membership",
    "/contact",
    ...founders.filter(hasPage).map((f) => `/founders/${f.slug}`),
  ];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified: new Date(),
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [langTag[l], `${site.url}/${l}${path}`])),
      },
    })),
  );
}
