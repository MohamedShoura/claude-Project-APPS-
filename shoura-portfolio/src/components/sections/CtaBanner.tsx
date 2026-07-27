"use client";

import Link from "next/link";
import { CalendarCheck, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBanner() {
  const { t, tl } = useLanguage();

  return (
    <section className="section bg-white">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-burgundy px-6 py-14 text-center shadow-soft md:px-16 md:py-20">
          <div className="absolute inset-0 bg-hero-radial" aria-hidden />
          <div
            className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold-400/20 blur-3xl"
            aria-hidden
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="heading-lg text-white">
              {tl({
                en: "Ready to grow your business with AI?",
                ar: "جاهز لتنمية أعمالك بالذكاء الاصطناعي؟",
              })}
            </h2>
            <p className="mt-4 text-white/70">
              {tl({
                en: "Book a consultation or request a customized corporate training proposal today.",
                ar: "احجز استشارة أو اطلب عرض تدريب مؤسسي مخصص اليوم.",
              })}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/book" className="btn-gold">
                <CalendarCheck className="h-4 w-4" aria-hidden />
                {t("cta.book")}
              </Link>
              <Link href="/contact" className="btn-ghost-light">
                {t("cta.getInTouch")}
                <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
