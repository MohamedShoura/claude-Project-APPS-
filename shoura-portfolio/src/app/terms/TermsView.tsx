"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { termsAndConditions } from "@/data/legal";
import { LegalContent } from "@/components/sections/LegalContent";

export function TermsView() {
  const { t, tl } = useLanguage();
  return (
    <LegalContent
      title={tl({ en: "Terms & Conditions", ar: "الشروط والأحكام" })}
      crumbLabel={t("footer.terms")}
      sections={termsAndConditions}
      updated="2026"
    />
  );
}
