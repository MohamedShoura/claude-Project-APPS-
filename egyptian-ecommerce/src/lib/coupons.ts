import { coupons } from "@/data/customers";
import type { Coupon } from "@/data/types";

export function validateCoupon(code: string, subtotal: number): { coupon: Coupon; discount: number } | null {
  const coupon = coupons.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
  if (!coupon) return null;
  if (!coupon.active) return null;
  if (new Date(coupon.expiresISO).getTime() < Date.now()) return null;
  if (coupon.minOrder && subtotal < coupon.minOrder) return null;

  let discount = 0;
  if (coupon.type === "percentage") discount = Math.round((subtotal * coupon.value) / 100);
  else if (coupon.type === "fixed") discount = Math.min(coupon.value, subtotal);
  else if (coupon.type === "free_shipping") discount = 0;

  return { coupon, discount };
}
