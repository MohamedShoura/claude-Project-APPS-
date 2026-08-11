"use client";

import Link from "next/link";
import { Package, Heart, MapPin, ChevronRight } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { localePath } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { useOrdersStore } from "@/store/orders";
import { useWishlistStore } from "@/store/wishlist";
import { AccountNav } from "@/components/account/AccountNav";
import { AuthForms } from "@/components/account/AuthForms";

export function AccountDashboard() {
  const { locale, dict } = useLocale();
  const user = useAuthStore((s) => s.user);
  const orders = useOrdersStore((s) => s.orders);
  const wishlistCount = useWishlistStore((s) => s.productIds.length);
  const addressesCount = useAuthStore((s) => s.addresses.length);

  if (!user) return <AuthForms />;

  const cards = [
    { href: "/account/orders", icon: Package, label: dict.account.myOrders, value: orders.length },
    { href: "/account/wishlist", icon: Heart, label: dict.account.myWishlist, value: wishlistCount },
    { href: "/account/addresses", icon: MapPin, label: dict.account.myAddresses, value: addressesCount },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <AccountNav />
        <div className="flex-1">
          <h1 className="mb-6 text-2xl font-extrabold text-neutral-900">
            {dict.account.welcome}, {user.name}
          </h1>
          <div className="grid gap-4 sm:grid-cols-3">
            {cards.map((c) => (
              <Link
                key={c.href}
                href={localePath(locale, c.href)}
                className="flex items-center justify-between rounded-2xl border border-neutral-100 p-5 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    <c.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-neutral-900">{c.value}</p>
                    <p className="text-xs text-neutral-500">{c.label}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-neutral-300" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
