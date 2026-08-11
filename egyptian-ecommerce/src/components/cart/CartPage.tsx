"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, Tag } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { localePath } from "@/lib/utils";
import { formatPrice } from "@/i18n/format";
import { useCartStore, cartSubtotal } from "@/store/cart";
import { validateCoupon } from "@/lib/coupons";
import { FreeShippingBar } from "@/components/cart/FreeShippingBar";
import { useRouter } from "next/navigation";

export function CartPage() {
  const { locale, dict } = useLocale();
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const couponCode = useCartStore((s) => s.couponCode);
  const couponDiscount = useCartStore((s) => s.couponDiscount);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState(false);

  const subtotal = cartSubtotal(items);
  const total = Math.max(0, subtotal - couponDiscount);

  function handleApplyCoupon() {
    const result = validateCoupon(couponInput, subtotal);
    if (!result) {
      setCouponError(true);
      return;
    }
    setCouponError(false);
    applyCoupon(result.coupon.code, result.discount);
    setCouponInput("");
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center">
        <ShoppingBag size={56} className="text-neutral-200" />
        <h1 className="mt-4 text-xl font-extrabold text-neutral-900">{dict.cart.empty}</h1>
        <p className="mt-1 text-sm text-neutral-500">{dict.cart.emptyDesc}</p>
        <Link href={localePath(locale, "/shop")} className="mt-6 rounded-xl bg-brand-700 px-6 py-3 text-sm font-bold text-white hover:bg-brand-800">
          {dict.cart.continueShopping}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-extrabold text-neutral-900">{dict.cart.title}</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.key} className="flex gap-3 rounded-2xl border border-neutral-100 p-3 sm:gap-4 sm:p-4">
              <Link href={localePath(locale, `/product/${item.slug}`)} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100 sm:h-28 sm:w-28">
                <Image src={item.image} alt="" fill sizes="(max-width: 640px) 80px, 112px" className="object-cover" />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link href={localePath(locale, `/product/${item.slug}`)} className="line-clamp-2 text-sm font-bold text-neutral-800 hover:text-brand-700">
                      {locale === "ar" ? item.nameAr : item.nameEn}
                    </Link>
                    {item.variationLabel && <p className="mt-0.5 text-xs text-neutral-400">{item.variationLabel}</p>}
                  </div>
                  <button onClick={() => removeItem(item.key)} className="text-neutral-400 hover:text-cta-600" aria-label={dict.cart.remove}>
                    <Trash2 size={17} />
                  </button>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex items-center rounded-lg border border-neutral-200">
                    <button onClick={() => updateQty(item.key, item.qty - 1)} className="p-2 text-neutral-600 hover:text-brand-700">
                      <Minus size={13} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                    <button onClick={() => updateQty(item.key, item.qty + 1)} className="p-2 text-neutral-600 hover:text-brand-700">
                      <Plus size={13} />
                    </button>
                  </div>
                  <div className="text-end">
                    {item.originalPrice > item.price && (
                      <p className="text-xs text-neutral-400 line-through">{formatPrice(item.originalPrice * item.qty, locale)}</p>
                    )}
                    <p className="text-sm font-extrabold text-brand-700">{formatPrice(item.price * item.qty, locale)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Link href={localePath(locale, "/shop")} className="inline-block pt-2 text-sm font-bold text-brand-700 hover:text-brand-800">
            ← {dict.cart.continueShopping}
          </Link>
        </div>

        <div className="space-y-4">
          <FreeShippingBar subtotal={subtotal} />

          <div className="rounded-2xl border border-neutral-100 p-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag size={15} className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder={dict.cart.couponPlaceholder}
                  className="w-full rounded-lg border border-neutral-200 py-2.5 ps-9 pe-3 text-sm outline-none focus:border-brand-500"
                />
              </div>
              <button onClick={handleApplyCoupon} className="rounded-lg bg-neutral-900 px-4 text-sm font-bold text-white hover:bg-neutral-800">
                {dict.cart.applyCoupon}
              </button>
            </div>
            {couponError && <p className="mt-2 text-xs font-semibold text-red-600">{dict.cart.couponInvalid}</p>}
            {couponCode && (
              <div className="mt-2 flex items-center justify-between rounded-lg bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700">
                {dict.cart.couponApplied}: {couponCode}
                <button onClick={removeCoupon} className="text-neutral-400 hover:text-cta-600">
                  <Trash2 size={13} />
                </button>
              </div>
            )}
          </div>

          <div className="space-y-2 rounded-2xl border border-neutral-100 p-4">
            <div className="flex justify-between text-sm text-neutral-600">
              <span>{dict.cart.subtotal}</span>
              <span>{formatPrice(subtotal, locale)}</span>
            </div>
            {couponDiscount > 0 && (
              <div className="flex justify-between text-sm text-brand-700">
                <span>{dict.cart.discount}</span>
                <span>-{formatPrice(couponDiscount, locale)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-neutral-500">
              <span>{dict.cart.shipping}</span>
              <span>{locale === "ar" ? "يُحسب عند الدفع" : "Calculated at checkout"}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-neutral-100 pt-2 text-base font-extrabold text-neutral-900">
              <span>{dict.cart.grandTotal}</span>
              <span>{formatPrice(total, locale)}</span>
            </div>
          </div>

          <button
            onClick={() => router.push(localePath(locale, "/checkout"))}
            className="w-full rounded-xl bg-cta-500 py-3.5 text-sm font-extrabold text-white hover:bg-cta-600"
          >
            {dict.cart.checkout}
          </button>
        </div>
      </div>
    </div>
  );
}
