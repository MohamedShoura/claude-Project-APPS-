import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

export default function WhyUs() {
  const { lang, isAr } = useLanguage()
  const T = translations[lang].whyUs

  return (
    <section id="why-us" className="py-24 bg-pattern-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-900/6 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-900/8 rounded-full blur-3xl" />

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {T.reasons.map((r) => (
            <div key={r.title} className={`card-glass rounded-2xl p-6 group relative overflow-hidden ${isAr ? 'text-right' : ''}`}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-yellow-900/10 to-transparent rounded-2xl" />
              <div className="relative z-10">
                <div className={`flex items-start justify-between mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 rounded-xl bg-yellow-900/30 border border-yellow-700/30 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {r.icon}
                  </div>
                  <div className={isAr ? 'text-left' : 'text-right'}>
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

        <div className="mb-4">
          <h3 className="text-center text-2xl sm:text-3xl font-bold text-white mb-3">
            {T.testimonialTitle1}<span className="text-gold-gradient">{T.testimonialTitle2}</span>
          </h3>
          <div className="divider-gold w-24 mx-auto mb-10" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {T.testimonials.map((t) => (
            <div key={t.name} className={`card-glass rounded-2xl p-6 ${isAr ? 'text-right' : ''}`}>
              <div className={`flex gap-0.5 mb-4 ${isAr ? 'justify-end' : ''}`}>
                {[...Array(t.rating)].map((_, j) => (
                  <span key={j} className="text-yellow-500 text-sm">★</span>
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed italic mb-5">"{t.text}"</p>
              <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-700 to-yellow-900 flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                  {t.name[0]}
                </div>
                <div className={isAr ? 'text-right' : ''}>
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
