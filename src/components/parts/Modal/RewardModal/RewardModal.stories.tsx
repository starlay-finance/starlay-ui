import { modalDecorator } from '.storybook/decorators'
import { useEffect } from 'react'
import { VIEWPORT_ALL } from 'src/__tests__/config/storybook'
import { useRewardModal } from '.'

export default {
  title: 'parts/Modal',
  parameters: { screenshot: { variants: { ...VIEWPORT_ALL } } },
  decorators: [modalDecorator],
}

export const RewardModal = () => {
  const { open, close } = useRewardModal()
  useEffect(() => {
    open()
    return close
  }, [])
  return <></>
}
