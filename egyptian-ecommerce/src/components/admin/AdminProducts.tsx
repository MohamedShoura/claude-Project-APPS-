"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Search, Trash2, Star, Sparkles, Zap } from "lucide-react";
import { useAdminStore } from "@/store/admin";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { cn } from "@/lib/utils";

export function AdminProducts() {
  const products = useAdminStore((s) => s.products);
  const updateStock = useAdminStore((s) => s.updateStock);
  const toggleProductFlag = useAdminStore((s) => s.toggleProductFlag);
  const deleteProduct = useAdminStore((s) => s.deleteProduct);
  const [query, setQuery] = useState("");

  const filtered = products.filter(
    (p) =>
      p.nameEn.toLowerCase().includes(query.toLowerCase()) ||
      p.sku.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AdminPageHeader
        title="Products"
        subtitle={`${products.length} products`}
        action={
          <Link href="/admin/products/new" className="flex items-center gap-1.5 rounded-lg bg-brand-700 px-4 py-2 text-sm font-bold text-white hover:bg-brand-800">
            <Plus size={16} />
            Add Product
          </Link>
        }
      />

      <div className="mb-4 relative max-w-sm">
        <Search size={16} className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, brand, SKU..."
          className="w-full rounded-lg border border-neutral-200 py-2 ps-9 pe-3 text-sm outline-none focus:border-brand-500"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 text-start text-xs font-bold uppercase text-neutral-400">
              <th className="px-4 py-3 text-start">Product</th>
              <th className="px-4 py-3 text-start">SKU</th>
              <th className="px-4 py-3 text-start">Price</th>
              <th className="px-4 py-3 text-start">Stock</th>
              <th className="px-4 py-3 text-start">Flags</th>
              <th className="px-4 py-3 text-start">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-neutral-50 last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                      <Image src={p.images[0]} alt="" fill sizes="40px" className="object-cover" />
                    </div>
                    <div>
                      <p className="line-clamp-1 max-w-48 font-semibold text-neutral-800">{p.nameEn}</p>
                      <p className="text-xs text-neutral-400">{p.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-neutral-500">{p.sku}</td>
                <td className="px-4 py-3 font-semibold text-neutral-800">{p.price.toLocaleString()} EGP</td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={p.stock}
                    onChange={(e) => updateStock(p.id, Math.max(0, Number(e.target.value)))}
                    className={cn(
                      "w-20 rounded-lg border px-2 py-1 text-sm",
                      p.stock === 0 ? "border-red-300 text-red-600" : p.stock <= 5 ? "border-cta-300 text-cta-600" : "border-neutral-200"
                    )}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button
                      onClick={() => toggleProductFlag(p.id, "isNew")}
                      title="New Arrival"
                      className={cn("rounded p-1.5", p.isNew ? "bg-brand-100 text-brand-700" : "bg-neutral-100 text-neutral-300")}
                    >
                      <Sparkles size={13} />
                    </button>
                    <button
                      onClick={() => toggleProductFlag(p.id, "isBestSeller")}
                      title="Best Seller"
                      className={cn("rounded p-1.5", p.isBestSeller ? "bg-gold-100 text-gold-700" : "bg-neutral-100 text-neutral-300")}
                    >
                      <Star size={13} />
                    </button>
                    <button
                      onClick={() => toggleProductFlag(p.id, "isFlashDeal")}
                      title="Flash Deal"
                      className={cn("rounded p-1.5", p.isFlashDeal ? "bg-cta-100 text-cta-700" : "bg-neutral-100 text-neutral-300")}
                    >
                      <Zap size={13} />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => deleteProduct(p.id)} className="text-neutral-400 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
