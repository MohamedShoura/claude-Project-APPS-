"use client";

import { useMemo } from "react";
import {
  DollarSign,
  ShoppingCart,
  Receipt,
  TrendingUp,
  UserPlus,
  Repeat,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useAdminStore } from "@/store/admin";
import { customers } from "@/data/customers";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { KpiCard } from "@/components/admin/KpiCard";

const COLORS = ["#0e7c66", "#c9a227", "#e4572e", "#3cb798", "#a87f1d"];

function fmt(n: number) {
  return `${Math.round(n).toLocaleString()} EGP`;
}

export function AdminOverview() {
  const orders = useAdminStore((s) => s.orders);
  const products = useAdminStore((s) => s.products);
  const coupons = useAdminStore((s) => s.coupons);

  const validOrders = useMemo(() => orders.filter((o) => o.status !== "cancelled" && o.status !== "returned"), [orders]);

  const totalRevenue = validOrders.reduce((s, o) => s + o.total, 0);
  const orderCount = orders.length;
  const aov = orderCount ? totalRevenue / validOrders.length : 0;
  const newCustomers = customers.filter((c) => c.ordersCount === 1).length;
  const returningCustomers = customers.filter((c) => c.ordersCount > 1).length;

  const revenueByDay = useMemo(() => {
    const days: { label: string; revenue: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const label = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const revenue = validOrders
        .filter((o) => new Date(o.createdAtISO).toDateString() === date.toDateString())
        .reduce((s, o) => s + o.total, 0);
      days.push({ label, revenue });
    }
    return days;
  }, [validOrders]);

  const revenueByMonth = useMemo(() => {
    const months: { label: string; revenue: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const label = date.toLocaleDateString("en-US", { month: "short" });
      const revenue = validOrders
        .filter((o) => {
          const d = new Date(o.createdAtISO);
          return d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear();
        })
        .reduce((s, o) => s + o.total, 0);
      months.push({ label, revenue });
    }
    return months;
  }, [validOrders]);

  const bestSellingProducts = useMemo(() => {
    const qtyMap = new Map<string, number>();
    orders.forEach((o) => o.items.forEach((i) => qtyMap.set(i.productId, (qtyMap.get(i.productId) ?? 0) + i.qty)));
    return Array.from(qtyMap.entries())
      .map(([id, qty]) => ({ name: products.find((p) => p.id === id)?.nameEn ?? id, qty }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5);
  }, [orders, products]);

  const bestSellingCategories = useMemo(() => {
    const revMap = new Map<string, number>();
    orders.forEach((o) =>
      o.items.forEach((i) => {
        const category = products.find((p) => p.id === i.productId)?.category ?? "other";
        revMap.set(category, (revMap.get(category) ?? 0) + i.price * i.qty);
      })
    );
    return Array.from(revMap.entries()).map(([name, value]) => ({ name, value }));
  }, [orders, products]);

  const couponPerformance = [...coupons].sort((a, b) => b.usageCount - a.usageCount).slice(0, 5);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AdminPageHeader title="Overview" subtitle="Store performance at a glance" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard icon={DollarSign} label="Total Revenue" value={fmt(totalRevenue)} trend="12.4%" accent="brand" />
        <KpiCard icon={ShoppingCart} label="Orders" value={String(orderCount)} trend="8.1%" accent="gold" />
        <KpiCard icon={Receipt} label="Avg. Order Value" value={fmt(aov)} trend="3.2%" accent="cta" />
        <KpiCard icon={TrendingUp} label="Conversion Rate" value="3.8%" trend="0.6%" accent="brand" />
        <KpiCard icon={UserPlus} label="New Customers" value={String(newCustomers)} trend="15%" accent="gold" />
        <KpiCard icon={Repeat} label="Returning Customers" value={String(returningCustomers)} trend="4%" accent="cta" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <h3 className="mb-4 text-sm font-bold text-neutral-800">Revenue — Last 14 Days</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={revenueByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} interval={2} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value) => fmt(Number(value))} />
              <Line type="monotone" dataKey="revenue" stroke="#0e7c66" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <h3 className="mb-4 text-sm font-bold text-neutral-800">Revenue by Month</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value) => fmt(Number(value))} />
              <Bar dataKey="revenue" fill="#c9a227" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <h3 className="mb-4 text-sm font-bold text-neutral-800">Best-Selling Products</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={bestSellingProducts} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={140} />
              <Tooltip />
              <Bar dataKey="qty" fill="#0e7c66" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <h3 className="mb-4 text-sm font-bold text-neutral-800">Best-Selling Categories</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={bestSellingCategories}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={85}
                isAnimationActive={false}
                label={({ name }) => name}
              >
                {bestSellingCategories.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => fmt(Number(value))} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <h3 className="mb-1 text-sm font-bold text-neutral-800">Abandoned Carts</h3>
          <p className="mb-4 text-xs text-neutral-500">Carts started but not converted to orders</p>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-3xl font-extrabold text-neutral-900">37</p>
              <p className="text-xs text-neutral-500">This week</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-cta-600">18.4%</p>
              <p className="text-xs text-neutral-500">Recovery rate</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <h3 className="mb-4 text-sm font-bold text-neutral-800">Coupon Performance</h3>
          <div className="space-y-3">
            {couponPerformance.map((c) => (
              <div key={c.code}>
                <div className="mb-1 flex justify-between text-xs font-semibold text-neutral-600">
                  <span>{c.code}</span>
                  <span>
                    {c.usageCount}/{c.usageLimit}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full bg-brand-600"
                    style={{ width: `${Math.min(100, (c.usageCount / c.usageLimit) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
