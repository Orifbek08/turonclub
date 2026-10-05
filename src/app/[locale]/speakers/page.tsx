import type { Metadata } from "next";
import { ApplySection, PageHead, SpeakerGrid } from "@/components/sections";
import { getTexts, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { speakers } from "@content/speakers";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({ locale, path: "/speakers", ...getTexts(locale).meta.speakers });
}

export default async function SpeakersPage({ params }: Props) {
  const { locale } = await params;
  const t = getTexts(locale);
  return (
    <>
      <PageHead title={t.speakers.title} lead={t.speakers.lead} />
      <section className="bg-stone py-16 md:py-24">
        <div className="shell">
          <SpeakerGrid locale={locale} items={speakers} />
        </div>
      </section>
      <ApplySection locale={locale} />
    </>
  );
}
