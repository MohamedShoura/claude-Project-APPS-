"use client";

import { useState } from "react";

export default function ProductActions({ productName }: { productName: string }) {
  const [added, setAdded] = useState(false);

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button
        onClick={() => setAdded(true)}
        className="bg-espresso text-ivory px-6 py-3 rounded-full hover:bg-rose-gold transition-colors"
      >
        {added ? "Added ✓" : "Add to Cart"}
      </button>
      <button className="border border-espresso px-6 py-3 rounded-full hover:bg-beige transition-colors">
        Buy Now
      </button>
      <a
        href={`https://wa.me/97400000000?text=${encodeURIComponent(`Hi! I'd like to order: ${productName}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="border border-[#25D366] text-[#1da851] px-6 py-3 rounded-full hover:bg-[#25D366]/10 transition-colors"
      >
        💬 Order via WhatsApp
      </a>
    </div>
  );
}
