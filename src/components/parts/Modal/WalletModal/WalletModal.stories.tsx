import { modalDecorator } from '.storybook/decorators'
import { useEffect } from 'react'
import { VIEWPORT_ALL } from 'src/__tests__/config/storybook'
import { useWalletModal } from '.'

export default {
  title: 'parts/Modal',
  parameters: { screenshot: { variants: { ...VIEWPORT_ALL } } },
  decorators: [modalDecorator],
}

export const WalletModal = () => {
  const { open, close } = useWalletModal()
  useEffect(() => {
    open()
    return close
  }, [])
  return <></>
}
