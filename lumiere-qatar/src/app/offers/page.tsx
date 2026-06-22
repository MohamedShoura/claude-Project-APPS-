import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

const seasonal = [
  { emoji: "🌙", title: "Ramadan Radiance", desc: "Glow through Ramadan with up to 30% off skincare essentials." },
  { emoji: "🌙", title: "Eid Glam Edit", desc: "Eid-ready makeup sets, perfumes & gift boxes." },
  { emoji: "🇶🇦", title: "Qatar National Day Collection", desc: "Celebrate in style — exclusive maroon & gold beauty edits." },
];

export default function OffersPage() {
  const bundles = products.filter((p) => p.category === "Bundles & Sets" || p.oldPrice);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
      <h1 className="font-serif text-4xl text-center mb-2">Glow More, Spend Less</h1>
      <p className="text-center text-espresso/60 mb-12">Beauty bundles, seasonal collections & limited-time deals.</p>

      <section className="grid sm:grid-cols-3 gap-6 mb-16">
        {seasonal.map((s) => (
          <div key={s.title} className="bg-rose-gold/10 rounded-2xl p-6 text-center border border-rose-gold/20">
            <div className="text-4xl mb-3">{s.emoji}</div>
            <h3 className="font-serif text-xl mb-2">{s.title}</h3>
            <p className="text-sm text-espresso/70">{s.desc}</p>
          </div>
        ))}
      </section>

      <h2 className="font-serif text-2xl mb-6">Beauty Bundles & Limited-Time Discounts</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {bundles.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
