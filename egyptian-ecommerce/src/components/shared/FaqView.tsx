"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    qAr: "كم تستغرق مدة التوصيل؟",
    qEn: "How long does delivery take?",
    aAr: "من 1-2 يوم عمل في القاهرة والجيزة، ومن 2-5 أيام عمل لباقي المحافظات.",
    aEn: "1-2 business days in Cairo and Giza, and 2-5 business days for other governorates.",
  },
  {
    qAr: "هل يوجد دفع عند الاستلام؟",
    qEn: "Do you offer cash on delivery?",
    aAr: "نعم، بالإضافة إلى الدفع بالبطاقة الائتمانية والمحافظ الإلكترونية وإنستاباي.",
    aEn: "Yes, in addition to card payment, e-wallets, and InstaPay.",
  },
  {
    qAr: "كيف يمكنني استرجاع منتج؟",
    qEn: "How can I return a product?",
    aAr: "يمكنك طلب الاسترجاع خلال 14 يوم من الاستلام عبر صفحة حسابي أو التواصل معنا مباشرة.",
    aEn: "You can request a return within 14 days of delivery via your account page or by contacting us directly.",
  },
  {
    qAr: "هل الشحن مجاني؟",
    qEn: "Is shipping free?",
    aAr: "الشحن مجاني تلقائياً للطلبات التي تزيد عن 2,000 جنيه مصري.",
    aEn: "Shipping is automatically free for orders over 2,000 EGP.",
  },
  {
    qAr: "كيف أتتبع طلبي؟",
    qEn: "How do I track my order?",
    aAr: "استخدم صفحة تتبع الطلب وأدخل رقم الطلب ورقم الموبايل المستخدم عند الشراء.",
    aEn: "Use the order tracking page and enter your order number and the mobile number used at checkout.",
  },
  {
    qAr: "هل المنتجات أصلية؟",
    qEn: "Are the products authentic?",
    aAr: "نعم، جميع منتجاتنا أصلية 100% ومضمونة الجودة مع ضمان من الوكيل حيث ينطبق.",
    aEn: "Yes, all our products are 100% authentic and quality-guaranteed, with manufacturer warranty where applicable.",
  },
];

export function FaqView() {
  const { locale } = useLocale();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-extrabold text-neutral-900 sm:text-3xl">
        {locale === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
      </h1>
      <div className="space-y-3">
        {FAQS.map((f, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-neutral-100">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-3 p-4 text-start text-sm font-bold text-neutral-900"
            >
              {locale === "ar" ? f.qAr : f.qEn}
              <ChevronDown size={17} className={cn("shrink-0 transition-transform", open === i && "rotate-180")} />
            </button>
            {open === i && (
              <p className="px-4 pb-4 text-sm leading-relaxed text-neutral-600">{locale === "ar" ? f.aAr : f.aEn}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
