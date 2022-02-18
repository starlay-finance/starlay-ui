import {
  VIEWPORT_ALL,
  VIEWPORT_MOBILE_TABLET,
} from 'src/__tests__/config/storybook'
import { Sorry } from '.'

export default {
  title: 'screens/Sorry',
  parameters: {
    screenshot: {
      variants: { ...VIEWPORT_ALL, ...VIEWPORT_MOBILE_TABLET },
    },
  },
}

export { Sorry }
