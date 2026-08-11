"use client";

import { MessageCircle } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { whatsappLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export function WhatsAppFloatButton() {
  const { locale } = useLocale();
  const message =
    locale === "ar"
      ? "مرحباً، أريد الاستفسار عن منتجاتكم"
      : "Hello, I'd like to ask about your products";

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { source: "float_button" })}
      className="fixed bottom-20 end-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 md:bottom-6"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} fill="white" className="text-[#25D366]" />
    </a>
  );
}
