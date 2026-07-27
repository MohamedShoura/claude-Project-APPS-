"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

export function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const { toggleLocale, t, locale } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t("lang.label")}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
        light
          ? "border-white/30 text-white hover:bg-white/10"
          : "border-charcoal-200 text-charcoal-700 hover:border-gold-300 hover:text-burgundy-700"
      }`}
    >
      <Languages className="h-4 w-4" aria-hidden />
      <span>{locale === "en" ? "العربية" : "English"}</span>
    </button>
  );
}
