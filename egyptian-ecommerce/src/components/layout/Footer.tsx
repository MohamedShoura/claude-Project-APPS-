"use client";

import Link from "next/link";
import { Truck, ShieldCheck, CreditCard } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { localePath } from "@/lib/utils";
import { FacebookIcon, InstagramIcon, TiktokIcon, YoutubeIcon } from "@/components/shared/SocialIcons";

export function Footer() {
  const { locale, dict } = useLocale();

  const shopLinks = [
    { href: "/shop", label: dict.footer.allProducts },
    { href: "/shop", label: dict.footer.categoriesLink },
    { href: "/offers", label: dict.footer.offersLink },
    { href: "/new-arrivals", label: dict.footer.newArrivalsLink },
  ];
  const supportLinks = [
    { href: "/shipping-policy", label: dict.footer.shipping },
    { href: "/return-policy", label: dict.footer.returnsPolicy },
    { href: "/privacy-policy", label: dict.footer.privacy },
    { href: "/terms", label: dict.footer.terms },
    { href: "/contact", label: dict.footer.contact },
    { href: "/faq", label: dict.footer.faq },
  ];

  return (
    <footer className="border-t border-neutral-100 bg-neutral-950 text-neutral-300">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <span className="text-xl font-extrabold text-white">{dict.brand}</span>
          <p className="mt-3 text-sm leading-relaxed text-neutral-400">{dict.footer.aboutText}</p>
          <div className="mt-4 flex gap-3">
            {[FacebookIcon, InstagramIcon, TiktokIcon, YoutubeIcon].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-600"
                aria-label="social"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">{dict.footer.shop}</h3>
          <ul className="space-y-2 text-sm">
            {shopLinks.map((l, i) => (
              <li key={i}>
                <Link href={localePath(locale, l.href)} className="text-neutral-400 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">{dict.footer.support}</h3>
          <ul className="space-y-2 text-sm">
            {supportLinks.map((l, i) => (
              <li key={i}>
                <Link href={localePath(locale, l.href)} className="text-neutral-400 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">{dict.footer.paymentMethods}</h3>
          <div className="mb-4 flex flex-wrap gap-2">
            {["Cash", "Visa", "Mastercard", "Wallet", "InstaPay"].map((p) => (
              <span key={p} className="rounded border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-semibold">
                {p}
              </span>
            ))}
          </div>
          <div className="space-y-2 text-xs text-neutral-400">
            <div className="flex items-center gap-2"><Truck size={14} /> {locale === "ar" ? "توصيل لكل مصر" : "Delivery across Egypt"}</div>
            <div className="flex items-center gap-2"><ShieldCheck size={14} /> {locale === "ar" ? "دفع آمن 100%" : "100% Secure Checkout"}</div>
            <div className="flex items-center gap-2"><CreditCard size={14} /> {locale === "ar" ? "طرق دفع متعددة" : "Multiple Payment Options"}</div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} {dict.brand}. {dict.footer.rights}.
      </div>
    </footer>
  );
}
