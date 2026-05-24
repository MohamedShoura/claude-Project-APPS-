import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

export default function About() {
  const { lang, isAr } = useLanguage()
  const T = translations[lang].about

  return (
    <section id="about" className="py-24 bg-pattern-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-900/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-900/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-yellow-500 text-sm font-semibold uppercase tracking-widest mb-3 block">{T.sectionLabel}</span>
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            <span className="text-white">{T.title1}</span>
            <span className="text-gold-gradient">{T.title2}</span>
          </h2>
          <div className="divider-gold w-32 mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">{T.subtitle}</p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-16 items-center ${isAr ? 'direction-rtl' : ''}`}>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-yellow-800/30 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80" alt="Dar Al Hikmah Trading"
                className="w-full h-96 object-cover"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className={`absolute -bottom-6 ${isAr ? '-left-6' : '-right-6'} bg-black/90 border border-yellow-600/40 rounded-xl p-5 shadow-xl backdrop-blur-md`}>
              <div className="text-3xl font-black text-gold-gradient">10+</div>
              <div className="text-gray-400 text-sm">{T.yearsLabel}</div>
            </div>
            <div className={`absolute -top-6 ${isAr ? '-right-6' : '-left-6'} bg-black/90 border border-yellow-600/40 rounded-xl p-5 shadow-xl backdrop-blur-md`}>
              <div className="text-3xl font-black text-gold-gradient">4</div>
              <div className="text-gray-400 text-sm">{T.agenciesLabel}</div>
            </div>
          </div>

          <div className={isAr ? 'text-right' : ''}>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 leading-snug">
              {T.heading}
              <span className="text-gold-gradient">{T.headingGold}</span>
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">{T.p1}</p>
            <p className="text-gray-400 leading-relaxed mb-8">{T.p2}</p>
            <div className="grid grid-cols-2 gap-4">
              {T.values.map(v => (
                <div key={v.title} className="card-glass rounded-xl p-4">
                  <div className="text-2xl mb-2">{v.icon}</div>
                  <div className="text-white font-semibold text-sm mb-1">{v.title}</div>
                  <div className="text-gray-500 text-xs leading-relaxed">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
