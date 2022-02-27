import { i18n } from '@lingui/core'
import { en } from 'make-plural/plurals'
import { messages } from 'src/locales/en/messages'

const locale = 'en'
i18n.loadLocaleData(locale, { plurals: en })

i18n.load(locale, messages)
i18n.activate(locale)
