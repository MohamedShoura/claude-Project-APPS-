"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/ui/Reveal";
import { CaseStudyCard } from "@/components/ui/cards";

export function CaseStudiesPreview() {
  const { t } = useLanguage();
  const featured = caseStudies.slice(0, 3);

  return (
    <section className="section bg-neutralbg">
      <div className="container-x">
        <SectionHeading
          eyebrow={t("section.caseStudies.eyebrow")}
          title={t("section.caseStudies.title")}
          subtitle={t("section.caseStudies.subtitle")}
        />
        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((study) => (
            <StaggerItem key={study.slug} className="h-full">
              <CaseStudyCard study={study} />
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Reveal className="mt-10 text-center">
          <Link href="/case-studies" className="btn-outline">
            {t("cta.viewAll")}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
