import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')

  useEffect(() => {
    const saved = localStorage.getItem('dah-lang') || 'en'
    setLang(saved)
    document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = saved
  }, [])

  const toggleLang = () => {
    const next = lang === 'en' ? 'ar' : 'en'
    setLang(next)
    localStorage.setItem('dah-lang', next)
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = next
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, isAr: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
