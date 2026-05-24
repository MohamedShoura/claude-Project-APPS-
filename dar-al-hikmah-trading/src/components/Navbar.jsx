import { useState, useEffect } from 'react'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'products', label: 'Products' },
  { id: 'partners', label: 'Partners' },
  { id: 'services', label: 'Services' },
  { id: 'why-us', label: 'Why Us' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-glass py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('home')} className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-500 shadow-lg group-hover:scale-105 transition-transform">
            <img src="/logo.png" alt="Dar Al Hikmah" className="w-full h-full object-cover" onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-600 to-yellow-800 text-white font-bold text-sm">DAH</div>`
            }} />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-gold-gradient font-bold text-sm leading-tight">Dar Al Hikmah</div>
            <div className="text-gray-400 text-xs">Trading LLC</div>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="px-4 py-2 text-sm text-gray-300 hover:text-yellow-400 transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-600 to-yellow-400 group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => scrollTo('quote')}
            className="btn-gold px-5 py-2.5 rounded-full text-sm font-semibold"
          >
            Request Quote
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-yellow-500 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-yellow-500 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-yellow-500 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="nav-glass border-t border-yellow-900/30 px-4 py-4 flex flex-col gap-1">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-left px-4 py-3 text-gray-300 hover:text-yellow-400 hover:bg-yellow-950/30 rounded-lg transition-all"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('quote')}
            className="btn-gold mt-2 py-3 rounded-xl text-sm font-semibold"
          >
            Request Quote
          </button>
        </div>
      </div>
    </nav>
  )
}
