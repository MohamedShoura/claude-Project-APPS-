"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedPrograms } from "@/data/programs";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/ui/Reveal";
import { ProgramCard } from "@/components/ui/cards";

export function FeaturedProgramsSection() {
  const { t } = useLanguage();
  const featured = getFeaturedPrograms().slice(0, 6);

  return (
    <section className="section bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow={t("section.programs.eyebrow")}
          title={t("section.programs.title")}
          subtitle={t("section.programs.subtitle")}
        />
        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((program) => (
            <StaggerItem key={program.slug} className="h-full">
              <ProgramCard program={program} />
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Reveal className="mt-10 text-center">
          <Link href="/training-programs" className="btn-outline">
            {t("cta.viewAll")}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
