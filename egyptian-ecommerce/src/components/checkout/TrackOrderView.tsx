"use client";

import { useState } from "react";
import { CheckCircle2, Circle, PackageSearch, Ban } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/utils";
import { useOrdersStore } from "@/store/orders";
import { orders as sampleOrders } from "@/data/orders";
import type { Order, OrderStatus } from "@/data/types";
import { formatPrice } from "@/i18n/format";

const STEP_ORDER = ["confirmed", "processing", "shipped", "out_for_delivery", "delivered"] as const satisfies readonly OrderStatus[];

export function TrackOrderView() {
  const { locale, dict } = useLocale();
  const findLocalOrder = useOrdersStore((s) => s.findOrder);
  const [orderNumber, setOrderNumber] = useState("");
  const [mobile, setMobile] = useState("");
  const [result, setResult] = useState<Order | null | undefined>(undefined);

  const demo = sampleOrders[0];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const local = findLocalOrder(orderNumber, mobile);
    if (local) {
      setResult(local);
      return;
    }
    const fallback = sampleOrders.find(
      (o) =>
        o.orderNumber.trim().toLowerCase() === orderNumber.trim().toLowerCase() &&
        o.mobile.replace(/\s/g, "") === mobile.replace(/\s/g, "")
    );
    setResult(fallback ?? null);
  }

  const currentStepIndex = result
    ? STEP_ORDER.indexOf((result.status === "new" ? "confirmed" : result.status) as (typeof STEP_ORDER)[number])
    : -1;

  const stepLabels: Record<(typeof STEP_ORDER)[number], string> = {
    confirmed: dict.track.steps.confirmed,
    processing: dict.track.steps.preparing,
    shipped: dict.track.steps.shipped,
    out_for_delivery: dict.track.steps.outForDelivery,
    delivered: dict.track.steps.delivered,
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="text-center">
        <PackageSearch size={40} className="mx-auto text-brand-600" />
        <h1 className="mt-3 text-2xl font-extrabold text-neutral-900">{dict.track.title}</h1>
        <p className="mt-1 text-sm text-neutral-500">{dict.track.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-3 rounded-2xl border border-neutral-100 p-5">
        <input
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          placeholder={dict.track.orderNumber}
          className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500"
        />
        <input
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder={dict.track.mobile}
          className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500"
        />
        <button type="submit" className="w-full rounded-xl bg-brand-700 py-3 text-sm font-extrabold text-white hover:bg-brand-800">
          {dict.track.submit}
        </button>
        <p className="text-center text-xs text-neutral-400">
          {locale === "ar" ? "جرّب رقم تجريبي:" : "Try a demo order:"} {demo.orderNumber} / {demo.mobile}
        </p>
      </form>

      {result === null && (
        <div className="mt-6 rounded-xl bg-red-50 p-4 text-center text-sm font-semibold text-red-600">
          {locale === "ar" ? "لم يتم العثور على الطلب. تأكد من البيانات." : "Order not found. Please check your details."}
        </div>
      )}

      {result && (
        <div className="mt-8 rounded-2xl border border-neutral-100 p-5">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-bold text-neutral-900">#{result.orderNumber}</span>
            <span className="text-sm font-bold text-brand-700">{formatPrice(result.total, locale)}</span>
          </div>

          {result.status === "cancelled" || result.status === "returned" ? (
            <div className="flex items-center gap-2 rounded-xl bg-neutral-100 p-4 text-sm font-semibold text-neutral-600">
              <Ban size={18} />
              {result.status === "cancelled"
                ? locale === "ar"
                  ? "تم إلغاء هذا الطلب"
                  : "This order was cancelled"
                : locale === "ar"
                ? "تم استرجاع هذا الطلب"
                : "This order was returned"}
            </div>
          ) : (
            <ol className="space-y-4">
              {STEP_ORDER.map((step, i) => {
                const done = i <= currentStepIndex;
                return (
                  <li key={step} className="flex items-center gap-3">
                    {done ? (
                      <CheckCircle2 size={22} className="shrink-0 text-brand-600" />
                    ) : (
                      <Circle size={22} className="shrink-0 text-neutral-200" />
                    )}
                    <span className={cn("text-sm font-semibold", done ? "text-neutral-900" : "text-neutral-400")}>
                      {stepLabels[step]}
                    </span>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      )}
    </div>
  );
}
