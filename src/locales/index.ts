import { messages as messagesEn } from 'src/locales/en/messages.po'
import { messages as messagesJa } from 'src/locales/ja/messages.po'

export type Locale = typeof SUPPORTED_LOCALES[number]

export const SUPPORTED_LOCALES = ['en', 'ja'] as const

export const DEFAULT_LOCALE: Locale = 'en'

export const isSupportedLocale = (arg: any): arg is Locale =>
  SUPPORTED_LOCALES.includes(arg)

export const MESSAGES: Record<Locale, any> = {
  en: messagesEn,
  ja: messagesJa,
}

export const LOCALES_DICT: Record<Locale, string> = {
  en: 'English',
  ja: '日本語',
}
