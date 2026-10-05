import type { Metadata } from "next";
import { PageHead } from "@/components/sections";
import { getTexts, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({ locale, path: "/privacy", ...getTexts(locale).meta.privacy });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const t = getTexts(locale);
  return (
    <>
      <PageHead title={t.privacy.title} />
      <section className="section">
        <div className="shell max-w-3xl space-y-6 text-lg text-ivory/85">
          {t.privacy.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>
    </>
  );
}
