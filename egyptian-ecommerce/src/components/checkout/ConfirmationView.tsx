"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { localePath } from "@/lib/utils";

export function ConfirmationView() {
  const { locale, dict } = useLocale();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") ?? "";

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-50">
        <CheckCircle2 size={44} className="text-brand-600" />
      </div>
      <h1 className="mt-6 text-2xl font-extrabold text-neutral-900">{dict.confirmation.title}</h1>
      <p className="mt-2 text-sm text-neutral-500">{dict.confirmation.subtitle}</p>

      {orderNumber && (
        <div className="mt-6 rounded-xl bg-neutral-50 px-6 py-3">
          <p className="text-xs text-neutral-500">{dict.confirmation.orderNumber}</p>
          <p className="text-lg font-extrabold tracking-wide text-neutral-900">{orderNumber}</p>
        </div>
      )}

      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
        <Link
          href={localePath(locale, "/track-order")}
          className="flex-1 rounded-xl border-2 border-neutral-900 py-3 text-sm font-extrabold text-neutral-900 hover:bg-neutral-900 hover:text-white"
        >
          {dict.confirmation.trackOrder}
        </Link>
        <Link href={localePath(locale, "/")} className="flex-1 rounded-xl bg-brand-700 py-3 text-sm font-extrabold text-white hover:bg-brand-800">
          {dict.confirmation.backHome}
        </Link>
      </div>
    </div>
  );
}
