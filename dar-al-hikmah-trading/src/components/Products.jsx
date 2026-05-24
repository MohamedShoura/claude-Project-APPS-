import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

const emojis = ['🌾','🍅','☕','🍯','🧀','🥛','🐟','🫒','🍓']
const imgs = [
  'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80',
  'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&q=80',
  'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80',
  'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80',
  'https://images.unsplash.com/photo-1486297678162-eb2a19b0a318?w=600&q=80',
  'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=80',
  'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=600&q=80',
  'https://images.unsplash.com/photo-1612797292046-49ed83de0aaf?w=600&q=80',
  'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=600&q=80',
]

export default function Products() {
  const { lang, isAr } = useLanguage()
  const T = translations[lang].products
  const [activeCategory, setActiveCategory] = useState(0)

  const enCats = ['All', 'Staples', 'Dairy', 'Seafood', 'Specialty']
  const enItems = translations.en.products.items

  const filtered = activeCategory === 0
    ? T.items.map((item, i) => ({ ...item, emoji: emojis[i], img: imgs[i], enCat: enItems[i].category }))
    : T.items.map((item, i) => ({ ...item, emoji: emojis[i], img: imgs[i], enCat: enItems[i].category }))
      .filter((_, i) => enItems[i].category === enCats[activeCategory])

  return (
    <section id="products" className="py-24 bg-section-green relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-900/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-900/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-yellow-500 text-sm font-semibold uppercase tracking-widest mb-3 block">{T.sectionLabel}</span>
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            <span className="text-white">{T.title1}</span>
            <span className="text-gold-gradient">{T.title2}</span>
          </h2>
          <div className="divider-gold w-32 mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{T.subtitle}</p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {T.categories.map((cat, i) => (
            <button key={i} onClick={() => setActiveCategory(i)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === i ? 'btn-gold shadow-lg' : 'border border-yellow-800/40 text-gray-400 hover:border-yellow-600/60 hover:text-yellow-400 bg-transparent'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filtered.map((product, i) => (
            <div key={product.name} className="card-glass rounded-2xl overflow-hidden group">
              <div className="relative h-52 overflow-hidden">
                <img src={product.img} alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => { e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-950 to-green-950 text-6xl">${product.emoji}</div>` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-yellow-600/90 text-black">{product.badge}</span>
                <div className="absolute bottom-3 left-3 text-3xl">{product.emoji}</div>
              </div>
              <div className={`p-5 ${isAr ? 'text-right' : ''}`}>
                <h3 className="text-white font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{product.desc}</p>
                <div className={`flex items-center justify-between ${isAr ? 'flex-row-reverse' : ''}`}>
                  <span className="text-yellow-600 text-xs font-semibold uppercase tracking-wide">{product.category}</span>
                  <button className="text-yellow-400 text-sm font-semibold hover:text-yellow-300 flex items-center gap-1 transition-colors">
                    {T.inquire}
                    <svg className={`w-3 h-3 ${isAr ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Milk Powder Section */}
        <div className="rounded-3xl border border-yellow-700/30 bg-gradient-to-br from-yellow-950/20 to-black overflow-hidden">
          <div className="p-8 sm:p-12">
            <div className="text-center mb-12">
              <div className="text-5xl mb-4">🥛</div>
              <span className="text-yellow-500 text-sm font-semibold uppercase tracking-widest mb-3 block">{T.milkLabel}</span>
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-4">
                <span className="text-gold-gradient">{T.milkTitle1}</span>{T.milkTitle2}
              </h3>
              <p className="text-gray-400 max-w-xl mx-auto">{T.milkSubtitle}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {T.milkItems.map((item) => (
                <div key={item.size}
                  className={`bg-gradient-to-br from-yellow-900/20 to-black/40 border border-yellow-700/30 rounded-2xl p-6 text-center group hover:border-yellow-500/60 hover:shadow-xl hover:shadow-yellow-900/20 transition-all duration-400 ${isAr ? 'text-right' : ''}`}>
                  <div className="text-4xl mb-4 group-hover:animate-float inline-block">{item.icon}</div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-yellow-600/20 text-yellow-400 border border-yellow-700/40 mb-3">{item.badge}</span>
                  <h4 className="text-xl font-black text-white mb-3">{item.size}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  <button className="mt-5 w-full btn-gold py-2.5 rounded-xl text-sm font-bold">{T.getPrice}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
