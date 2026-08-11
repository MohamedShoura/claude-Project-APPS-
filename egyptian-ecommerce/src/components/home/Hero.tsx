"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Truck, ShieldCheck, Sparkles } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { localePath } from "@/lib/utils";

export function Hero() {
  const { locale, dict } = useLocale();
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-100 px-3 py-1 text-xs font-bold text-gold-700">
            <Sparkles size={13} /> {locale === "ar" ? "عروض حصرية أونلاين" : "Exclusive online deals"}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-neutral-900 sm:text-4xl md:text-5xl">
            {dict.hero.title}
          </h1>
          <p className="mt-4 max-w-lg text-base text-neutral-600 sm:text-lg">{dict.hero.subtitle}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={localePath(locale, "/shop")}
              className="flex items-center gap-2 rounded-xl bg-cta-500 px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-cta-500/25 transition-transform hover:scale-[1.02] hover:bg-cta-600"
            >
              {dict.hero.shopNow}
              <Arrow size={16} />
            </Link>
            <Link
              href={localePath(locale, "/offers")}
              className="rounded-xl border-2 border-neutral-900 px-6 py-3.5 text-sm font-extrabold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
            >
              {dict.hero.viewOffers}
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-5 text-xs font-semibold text-neutral-500">
            <span className="flex items-center gap-1.5"><Truck size={16} className="text-brand-600" /> {locale === "ar" ? "توصيل لكل مصر" : "Delivery across Egypt"}</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-brand-600" /> {locale === "ar" ? "دفع آمن" : "Secure checkout"}</span>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl shadow-2xl">
          <Image
            src="/img/hero/hero.svg"
            alt="hero"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 45vw"
            className="object-cover"
          />
          <div className="absolute bottom-4 start-4 rounded-2xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
            <p className="text-xs text-neutral-500">{locale === "ar" ? "خصم يصل إلى" : "Discount up to"}</p>
            <p className="text-2xl font-extrabold text-cta-600">50%</p>
          </div>
        </div>
      </div>
    </section>
  );
}
