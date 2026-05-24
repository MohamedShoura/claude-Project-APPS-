import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

export default function Navbar() {
  const { lang, toggleLang, isAr } = useLanguage()
  const T = translations[lang].nav
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { id: 'home', label: T.home },
    { id: 'about', label: T.about },
    { id: 'products', label: T.products },
    { id: 'partners', label: T.partners },
    { id: 'services', label: T.services },
    { id: 'why-us', label: T.whyUs },
    { id: 'contact', label: T.contact },
  ]

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-glass py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('home')} className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-500 shadow-lg group-hover:scale-105 transition-transform">
            <img src="/logo.svg" alt="Dar Al Hikmah" className="w-full h-full object-cover"
              onError={(e) => { e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-600 to-yellow-800 text-white font-bold text-sm">DAH</div>` }} />
          </div>
          <div className={`text-left hidden sm:block ${isAr ? 'text-right' : ''}`}>
            <div className="text-gold-gradient font-bold text-sm leading-tight">{isAr ? 'دار الحكمة' : 'Dar Al Hikmah'}</div>
            <div className="text-gray-400 text-xs">{isAr ? 'للتجارة ذ.م.م' : 'Trading LLC'}</div>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <button key={link.id} onClick={() => scrollTo(link.id)}
              className={`px-4 py-2 text-sm text-gray-300 hover:text-yellow-400 transition-colors duration-200 relative group ${isAr ? 'font-arabic' : ''}`}>
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-600 to-yellow-400 group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {/* Language Toggle */}
          <button onClick={toggleLang}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-700/40 hover:border-yellow-500 text-yellow-400 hover:text-yellow-300 text-sm font-semibold transition-all">
            <span className="text-base">{isAr ? '🇬🇧' : '🇸🇦'}</span>
            {isAr ? 'English' : 'العربية'}
          </button>
          <button onClick={() => scrollTo('quote')} className="btn-gold px-5 py-2.5 rounded-full text-sm font-semibold">
            {T.requestQuote}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <button onClick={toggleLang}
            className="text-yellow-400 text-sm font-semibold px-3 py-1.5 border border-yellow-700/40 rounded-full">
            {isAr ? 'EN' : 'ع'}
          </button>
          <button className="flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`block w-6 h-0.5 bg-yellow-500 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-yellow-500 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-yellow-500 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="nav-glass border-t border-yellow-900/30 px-4 py-4 flex flex-col gap-1">
          {navLinks.map(link => (
            <button key={link.id} onClick={() => scrollTo(link.id)}
              className={`text-left px-4 py-3 text-gray-300 hover:text-yellow-400 hover:bg-yellow-950/30 rounded-lg transition-all ${isAr ? 'text-right font-arabic' : ''}`}>
              {link.label}
            </button>
          ))}
          <button onClick={() => scrollTo('quote')} className="btn-gold mt-2 py-3 rounded-xl text-sm font-semibold">
            {T.requestQuote}
          </button>
        </div>
      </div>
    </nav>
  )
}
