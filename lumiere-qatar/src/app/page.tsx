import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/products";

export default function Home() {
  const bestSellers = products.filter((p) => p.badge === "Best Seller");
  const newArrivals = products.filter((p) => p.badge === "New");
  const featured = products.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blush/60 to-ivory">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-28 text-center">
          <h1 className="font-serif text-4xl sm:text-6xl leading-tight text-espresso">
            Where Luxury Meets <br /> Your Daily Glow
          </h1>
          <p className="mt-6 text-lg text-espresso/70 max-w-xl mx-auto">
            Discover premium makeup, skincare, and fragrance — curated for the women of Qatar.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/shop" className="bg-espresso text-ivory px-8 py-3 rounded-full hover:bg-rose-gold transition-colors">
              Shop Now
            </Link>
            <Link href="/offers" className="border border-espresso text-espresso px-8 py-3 rounded-full hover:bg-beige transition-colors">
              Explore Bundles
            </Link>
          </div>
        </div>
      </section>

      {/* Luxury banner */}
      <section className="bg-espresso text-ivory text-center py-4 px-4 text-sm sm:text-base">
        <strong className="font-serif">Authentic. Elegant. Delivered to Your Door in Qatar.</strong>
        &nbsp;— 100% Genuine Products · Fast Doha & GCC Delivery · Trusted by Thousands
      </section>

      {/* Shop by category */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <h2 className="font-serif text-3xl text-center mb-10">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((c) => (
            <Link
              key={c.name}
              href={`/shop?category=${encodeURIComponent(c.name)}`}
              className="bg-white border border-beige rounded-2xl p-6 text-center hover:shadow-lg hover:border-rose-gold transition-all"
            >
              <div className="text-3xl mb-2">{c.emoji}</div>
              <p className="text-sm font-medium">{c.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <h2 className="font-serif text-3xl text-center mb-10">Editor&apos;s Picks</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Best sellers */}
      <section className="bg-beige/40 py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <h2 className="font-serif text-3xl text-center mb-10">Loved by Our Customers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <h2 className="font-serif text-3xl text-center mb-10">Fresh In: New Arrivals</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Special offers */}
      <section className="bg-rose-gold/10 py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="font-serif text-3xl mb-3">Glow Deals — Limited Time</h2>
          <p className="text-espresso/70 mb-8">Up to 30% off skincare sets &amp; beauty bundles this week only.</p>
          <Link href="/offers" className="bg-rose-gold text-white px-8 py-3 rounded-full inline-block hover:bg-espresso transition-colors">
            View All Offers
          </Link>
        </div>
      </section>

      {/* Why shop with us */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <h2 className="font-serif text-3xl text-center mb-10">Why Shop With Us</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            ["🚚", "Fast Delivery Across Qatar", "Same-day delivery in Doha"],
            ["💎", "100% Authentic Products", "Sourced directly from official brands"],
            ["💬", "WhatsApp Support", "Real human help, anytime"],
            ["🔒", "Secure & Easy Checkout", "Cash on Delivery & online payment"],
          ].map(([icon, title, desc]) => (
            <div key={title} className="p-4">
              <div className="text-3xl mb-2">{icon}</div>
              <p className="font-semibold">{title}</p>
              <p className="text-sm text-espresso/60 mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-beige/40 py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <h2 className="font-serif text-3xl text-center mb-10">What Our Customers Say</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              ["Fatima", "Doha", "Fast delivery and the products are 100% original. My new go-to beauty store in Qatar!"],
              ["Mariam", "Al Wakrah", "The bridal bundle was perfect for my big day. Beautiful packaging and amazing quality."],
              ["Aisha", "Al Khor", "WhatsApp support was so helpful with picking the right skincare for my skin type."],
            ].map(([name, city, review]) => (
              <div key={name} className="bg-white rounded-2xl p-6 border border-beige">
                <p className="text-rose-gold mb-2">⭐⭐⭐⭐⭐</p>
                <p className="text-sm text-espresso/80 italic">&ldquo;{review}&rdquo;</p>
                <p className="text-sm font-semibold mt-3">{name}, {city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <h2 className="font-serif text-3xl text-center mb-2">#LumiereGlow</h2>
        <p className="text-center text-espresso/60 mb-10">Tag us @LumiereQatar for a chance to be featured</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {["💄", "🌹", "🧴", "✨", "🪞", "💍"].map((e, i) => (
            <div key={i} className="aspect-square bg-blush/50 rounded-xl flex items-center justify-center text-4xl">
              {e}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-espresso text-ivory py-20 text-center">
        <h2 className="font-serif text-4xl mb-4">Your Glow-Up Starts Here.</h2>
        <p className="text-ivory/70 mb-8 max-w-lg mx-auto">
          Join thousands of women across Qatar discovering their new beauty favorites.
        </p>
        <Link href="/shop" className="bg-rose-gold text-white px-8 py-3 rounded-full inline-block hover:bg-blush hover:text-espresso transition-colors">
          Join &amp; Save 10% on Your First Order
        </Link>
      </section>
    </div>
  );
}
