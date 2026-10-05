import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { site } from "@content/site";
import { speakers } from "@content/speakers";

/** turonclub.uz/sitemap.xml — barcha sahifalar uch tilda, hreflang bilan */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/speakers",
    "/events",
    "/membership",
    "/contact",
    "/privacy",
    ...speakers.map((s) => `/speakers/${s.slug}`),
  ];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified: new Date(),
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])),
      },
    })),
  );
}
