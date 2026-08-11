import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Locale } from "@/i18n/config";

export function SectionHeading({
  title,
  subtitle,
  viewAllHref,
  viewAllLabel,
  locale,
}: {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  locale: Locale;
}) {
  const Chevron = locale === "ar" ? ChevronLeft : ChevronRight;
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-extrabold text-neutral-900 sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="flex shrink-0 items-center gap-1 text-sm font-bold text-brand-700 hover:text-brand-800"
        >
          {viewAllLabel}
          <Chevron size={16} />
        </Link>
      )}
    </div>
  );
}
