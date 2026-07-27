"use client";

import type { LegalSection } from "@/data/legal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";

interface Props {
  title: string;
  crumbLabel: string;
  sections: LegalSection[];
  updated: string;
}

export function LegalContent({ title, crumbLabel, sections, updated }: Props) {
  const { tl, locale } = useLanguage();
  const updatedLabel =
    locale === "ar" ? "آخر تحديث" : "Last updated";

  return (
    <>
      <PageHero title={title} crumbs={[{ label: crumbLabel }]} />
      <section className="section bg-white">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="text-sm text-charcoal-400">
              {updatedLabel}: {updated}
            </p>
            <div className="mt-8 space-y-8">
              {sections.map((section, i) => (
                <div key={i}>
                  <h2 className="font-display text-xl font-semibold text-charcoal-900">
                    {i + 1}. {tl(section.heading)}
                  </h2>
                  <p className="mt-2 leading-relaxed text-charcoal-600">
                    {tl(section.body)}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
