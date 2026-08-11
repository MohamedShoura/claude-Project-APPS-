"use client";

import { Truck, ShieldCheck, CreditCard, RotateCcw, MessageCircle, BadgeCheck } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";

export function WhyShopWithUs() {
  const { dict } = useLocale();

  const items = [
    { icon: Truck, ...dict.why.delivery },
    { icon: ShieldCheck, ...dict.why.secure },
    { icon: CreditCard, ...dict.why.payment },
    { icon: RotateCcw, ...dict.why.returns },
    { icon: MessageCircle, ...dict.why.support },
    { icon: BadgeCheck, ...dict.why.trusted },
  ];

  return (
    <section className="bg-brand-50/60 py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-8 text-center text-2xl font-extrabold text-neutral-900 sm:text-3xl">
          {dict.why.title}
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 text-center shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600/10 text-brand-700">
                <item.icon size={22} />
              </div>
              <p className="text-sm font-bold text-neutral-800">{item.title}</p>
              <p className="text-xs text-neutral-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
