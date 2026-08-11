import type { Customer, Coupon } from "./types";
import { orders } from "./orders";

const uniqueNames = Array.from(new Set(orders.map((o) => o.customerName)));

export const customers: Customer[] = uniqueNames.map((name, i) => {
  const custOrders = orders.filter((o) => o.customerName === name);
  return {
    id: `cust-${i + 1}`,
    name,
    phone: custOrders[0].mobile,
    email: custOrders[0].email ?? `customer${i + 1}@example.com`,
    ordersCount: custOrders.length,
    totalSpent: custOrders.reduce((s, o) => s + o.total, 0),
    lastPurchaseISO: custOrders[0].createdAtISO,
    joinedISO: new Date(Date.now() - (90 + i * 7) * 86400000).toISOString(),
  };
});

export const coupons: Coupon[] = [
  { code: "SAVE10", type: "percentage", value: 10, minOrder: 500, usageCount: 214, usageLimit: 1000, active: true, expiresISO: new Date(Date.now() + 20 * 86400000).toISOString() },
  { code: "WELCOME50", type: "fixed", value: 50, minOrder: 300, usageCount: 89, usageLimit: 500, active: true, expiresISO: new Date(Date.now() + 40 * 86400000).toISOString() },
  { code: "FREESHIP", type: "free_shipping", value: 0, minOrder: 800, usageCount: 340, usageLimit: 2000, active: true, expiresISO: new Date(Date.now() + 10 * 86400000).toISOString() },
  { code: "EID25", type: "percentage", value: 25, minOrder: 1000, usageCount: 12, usageLimit: 300, active: false, expiresISO: new Date(Date.now() - 5 * 86400000).toISOString() },
];
