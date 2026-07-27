"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { PageHero } from "@/components/ui/PageHero";
import { ProgramsExplorer } from "@/components/sections/ProgramsExplorer";
import { TrainingSolutions } from "@/components/sections/TrainingSolutions";
import { CtaBanner } from "@/components/sections/CtaBanner";

export function ProgramsView() {
  const { t, tl } = useLanguage();
  return (
    <>
      <PageHero
        eyebrow={t("section.programs.eyebrow")}
        title={tl({
          en: "Training Programs",
          ar: "البرامج التدريبية",
        })}
        subtitle={tl({
          en: "Corporate-ready training across AI, marketing, sales, management, HR, finance and customer experience — fully customizable to your team.",
          ar: "تدريب مؤسسي جاهز في الذكاء الاصطناعي والتسويق والمبيعات والإدارة والموارد البشرية والمالية وتجربة العملاء — قابل للتخصيص بالكامل لفريقك.",
        })}
        crumbs={[{ label: t("nav.programs") }]}
      />
      <ProgramsExplorer />
      <TrainingSolutions />
      <CtaBanner />
    </>
  );
}
