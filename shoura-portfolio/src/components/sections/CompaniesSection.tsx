"use client";

import { MapPin, CheckCircle2 } from "lucide-react";
import { companies } from "@/data/companies";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Figure } from "@/components/ui/Figure";

export function CompaniesSection() {
  const { t, tl, tlList } = useLanguage();

  return (
    <section id="companies" className="section bg-neutralbg">
      <div className="container-x">
        <SectionHeading
          eyebrow={t("section.companies.eyebrow")}
          title={t("section.companies.title")}
        />
        <StaggerGroup className="mt-12 grid gap-6 lg:grid-cols-2">
          {companies.map((company) => {
            const focus = tlList(company.focus);
            return (
              <StaggerItem key={company.slug}>
                <div className="card-base flex h-full flex-col gap-5 p-7 md:flex-row">
                  <div className="shrink-0">
                    <div className="h-24 w-24 overflow-hidden rounded-2xl border border-charcoal-100">
                      <Figure
                        src={company.logo}
                        alt={tl(company.name)}
                        ratio="square"
                        label={tl(company.name)}
                        rounded={false}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold text-charcoal-900">
                      {tl(company.name)}
                    </h3>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-gold-600">
                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                      {tl(company.location)}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-charcoal-500">
                      {tl(company.description)}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {focus.map((f) => (
                        <li
                          key={f}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-charcoal-600 ring-1 ring-charcoal-100"
                        >
                          <CheckCircle2
                            className="h-3.5 w-3.5 text-gold-500"
                            aria-hidden
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
