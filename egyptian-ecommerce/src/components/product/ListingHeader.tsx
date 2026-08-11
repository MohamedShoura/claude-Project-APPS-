"use client";

import { useSearchParams } from "next/navigation";
import { useLocale } from "@/i18n/LocaleProvider";

export function ListingHeader({ titleKey }: { titleKey: "shop" | "offers" | "newArrivals" | "bestSellers" }) {
  const { dict } = useLocale();
  return (
    <div className="mx-auto max-w-7xl px-4 pt-8">
      <h1 className="text-2xl font-extrabold text-neutral-900 sm:text-3xl">{dict.pages[titleKey]}</h1>
    </div>
  );
}

export function SearchHeader() {
  const { dict } = useLocale();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  return (
    <div className="mx-auto max-w-7xl px-4 pt-8">
      <h1 className="text-2xl font-extrabold text-neutral-900 sm:text-3xl">
        {dict.pages.searchResultsFor} &ldquo;{q}&rdquo;
      </h1>
    </div>
  );
}
