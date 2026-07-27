"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { privacyPolicy } from "@/data/legal";
import { LegalContent } from "@/components/sections/LegalContent";

export function PrivacyView() {
  const { t, tl } = useLanguage();
  return (
    <LegalContent
      title={tl({ en: "Privacy Policy", ar: "سياسة الخصوصية" })}
      crumbLabel={t("footer.privacy")}
      sections={privacyPolicy}
      updated="2026"
    />
  );
}
