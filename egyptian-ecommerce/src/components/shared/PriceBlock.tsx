"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { formatPrice, discountPercent, savings } from "@/i18n/format";
import { cn } from "@/lib/utils";

export function PriceBlock({
  price,
  originalPrice,
  size = "md",
  showSavings = false,
  className,
}: {
  price: number;
  originalPrice: number;
  size?: "sm" | "md" | "lg";
  showSavings?: boolean;
  className?: string;
}) {
  const { locale, dict } = useLocale();
  const hasDiscount = originalPrice > price;
  const pct = discountPercent(originalPrice, price);

  const priceSize = { sm: "text-base", md: "text-xl", lg: "text-3xl" }[size];
  const origSize = { sm: "text-xs", md: "text-sm", lg: "text-base" }[size];

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className={cn("font-extrabold text-brand-700", priceSize)}>
        {formatPrice(price, locale)}
      </span>
      {hasDiscount && (
        <>
          <span className={cn("text-neutral-400 line-through", origSize)}>
            {formatPrice(originalPrice, locale)}
          </span>
          <span className="rounded-md bg-cta-500 px-1.5 py-0.5 text-xs font-bold text-white">
            -{pct}% {dict.product.off}
          </span>
        </>
      )}
      {showSavings && hasDiscount && (
        <span className="w-full text-xs font-medium text-brand-600">
          {dict.product.save} {formatPrice(savings(originalPrice, price), locale)}
        </span>
      )}
    </div>
  );
}
