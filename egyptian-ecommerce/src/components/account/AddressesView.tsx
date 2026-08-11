"use client";

import { useState } from "react";
import { MapPin, Plus, Trash2 } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { useAuthStore } from "@/store/auth";
import { governorates } from "@/data/governorates";
import { AccountNav } from "@/components/account/AccountNav";
import { AuthForms } from "@/components/account/AuthForms";

export function AddressesView() {
  const { locale, dict } = useLocale();
  const user = useAuthStore((s) => s.user);
  const addresses = useAuthStore((s) => s.addresses);
  const addAddress = useAuthStore((s) => s.addAddress);
  const removeAddress = useAuthStore((s) => s.removeAddress);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ label: "", governorate: "", city: "", address: "", building: "", floor: "", apartment: "" });

  if (!user) return <AuthForms />;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.label || !form.governorate || !form.city || !form.address) return;
    addAddress(form);
    setForm({ label: "", governorate: "", city: "", address: "", building: "", floor: "", apartment: "" });
    setOpen(false);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <AccountNav />
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-extrabold text-neutral-900">{dict.account.myAddresses}</h1>
            <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-1.5 rounded-lg bg-brand-700 px-4 py-2 text-sm font-bold text-white hover:bg-brand-800">
              <Plus size={15} />
              {locale === "ar" ? "إضافة عنوان" : "Add Address"}
            </button>
          </div>

          {open && (
            <form onSubmit={submit} className="mb-6 grid gap-3 rounded-2xl border border-neutral-100 p-4 sm:grid-cols-2">
              <input placeholder={locale === "ar" ? "اسم العنوان (المنزل، العمل...)" : "Address label (Home, Work...)"} value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 sm:col-span-2" />
              <select value={form.governorate} onChange={(e) => setForm((f) => ({ ...f, governorate: e.target.value }))} className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500">
                <option value="">{dict.checkout.governorate}</option>
                {governorates.map((g) => (
                  <option key={g.nameEn} value={g.nameEn}>
                    {locale === "ar" ? g.nameAr : g.nameEn}
                  </option>
                ))}
              </select>
              <input placeholder={dict.checkout.city} value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500" />
              <input placeholder={dict.checkout.address} value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 sm:col-span-2" />
              <input placeholder={dict.checkout.building} value={form.building} onChange={(e) => setForm((f) => ({ ...f, building: e.target.value }))} className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500" />
              <input placeholder={dict.checkout.floor} value={form.floor} onChange={(e) => setForm((f) => ({ ...f, floor: e.target.value }))} className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500" />
              <button type="submit" className="rounded-lg bg-cta-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-cta-600 sm:col-span-2">
                {locale === "ar" ? "حفظ العنوان" : "Save Address"}
              </button>
            </form>
          )}

          {addresses.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-neutral-200 py-16 text-center">
              <MapPin size={40} className="text-neutral-200" />
              <p className="mt-3 text-neutral-500">{locale === "ar" ? "لا توجد عناوين محفوظة" : "No saved addresses"}</p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {addresses.map((a) => (
                <div key={a.id} className="flex items-start justify-between gap-3 rounded-2xl border border-neutral-100 p-4">
                  <div>
                    <p className="text-sm font-bold text-neutral-900">{a.label}</p>
                    <p className="mt-1 text-xs text-neutral-500">
                      {a.address}, {a.city}, {a.governorate}
                    </p>
                  </div>
                  <button onClick={() => removeAddress(a.id)} className="text-neutral-400 hover:text-cta-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
