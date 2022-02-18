import { modalDecorator } from '.storybook/decorators'
import { useEffect } from 'react'
import { VIEWPORT_ALL } from 'src/__tests__/config/storybook'
import { disableSVGAnimation } from 'src/__tests__/utils/disableAnimation'
import { isScreenshot } from 'storycap'
import { useMessageModal } from '.'

export default {
  title: 'parts/Modal/MessageModal',
  parameters: { screenshot: { variants: { ...VIEWPORT_ALL } } },
  decorators: [modalDecorator],
}

export const MesssageModal = () => {
  const { open, close } = useMessageModal()
  useEffect(() => {
    open({ title: 'Title', message: 'message' })
    return close
  }, [])
  return <></>
}

export const MesssageModalLoading = () => {
  const { open, close, isOpen } = useMessageModal()
  useEffect(() => {
    open({
      type: 'Loading',
      title: 'Loading...',
      message: 'Confirm the transaction.',
    })
    return close
  }, [])
  useEffect(() => {
    if (isScreenshot() && isOpen) disableSVGAnimation()
  }, [isOpen])
  return <></>
}

export const MesssageModalSuccess = () => {
  const { open, close } = useMessageModal()
  useEffect(() => {
    open({ type: 'Success', title: 'Success', message: 'Succeeded' })
    return close
  }, [])
  return <></>
}

export const MesssageModalAlert = () => {
  const { open, close } = useMessageModal()
  useEffect(() => {
    open({ type: 'Alert', title: 'Error', message: 'Something went wrong...' })
    return close
  }, [])
  return <></>
}
