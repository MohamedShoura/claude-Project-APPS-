"use client";

import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-charcoal-900 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-burgundy-700 via-charcoal-900 to-charcoal-900" />
      <div className="absolute inset-0 bg-hero-radial" aria-hidden />
      <div className="container-x relative text-center">
        <p className="font-display text-[7rem] font-bold leading-none text-gradient-gold sm:text-[10rem]">
          404
        </p>
        <h1 className="heading-lg mt-2 text-white">{t("404.title")}</h1>
        <p className="mx-auto mt-4 max-w-md text-white/60">
          {t("404.subtitle")}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-gold">
            <Home className="h-4 w-4" aria-hidden />
            {t("cta.backHome")}
          </Link>
          <Link href="/training-programs" className="btn-ghost-light">
            {t("cta.explorePrograms")}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
