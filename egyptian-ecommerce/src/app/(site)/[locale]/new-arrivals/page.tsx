import { Suspense } from "react";
import { ListingHeader } from "@/components/product/ListingHeader";
import { ProductListing } from "@/components/product/ProductListing";
import { listingMetadata } from "@/lib/pageMetadata";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return listingMetadata(params, "/new-arrivals", "newArrivals");
}

export default function NewArrivalsPage() {
  return (
    <Suspense>
      <ListingHeader titleKey="newArrivals" />
      <ProductListing mode="new-arrivals" />
    </Suspense>
  );
}
