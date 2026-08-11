"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@/data/types";
import { useLocale } from "@/i18n/LocaleProvider";
import { localePath } from "@/lib/utils";
import { StarRating } from "@/components/shared/StarRating";
import { PriceBlock } from "@/components/shared/PriceBlock";
import { Badge } from "@/components/shared/Badge";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useRouter } from "next/navigation";

export function ProductCard({
  product,
  showBuyNow = false,
}: {
  product: Product;
  showBuyNow?: boolean;
}) {
  const { locale, dict } = useLocale();
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));
  const name = locale === "ar" ? product.nameAr : product.nameEn;
  const href = localePath(locale, `/product/${product.slug}`);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem({
      productId: product.id,
      slug: product.slug,
      nameAr: product.nameAr,
      nameEn: product.nameEn,
      image: product.images[0],
      price: product.price,
      originalPrice: product.originalPrice,
    });
  }

  function handleBuyNow(e: React.MouseEvent) {
    handleAddToCart(e);
    router.push(localePath(locale, "/checkout"));
  }

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <Link href={href} className="relative block aspect-square overflow-hidden bg-neutral-100">
        <Image
          src={product.images[0]}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute start-2 top-2 flex flex-col gap-1">
          {product.isNew && <Badge variant="brand">{dict.product.newBadge}</Badge>}
          {product.isBestSeller && <Badge variant="gold">{dict.bestSellers.badge}</Badge>}
          {product.originalPrice > product.price && (
            <Badge variant="cta">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </Badge>
          )}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          aria-label="wishlist"
          className="absolute end-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition-colors hover:bg-white"
        >
          <Heart size={16} className={isWishlisted ? "fill-cta-500 text-cta-500" : "text-neutral-500"} />
        </button>
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-0 inset-x-0 bg-cta-600/95 py-1 text-center text-[11px] font-bold text-white">
            {locale === "ar" ? `باقي ${product.stock} قطع فقط!` : `Only ${product.stock} left!`}
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded bg-white px-3 py-1 text-xs font-bold">{dict.product.outOfStock}</span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <span className="text-[11px] font-medium uppercase text-neutral-400">{product.brand}</span>
        <Link href={href} className="line-clamp-2 min-h-10 text-sm font-semibold text-neutral-800 hover:text-brand-700">
          {name}
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          <StarRating rating={product.rating} size={12} />
          <span>({product.reviewCount})</span>
        </div>
        <PriceBlock price={product.price} originalPrice={product.originalPrice} size="sm" className="mt-auto" />

        <div className="mt-2 flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-700 px-2 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
          >
            <ShoppingCart size={14} />
            {dict.product.addToCart}
          </button>
          {showBuyNow && (
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="flex-1 rounded-lg bg-cta-500 px-2 py-2 text-xs font-bold text-white transition-colors hover:bg-cta-600 disabled:cursor-not-allowed disabled:bg-neutral-300"
            >
              {dict.product.buyNow}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
