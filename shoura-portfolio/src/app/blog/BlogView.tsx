"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { PageHero } from "@/components/ui/PageHero";
import { BlogExplorer } from "@/components/sections/BlogExplorer";

export function BlogView() {
  const { t, tl } = useLanguage();
  return (
    <>
      <PageHero
        eyebrow={t("section.blog.eyebrow")}
        title={tl({ en: "Insights & Articles", ar: "رؤى ومقالات" })}
        subtitle={tl({
          en: "Perspectives on AI, business growth, marketing, sales and leadership. Sample articles below are clearly marked placeholder content.",
          ar: "رؤى حول الذكاء الاصطناعي ونمو الأعمال والتسويق والمبيعات والقيادة. المقالات أدناه محتوى مؤقت موضّح.",
        })}
        crumbs={[{ label: t("nav.blog") }]}
      />
      <BlogExplorer />
    </>
  );
}
