"use client";

import { caseStudies } from "@/data/caseStudies";
import { useLanguage } from "@/i18n/LanguageProvider";
import { PageHero } from "@/components/ui/PageHero";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { CaseStudyCard } from "@/components/ui/cards";
import { CtaBanner } from "@/components/sections/CtaBanner";

export function CaseStudiesView() {
  const { t, tl } = useLanguage();
  return (
    <>
      <PageHero
        eyebrow={t("section.caseStudies.eyebrow")}
        title={tl({ en: "Case Studies", ar: "دراسات الحالة" })}
        subtitle={tl({
          en: "Illustrative transformation journeys across AI, marketing, sales and customer experience. Content is placeholder pending verified client stories.",
          ar: "رحلات تحول توضيحية عبر الذكاء الاصطناعي والتسويق والمبيعات وتجربة العملاء. المحتوى مؤقت لحين توفر قصص عملاء مُعتمدة.",
        })}
        crumbs={[{ label: t("nav.caseStudies") }]}
      />

      <section className="section bg-neutralbg">
        <div className="container-x">
          <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <StaggerItem key={study.slug} className="h-full">
                <CaseStudyCard study={study} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
