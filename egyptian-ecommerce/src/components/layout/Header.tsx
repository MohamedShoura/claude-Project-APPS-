"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Menu, ShoppingBag, User, X, ChevronDown } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { localePath } from "@/lib/utils";
import { SearchBar } from "@/components/layout/SearchBar";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { categories } from "@/data/categories";
import { useCartStore, cartCount } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";

export function Header() {
  const { locale, dict } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const wishlistCount = useWishlistStore((s) => s.productIds.length);
  const count = cartCount(items);

  const navLinks = [
    { href: "/offers", label: dict.nav.offers },
    { href: "/new-arrivals", label: dict.nav.newArrivals },
    { href: "/best-sellers", label: dict.nav.bestSellers },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:gap-6">
        <button
          onClick={() => setMenuOpen(true)}
          className="shrink-0 text-neutral-700 md:hidden"
          aria-label="menu"
        >
          <Menu size={24} />
        </button>

        <Link href={localePath(locale, "/")} className="shrink-0 text-xl font-extrabold tracking-tight text-brand-800">
          {dict.brand}
        </Link>

        <div className="hidden flex-1 md:block">
          <SearchBar />
        </div>

        <div className="ms-auto flex shrink-0 items-center gap-1 sm:gap-3">
          <div className="hidden lg:block">
            <LanguageSwitcher compact />
          </div>
          <Link
            href={localePath(locale, "/account")}
            className="hidden items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 sm:flex"
          >
            <User size={20} />
            <span className="hidden lg:inline">{dict.nav.account}</span>
          </Link>
          <Link
            href={localePath(locale, "/account/wishlist")}
            className="relative flex items-center rounded-lg p-2 text-neutral-700 hover:bg-neutral-50"
            aria-label="wishlist"
          >
            <Heart size={22} />
            {wishlistCount > 0 && (
              <span className="absolute -end-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-cta-500 px-1 text-[10px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            href={localePath(locale, "/cart")}
            className="relative flex items-center rounded-lg p-2 text-neutral-700 hover:bg-neutral-50"
            aria-label="cart"
          >
            <ShoppingBag size={22} />
            {count > 0 && (
              <span className="absolute -end-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-700 px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="px-4 pb-3 md:hidden">
        <SearchBar />
      </div>

      <nav className="hidden border-t border-neutral-100 md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-2.5 text-sm font-semibold text-neutral-700">
          <div
            className="relative"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-brand-700">
              {dict.nav.categories}
              <ChevronDown size={14} />
            </button>
            {catOpen && (
              <div className="absolute start-0 top-full z-50 w-56 rounded-xl border border-neutral-100 bg-white py-2 shadow-xl">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`${localePath(locale, "/shop")}?category=${c.slug}`}
                    className="block px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-brand-700"
                  >
                    {locale === "ar" ? c.nameAr : c.nameEn}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {navLinks.map((l) => (
            <Link key={l.href} href={localePath(locale, l.href)} className="hover:text-brand-700">
              {l.label}
            </Link>
          ))}
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-y-0 start-0 flex w-72 flex-col bg-white p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg font-extrabold text-brand-800">{dict.brand}</span>
              <button onClick={() => setMenuOpen(false)} aria-label="close">
                <X size={22} />
              </button>
            </div>
            <div className="mb-4">
              <LanguageSwitcher />
            </div>
            <Link href={localePath(locale, "/account")} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 py-2.5 font-semibold text-neutral-800">
              <User size={18} /> {dict.nav.account}
            </Link>
            <div className="my-2 h-px bg-neutral-100" />
            <p className="py-1 text-xs font-bold uppercase text-neutral-400">{dict.nav.categories}</p>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`${localePath(locale, "/shop")}?category=${c.slug}`}
                onClick={() => setMenuOpen(false)}
                className="py-2 font-medium text-neutral-700"
              >
                {locale === "ar" ? c.nameAr : c.nameEn}
              </Link>
            ))}
            <div className="my-2 h-px bg-neutral-100" />
            {navLinks.map((l) => (
              <Link key={l.href} href={localePath(locale, l.href)} onClick={() => setMenuOpen(false)} className="py-2 font-semibold text-neutral-800">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
