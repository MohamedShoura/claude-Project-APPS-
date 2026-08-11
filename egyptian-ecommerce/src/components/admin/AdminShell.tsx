"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Boxes,
  Tag,
  FolderTree,
  Truck,
  CreditCard,
  Megaphone,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", icon: LayoutDashboard, label: "Overview" },
  { href: "/admin/products", icon: Package, label: "Products" },
  { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/admin/customers", icon: Users, label: "Customers" },
  { href: "/admin/inventory", icon: Boxes, label: "Inventory" },
  { href: "/admin/offers", icon: Tag, label: "Offers" },
  { href: "/admin/categories", icon: FolderTree, label: "Categories" },
  { href: "/admin/shipping", icon: Truck, label: "Shipping" },
  { href: "/admin/payments", icon: CreditCard, label: "Payments" },
  { href: "/admin/marketing", icon: Megaphone, label: "Marketing" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const SidebarContent = (
    <>
      <div className="flex items-center justify-between px-5 py-5">
        <Link href="/admin" className="text-lg font-extrabold text-white">
          Neel <span className="text-gold-400">Admin</span>
        </Link>
        <button onClick={() => setOpen(false)} className="text-white lg:hidden">
          <X size={20} />
        </button>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
                active ? "bg-brand-600 text-white" : "text-neutral-300 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={17} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3">
        <a
          href="/ar"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg border border-white/10 py-2.5 text-xs font-semibold text-neutral-300 hover:bg-white/5"
        >
          <ExternalLink size={14} />
          View Storefront
        </a>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen">
      <aside className="fixed inset-y-0 start-0 z-40 hidden w-64 flex-col bg-neutral-950 lg:flex">{SidebarContent}</aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 start-0 flex w-64 flex-col bg-neutral-950">{SidebarContent}</aside>
        </div>
      )}

      <div className="flex-1 lg:ps-64">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-neutral-200 bg-white px-4 py-3 lg:hidden">
          <button onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>
          <span className="font-extrabold text-brand-800">Neel Admin</span>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
