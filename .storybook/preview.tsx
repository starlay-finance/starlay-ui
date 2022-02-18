import { initialize, mswDecorator } from 'msw-storybook-addon'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import * as NextImage from 'next/image'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '../src/locales'
import { VIEWPORTS } from '../src/__tests__/config/storybook'
import { globalDecorators } from './decorators'

initialize()

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => (
    <img
      className={props.className}
      src={props.src.startsWith('static') ? props.src : './mock.webp'}
      alt="mocked img"
      style={{
        objectFit: props.objectFit || 'cover',
        ...(props.layout === 'fill'
          ? {
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              height: '100%',
            }
          : {
              width: props.width,
              height: props.height,
            }),
      }}
    />
  ),
})

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider,
    path: '/',
    locale: DEFAULT_LOCALE,
    locales: SUPPORTED_LOCALES,
  },
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'Laptop',
    viewports: VIEWPORTS,
  },
}

export const decorators = [mswDecorator, ...globalDecorators]
