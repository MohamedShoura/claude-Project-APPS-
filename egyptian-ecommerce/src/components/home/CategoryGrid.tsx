"use client";

import Image from "next/image";
import Link from "next/link";
import { Flame } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { localePath } from "@/lib/utils";
import { categories } from "@/data/categories";
import { SectionHeading } from "./SectionHeading";

export function CategoryGrid() {
  const { locale, dict } = useLocale();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <SectionHeading title={dict.categories.title} subtitle={dict.categories.subtitle} locale={locale} />
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-6 md:gap-4">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`${localePath(locale, "/shop")}?category=${c.slug}`}
            className="group flex flex-col items-center gap-2"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-sm ring-1 ring-neutral-100 transition-shadow group-hover:shadow-md">
              <Image
                src={c.image}
                alt={locale === "ar" ? c.nameAr : c.nameEn}
                fill
                sizes="(max-width: 768px) 33vw, 16vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span className="text-center text-xs font-bold text-neutral-800 sm:text-sm">
              {locale === "ar" ? c.nameAr : c.nameEn}
            </span>
          </Link>
        ))}
        <Link
          href={localePath(locale, "/best-sellers")}
          className="group flex flex-col items-center gap-2"
        >
          <div className="relative flex aspect-square w-full flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl bg-gradient-to-br from-gold-500 to-cta-500 text-white shadow-sm transition-shadow group-hover:shadow-md">
            <Flame size={28} />
          </div>
          <span className="text-center text-xs font-bold text-neutral-800 sm:text-sm">
            {dict.nav.bestSellers}
          </span>
        </Link>
      </div>
    </section>
  );
}
