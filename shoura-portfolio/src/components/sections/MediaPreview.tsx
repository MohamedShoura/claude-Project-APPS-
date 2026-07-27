"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { mediaItems } from "@/data/media";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/ui/Reveal";
import { Figure } from "@/components/ui/Figure";

export function MediaPreview() {
  const { t, tl } = useLanguage();
  const preview = mediaItems.slice(0, 6);

  return (
    <section className="section bg-neutralbg">
      <div className="container-x">
        <SectionHeading
          eyebrow={t("section.media.eyebrow")}
          title={t("section.media.title")}
          subtitle={t("section.media.subtitle")}
        />
        <StaggerGroup className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {preview.map((item) => (
            <StaggerItem key={item.id}>
              <Figure
                src={item.image}
                alt={tl(item.title)}
                ratio={item.ratio === "portrait" ? "portrait" : "landscape"}
                icon="Video"
                label={tl(item.title)}
                className="card-hover shadow-card"
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Reveal className="mt-10 text-center">
          <Link href="/media" className="btn-outline">
            {t("cta.viewAll")}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
