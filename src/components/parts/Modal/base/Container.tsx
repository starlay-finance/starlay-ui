import { forwardRef, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { ModalContainerProps, ModalHandler } from 'src/hooks/useModal'
import { trueBlack } from 'src/styles/colors'
import { flexCenter } from 'src/styles/mixins'
import { Color } from 'src/styles/types'
import { disablePageScroll, enablePageScroll } from 'src/utils/handleScroll'
import { Z_MODAL } from 'src/utils/zIndex'
import styled, { css } from 'styled-components'
import {
  SwipeableContextProvider,
  SwipeableModalContainer,
} from './SwipeableModalContainer'

export const ResponsiveModalContainer = forwardRef<
  ModalHandler,
  ModalContainerProps
>((props, ref) => {
  useEffect(() => {
    if (props.isOpen) disablePageScroll()
    else enablePageScroll()
    return () => {
      enablePageScroll()
    }
  }, [props.isOpen])
  return (
    <SwipeableContextProvider>
      {isMobile ? (
        <SwipeableModalContainer {...props} ref={ref} />
      ) : (
        <DefaultModalContainer {...props} ref={ref} />
      )}
    </SwipeableContextProvider>
  )
})
export const DefaultModalContainer = forwardRef<
  ModalHandler,
  ModalContainerProps
>(({ isOpen, close, children }) => {
  return (
    <Overlay onClick={close} isOpen={isOpen}>
      <Contents onClick={(e) => e.stopPropagation()}>{children}</Contents>
    </Overlay>
  )
})
export const LoadingModalContainer = forwardRef<
  ModalHandler,
  ModalContainerProps
>(({ isOpen, children }) => {
  return (
    <LoadingOverlay isOpen={isOpen} bgColor={trueBlack}>
      <div>{children}</div>
    </LoadingOverlay>
  )
})

const Overlay = styled.div<{ isOpen: boolean; bgColor?: Color }>`
  ${flexCenter}
  position: fixed;
  inset: 0;
  overflow: hidden;
  background-color: ${trueBlack}8f;
  z-index: ${Z_MODAL};

  transition: all 0.2s ease-in;
  opacity: 1;
  visibility: visible;
  ${({ isOpen }) =>
    !isOpen &&
    css`
      opacity: 0;
      visibility: hidden;
    `};
`

const LoadingOverlay = styled(Overlay)`
  transition: all 0.2s ease-in;
  background-color: ${trueBlack};
`

const Contents = styled.div`
  max-width: 640px;
  max-height: 90vh;
  margin: 0 24px;
  width: 100%;
  position: relative;
  overflow: auto;
`
