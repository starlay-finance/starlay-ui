import { messages as messagesEn } from 'src/locales/en/messages.po'
import { messages as messagesId } from 'src/locales/id/messages.po'
import { messages as messagesJa } from 'src/locales/ja/messages.po'
import { messages as messagesKo } from 'src/locales/ko/messages.po'
import { messages as messagesTr } from 'src/locales/tr/messages.po'
import { messages as messagesVi } from 'src/locales/vi/messages.po'

export type Locale = typeof SUPPORTED_LOCALES[number]

export const SUPPORTED_LOCALES = ['en', 'id', 'ja', 'ko', 'tr', 'vi'] as const

export const DEFAULT_LOCALE: Locale = 'en'

export const isSupportedLocale = (arg: any): arg is Locale =>
  SUPPORTED_LOCALES.includes(arg)

export const MESSAGES: Record<Locale, any> = {
  en: messagesEn,
  id: messagesId,
  ja: messagesJa,
  ko: messagesKo,
  tr: messagesTr,
  vi: messagesVi,
}

export const LOCALES_DICT: Record<Locale, string> = {
  en: 'English',
  id: 'Indonesia',
  ja: '日本語',
  ko: '한국어',
  tr: 'Türkçe',
  vi: 'Tiếng Việt',
}
