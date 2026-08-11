"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export function LegalPage({
  titleAr,
  titleEn,
  sections,
}: {
  titleAr: string;
  titleEn: string;
  sections: { headingAr: string; headingEn: string; bodyAr: string; bodyEn: string }[];
}) {
  const { locale } = useLocale();
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-extrabold text-neutral-900 sm:text-3xl">
        {locale === "ar" ? titleAr : titleEn}
      </h1>
      <div className="space-y-6">
        {sections.map((s, i) => (
          <section key={i}>
            <h2 className="mb-2 text-lg font-bold text-neutral-900">{locale === "ar" ? s.headingAr : s.headingEn}</h2>
            <p className="text-sm leading-relaxed text-neutral-600">{locale === "ar" ? s.bodyAr : s.bodyEn}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
