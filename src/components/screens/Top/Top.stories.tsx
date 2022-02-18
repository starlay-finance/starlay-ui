import { TOP_PROPS } from 'src/__mocks__/top'
import { VIEWPORT_ALL } from 'src/__tests__/config/storybook'
import { Top } from '.'

export default {
  title: 'screens/Top',
  parameters: { screenshot: { variants: { ...VIEWPORT_ALL } } },
  args: TOP_PROPS,
}

export { Top }
