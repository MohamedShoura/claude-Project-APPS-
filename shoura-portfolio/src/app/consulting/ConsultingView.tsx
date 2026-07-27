"use client";

import { services } from "@/data/services";
import { useLanguage } from "@/i18n/LanguageProvider";
import { PageHero } from "@/components/ui/PageHero";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/ui/cards";
import { TrainingSolutions } from "@/components/sections/TrainingSolutions";
import { CtaBanner } from "@/components/sections/CtaBanner";

export function ConsultingView() {
  const { t, tl } = useLanguage();
  return (
    <>
      <PageHero
        eyebrow={t("section.consulting.eyebrow")}
        title={tl({ en: "Consulting Services", ar: "الخدمات الاستشارية" })}
        subtitle={tl({
          en: "Strategic advisory across AI transformation, marketing, sales and business growth — each engagement mapped to a clear challenge, solution and outcome.",
          ar: "استشارات استراتيجية في التحول بالذكاء الاصطناعي والتسويق والمبيعات ونمو الأعمال — كل خدمة مرتبطة بتحدٍ وحل ونتيجة واضحة.",
        })}
        crumbs={[{ label: t("nav.consulting") }]}
      />

      <section className="section bg-neutralbg">
        <div className="container-x">
          <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <StaggerItem key={service.slug} className="h-full">
                <ServiceCard service={service} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <TrainingSolutions />
      <CtaBanner />
    </>
  );
}
