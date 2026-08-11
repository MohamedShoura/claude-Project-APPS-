import type { Metadata } from "next";
import { CartPage } from "@/components/cart/CartPage";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Cart() {
  return <CartPage />;
}
