"use client";

import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, ShoppingCart, MessageCircle, Heart, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import type { Product } from "@/data/types";
import { useLocale } from "@/i18n/LocaleProvider";
import { localePath, cn } from "@/lib/utils";
import { formatPrice } from "@/i18n/format";
import { StarRating } from "@/components/shared/StarRating";
import { PriceBlock } from "@/components/shared/PriceBlock";
import { Gallery } from "@/components/product/Gallery";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useRecentlyViewedStore } from "@/store/recentlyViewed";
import { whatsappLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { useRouter } from "next/navigation";

export function ProductDetail({ product }: { product: Product }) {
  const { locale, dict } = useLocale();
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));
  const addRecentlyViewed = useRecentlyViewedStore((s) => s.add);

  const [qty, setQty] = useState(1);
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.variations?.forEach((v) => (initial[v.nameEn] = v.options[0].value));
    return initial;
  });

  useEffect(() => {
    addRecentlyViewed(product.id);
    trackEvent("view_item", { item_id: product.id, item_name: product.nameEn, price: product.price, currency: "EGP" });
  }, [product.id, product.nameEn, product.price, addRecentlyViewed]);

  const name = locale === "ar" ? product.nameAr : product.nameEn;
  const variationLabel = useMemo(
    () =>
      product.variations
        ?.map((v) => {
          const opt = v.options.find((o) => o.value === selected[v.nameEn]);
          return opt?.label;
        })
        .filter(Boolean)
        .join(" / "),
    [product.variations, selected]
  );

  const extraPrice = useMemo(() => {
    let extra = 0;
    product.variations?.forEach((v) => {
      const opt = v.options.find((o) => o.value === selected[v.nameEn]);
      if (opt?.extraPrice) extra += opt.extraPrice;
    });
    return extra;
  }, [product.variations, selected]);

  const finalPrice = product.price + extraPrice;
  const [productUrl, setProductUrl] = useState("");
  useEffect(() => {
    // Client-only value (window.location) — set after mount to avoid SSR/client mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProductUrl(window.location.href);
  }, []);

  function buildCartItem() {
    return {
      productId: product.id,
      slug: product.slug,
      nameAr: product.nameAr,
      nameEn: product.nameEn,
      image: product.images[0],
      price: finalPrice,
      originalPrice: product.originalPrice + extraPrice,
      variationLabel,
    };
  }

  function handleAddToCart() {
    addItem(buildCartItem(), qty);
    trackEvent("add_to_cart", { item_id: product.id, item_name: product.nameEn, price: finalPrice, quantity: qty, currency: "EGP" });
  }
  function handleBuyNow() {
    handleAddToCart();
    router.push(localePath(locale, "/checkout"));
  }

  const waMessage = dict.whatsappMsg(name, qty, formatPrice(finalPrice, locale), productUrl);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <Gallery images={product.images} alt={name} />

        <div>
          <span className="text-xs font-bold uppercase tracking-wide text-brand-600">{product.brand}</span>
          <h1 className="mt-1 text-2xl font-extrabold text-neutral-900 sm:text-3xl">{name}</h1>

          <div className="mt-2 flex items-center gap-2 text-sm">
            <StarRating rating={product.rating} size={16} />
            <span className="font-semibold text-neutral-700">{product.rating}</span>
            <span className="text-neutral-400">
              ({product.reviewCount} {dict.product.reviewsCount})
            </span>
          </div>

          <div className="mt-4 rounded-2xl bg-neutral-50 p-4">
            <PriceBlock price={finalPrice} originalPrice={product.originalPrice + extraPrice} size="lg" showSavings />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <span className="text-neutral-500">
              {dict.product.sku}: <span className="font-semibold text-neutral-700">{product.sku}</span>
            </span>
            <span
              className={cn(
                "font-semibold",
                product.stock === 0 ? "text-red-600" : product.stock <= 5 ? "text-cta-600" : "text-brand-600"
              )}
            >
              {product.stock === 0
                ? dict.product.outOfStock
                : product.stock <= 5
                ? `${dict.product.lowStock} — ${product.stock}`
                : dict.product.inStock}
            </span>
          </div>

          {product.variations?.map((v) => (
            <div key={v.nameEn} className="mt-5">
              <p className="mb-2 text-sm font-bold text-neutral-800">
                {locale === "ar" ? v.nameAr : v.nameEn}:{" "}
                <span className="font-normal text-neutral-500">
                  {v.options.find((o) => o.value === selected[v.nameEn])?.label}
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {v.options.map((opt) =>
                  opt.hex ? (
                    <button
                      key={opt.value}
                      onClick={() => setSelected((s) => ({ ...s, [v.nameEn]: opt.value }))}
                      className={cn(
                        "h-9 w-9 rounded-full border-2",
                        selected[v.nameEn] === opt.value ? "border-brand-600" : "border-transparent"
                      )}
                      style={{ backgroundColor: opt.hex }}
                      aria-label={opt.label}
                      title={opt.label}
                    />
                  ) : (
                    <button
                      key={opt.value}
                      onClick={() => setSelected((s) => ({ ...s, [v.nameEn]: opt.value }))}
                      className={cn(
                        "rounded-lg border px-3 py-1.5 text-sm font-semibold",
                        selected[v.nameEn] === opt.value
                          ? "border-brand-600 bg-brand-600 text-white"
                          : "border-neutral-200 text-neutral-700"
                      )}
                    >
                      {opt.label}
                      {opt.extraPrice ? ` (+${opt.extraPrice})` : ""}
                    </button>
                  )
                )}
              </div>
            </div>
          ))}

          <div className="mt-5 flex items-center gap-4">
            <p className="text-sm font-bold text-neutral-800">{dict.product.quantity}</p>
            <div className="flex items-center rounded-lg border border-neutral-200">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2.5 text-neutral-600 hover:text-brand-700">
                <Minus size={15} />
              </button>
              <span className="w-10 text-center text-sm font-bold">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))} className="p-2.5 text-neutral-600 hover:text-brand-700">
                <Plus size={15} />
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-700 py-3.5 text-sm font-extrabold text-white hover:bg-brand-800 disabled:bg-neutral-300"
            >
              <ShoppingCart size={17} />
              {dict.product.addToCart}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="flex-1 rounded-xl bg-cta-500 py-3.5 text-sm font-extrabold text-white hover:bg-cta-600 disabled:bg-neutral-300"
            >
              {dict.product.buyNow}
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="flex items-center justify-center rounded-xl border border-neutral-200 px-4 py-3.5 hover:bg-neutral-50"
              aria-label="wishlist"
            >
              <Heart size={19} className={isWishlisted ? "fill-cta-500 text-cta-500" : "text-neutral-600"} />
            </button>
          </div>

          <a
            href={whatsappLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", { item_id: product.id, item_name: product.nameEn })}
            className="mt-3 flex items-center justify-center gap-2 rounded-xl border-2 border-[#25D366] py-3 text-sm font-extrabold text-[#128C4A] hover:bg-[#25D366]/10"
          >
            <MessageCircle size={18} />
            {dict.product.whatsappOrder}
          </a>

          <div className="mt-6 grid grid-cols-3 gap-2 border-t border-neutral-100 pt-6 text-center text-xs text-neutral-500">
            <div className="flex flex-col items-center gap-1">
              <Truck size={18} className="text-brand-600" />
              {locale === "ar" ? "توصيل 2-5 أيام" : "2-5 day delivery"}
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw size={18} className="text-brand-600" />
              {locale === "ar" ? "استرجاع 14 يوم" : "14-day returns"}
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck size={18} className="text-brand-600" />
              {locale === "ar" ? "دفع آمن" : "Secure payment"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
