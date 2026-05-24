import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1200)
  }

  return (
    <section id="contact" className="py-24 bg-pattern-dark relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-yellow-900/8 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-yellow-500 text-sm font-semibold uppercase tracking-widest mb-3 block">Get In Touch</span>
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            <span className="text-white">Contact </span>
            <span className="text-gold-gradient">Our Team</span>
          </h2>
          <div className="divider-gold w-32 mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Reach out to discuss your supply needs, get a product catalog, or start a partnership discussion.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info Column */}
          <div>
            <div className="space-y-6 mb-10">
              {[
                {
                  icon: '📍',
                  title: 'Office Location',
                  lines: ['Dar Al Hikmah Trading LLC', 'Dubai, United Arab Emirates'],
                },
                {
                  icon: '📞',
                  title: 'Phone & WhatsApp',
                  lines: ['+971 50 000 0000', '+971 55 000 0000'],
                },
                {
                  icon: '📧',
                  title: 'Email Address',
                  lines: ['info@daralHikmah.ae', 'sales@daralhikmah.ae'],
                },
                {
                  icon: '🕒',
                  title: 'Business Hours',
                  lines: ['Mon–Fri: 8:00 AM – 6:00 PM', 'Sat: 9:00 AM – 2:00 PM'],
                },
              ].map(item => (
                <div key={item.title} className="card-glass rounded-xl p-5 flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-lg bg-yellow-900/30 border border-yellow-700/30 flex items-center justify-center text-xl flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-yellow-400 font-semibold text-sm mb-1">{item.title}</div>
                    {item.lines.map(line => (
                      <div key={line} className="text-gray-300 text-sm">{line}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Social / WhatsApp CTAs */}
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/97150000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-4 rounded-xl bg-green-900/30 border border-green-700/40 hover:bg-green-900/50 hover:border-green-500 transition-all group"
              >
                <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <div>
                  <div className="text-green-300 font-bold text-sm">Chat on WhatsApp</div>
                  <div className="text-green-600 text-xs">Instant response during business hours</div>
                </div>
                <svg className="w-4 h-4 text-green-600 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Form Column */}
          <div>
            {sent ? (
              <div className="card-glass rounded-3xl p-12 text-center">
                <div className="text-5xl mb-4">📨</div>
                <h3 className="text-2xl font-black text-white mb-3">Message Sent!</h3>
                <p className="text-gray-400 mb-6">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="btn-gold px-8 py-3 rounded-full font-bold">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-glass rounded-3xl p-6 sm:p-8">
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block uppercase tracking-wide">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full bg-white/5 border border-yellow-900/40 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block uppercase tracking-wide">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className="w-full bg-white/5 border border-yellow-900/40 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-gray-400 text-xs mb-1.5 block uppercase tracking-wide">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full bg-white/5 border border-yellow-900/40 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm"
                  />
                </div>
                <div className="mb-6">
                  <label className="text-gray-400 text-xs mb-1.5 block uppercase tracking-wide">Message *</label>
                  <textarea
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Your message..."
                    className="w-full bg-white/5 border border-yellow-900/40 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-25" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
