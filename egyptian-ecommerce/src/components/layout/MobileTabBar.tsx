"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingBag, Heart, User } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { localePath } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useCartStore, cartCount } from "@/store/cart";

export function MobileTabBar() {
  const { locale, dict } = useLocale();
  const pathname = usePathname();
  const items = useCartStore((s) => s.items);
  const count = cartCount(items);

  const tabs = [
    { href: "/", icon: Home, label: locale === "ar" ? "الرئيسية" : "Home" },
    { href: "/shop", icon: LayoutGrid, label: dict.nav.categories },
    { href: "/cart", icon: ShoppingBag, label: dict.nav.cart, badge: count },
    { href: "/account/wishlist", icon: Heart, label: dict.nav.wishlist },
    { href: "/account", icon: User, label: dict.nav.account },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-neutral-100 bg-white py-1.5 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:hidden">
      {tabs.map((tab) => {
        const href = localePath(locale, tab.href);
        const active = pathname === href;
        return (
          <Link
            key={tab.href}
            href={href}
            className={cn(
              "relative flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-medium",
              active ? "text-brand-700" : "text-neutral-500"
            )}
          >
            <tab.icon size={20} />
            {tab.label}
            {!!tab.badge && (
              <span className="absolute -end-1 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-cta-500 px-1 text-[9px] font-bold text-white">
                {tab.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
