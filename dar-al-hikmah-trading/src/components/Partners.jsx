const partners = [
  {
    name: 'Troina Company',
    location: 'Dubai, UAE',
    flag: '🇦🇪',
    type: 'Distribution Agency',
    desc: 'Strategic distribution partnership with Troina Company based in Dubai, UAE — expanding our reach across the Emirates and GCC markets.',
    color: 'from-blue-900/20 to-yellow-900/10',
    border: 'border-blue-700/30',
    icon: '🏢',
    highlights: ['Dubai-Based', 'GCC Distribution', 'Premium Products'],
  },
  {
    name: 'York Agro Company',
    location: 'Turkey',
    flag: '🇹🇷',
    type: 'Agricultural Products',
    desc: 'Exclusive agency with York Agro Company in Turkey, providing access to premium Turkish agricultural and food products for regional markets.',
    color: 'from-red-900/20 to-yellow-900/10',
    border: 'border-red-700/30',
    icon: '🌾',
    highlights: ['Turkish Origin', 'Agro Products', 'Direct Import'],
  },
  {
    name: 'Canon Dairy Factory',
    location: 'Iraq',
    flag: '🇮🇶',
    type: 'Dairy Manufacturing',
    desc: 'Formal supply contract with Canon Dairy Factory in Iraq, securing a reliable stream of premium dairy products and milk powder varieties.',
    color: 'from-green-900/20 to-yellow-900/10',
    border: 'border-green-700/30',
    icon: '🥛',
    highlights: ['Dairy Products', 'Milk Powder', 'Wholesale Supply'],
  },
  {
    name: 'Oxide Company',
    location: 'Iraq',
    flag: '🇮🇶',
    type: 'Food Trading',
    desc: 'Contractual partnership with Oxide Company in Iraq, enabling bulk procurement and distribution of diversified food commodities at scale.',
    color: 'from-purple-900/20 to-yellow-900/10',
    border: 'border-purple-700/30',
    icon: '🏭',
    highlights: ['Food Commodities', 'Bulk Supply', 'Long-term Contract'],
  },
]

export default function Partners() {
  return (
    <section id="partners" className="py-24 bg-pattern-dark relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-yellow-500 text-sm font-semibold uppercase tracking-widest mb-3 block">Global Network</span>
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            <span className="text-white">Our </span>
            <span className="text-gold-gradient">Agencies & Partnerships</span>
          </h2>
          <div className="divider-gold w-32 mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Strategic partnerships with leading manufacturers and distributors across the Middle East and beyond.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {partners.map((partner, i) => (
            <div
              key={partner.name}
              className={`rounded-2xl border ${partner.border} bg-gradient-to-br ${partner.color} p-6 sm:p-8 group hover:border-yellow-600/50 hover:shadow-2xl hover:shadow-yellow-900/10 transition-all duration-400 hover:-translate-y-1`}
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl bg-black/40 border border-yellow-700/30 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  {partner.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold text-lg">{partner.name}</h3>
                    <span className="text-xl">{partner.flag}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500 text-xs font-semibold uppercase tracking-wider">{partner.type}</span>
                    <span className="text-gray-600">·</span>
                    <span className="text-gray-400 text-xs">{partner.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-5">{partner.desc}</p>

              <div className="flex flex-wrap gap-2">
                {partner.highlights.map(h => (
                  <span
                    key={h}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-900/30 text-yellow-400 border border-yellow-800/40"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Partnership CTA */}
        <div className="text-center rounded-3xl border border-yellow-700/30 bg-gradient-to-r from-yellow-950/30 via-black to-green-950/20 p-10 sm:p-14">
          <div className="text-4xl mb-4">🌐</div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Interested in a{' '}
            <span className="text-gold-gradient">Partnership?</span>
          </h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            We are always open to new strategic partnerships with manufacturers, distributors, and agencies across the region.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gold px-10 py-4 rounded-full font-bold text-base inline-block"
          >
            Contact Our Team
          </button>
        </div>
      </div>
    </section>
  )
}
