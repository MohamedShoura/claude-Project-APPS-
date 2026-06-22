"use client";

import { useState } from "react";
import { products } from "@/lib/products";

const cartItems = [products[0], products[1], products[4]];

export default function CartPage() {
  const [delivery, setDelivery] = useState<"standard" | "express">("standard");
  const [payment, setPayment] = useState<"cod" | "card">("cod");

  const subtotal = cartItems.reduce((sum, p) => sum + p.price, 0);
  const deliveryFee = subtotal >= 200 ? 0 : delivery === "express" ? 25 : 15;
  const total = subtotal + deliveryFee;

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-8 py-16">
      <h1 className="font-serif text-4xl mb-10">Your Cart & Checkout</h1>

      <div className="grid md:grid-cols-[1.3fr_1fr] gap-12">
        <div>
          <h2 className="font-serif text-xl mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((p) => (
              <div key={p.id} className="flex items-center gap-4 bg-white border border-beige rounded-xl p-4">
                <div className="w-16 h-16 bg-blush/40 rounded-lg flex items-center justify-center text-3xl">{p.emoji}</div>
                <div className="flex-1">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-espresso/50">Qty: 1</p>
                </div>
                <span className="font-semibold">QAR {p.price}</span>
                <button className="text-espresso/40 hover:text-rose-gold text-sm">Remove</button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-2">
            <input placeholder="Discount code" className="flex-1 border border-beige rounded-lg px-4 py-2 text-sm" />
            <button className="border border-espresso rounded-lg px-4 py-2 text-sm hover:bg-beige">Apply</button>
          </div>

          <h2 className="font-serif text-xl mt-10 mb-4">Delivery</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 border border-beige rounded-lg p-4 cursor-pointer">
              <input type="radio" checked={delivery === "standard"} onChange={() => setDelivery("standard")} />
              <div>
                <p className="font-medium">Standard Delivery (1–3 days)</p>
                <p className="text-xs text-espresso/50">Across Qatar</p>
              </div>
            </label>
            <label className="flex items-center gap-3 border border-beige rounded-lg p-4 cursor-pointer">
              <input type="radio" checked={delivery === "express"} onChange={() => setDelivery("express")} />
              <div>
                <p className="font-medium">Express Same-Day (Doha only)</p>
                <p className="text-xs text-espresso/50">Order before 4 PM</p>
              </div>
            </label>
          </div>

          <h2 className="font-serif text-xl mt-10 mb-4">Payment</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 border border-beige rounded-lg p-4 cursor-pointer">
              <input type="radio" checked={payment === "cod"} onChange={() => setPayment("cod")} />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-3 border border-beige rounded-lg p-4 cursor-pointer">
              <input type="radio" checked={payment === "card"} onChange={() => setPayment("card")} />
              Credit/Debit Card · Apple Pay · Google Pay
            </label>
          </div>
        </div>

        <div className="bg-beige/40 rounded-2xl p-6 h-fit">
          <h2 className="font-serif text-xl mb-4">Total</h2>
          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>QAR {subtotal}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Delivery</span>
            <span>{deliveryFee === 0 ? "Free" : `QAR ${deliveryFee}`}</span>
          </div>
          <div className="border-t border-espresso/10 my-3" />
          <div className="flex justify-between font-semibold text-lg mb-6">
            <span>Total</span>
            <span>QAR {total}</span>
          </div>
          <button className="w-full bg-espresso text-ivory py-3 rounded-full hover:bg-rose-gold transition-colors">
            Place Order
          </button>
          <p className="text-xs text-espresso/50 mt-4 text-center">
            🔒 Secure Payment &nbsp;·&nbsp; 🚚 Fast Delivery &nbsp;·&nbsp; 💯 Authentic Guarantee
          </p>
        </div>
      </div>
    </div>
  );
}
