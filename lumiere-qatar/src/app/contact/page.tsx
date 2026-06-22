import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-8 py-16">
      <h1 className="font-serif text-4xl text-center mb-12">We&apos;re Here to Help</h1>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <a href="https://wa.me/97400000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg hover:text-rose-gold">
            💬 WhatsApp: +974 0000 0000
          </a>
          <a href="https://instagram.com/LumiereQatar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg hover:text-rose-gold">
            📷 @LumiereQatar
          </a>
          <a href="mailto:support@lumiereqatar.com" className="flex items-center gap-3 text-lg hover:text-rose-gold">
            ✉️ support@lumiereqatar.com
          </a>
          <p className="flex items-center gap-3 text-lg">📍 Doha, Qatar</p>

          <div className="mt-10">
            <h2 className="font-serif text-2xl mb-3">FAQ</h2>
            <details className="border-b border-beige py-3">
              <summary className="cursor-pointer font-medium">How long does delivery take?</summary>
              <p className="text-sm text-espresso/70 mt-2">1–3 business days across Qatar, same-day in Doha for orders before 4 PM.</p>
            </details>
            <details className="border-b border-beige py-3">
              <summary className="cursor-pointer font-medium">What payment methods are accepted?</summary>
              <p className="text-sm text-espresso/70 mt-2">Cash on Delivery, credit/debit cards, Apple Pay, and Google Pay.</p>
            </details>
            <details className="border-b border-beige py-3">
              <summary className="cursor-pointer font-medium">Can I return a product?</summary>
              <p className="text-sm text-espresso/70 mt-2">Yes, unopened products can be returned within 7 days of delivery.</p>
            </details>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
