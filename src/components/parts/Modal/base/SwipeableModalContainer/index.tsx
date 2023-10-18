import { forwardRef, ReactNode, useEffect, useImperativeHandle } from 'react'
import { ModalContainerProps, ModalHandler } from 'src/hooks/useModal'
import { fontWeightBold } from 'src/styles/font'
import { breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'
import { useSwipeable, useSwipeableParams } from './useSwipeable'

export type SwipeableModalProps = ModalContainerProps &
  useSwipeableParams & {
    isOpen: boolean
    children: ReactNode
  }
export const SwipeableModalContainer = forwardRef<
  ModalHandler,
  SwipeableModalProps
>(({ children, isOpen, ...swipeableProps }, ref) => {
  const { open, onClose, Wrapper } = useSwipeable({ ...swipeableProps })
  useImperativeHandle(ref, () => ({ beforeClose: onClose }))
  useEffect(() => {
    if (isOpen) open()
  }, [open, isOpen])
  return (
    <Wrapper>
      <ModalDiv>{children}</ModalDiv>
    </Wrapper>
  )
})

const ModalDiv = styled.div`
  border-radius: 24px 24px 0 0;

  font-size: 16px;
  font-weight: ${fontWeightBold};
  letter-spacing: -0.024em;
  @media ${breakpoint.xl} {
    font-size: 20px;
  }
`
