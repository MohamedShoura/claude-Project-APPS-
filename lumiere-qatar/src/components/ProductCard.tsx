import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-white rounded-2xl border border-beige overflow-hidden hover:shadow-xl transition-shadow">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square bg-blush/40 flex items-center justify-center text-6xl">
          {product.emoji}
          {product.badge && (
            <span className="absolute top-3 left-3 bg-rose-gold text-white text-xs px-2 py-1 rounded-full">
              {product.badge}
            </span>
          )}
          <button
            aria-label="Add to wishlist"
            className="absolute top-3 right-3 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-white"
          >
            ♡
          </button>
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-espresso/50">{product.brand}</p>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-serif text-lg leading-snug mt-1 hover:text-rose-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 text-sm mt-1 text-espresso/70">
          <span>⭐ {product.rating}</span>
          <span className="text-espresso/40">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="font-semibold text-espresso">QAR {product.price}</span>
            {product.oldPrice && (
              <span className="text-espresso/40 text-sm line-through ml-2">QAR {product.oldPrice}</span>
            )}
          </div>
          <button className="bg-espresso text-ivory text-xs px-3 py-2 rounded-full hover:bg-rose-gold transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
