export type Locale = typeof SUPPORTED_LOCALES[number]

export const SUPPORTED_LOCALES = ['en'] as const

export const DEFAULT_LOCALE: Locale = 'en'

export const isSupportedLocale = (arg: any): arg is Locale =>
  SUPPORTED_LOCALES.includes(arg)
