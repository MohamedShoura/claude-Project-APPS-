"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/products";

const brands = Array.from(new Set(products.map((p) => p.brand)));

export default function ShopPage() {
  const [category, setCategory] = useState<string>("All");
  const [brand, setBrand] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState(500);
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (brand === "All" || p.brand === brand) &&
        p.price <= maxPrice
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, brand, maxPrice, sort]);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
      <h1 className="font-serif text-4xl mb-2">Shop All</h1>
      <p className="text-espresso/60 mb-8">{filtered.length} products</p>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10">
        {/* Filters */}
        <aside className="space-y-8">
          <div>
            <h3 className="font-semibold mb-3">Category</h3>
            <div className="flex flex-col gap-2 text-sm">
              <button onClick={() => setCategory("All")} className={category === "All" ? "text-rose-gold font-semibold" : ""}>
                All
              </button>
              {categories.map((c) => (
                <button key={c.name} onClick={() => setCategory(c.name)} className={category === c.name ? "text-rose-gold font-semibold" : ""}>
                  {c.emoji} {c.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Brand</h3>
            <div className="flex flex-col gap-2 text-sm">
              <button onClick={() => setBrand("All")} className={brand === "All" ? "text-rose-gold font-semibold" : ""}>
                All Brands
              </button>
              {brands.map((b) => (
                <button key={b} onClick={() => setBrand(b)} className={brand === b ? "text-rose-gold font-semibold" : ""}>
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Max Price: QAR {maxPrice}</h3>
            <input
              type="range"
              min={50}
              max={500}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-rose-gold"
            />
          </div>
        </aside>

        {/* Products */}
        <div>
          <div className="flex justify-end mb-6">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="border border-beige rounded-full px-4 py-2 text-sm"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full text-center text-espresso/50 py-12">No products match these filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
