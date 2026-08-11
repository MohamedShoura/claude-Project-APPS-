"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/i18n/LocaleProvider";
import { swapLocaleInPath } from "@/lib/utils";
import { Globe } from "lucide-react";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale } = useLocale();
  const pathname = usePathname();
  const target = locale === "ar" ? "en" : "ar";
  const href = swapLocaleInPath(pathname || "/ar", target);

  return (
    <Link
      href={href}
      className={
        compact
          ? "flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:border-brand-500 hover:text-brand-700"
          : "flex items-center gap-1 text-sm font-semibold text-neutral-600 hover:text-brand-700"
      }
    >
      <Globe size={15} />
      {target === "ar" ? "العربية" : "English"}
    </Link>
  );
}
