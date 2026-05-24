import { en } from './en'
import { ar } from './ar'

export const translations = { en, ar }

export const t = (lang, path) => {
  const keys = path.split('.')
  let val = translations[lang]
  for (const k of keys) {
    val = val?.[k]
  }
  return val ?? path
}
