"use client";

import { expertise } from "@/data/expertise";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { ExpertiseCard } from "@/components/ui/cards";

export function ExpertiseSection() {
  const { t } = useLanguage();
  return (
    <section id="expertise" className="section bg-neutralbg">
      <div className="container-x">
        <SectionHeading
          eyebrow={t("section.expertise.eyebrow")}
          title={t("section.expertise.title")}
          subtitle={t("section.expertise.subtitle")}
        />
        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {expertise.map((item) => (
            <StaggerItem key={item.slug} className="h-full">
              <ExpertiseCard item={item} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
