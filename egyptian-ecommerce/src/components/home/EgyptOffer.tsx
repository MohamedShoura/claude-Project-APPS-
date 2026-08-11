"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";
import { localePath } from "@/lib/utils";
import { CountdownTimer } from "@/components/shared/CountdownTimer";

const endsAt = new Date(Date.now() + 1000 * 60 * 60 * 40).toISOString();

export function EgyptOffer() {
  const { locale, dict } = useLocale();

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:py-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900 text-white">
        <div className="absolute -end-16 -top-16 h-64 w-64 rounded-full bg-gold-500/20 blur-3xl" />
        <div className="absolute -start-10 -bottom-10 h-52 w-52 rounded-full bg-cta-500/20 blur-3xl" />
        <div className="relative grid items-center gap-8 p-8 md:grid-cols-2 md:p-14">
          <div>
            <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-bold">
              {dict.egyptOffer.eyebrow}
            </span>
            <h2 className="mt-4 text-2xl font-extrabold leading-snug sm:text-3xl md:text-4xl">
              {dict.egyptOffer.title}
            </h2>
            <p className="mt-3 max-w-md text-sm text-white/80 sm:text-base">{dict.egyptOffer.subtitle}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href={localePath(locale, "/offers")}
                className="rounded-xl bg-gold-500 px-6 py-3.5 text-sm font-extrabold text-neutral-900 shadow-lg transition-transform hover:scale-[1.02]"
              >
                {dict.egyptOffer.cta}
              </Link>
              <CountdownTimer target={endsAt} variant="dark" />
            </div>
          </div>
          <div className="relative mx-auto aspect-[4/3] w-full max-w-sm overflow-hidden rounded-2xl">
            <Image src="/img/hero/offer.svg" alt="offer" fill sizes="(max-width: 768px) 90vw, 384px" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
