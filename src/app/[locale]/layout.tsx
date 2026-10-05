import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer, socialLinks } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { LogoStack } from "@/components/Logo";
import { MotionRoot } from "@/components/motion";
import { getTexts, isLocale, locales } from "@/lib/i18n";
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
    <html lang={locale}>
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
        <div className="intro" aria-hidden="true">
          <div className="intro-logo text-[0.9rem] text-ivory md:text-[1.15rem]">
            <LogoStack />
            <span className="intro-line mt-[2.2em] block h-px w-full" style={{ background: "var(--gold-grad)" }} />
          </div>
        </div>
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
            name: `${site.name} — ${site.descriptor[locale]}`,
            legalName: site.legalName[locale],
            url: `${site.url}/${locale}`,
            logo: `${site.url}/brand/turon-logo.svg`,
            email: site.email,
            telephone: site.phone,
            address: {
              "@type": "PostalAddress",
              streetAddress: site.address[locale],
              addressLocality: "Tashkent",
              addressCountry: "UZ",
            },
            sameAs: socialLinks().map((s) => s.url),
          }}
        />
      </body>
    </html>
  );
}
