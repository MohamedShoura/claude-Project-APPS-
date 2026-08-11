import { Suspense } from "react";
import { ListingHeader } from "@/components/product/ListingHeader";
import { ProductListing } from "@/components/product/ProductListing";
import { listingMetadata } from "@/lib/pageMetadata";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return listingMetadata(params, "/offers", "offers");
}

export default function OffersPage() {
  return (
    <Suspense>
      <ListingHeader titleKey="offers" />
      <ProductListing mode="offers" />
    </Suspense>
  );
}
