"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { localePath, cn } from "@/lib/utils";
import { formatPrice } from "@/i18n/format";
import { useCartStore, cartSubtotal } from "@/store/cart";
import { useOrdersStore } from "@/store/orders";
import { governorates, shippingFeeFor } from "@/data/governorates";
import { trackEvent } from "@/lib/analytics";
import type { Order } from "@/data/types";

interface FormState {
  fullName: string;
  mobile: string;
  whatsapp: string;
  email: string;
  governorate: string;
  city: string;
  address: string;
  building: string;
  floor: string;
  apartment: string;
  notes: string;
}

const emptyForm: FormState = {
  fullName: "",
  mobile: "",
  whatsapp: "",
  email: "",
  governorate: "",
  city: "",
  address: "",
  building: "",
  floor: "",
  apartment: "",
  notes: "",
};

export function CheckoutForm() {
  const { locale, dict } = useLocale();
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const couponCode = useCartStore((s) => s.couponCode);
  const couponDiscount = useCartStore((s) => s.couponDiscount);
  const clearCart = useCartStore((s) => s.clear);
  const placeOrder = useOrdersStore((s) => s.placeOrder);

  const [form, setForm] = useState<FormState>(emptyForm);
  const [payment, setPayment] = useState<Order["paymentMethod"]>("cod");
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);

  const subtotal = cartSubtotal(items);
  const afterDiscount = Math.max(0, subtotal - couponDiscount);
  const shipping = useMemo(
    () => (form.governorate ? shippingFeeFor(form.governorate, afterDiscount) : 0),
    [form.governorate, afterDiscount]
  );
  const total = afterDiscount + shipping;

  useEffect(() => {
    if (items.length > 0) trackEvent("begin_checkout", { value: subtotal, currency: "EGP", items: items.length });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function set<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const required: (keyof FormState)[] = ["fullName", "mobile", "governorate", "city", "address"];
    const next: Partial<Record<keyof FormState, boolean>> = {};
    required.forEach((k) => {
      if (!form[k].trim()) next[k] = true;
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || items.length === 0) return;
    setSubmitting(true);
    const order = placeOrder({
      customerName: form.fullName,
      mobile: form.mobile,
      email: form.email || undefined,
      governorate: form.governorate,
      city: form.city,
      address: `${form.address}${form.building ? ", " + form.building : ""}${form.floor ? ", " + form.floor : ""}${form.apartment ? ", " + form.apartment : ""}`,
      items: items.map((i) => ({
        productId: i.productId,
        slug: i.slug,
        nameAr: i.nameAr,
        nameEn: i.nameEn,
        image: i.image,
        qty: i.qty,
        price: i.price,
        originalPrice: i.originalPrice,
        variation: i.variationLabel,
      })),
      subtotal,
      discount: couponDiscount,
      shipping,
      total,
      paymentMethod: payment,
      couponCode: couponCode ?? undefined,
    });
    trackEvent("purchase", { transaction_id: order.orderNumber, value: order.total, currency: "EGP", items: order.items.length });
    clearCart();
    router.push(`${localePath(locale, "/checkout/confirmation")}?order=${order.orderNumber}&mobile=${encodeURIComponent(order.mobile)}`);
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <p className="text-neutral-500">{dict.cart.empty}</p>
        <Link href={localePath(locale, "/shop")} className="mt-4 inline-block rounded-xl bg-brand-700 px-6 py-3 text-sm font-bold text-white">
          {dict.cart.continueShopping}
        </Link>
      </div>
    );
  }

  const inputClass = (key: keyof FormState) =>
    cn(
      "w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-brand-500",
      errors[key] ? "border-red-400" : "border-neutral-200"
    );

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-1 text-2xl font-extrabold text-neutral-900">{dict.checkout.title}</h1>
      <p className="mb-6 text-sm text-neutral-500">{dict.checkout.guestNote}</p>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <section>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-neutral-500">{dict.checkout.contact}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <input placeholder={dict.checkout.fullName} value={form.fullName} onChange={(e) => set("fullName", e.target.value)} className={inputClass("fullName")} />
              </div>
              <input placeholder={dict.checkout.mobile} value={form.mobile} onChange={(e) => set("mobile", e.target.value)} className={inputClass("mobile")} />
              <input placeholder={dict.checkout.whatsapp} value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} className={inputClass("whatsapp")} />
              <div className="sm:col-span-2">
                <input placeholder={dict.checkout.email} type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputClass("email")} />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-neutral-500">{dict.checkout.shippingAddress}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <select value={form.governorate} onChange={(e) => set("governorate", e.target.value)} className={inputClass("governorate")}>
                <option value="">{dict.checkout.governorate}</option>
                {governorates.map((g) => (
                  <option key={g.nameEn} value={g.nameEn}>
                    {locale === "ar" ? g.nameAr : g.nameEn}
                  </option>
                ))}
              </select>
              <input placeholder={dict.checkout.city} value={form.city} onChange={(e) => set("city", e.target.value)} className={inputClass("city")} />
              <div className="sm:col-span-2">
                <input placeholder={dict.checkout.address} value={form.address} onChange={(e) => set("address", e.target.value)} className={inputClass("address")} />
              </div>
              <input placeholder={dict.checkout.building} value={form.building} onChange={(e) => set("building", e.target.value)} className={inputClass("building")} />
              <input placeholder={dict.checkout.floor} value={form.floor} onChange={(e) => set("floor", e.target.value)} className={inputClass("floor")} />
              <input placeholder={dict.checkout.apartment} value={form.apartment} onChange={(e) => set("apartment", e.target.value)} className={inputClass("apartment")} />
              <div className="sm:col-span-2">
                <textarea placeholder={dict.checkout.notes} value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={2} className={inputClass("notes")} />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-neutral-500">{dict.checkout.payment}</h2>
            <div className="space-y-2">
              {(
                [
                  ["cod", dict.checkout.cod],
                  ["card", dict.checkout.card],
                  ["wallet", dict.checkout.wallet],
                  ["instapay", dict.checkout.instapay],
                ] as const
              ).map(([key, label]) => (
                <label
                  key={key}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm font-semibold",
                    payment === key ? "border-brand-600 bg-brand-50" : "border-neutral-200"
                  )}
                >
                  <input type="radio" name="payment" checked={payment === key} onChange={() => setPayment(key)} className="h-4 w-4 accent-brand-600" />
                  {label}
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit space-y-4 rounded-2xl border border-neutral-100 p-4">
          <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-500">{dict.checkout.orderSummary}</h2>
          <div className="max-h-64 space-y-3 overflow-y-auto pe-1">
            {items.map((item) => (
              <div key={item.key} className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                  <Image src={item.image} alt="" fill sizes="48px" className="object-cover" />
                  <span className="absolute -end-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-bold text-white">
                    {item.qty}
                  </span>
                </div>
                <p className="line-clamp-2 flex-1 text-xs font-medium text-neutral-700">
                  {locale === "ar" ? item.nameAr : item.nameEn}
                </p>
                <span className="shrink-0 text-xs font-bold text-neutral-800">{formatPrice(item.price * item.qty, locale)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-1.5 border-t border-neutral-100 pt-3 text-sm">
            <div className="flex justify-between text-neutral-600">
              <span>{dict.cart.subtotal}</span>
              <span>{formatPrice(subtotal, locale)}</span>
            </div>
            {couponDiscount > 0 && (
              <div className="flex justify-between text-brand-700">
                <span>{dict.cart.discount}</span>
                <span>-{formatPrice(couponDiscount, locale)}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-600">
              <span>{dict.cart.shipping}</span>
              <span>{shipping === 0 ? (locale === "ar" ? "مجاني" : "Free") : formatPrice(shipping, locale)}</span>
            </div>
            <div className="flex justify-between border-t border-neutral-100 pt-2 text-base font-extrabold text-neutral-900">
              <span>{dict.cart.grandTotal}</span>
              <span>{formatPrice(total, locale)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-cta-500 py-3.5 text-sm font-extrabold text-white hover:bg-cta-600 disabled:opacity-60"
          >
            {dict.checkout.placeOrder}
          </button>
          <p className="flex items-center justify-center gap-1.5 text-xs text-neutral-400">
            <ShieldCheck size={13} /> {locale === "ar" ? "معلوماتك محمية بالكامل" : "Your information is fully secure"}
          </p>
        </aside>
      </div>
    </form>
  );
}
