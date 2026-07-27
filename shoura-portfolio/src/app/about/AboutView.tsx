"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { PageHero } from "@/components/ui/PageHero";
import { AboutContent } from "@/components/sections/AboutContent";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { CompaniesSection } from "@/components/sections/CompaniesSection";
import { CtaBanner } from "@/components/sections/CtaBanner";

export function AboutView() {
  const { t, tl } = useLanguage();
  return (
    <>
      <PageHero
        eyebrow={t("section.about.eyebrow")}
        title={tl({
          en: "About Dr. Mohamed Shoura",
          ar: "عن د. محمد شورى",
        })}
        subtitle={tl({
          en: "International corporate trainer, AI consultant and business growth expert with over 16 years of global experience.",
          ar: "مدرب مؤسسي دولي ومستشار ذكاء اصطناعي وخبير نمو أعمال بخبرة عالمية تتجاوز 16 عامًا.",
        })}
        crumbs={[{ label: t("nav.about") }]}
      />
      <AboutContent />
      <ExperienceSection />
      <CompaniesSection />
      <CtaBanner />
    </>
  );
}
