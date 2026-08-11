"use client";

import { Heart } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { useAuthStore } from "@/store/auth";
import { useWishlistStore } from "@/store/wishlist";
import { products } from "@/data/products";
import { AccountNav } from "@/components/account/AccountNav";
import { AuthForms } from "@/components/account/AuthForms";
import { ProductCard } from "@/components/product/ProductCard";

export function WishlistView() {
  const { locale, dict } = useLocale();
  const user = useAuthStore((s) => s.user);
  const ids = useWishlistStore((s) => s.productIds);
  const items = products.filter((p) => ids.includes(p.id));

  if (!user) return <AuthForms />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <AccountNav />
        <div className="flex-1">
          <h1 className="mb-6 text-2xl font-extrabold text-neutral-900">{dict.account.myWishlist}</h1>
          {items.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-neutral-200 py-16 text-center">
              <Heart size={40} className="text-neutral-200" />
              <p className="mt-3 text-neutral-500">{locale === "ar" ? "قائمة المفضلة فارغة" : "Your wishlist is empty"}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
