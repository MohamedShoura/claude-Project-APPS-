import { Suspense } from "react";
import { ListingHeader } from "@/components/product/ListingHeader";
import { ProductListing } from "@/components/product/ProductListing";
import { listingMetadata } from "@/lib/pageMetadata";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return listingMetadata(params, "/best-sellers", "bestSellers");
}

export default function BestSellersPage() {
  return (
    <Suspense>
      <ListingHeader titleKey="bestSellers" />
      <ProductListing mode="best-sellers" />
    </Suspense>
  );
}
