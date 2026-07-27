"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

export function BackToTop() {
  const { t, isRTL } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t("common.backToTop")}
      className={`fixed bottom-24 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-charcoal-200 bg-white text-charcoal-700 shadow-soft transition hover:border-gold-300 hover:text-burgundy-700 ${
        isRTL ? "left-6" : "right-6"
      }`}
    >
      <ArrowUp className="h-5 w-5" aria-hidden />
    </button>
  );
}
