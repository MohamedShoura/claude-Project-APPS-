"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus } from "lucide-react";
import { useAdminStore } from "@/store/admin";
import { categories } from "@/data/categories";
import type { CategorySlug } from "@/data/types";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export function AdminProductForm() {
  const router = useRouter();
  const products = useAdminStore((s) => s.products);

  const [form, setForm] = useState({
    nameEn: "",
    nameAr: "",
    brand: "",
    category: "electronics" as CategorySlug,
    price: "",
    originalPrice: "",
    stock: "",
    sku: "",
    shortDescEn: "",
  });

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nameEn || !form.price || !form.sku) return;
    const id = `custom-${Date.now()}`;
    const image = `/img/categories/${form.category}.svg`;
    useAdminStore.setState({
      products: [
        {
          id,
          slug: form.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          sku: form.sku,
          brand: form.brand || "Neel Store",
          category: form.category,
          nameAr: form.nameAr || form.nameEn,
          nameEn: form.nameEn,
          shortDescAr: form.shortDescEn,
          shortDescEn: form.shortDescEn,
          descriptionAr: form.shortDescEn,
          descriptionEn: form.shortDescEn,
          specs: [],
          images: [image, image],
          price: Number(form.price),
          originalPrice: Number(form.originalPrice) || Number(form.price),
          rating: 0,
          reviewCount: 0,
          stock: Number(form.stock) || 0,
          isNew: true,
          isBestSeller: false,
          isFlashDeal: false,
          reviews: [],
          tags: [],
        },
        ...products,
      ],
    });
    router.push("/admin/products");
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AdminPageHeader title="Add Product" subtitle="Create a new product listing" />
      <form onSubmit={submit} className="max-w-2xl space-y-5">
        <div className="flex items-center gap-4 rounded-2xl border border-dashed border-neutral-300 p-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-neutral-100 text-neutral-400">
            <ImagePlus size={24} />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-700">Upload product images</p>
            <p className="text-xs text-neutral-400">A category placeholder will be used for this demo</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-bold text-neutral-500">Product Name (English)</label>
            <input value={form.nameEn} onChange={(e) => set("nameEn", e.target.value)} className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-neutral-500">Product Name (Arabic)</label>
            <input value={form.nameAr} onChange={(e) => set("nameAr", e.target.value)} dir="rtl" className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-neutral-500">Brand</label>
            <input value={form.brand} onChange={(e) => set("brand", e.target.value)} className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-neutral-500">Category</label>
            <select value={form.category} onChange={(e) => set("category", e.target.value as CategorySlug)} className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500">
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.nameEn}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-neutral-500">SKU</label>
            <input value={form.sku} onChange={(e) => set("sku", e.target.value)} className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-neutral-500">Stock Quantity</label>
            <input type="number" value={form.stock} onChange={(e) => set("stock", e.target.value)} className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-neutral-500">Sale Price (EGP)</label>
            <input type="number" value={form.price} onChange={(e) => set("price", e.target.value)} className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-neutral-500">Original Price (EGP)</label>
            <input type="number" value={form.originalPrice} onChange={(e) => set("originalPrice", e.target.value)} className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500" />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold text-neutral-500">Short Description</label>
          <textarea value={form.shortDescEn} onChange={(e) => set("shortDescEn", e.target.value)} rows={3} className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500" />
        </div>

        <button type="submit" className="rounded-xl bg-brand-700 px-6 py-3 text-sm font-bold text-white hover:bg-brand-800">
          Save Product
        </button>
      </form>
    </div>
  );
}
