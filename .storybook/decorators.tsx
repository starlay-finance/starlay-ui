import { DecoratorFn } from '@storybook/react'
import { isScreenshot, withScreenshot } from 'storycap'
import { Middleware, SWRConfig, SWRResponse } from 'swr'
import { ModalPortal, MODAL_KEY_LOADING } from '../src/hooks/useModal'
import { I18nProvider, loadSync } from '../src/libs/i18n-provider'
import { GlobalStyles } from '../src/styles/global-styles'

export const createMockSWRDecorator =
  (targetKey: string | string[], value: any): DecoratorFn =>
  (Story) => {
    const mockMiddleWare: Middleware = (useSWRNext) => {
      return (key, fetcher, config) => {
        if (typeof key === 'string') {
          if (key === targetKey) return value
          return useSWRNext(key, fetcher, config)
        }
        if (Array.isArray(key) && Array.isArray(targetKey)) {
          if (key.join('') === targetKey.join('')) return value
          return useSWRNext(key, fetcher, config)
        }
        return useSWRNext(key, fetcher, config)
      }
    }

    return (
      <SWRConfig value={{ use: [mockMiddleWare] }}>
        <Story />
      </SWRConfig>
    )
  }

export const MOCK_SWR_RESPONSE: SWRResponse<any, any> = {
  data: undefined,
  error: undefined,
  isValidating: false,
  mutate: async () => {},
}

export const disableLoadingDecorator = createMockSWRDecorator(
  MODAL_KEY_LOADING,
  MOCK_SWR_RESPONSE,
)

const GlobalStylesDecorator: DecoratorFn = (Story) => {
  loadSync('ja')
  return (
    <>
      <GlobalStyles />
      {isScreenshot() && <link rel="stylesheet" href="noanimation.css" />}
      <body style={{ position: 'absolute', inset: 0 }}>
        <div id="__next">
          <I18nProvider>
            <Story />
          </I18nProvider>
        </div>
      </body>
    </>
  )
}

export const modalDecorator: DecoratorFn = (Story) => (
  <>
    <Story />
    <ModalPortal />
  </>
)

export const globalDecorators = [withScreenshot, GlobalStylesDecorator]
