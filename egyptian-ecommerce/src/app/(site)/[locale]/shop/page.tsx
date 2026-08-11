import { Suspense } from "react";
import { ListingHeader } from "@/components/product/ListingHeader";
import { ProductListing } from "@/components/product/ProductListing";
import { listingMetadata } from "@/lib/pageMetadata";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return listingMetadata(params, "/shop", "shop");
}

export default function ShopPage() {
  return (
    <Suspense>
      <ListingHeader titleKey="shop" />
      <ProductListing mode="all" />
    </Suspense>
  );
}
