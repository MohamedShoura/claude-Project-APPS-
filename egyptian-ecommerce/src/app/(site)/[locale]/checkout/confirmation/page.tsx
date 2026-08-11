import { Suspense } from "react";
import type { Metadata } from "next";
import { ConfirmationView } from "@/components/checkout/ConfirmationView";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ConfirmationPage() {
  return (
    <Suspense>
      <ConfirmationView />
    </Suspense>
  );
}
