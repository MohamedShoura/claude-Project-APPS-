import { useEffect, useState } from 'react'

const words = ['Quality', 'Excellence', 'Trust', 'Premium']

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    let timeout
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 120)
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 60)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setWordIdx((wordIdx + 1) % words.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, wordIdx])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

        {/* Green overlay accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/30 via-transparent to-transparent" />

        {/* Gold particle dots */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-yellow-500/20"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative ring */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10 hidden xl:block">
        <div className="w-full h-full rounded-full border border-yellow-500 animate-rotate-slow" />
        <div className="absolute inset-8 rounded-full border border-yellow-600" style={{ animation: 'rotateSlow 20s linear infinite reverse' }} />
        <div className="absolute inset-16 rounded-full border border-yellow-700" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-600/40 bg-yellow-950/30 backdrop-blur-sm mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
            <span className="text-yellow-400 text-sm font-medium tracking-widest uppercase">Premium Trading Company · UAE</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="text-white">Dar Al</span>{' '}
            <span className="text-gold-gradient">Hikmah</span>
            <br />
            <span className="text-white">Trading</span>
          </h1>

          {/* Typewriter line */}
          <div className="text-2xl sm:text-3xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="text-gray-300">Imported </span>
            <span className="text-yellow-400">{displayed}</span>
            <span className="cursor-blink text-yellow-400">|</span>
            <span className="text-gray-300"> & Trusted Partnerships</span>
          </div>

          {/* Subtitle */}
          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Your premier partner for imported food products, wholesale distribution, and commercial supply across the GCC region and beyond.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-14 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => scrollTo('quote')}
              className="btn-gold px-8 py-4 rounded-full text-base font-bold flex items-center gap-2 shadow-2xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Request a Quote
            </button>

            <a
              href="https://wa.me/97150000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base border border-green-500/50 bg-green-950/40 text-green-400 hover:bg-green-900/50 hover:border-green-400 transition-all duration-300 shadow-xl"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp Us
            </a>

            <button
              onClick={() => scrollTo('products')}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base border border-yellow-700/40 bg-transparent text-yellow-300 hover:bg-yellow-950/30 hover:border-yellow-500 transition-all duration-300"
            >
              View Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            {[
              { value: '500+', label: 'Products' },
              { value: '4', label: 'Partnerships' },
              { value: '10+', label: 'Years Experience' },
              { value: 'GCC', label: 'Coverage' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl font-black text-gold-gradient">{stat.value}</div>
                <div className="text-gray-400 text-xs uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="text-gray-500 text-xs uppercase tracking-widest">Scroll</div>
        <div className="w-px h-10 bg-gradient-to-b from-yellow-600 to-transparent"></div>
      </div>
    </section>
  )
}
