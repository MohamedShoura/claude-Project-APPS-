"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/offers", label: "Offers" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [lang, setLang] = useState<"EN" | "AR">("EN");
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-espresso text-ivory text-xs sm:text-sm text-center py-2 px-4">
        ✨ Free delivery across Qatar on orders over QAR 200 &nbsp;|&nbsp; Cash on Delivery Available
      </div>
      <header className="sticky top-0 z-50 bg-ivory/95 backdrop-blur border-b border-beige">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-4">
          <button
            className="md:hidden text-espresso"
            aria-label="Open menu"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>

          <Link href="/" className="font-serif text-2xl sm:text-3xl tracking-wide text-espresso">
            Lumière <span className="text-rose-gold">Qatar</span>
          </Link>

          <nav className="hidden md:flex gap-8 text-sm font-medium">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-rose-gold transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-sm">
            <button
              onClick={() => setLang(lang === "EN" ? "AR" : "EN")}
              className="hidden sm:inline border border-espresso/30 rounded-full px-3 py-1 text-xs hover:bg-beige transition-colors"
            >
              {lang === "EN" ? "EN / عربي" : "عربي / EN"}
            </button>
            <span className="hidden sm:inline text-xs text-espresso/60">QAR</span>
            <Link href="#" aria-label="Wishlist" className="hover:text-rose-gold">♡</Link>
            <Link href="/cart" aria-label="Cart" className="hover:text-rose-gold">🛍</Link>
          </div>
        </div>

        {open && (
          <nav className="md:hidden flex flex-col gap-4 px-6 py-4 border-t border-beige text-sm font-medium">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
