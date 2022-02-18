import { modalDecorator } from '.storybook/decorators'
import { useEffect } from 'react'
import { VIEWPORT_ALL } from 'src/__tests__/config/storybook'
import { disableSVGAnimation } from 'src/__tests__/utils/disableAnimation'
import { isScreenshot } from 'storycap'
import { useLoadingModal } from '.'

export default {
  title: 'parts/Modal',
  parameters: { screenshot: { variants: { ...VIEWPORT_ALL } } },
  decorators: [modalDecorator],
}

export const LoadingModal = () => {
  const { open, isOpen, close } = useLoadingModal()
  useEffect(() => {
    open()
    return close
  }, [])
  useEffect(() => {
    if (isScreenshot() && isOpen) disableSVGAnimation()
  }, [isOpen])
  return <></>
}
