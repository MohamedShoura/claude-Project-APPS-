"use client";

import { MessageCircle } from "lucide-react";
import { contact } from "@/data/contact";
import { useLanguage } from "@/i18n/LanguageProvider";

export function WhatsAppButton() {
  const { t, isRTL } = useLanguage();
  const href = `https://wa.me/${contact.whatsapp}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("contact.whatsapp")}
      className={`group fixed bottom-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:shadow-xl ${
        isRTL ? "left-6" : "right-6"
      }`}
    >
      <MessageCircle className="h-7 w-7" aria-hidden />
      <span className="sr-only">{t("contact.whatsapp")}</span>
    </a>
  );
}
