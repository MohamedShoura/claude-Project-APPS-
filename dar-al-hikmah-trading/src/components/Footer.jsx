const quickLinks = ['Home', 'About', 'Products', 'Partners', 'Services', 'Why Us', 'Contact']
const products = ['Imported Rice', 'Tomato Paste', 'Coffee Beans', 'Cheese', 'Milk Powder', 'Frozen Fish', 'Olives', 'Honey']

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase().replace(' ', '-').replace('why us', 'why-us'))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden" style={{ background: '#060606' }}>
      {/* Top divider */}
      <div className="divider-gold" />

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-yellow-900/8 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-8 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-600">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-yellow-600 to-yellow-900 flex items-center justify-center text-black font-black text-xs">DAH</div>'
                  }}
                />
              </div>
              <div>
                <div className="text-gold-gradient font-bold text-sm">Dar Al Hikmah</div>
                <div className="text-gray-500 text-xs">Trading LLC</div>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Premium imported food products and trusted commercial trading solutions for the GCC region.
            </p>
            <div className="text-yellow-700 text-xs font-semibold uppercase tracking-widest mb-2">Follow Us</div>
            <div className="flex gap-3">
              {['Instagram', 'LinkedIn', 'X'].map(s => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-lg border border-yellow-900/40 bg-yellow-950/20 flex items-center justify-center text-gray-500 hover:text-yellow-400 hover:border-yellow-600/60 transition-all text-xs font-bold"
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-yellow-500 font-bold text-sm uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(link)}
                    className="text-gray-500 hover:text-yellow-400 text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-yellow-700 group-hover:bg-yellow-500 transition-colors"></span>
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-yellow-500 font-bold text-sm uppercase tracking-widest mb-5">Products</h4>
            <ul className="space-y-2">
              {products.map(p => (
                <li key={p}>
                  <a href="#products" className="text-gray-500 hover:text-yellow-400 text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-yellow-700 group-hover:bg-yellow-500 transition-colors"></span>
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-yellow-500 font-bold text-sm uppercase tracking-widest mb-5">Contact Info</h4>
            <ul className="space-y-4">
              {[
                { icon: '📍', text: 'Dubai, United Arab Emirates' },
                { icon: '📞', text: '+971 50 000 0000' },
                { icon: '📧', text: 'info@daralhikmah.ae' },
                { icon: '🕒', text: 'Mon–Sat: 8 AM – 6 PM' },
              ].map(item => (
                <li key={item.text} className="flex gap-3 items-start">
                  <span className="text-base mt-0.5">{item.icon}</span>
                  <span className="text-gray-500 text-sm">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="divider-gold mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-600 text-xs">
          <div>© 2025 Dar Al Hikmah Trading LLC. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-yellow-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-600 transition-colors">Terms of Service</a>
          </div>
          <div className="text-yellow-900">
            Dar Al Hikmah Trading · UAE Licensed Company
          </div>
        </div>
      </div>
    </footer>
  )
}
