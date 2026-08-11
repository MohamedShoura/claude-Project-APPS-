import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchHeader } from "@/components/product/ListingHeader";
import { ProductListing } from "@/components/product/ProductListing";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function SearchPage() {
  return (
    <Suspense>
      <SearchHeader />
      <ProductListing mode="all" />
    </Suspense>
  );
}
