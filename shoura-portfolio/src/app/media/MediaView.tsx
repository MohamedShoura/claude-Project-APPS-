"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { PageHero } from "@/components/ui/PageHero";
import { MediaGallery } from "@/components/sections/MediaGallery";
import { CtaBanner } from "@/components/sections/CtaBanner";

export function MediaView() {
  const { t, tl } = useLanguage();
  return (
    <>
      <PageHero
        eyebrow={t("section.media.eyebrow")}
        title={tl({ en: "Media & Gallery", ar: "الوسائط والمعرض" })}
        subtitle={tl({
          en: "Training sessions, international workshops, corporate events, certificates and speaking engagements. Images are placeholders pending real photography.",
          ar: "جلسات تدريبية وورش عمل دولية وفعاليات مؤسسية وشهادات ومحاضرات. الصور مؤقتة لحين توفر الصور الحقيقية.",
        })}
        crumbs={[{ label: t("nav.media") }]}
      />
      <MediaGallery />
      <CtaBanner />
    </>
  );
}
