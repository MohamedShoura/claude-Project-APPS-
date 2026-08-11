import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "../../globals.css";
import { AdminShell } from "@/components/admin/AdminShell";

const cairo = Cairo({
  subsets: ["latin"],
  variable: "--font-cairo",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: { default: "Admin Dashboard | Neel Store", template: "%s | Neel Admin" },
  description: "Neel Store admin dashboard",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={cairo.variable}>
      <body className="font-sans antialiased bg-neutral-50 text-neutral-900">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
