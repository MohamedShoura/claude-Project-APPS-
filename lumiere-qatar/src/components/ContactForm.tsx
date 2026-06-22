"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-4 bg-white border border-beige rounded-2xl p-8"
    >
      <input required placeholder="Name" className="w-full border border-beige rounded-lg px-4 py-2 text-sm" />
      <input required type="email" placeholder="Email" className="w-full border border-beige rounded-lg px-4 py-2 text-sm" />
      <input placeholder="Order Number (optional)" className="w-full border border-beige rounded-lg px-4 py-2 text-sm" />
      <textarea required placeholder="Message" rows={4} className="w-full border border-beige rounded-lg px-4 py-2 text-sm" />
      <button type="submit" className="bg-espresso text-ivory px-6 py-3 rounded-full hover:bg-rose-gold transition-colors">
        {sent ? "Message Sent ✓" : "Send Message"}
      </button>
    </form>
  );
}
