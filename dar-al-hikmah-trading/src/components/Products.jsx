import { useState } from 'react'

const categories = ['All', 'Staples', 'Dairy', 'Seafood', 'Specialty']

const products = [
  {
    name: 'Imported Rice',
    desc: 'Premium long-grain, basmati, and jasmine rice sourced from top global producers.',
    emoji: '🌾',
    img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80',
    category: 'Staples',
    badge: 'Best Seller',
  },
  {
    name: 'Tomato Paste',
    desc: 'Imported tomato paste available in all sizes — 70g, 135g, 400g, 800g cans & 10kg tins.',
    emoji: '🍅',
    img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&q=80',
    category: 'Staples',
    badge: 'All Sizes',
  },
  {
    name: 'Coffee Beans',
    desc: 'Carefully sourced premium Arabica & Robusta coffee beans for roasters and retailers.',
    emoji: '☕',
    img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80',
    category: 'Specialty',
    badge: 'Premium',
  },
  {
    name: 'Premium Honey',
    desc: 'Natural, pure honey sourced from trusted apiaries — Sidr, wildflower, and more.',
    emoji: '🍯',
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80',
    category: 'Specialty',
    badge: '100% Natural',
  },
  {
    name: 'Cheese',
    desc: 'A wide selection of imported cheeses for restaurants, hotels, and retail markets.',
    emoji: '🧀',
    img: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a318?w=600&q=80',
    category: 'Dairy',
    badge: 'Imported',
  },
  {
    name: 'Dairy Products',
    desc: 'Full range of imported dairy including butter, cream, yogurt, and specialty items.',
    emoji: '🥛',
    img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=80',
    category: 'Dairy',
    badge: 'Fresh Supply',
  },
  {
    name: 'Frozen Fish',
    desc: 'Premium imported frozen fish varieties including whole, fillets, and seafood mixes.',
    emoji: '🐟',
    img: 'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=600&q=80',
    category: 'Seafood',
    badge: 'IQF Frozen',
  },
  {
    name: 'Olives',
    desc: 'High-quality imported olives — green, black, and stuffed varieties in bulk.',
    emoji: '🫒',
    img: 'https://images.unsplash.com/photo-1612797292046-49ed83de0aaf?w=600&q=80',
    category: 'Specialty',
    badge: 'Mediterranean',
  },
  {
    name: 'Premium Jam',
    desc: 'Imported fruit jams in a variety of flavors, ideal for hospitality and retail.',
    emoji: '🍓',
    img: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=600&q=80',
    category: 'Specialty',
    badge: 'Assorted',
  },
]

const milkPowder = [
  { size: '25 KG Bags', icon: '🏭', desc: 'Industrial bulk packaging for factories, bakeries, and large distributors.', badge: 'Industrial' },
  { size: '10 KG Cans', icon: '🥫', desc: 'Mid-size premium cans ideal for catering companies and wholesale buyers.', badge: 'Commercial' },
  { size: '5 KG Cans', icon: '🥛', desc: 'Retail and restaurant-friendly packaging with premium quality milk powder.', badge: 'Retail' },
]

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory)

  return (
    <section id="products" className="py-24 bg-section-green relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-900/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-900/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-yellow-500 text-sm font-semibold uppercase tracking-widest mb-3 block">Our Portfolio</span>
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            <span className="text-white">Premium </span>
            <span className="text-gold-gradient">Products</span>
          </h2>
          <div className="divider-gold w-32 mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Carefully sourced imported food products for retail, hospitality, and wholesale distribution.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'btn-gold shadow-lg'
                  : 'border border-yellow-800/40 text-gray-400 hover:border-yellow-600/60 hover:text-yellow-400 bg-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filtered.map((product, i) => (
            <div
              key={product.name}
              className="card-glass rounded-2xl overflow-hidden group"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-950 to-green-950 text-6xl">${product.emoji}</div>`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-yellow-600/90 text-black">
                  {product.badge}
                </span>
                <div className="absolute bottom-3 left-3 text-3xl">{product.emoji}</div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-white font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{product.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-600 text-xs font-semibold uppercase tracking-wide">{product.category}</span>
                  <button className="text-yellow-400 text-sm font-semibold hover:text-yellow-300 flex items-center gap-1 transition-colors">
                    Inquire
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===== MILK POWDER SECTION ===== */}
        <div className="rounded-3xl border border-yellow-700/30 bg-gradient-to-br from-yellow-950/20 to-black overflow-hidden">
          <div className="p-8 sm:p-12">
            <div className="text-center mb-12">
              <div className="text-5xl mb-4">🥛</div>
              <span className="text-yellow-500 text-sm font-semibold uppercase tracking-widest mb-3 block">Featured Category</span>
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Milk Powder{' '}
                <span className="text-gold-gradient">Collection</span>
              </h3>
              <p className="text-gray-400 max-w-xl mx-auto">
                Premium imported milk powder available in multiple packaging options for all business scales.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {milkPowder.map((item, i) => (
                <div
                  key={item.size}
                  className="relative bg-gradient-to-br from-yellow-900/20 to-black/40 border border-yellow-700/30 rounded-2xl p-6 text-center group hover:border-yellow-500/60 hover:shadow-xl hover:shadow-yellow-900/20 transition-all duration-400"
                >
                  <div className="text-4xl mb-4 group-hover:animate-float inline-block">{item.icon}</div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-yellow-600/20 text-yellow-400 border border-yellow-700/40 mb-3">
                    {item.badge}
                  </span>
                  <h4 className="text-xl font-black text-white mb-3">{item.size}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  <button className="mt-5 w-full btn-gold py-2.5 rounded-xl text-sm font-bold">
                    Get Price
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
