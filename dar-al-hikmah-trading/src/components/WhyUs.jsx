const reasons = [
  {
    icon: '🏆',
    title: 'Premium Quality Guarantee',
    desc: 'Every product undergoes strict quality checks before reaching your business. We only import from certified manufacturers.',
    stat: '100%',
    statLabel: 'Quality Checked',
  },
  {
    icon: '🤝',
    title: 'Trusted International Network',
    desc: 'Direct contracts with manufacturers in Turkey, Iraq, and UAE agencies eliminate middlemen and reduce costs.',
    stat: '4+',
    statLabel: 'Active Agencies',
  },
  {
    icon: '⚡',
    title: 'Fast & Reliable Delivery',
    desc: 'Streamlined import and logistics operations ensure timely delivery across the UAE and GCC markets.',
    stat: '24hr',
    statLabel: 'Local Delivery',
  },
  {
    icon: '💰',
    title: 'Competitive Wholesale Pricing',
    desc: 'Direct sourcing from manufacturers allows us to offer the best market prices for bulk and wholesale orders.',
    stat: '30%',
    statLabel: 'Cost Savings',
  },
  {
    icon: '📋',
    title: 'Compliance & Documentation',
    desc: 'Full compliance with UAE and GCC import regulations, complete documentation, and valid certifications.',
    stat: 'ISO',
    statLabel: 'Certified Partners',
  },
  {
    icon: '🌍',
    title: 'Regional Coverage',
    desc: 'Serving clients across the GCC — UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman.',
    stat: 'GCC',
    statLabel: 'Wide Coverage',
  },
]

const testimonials = [
  {
    name: 'Ahmed Al Rashidi',
    role: 'Restaurant Owner, Dubai',
    text: 'Dar Al Hikmah has been our trusted supplier for over 3 years. The quality is consistently excellent and delivery is always on time.',
    rating: 5,
  },
  {
    name: 'Fatima Hassan',
    role: 'Procurement Manager, Abu Dhabi',
    text: 'Best tomato paste and dairy supplier in the market. Competitive prices and professional team. Highly recommended.',
    rating: 5,
  },
  {
    name: 'Mohammad Karimi',
    role: 'Food Distributor, Sharjah',
    text: 'Their milk powder quality is outstanding — our clients love it. The bulk pricing makes it great for wholesale distribution.',
    rating: 5,
  },
]

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-pattern-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-900/6 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-900/8 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-yellow-500 text-sm font-semibold uppercase tracking-widest mb-3 block">Our Advantage</span>
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            <span className="text-white">Why Choose </span>
            <span className="text-gold-gradient">Dar Al Hikmah?</span>
          </h2>
          <div className="divider-gold w-32 mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We are committed to being your most reliable food trading partner in the region.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className="card-glass rounded-2xl p-6 group relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-yellow-900/10 to-transparent rounded-2xl" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-900/30 border border-yellow-700/30 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {r.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-gold-gradient">{r.stat}</div>
                    <div className="text-gray-500 text-xs">{r.statLabel}</div>
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{r.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-4">
          <h3 className="text-center text-2xl sm:text-3xl font-bold text-white mb-3">
            What Our <span className="text-gold-gradient">Clients Say</span>
          </h3>
          <div className="divider-gold w-24 mx-auto mb-10" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={t.name} className="card-glass rounded-2xl p-6">
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <span key={j} className="text-yellow-500 text-sm">★</span>
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed italic mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-700 to-yellow-900 flex items-center justify-center text-black font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
