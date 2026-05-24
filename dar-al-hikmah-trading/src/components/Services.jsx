import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

export default function Services() {
  const { lang, isAr } = useLanguage()
  const T = translations[lang].services

  return (
    <section id="services" className="py-24 bg-section-green relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-900/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-900/10 rounded-full blur-3xl" />

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {T.items.map((svc) => (
            <div key={svc.title} className={`card-glass rounded-2xl p-6 sm:p-7 group ${isAr ? 'text-right' : ''}`}>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-900/40 to-yellow-950/20 border border-yellow-700/30 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {svc.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-3">{svc.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">{svc.desc}</p>
              <div className={`flex flex-wrap gap-2 ${isAr ? 'justify-end' : ''}`}>
                {svc.features.map(f => (
                  <span key={f} className="px-2.5 py-1 rounded-lg text-xs text-yellow-400 bg-yellow-900/20 border border-yellow-800/30">✓ {f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 relative overflow-hidden rounded-3xl">
          <img src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1400&q=80" alt="Warehouse"
            className="w-full h-64 object-cover" onError={(e) => { e.target.style.display = 'none' }} />
          <div className={`absolute inset-0 bg-gradient-to-r ${isAr ? 'from-transparent to-black/95' : 'from-black/95 via-black/80 to-transparent'} flex items-center`}>
            <div className={`px-8 sm:px-14 ${isAr ? 'mr-auto text-right' : ''}`}>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                {T.bannerTitle1}<span className="text-gold-gradient">{T.bannerTitle2}</span>
              </h3>
              <p className="text-gray-400 mb-6 max-w-md">{T.bannerText}</p>
              <button onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-gold px-8 py-3 rounded-full font-bold">
                {T.bannerBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
