import 'server-only'
 
const dictionaries = {
  en: () => import('@/locales/en/common.json').then((module) => module.default),
  bl: () => import('@/locales/bn/common.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: 'en' | 'bl') =>
  dictionaries[locale]()