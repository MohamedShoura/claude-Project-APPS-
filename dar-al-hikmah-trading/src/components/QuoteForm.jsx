import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

export default function QuoteForm() {
  const { lang, isAr } = useLanguage()
  const T = translations[lang].quote
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', product: '', quantity: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1500)
  }

  const inputClass = `w-full bg-white/5 border border-yellow-900/40 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm transition-all ${isAr ? 'text-right' : ''}`
  const labelClass = `text-gray-400 text-sm mb-2 block font-medium ${isAr ? 'text-right' : ''}`

  return (
    <section id="quote" className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #080e08 0%, #0a1a0a 40%, #0a0a0a 100%)' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-yellow-900/8 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center mb-14">
          <span className="text-yellow-500 text-sm font-semibold uppercase tracking-widest mb-3 block">{T.sectionLabel}</span>
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            <span className="text-white">{T.title1}</span>
            <span className="text-gold-gradient">{T.title2}</span>
          </h2>
          <div className="divider-gold w-32 mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-xl mx-auto">{T.subtitle}</p>
        </div>

        {submitted ? (
          <div className="card-glass rounded-3xl p-16 text-center">
            <div className="text-6xl mb-6 animate-float inline-block">✅</div>
            <h3 className="text-3xl font-black text-white mb-4">{T.successTitle}</h3>
            <p className="text-gray-400 text-lg mb-8">
              {T.successText} <span className="text-yellow-400">{form.name}</span>{T.successSub}
            </p>
            <button onClick={() => setSubmitted(false)} className="btn-gold px-8 py-3 rounded-full font-bold">{T.sendAnother}</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={`card-glass rounded-3xl p-6 sm:p-10 ${isAr ? 'text-right' : ''}`}>
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div><label className={labelClass}>{T.fields.name}</label>
                <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder={T.fields.namePh} className={inputClass} dir={isAr ? 'rtl' : 'ltr'} /></div>
              <div><label className={labelClass}>{T.fields.company}</label>
                <input type="text" name="company" value={form.company} onChange={handleChange} placeholder={T.fields.companyPh} className={inputClass} dir={isAr ? 'rtl' : 'ltr'} /></div>
              <div><label className={labelClass}>{T.fields.email}</label>
                <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder={T.fields.emailPh} className={inputClass} dir="ltr" /></div>
              <div><label className={labelClass}>{T.fields.phone}</label>
                <input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder={T.fields.phonePh} className={inputClass} dir="ltr" /></div>
              <div><label className={labelClass}>{T.fields.product}</label>
                <select name="product" required value={form.product} onChange={handleChange} className={`w-full bg-black/80 border border-yellow-900/40 rounded-xl px-4 py-3 text-white text-sm ${isAr ? 'text-right' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
                  <option value="" className="bg-black">{T.fields.productPh}</option>
                  {T.products.map(p => <option key={p} value={p} className="bg-black">{p}</option>)}
                </select></div>
              <div><label className={labelClass}>{T.fields.quantity}</label>
                <input type="text" name="quantity" value={form.quantity} onChange={handleChange} placeholder={T.fields.quantityPh} className={inputClass} dir={isAr ? 'rtl' : 'ltr'} /></div>
            </div>
            <div className="mb-6">
              <label className={labelClass}>{T.fields.notes}</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder={T.fields.notesPh}
                className={`w-full bg-white/5 border border-yellow-900/40 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm transition-all resize-none ${isAr ? 'text-right' : ''}`} dir={isAr ? 'rtl' : 'ltr'} />
            </div>
            <div className={`flex flex-col sm:flex-row gap-4 items-center ${isAr ? 'sm:flex-row-reverse' : ''}`}>
              <button type="submit" disabled={loading}
                className="btn-gold w-full sm:w-auto px-10 py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 disabled:opacity-70">
                {loading ? (
                  <><svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-25" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>{T.sending}</>
                ) : T.submit}
              </button>
              <a href="https://wa.me/97150000000" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-semibold transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                {T.whatsappText}
              </a>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
