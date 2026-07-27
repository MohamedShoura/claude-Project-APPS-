"use client";

import { MapPin } from "lucide-react";
import { countries, timeline } from "@/data/experience";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/ui/Reveal";

/** Simple flag-emoji lookup from ISO country code. */
function flag(code: string) {
  return code
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

export function ExperienceSection() {
  const { t, tl } = useLanguage();

  return (
    <section id="experience" className="section bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow={t("section.experience.eyebrow")}
          title={t("section.experience.title")}
          subtitle={t("section.experience.subtitle")}
        />

        {/* Country grid */}
        <StaggerGroup className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {countries.map((country) => (
            <StaggerItem key={country.code}>
              <div className="card-base card-hover flex items-center gap-3 p-4">
                <span className="text-2xl" aria-hidden>
                  {flag(country.code)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-charcoal-800">
                    {tl(country.name)}
                  </p>
                  <p className="text-xs text-charcoal-400">
                    {tl(country.region)}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Timeline */}
        <Reveal className="mx-auto mt-16 max-w-3xl">
          <ol className="relative border-s-2 border-gold-200 ps-6">
            {timeline.map((entry, i) => (
              <li key={entry.year} className={i === timeline.length - 1 ? "" : "mb-8"}>
                <span
                  className="absolute -start-[9px] mt-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-gradient-burgundy"
                  aria-hidden
                />
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="font-display text-lg font-bold text-burgundy-700">
                    {entry.year}
                  </span>
                  <h3 className="font-display text-base font-semibold text-charcoal-900">
                    {tl(entry.title)}
                  </h3>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-charcoal-500">
                  {tl(entry.description)}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
