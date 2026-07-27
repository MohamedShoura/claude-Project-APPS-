"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  trainingFormats,
  customizationFactors,
} from "@/data/services";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export function TrainingSolutions() {
  const { t, tl } = useLanguage();

  return (
    <section className="section relative overflow-hidden bg-charcoal-900 text-white">
      <div className="absolute inset-0 bg-hero-radial" aria-hidden />
      <div className="container-x relative">
        <SectionHeading
          eyebrow={t("section.training.eyebrow")}
          title={t("section.training.title")}
          subtitle={t("section.training.subtitle")}
          light
        />

        <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trainingFormats.map((format) => (
            <StaggerItem key={format.label.en}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-gold-400/40 hover:bg-white/[0.07]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-400/15 text-gold-300">
                  <Icon name={format.icon} className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-white/85">
                  {tl(format.label)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-14 grid items-center gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8 lg:grid-cols-2 lg:p-10">
          <div>
            <h3 className="font-display text-2xl font-semibold text-white">
              {t("cta.requestProposal")}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {tl({
                en: "Every corporate program is fully customized to your organization. We tailor content, projects and delivery to fit your exact needs.",
                ar: "كل برنامج مؤسسي مصمم بالكامل لمؤسستك. نخصص المحتوى والمشاريع والتنفيذ ليناسب احتياجاتك بدقة.",
              })}
            </p>
            <Link href="/book" className="btn-gold mt-6">
              {t("cta.requestProposal")}
              <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
            </Link>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {customizationFactors.map((factor) => (
              <li
                key={factor.en}
                className="flex items-center gap-2 text-sm text-white/80"
              >
                <CheckCircle2
                  className="h-4 w-4 shrink-0 text-gold-400"
                  aria-hidden
                />
                {tl(factor)}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
