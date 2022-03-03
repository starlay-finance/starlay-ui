import { i18n } from '@lingui/core'
import { I18nProvider as LinguijsProvider } from '@lingui/react'
import * as plurals from 'make-plural/plurals'
import { ReactNode, VFC } from 'react'
import { isSupportedLocale, MESSAGES, SUPPORTED_LOCALES } from 'src/locales'

export const I18nProvider: VFC<{
  children: ReactNode
}> = ({ children }) => {
  return <LinguijsProvider i18n={i18n}>{children}</LinguijsProvider>
}

export const load = async (locale: string) => {
  if (!isSupportedLocale(locale)) return
  const { messages } = await import(`src/locales/${locale}/messages.po`)
  i18n.load(locale, messages)
  i18n.activate(locale)
}

export const loadSync = (locale: string, messages: any) => {
  i18n.load(locale, messages)
  i18n.activate(locale)
}

SUPPORTED_LOCALES.forEach((locale) => {
  i18n.loadLocaleData(locale, { plurals: plurals[locale] })
  loadSync(locale, MESSAGES[locale])
})
