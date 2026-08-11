import type { Metadata } from "next";
import { WishlistView } from "@/components/account/WishlistView";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function WishlistPage() {
  return <WishlistView />;
}
