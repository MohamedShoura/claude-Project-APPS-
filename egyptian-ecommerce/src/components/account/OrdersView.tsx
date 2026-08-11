"use client";

import Image from "next/image";
import { Package } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { formatPrice } from "@/i18n/format";
import { useAuthStore } from "@/store/auth";
import { useOrdersStore } from "@/store/orders";
import { useCartStore } from "@/store/cart";
import { AccountNav } from "@/components/account/AccountNav";
import { AuthForms } from "@/components/account/AuthForms";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";

export function OrdersView() {
  const { locale, dict } = useLocale();
  const user = useAuthStore((s) => s.user);
  const orders = useOrdersStore((s) => s.orders);
  const addItem = useCartStore((s) => s.addItem);

  if (!user) return <AuthForms />;

  function reorder(order: (typeof orders)[number]) {
    order.items.forEach((item) =>
      addItem(
        {
          productId: item.productId,
          slug: item.slug,
          nameAr: item.nameAr,
          nameEn: item.nameEn,
          image: item.image,
          price: item.price,
          originalPrice: item.originalPrice,
        },
        item.qty
      )
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <AccountNav />
        <div className="flex-1">
          <h1 className="mb-6 text-2xl font-extrabold text-neutral-900">{dict.account.myOrders}</h1>
          {orders.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-neutral-200 py-16 text-center">
              <Package size={40} className="text-neutral-200" />
              <p className="mt-3 text-neutral-500">{locale === "ar" ? "لا توجد طلبات بعد" : "No orders yet"}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="rounded-2xl border border-neutral-100 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-50 pb-3">
                    <div>
                      <p className="text-sm font-bold text-neutral-900">#{order.orderNumber}</p>
                      <p className="text-xs text-neutral-400">{new Date(order.createdAtISO).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US")}</p>
                    </div>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <div className="flex gap-2 overflow-x-auto py-3">
                    {order.items.map((item, i) => (
                      <div key={i} className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                        <Image src={item.image} alt="" fill sizes="56px" className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-extrabold text-neutral-900">{formatPrice(order.total, locale)}</p>
                    <button
                      onClick={() => reorder(order)}
                      className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-bold text-neutral-700 hover:bg-neutral-50"
                    >
                      {dict.account.reorder}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
