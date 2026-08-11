"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import type { OrderStatus } from "@/data/types";
import { cn } from "@/lib/utils";

const STYLES: Record<OrderStatus, string> = {
  new: "bg-neutral-100 text-neutral-600",
  confirmed: "bg-brand-50 text-brand-700",
  processing: "bg-gold-50 text-gold-700",
  shipped: "bg-blue-50 text-blue-700",
  out_for_delivery: "bg-cta-50 text-cta-700",
  delivered: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
  returned: "bg-neutral-100 text-neutral-600",
};

const LABELS_AR: Record<OrderStatus, string> = {
  new: "جديد",
  confirmed: "تم التأكيد",
  processing: "قيد التجهيز",
  shipped: "تم الشحن",
  out_for_delivery: "خارج للتوصيل",
  delivered: "تم التوصيل",
  cancelled: "ملغي",
  returned: "مسترجع",
};
const LABELS_EN: Record<OrderStatus, string> = {
  new: "New",
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
  returned: "Returned",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const { locale } = useLocale();
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", STYLES[status])}>
      {locale === "ar" ? LABELS_AR[status] : LABELS_EN[status]}
    </span>
  );
}
