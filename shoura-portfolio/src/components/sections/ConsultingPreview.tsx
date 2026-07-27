"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/ui/cards";

export function ConsultingPreview() {
  const { t } = useLanguage();
  const featured = services.slice(0, 6);

  return (
    <section id="consulting" className="section bg-neutralbg">
      <div className="container-x">
        <SectionHeading
          eyebrow={t("section.consulting.eyebrow")}
          title={t("section.consulting.title")}
          subtitle={t("section.consulting.subtitle")}
        />
        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((service) => (
            <StaggerItem key={service.slug} className="h-full">
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Reveal className="mt-10 text-center">
          <Link href="/consulting" className="btn-outline">
            {t("cta.viewAll")}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
