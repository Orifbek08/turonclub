import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { socialUrls } from "@/components/Socials";
import { JsonLd } from "@/components/JsonLd";
import { Intro } from "@/components/Intro";
import { MotionRoot } from "@/components/motion";
import { getTexts, isLocale, langTag, locales, pick } from "@/lib/i18n";
import { site } from "@content/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: "#04051a" };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s — ${site.name}` },
  icons: { icon: "/brand/icon.svg", apple: "/brand/apple-icon.png" },
  applicationName: site.name,
  robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getTexts(locale);

  return (
    <html lang={langTag[locale]}>
      <head>
        {/* Kirish ekrani bir tashrifda faqat bir marta ko'rsatiladi */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('turon-intro')){document.documentElement.classList.add('intro-seen')}else{sessionStorage.setItem('turon-intro','1')}}catch(e){}",
          }}
        />
        {/* JavaScript o'chirilgan bo'lsa ham matnlar ko'rinib turadi */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}.intro{display:none}"}</style>
        </noscript>
      </head>
      <body>
        <Intro />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ivory focus:px-4 focus:py-2 focus:text-ink"
        >
          {t.nav.skip}
        </a>
        <MotionRoot>
          <Header locale={locale} />
          <main id="main">{children}</main>
          <Footer locale={locale} />
        </MotionRoot>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: `${site.name} — ${pick(site.descriptor, locale)}`,
            legalName: pick(site.legalName, locale),
            url: `${site.url}/${locale}`,
            logo: `${site.url}/brand/turon-logo.svg`,
            email: site.email,
            telephone: site.phone,
            address: {
              "@type": "PostalAddress",
              streetAddress: pick(site.address, locale),
              addressLocality: "Tashkent",
              addressCountry: "UZ",
            },
            sameAs: socialUrls(),
          }}
        />
      </body>
    </html>
  );
}
