const services = [
  {
    icon: '🏪',
    title: 'Wholesale Food Supply',
    desc: 'Bulk supply of imported food products at competitive wholesale prices for retailers and distributors.',
    features: ['Competitive Pricing', 'Bulk Orders', 'Flexible MOQs'],
  },
  {
    icon: '🍽️',
    title: 'Restaurant & Hotel Supply',
    desc: 'Specialized supply chains for the hospitality industry — restaurants, hotels, catering services.',
    features: ['Hospitality Grade', 'Regular Delivery', 'Custom Orders'],
  },
  {
    icon: '🚛',
    title: 'Distributor Solutions',
    desc: 'End-to-end supply partnership for regional distributors looking to expand their product portfolio.',
    features: ['Exclusive Territories', 'Marketing Support', 'Volume Discounts'],
  },
  {
    icon: '🌊',
    title: 'Import & Logistics',
    desc: 'Full import coordination including customs clearance, shipping management, and timely delivery.',
    features: ['Customs Clearance', 'Door Delivery', 'Cold Chain'],
  },
  {
    icon: '✈️',
    title: 'Direct Importing',
    desc: 'Direct sourcing from manufacturers for large buyers seeking better margins and product control.',
    features: ['Factory Direct', 'Origin Certificates', 'Quality Inspection'],
  },
  {
    icon: '📦',
    title: 'Private Labeling',
    desc: 'Custom branding and private labeling solutions for businesses wanting their own product lines.',
    features: ['Brand Design', 'Custom Packaging', 'MOQ Friendly'],
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-section-green relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-900/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-900/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-yellow-500 text-sm font-semibold uppercase tracking-widest mb-3 block">What We Offer</span>
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            <span className="text-white">Our </span>
            <span className="text-gold-gradient">Services</span>
          </h2>
          <div className="divider-gold w-32 mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive trading and supply solutions tailored for businesses of all sizes.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <div
              key={svc.title}
              className="card-glass rounded-2xl p-6 sm:p-7 group"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-900/40 to-yellow-950/20 border border-yellow-700/30 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {svc.icon}
              </div>

              <h3 className="text-white font-bold text-lg mb-3">{svc.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">{svc.desc}</p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2">
                {svc.features.map(f => (
                  <span
                    key={f}
                    className="px-2.5 py-1 rounded-lg text-xs text-yellow-400 bg-yellow-900/20 border border-yellow-800/30"
                  >
                    ✓ {f}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 relative overflow-hidden rounded-3xl">
          <img
            src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1400&q=80"
            alt="Warehouse"
            className="w-full h-64 object-cover"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent flex items-center">
            <div className="px-8 sm:px-14">
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                Need a Custom{' '}
                <span className="text-gold-gradient">Supply Solution?</span>
              </h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Our team will design a tailored supply and distribution plan for your business needs.
              </p>
              <button
                onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-gold px-8 py-3 rounded-full font-bold"
              >
                Request Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
