import Link from "next/link";
import WhatsAppButton from "./WhatsAppButton";

export default function Footer() {
  return (
    <footer className="bg-espresso text-ivory mt-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 grid grid-cols-1 sm:grid-cols-4 gap-10">
        <div>
          <h3 className="font-serif text-2xl mb-3">Lumière Qatar</h3>
          <p className="text-sm text-ivory/70">
            Radiance, redefined for Qatar. Luxury beauty, makeup, skincare and fragrance —
            delivered across Doha and Qatar.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-sm text-ivory/70">
            <li><Link href="/shop">All Products</Link></li>
            <li><Link href="/offers">Offers & Bundles</Link></li>
            <li><Link href="/shop">Best Sellers</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-ivory/70">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="#">Returns & Delivery</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Get in Touch</h4>
          <ul className="space-y-2 text-sm text-ivory/70">
            <li>📍 Doha, Qatar</li>
            <li>✉️ support@lumiereqatar.com</li>
            <li>📷 @LumiereQatar</li>
            <li>💬 WhatsApp: +974 0000 0000</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10 text-center text-xs text-ivory/50 py-4">
        © {new Date().getFullYear()} Lumière Qatar. All rights reserved.
      </div>
      <WhatsAppButton />
    </footer>
  );
}
