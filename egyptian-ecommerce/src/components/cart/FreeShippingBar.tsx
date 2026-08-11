"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { formatPrice } from "@/i18n/format";
import { FREE_SHIPPING_THRESHOLD } from "@/data/governorates";

export function FreeShippingBar({ subtotal }: { subtotal: number }) {
  const { locale, dict } = useLocale();
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div className="rounded-xl border border-brand-100 bg-brand-50/60 p-3">
      <p className="mb-2 text-xs font-semibold text-brand-800">
        {remaining > 0
          ? dict.cart.freeShippingBar.replace("{amount}", formatPrice(remaining, locale))
          : dict.cart.freeShippingReached}
      </p>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white">
        <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
