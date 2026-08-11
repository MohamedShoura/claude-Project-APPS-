import type { Metadata } from "next";
import { OrdersView } from "@/components/account/OrdersView";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function OrdersPage() {
  return <OrdersView />;
}
