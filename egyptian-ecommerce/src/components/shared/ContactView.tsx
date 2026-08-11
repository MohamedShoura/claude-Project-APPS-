"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { whatsappLink, WHATSAPP_NUMBER } from "@/lib/whatsapp";

export function ContactView() {
  const { locale } = useLocale();
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-2 text-2xl font-extrabold text-neutral-900 sm:text-3xl">
        {locale === "ar" ? "اتصل بنا" : "Contact Us"}
      </h1>
      <p className="mb-8 text-sm text-neutral-500">
        {locale === "ar" ? "نحن هنا للمساعدة، تواصل معنا بأي وسيلة تناسبك" : "We're here to help — reach us however suits you best"}
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-neutral-100 p-4">
            <Phone size={18} className="text-brand-600" />
            <span className="text-sm font-semibold text-neutral-700" dir="ltr">+{WHATSAPP_NUMBER}</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-neutral-100 p-4">
            <Mail size={18} className="text-brand-600" />
            <span className="text-sm font-semibold text-neutral-700">support@neelstore.example</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-neutral-100 p-4">
            <MapPin size={18} className="text-brand-600" />
            <span className="text-sm font-semibold text-neutral-700">
              {locale === "ar" ? "القاهرة، مصر" : "Cairo, Egypt"}
            </span>
          </div>
          <a
            href={whatsappLink(locale === "ar" ? "مرحباً، أريد الاستفسار" : "Hello, I'd like to ask a question")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-extrabold text-white hover:opacity-90"
          >
            <MessageCircle size={18} />
            {locale === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
          </a>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="space-y-3"
        >
          <input placeholder={locale === "ar" ? "الاسم" : "Name"} className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500" />
          <input type="email" placeholder={locale === "ar" ? "البريد الإلكتروني" : "Email"} className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500" />
          <textarea rows={4} placeholder={locale === "ar" ? "رسالتك" : "Your message"} className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500" />
          <button type="submit" className="w-full rounded-xl bg-brand-700 py-3 text-sm font-extrabold text-white hover:bg-brand-800">
            {locale === "ar" ? "إرسال الرسالة" : "Send Message"}
          </button>
          {sent && <p className="text-center text-sm font-semibold text-brand-700">{locale === "ar" ? "تم إرسال رسالتك بنجاح!" : "Your message has been sent!"}</p>}
        </form>
      </div>
    </div>
  );
}
