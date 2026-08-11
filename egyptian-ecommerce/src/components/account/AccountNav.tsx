"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, Heart, MapPin, LogOut } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { localePath, cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";

export function AccountNav() {
  const { locale, dict } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  const links = [
    { href: "/account", icon: LayoutDashboard, label: dict.account.dashboard },
    { href: "/account/orders", icon: Package, label: dict.account.myOrders },
    { href: "/account/wishlist", icon: Heart, label: dict.account.myWishlist },
    { href: "/account/addresses", icon: MapPin, label: dict.account.myAddresses },
  ];

  return (
    <div className="w-full shrink-0 lg:w-60">
      <div className="mb-4 rounded-xl bg-brand-50 p-4">
        <p className="text-xs text-neutral-500">{dict.account.welcome}</p>
        <p className="font-bold text-neutral-900">{user?.name}</p>
      </div>
      <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
        {links.map((l) => {
          const href = localePath(locale, l.href);
          const active = pathname === href;
          return (
            <Link
              key={l.href}
              href={href}
              className={cn(
                "flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold",
                active ? "bg-brand-700 text-white" : "text-neutral-600 hover:bg-neutral-50"
              )}
            >
              <l.icon size={17} />
              {l.label}
            </Link>
          );
        })}
        <button
          onClick={() => {
            logout();
            router.push(localePath(locale, "/account"));
          }}
          className="flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
        >
          <LogOut size={17} />
          {dict.account.logout}
        </button>
      </nav>
    </div>
  );
}
