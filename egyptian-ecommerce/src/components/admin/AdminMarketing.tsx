"use client";

import { CheckCircle2 } from "lucide-react";
import { useAdminStore } from "@/store/admin";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

const TRACKED_EVENTS = [
  "View Product",
  "Add to Cart",
  "Initiate Checkout",
  "Purchase",
  "Search",
  "Lead (Newsletter)",
  "WhatsApp Click",
];

export function AdminMarketing() {
  const marketing = useAdminStore((s) => s.marketing);
  const setMarketing = useAdminStore((s) => s.setMarketing);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AdminPageHeader title="Marketing & Tracking" subtitle="Connect analytics and ad platforms to measure performance" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-4">
          <label className="mb-1 block text-xs font-bold text-neutral-500">Meta Pixel ID</label>
          <input
            value={marketing.metaPixelId}
            onChange={(e) => setMarketing({ metaPixelId: e.target.value })}
            placeholder="1234567890123456"
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-4">
          <label className="mb-1 block text-xs font-bold text-neutral-500">Google Analytics 4 ID</label>
          <input
            value={marketing.gaId}
            onChange={(e) => setMarketing({ gaId: e.target.value })}
            placeholder="G-XXXXXXXXXX"
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-4">
          <label className="mb-1 block text-xs font-bold text-neutral-500">Google Tag Manager ID</label>
          <input
            value={marketing.gtmId}
            onChange={(e) => setMarketing({ gtmId: e.target.value })}
            placeholder="GTM-XXXXXXX"
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-4">
          <label className="mb-1 block text-xs font-bold text-neutral-500">TikTok Pixel ID</label>
          <input
            value={marketing.tiktokPixelId}
            onChange={(e) => setMarketing({ tiktokPixelId: e.target.value })}
            placeholder="C4XXXXXXXXXXXXXXXXXX"
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
        </div>
      </div>

      <p className="mt-3 text-xs text-neutral-400">
        Once saved, tracking scripts load automatically across the storefront — no code changes required.
      </p>

      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4">
        <h3 className="mb-3 text-sm font-bold text-neutral-800">Events Tracked Automatically</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {TRACKED_EVENTS.map((e) => (
            <div key={e} className="flex items-center gap-2 text-sm text-neutral-600">
              <CheckCircle2 size={15} className="text-brand-600" />
              {e}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
