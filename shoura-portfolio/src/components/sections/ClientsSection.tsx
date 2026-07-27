"use client";

import { clients, industries } from "@/data/clients";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function ClientsSection() {
  const { t, tl } = useLanguage();

  return (
    <section id="clients" className="section bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow={t("section.clients.eyebrow")}
          title={t("section.clients.title")}
          subtitle={t("section.clients.statement")}
        />

        {/* Client logo grid (placeholders) */}
        <Reveal className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {clients.map((client) => (
            <div
              key={client.id}
              className="flex aspect-[3/2] items-center justify-center rounded-xl border border-dashed border-charcoal-200 bg-neutralbg p-4 grayscale transition hover:grayscale-0"
              title={tl(client.name)}
            >
              <span className="text-center text-xs font-medium text-charcoal-400">
                {tl(client.name)}
              </span>
            </div>
          ))}
        </Reveal>

        {/* Industries */}
        <Reveal className="mt-10 flex flex-wrap justify-center gap-2">
          {industries.map((industry) => (
            <span
              key={industry.en}
              className="rounded-full bg-burgundy-50 px-4 py-1.5 text-sm font-medium text-burgundy-700"
            >
              {tl(industry)}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
