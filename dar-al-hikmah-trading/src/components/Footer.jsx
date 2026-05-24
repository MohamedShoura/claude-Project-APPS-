import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

export default function Footer() {
  const { lang, isAr } = useLanguage()
  const T = translations[lang].footer

  const scrollTo = (id) => {
    const sectionIds = {
      'Home': 'home', 'About': 'about', 'Products': 'products', 'Partners': 'partners',
      'Services': 'services', 'Why Us': 'why-us', 'Contact': 'contact',
      'الرئيسية': 'home', 'من نحن': 'about', 'المنتجات': 'products', 'الشراكات': 'partners',
      'الخدمات': 'services', 'لماذا نحن': 'why-us', 'اتصل بنا': 'contact',
    }
    document.getElementById(sectionIds[id] || id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden" style={{ background: '#060606' }}>
      <div className="divider-gold" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-yellow-900/8 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-8 relative z-10">
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 ${isAr ? 'text-right' : ''}`}>
          <div className="lg:col-span-1">
            <div className={`flex items-center gap-3 mb-5 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-600 flex-shrink-0">
                <img src="/logo.svg" alt="Logo" className="w-full h-full object-cover"
                  onError={(e) => { e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-yellow-600 to-yellow-900 flex items-center justify-center text-black font-black text-xs">DAH</div>' }} />
              </div>
              <div>
                <div className="text-gold-gradient font-bold text-sm">{isAr ? 'دار الحكمة' : 'Dar Al Hikmah'}</div>
                <div className="text-gray-500 text-xs">{isAr ? 'للتجارة ذ.م.م' : 'Trading LLC'}</div>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">{T.tagline}</p>
            <div className="text-yellow-700 text-xs font-semibold uppercase tracking-widest mb-2">{T.followUs}</div>
            <div className={`flex gap-3 ${isAr ? 'justify-end' : ''}`}>
              {['I', 'L', 'X'].map((s, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-lg border border-yellow-900/40 bg-yellow-950/20 flex items-center justify-center text-gray-500 hover:text-yellow-400 hover:border-yellow-600/60 transition-all text-xs font-bold">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-yellow-500 font-bold text-sm uppercase tracking-widest mb-5">{T.quickLinks}</h4>
            <ul className="space-y-2">
              {T.links.map(link => (
                <li key={link}>
                  <button onClick={() => scrollTo(link)}
                    className={`text-gray-500 hover:text-yellow-400 text-sm transition-colors flex items-center gap-2 group ${isAr ? 'flex-row-reverse w-full justify-end' : ''}`}>
                    <span className="w-1 h-1 rounded-full bg-yellow-700 group-hover:bg-yellow-500 transition-colors"></span>
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-yellow-500 font-bold text-sm uppercase tracking-widest mb-5">{T.products}</h4>
            <ul className="space-y-2">
              {T.productLinks.map(p => (
                <li key={p}>
                  <a href="#products"
                    className={`text-gray-500 hover:text-yellow-400 text-sm transition-colors flex items-center gap-2 group ${isAr ? 'flex-row-reverse justify-end' : ''}`}>
                    <span className="w-1 h-1 rounded-full bg-yellow-700 group-hover:bg-yellow-500 transition-colors"></span>
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-yellow-500 font-bold text-sm uppercase tracking-widest mb-5">{T.contactInfo}</h4>
            <ul className="space-y-4">
              {T.contactLines.map(item => (
                <li key={item.text} className={`flex gap-3 items-start ${isAr ? 'flex-row-reverse' : ''}`}>
                  <span className="text-base mt-0.5">{item.icon}</span>
                  <span className="text-gray-500 text-sm">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider-gold mb-6" />
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-600 text-xs ${isAr ? 'sm:flex-row-reverse' : ''}`}>
          <div>{T.copyright}</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-yellow-600 transition-colors">{T.privacy}</a>
            <a href="#" className="hover:text-yellow-600 transition-colors">{T.terms}</a>
          </div>
          <div className="text-yellow-900">{T.licensed}</div>
        </div>
      </div>
    </footer>
  )
}
