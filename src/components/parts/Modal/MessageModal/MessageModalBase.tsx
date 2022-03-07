import { ReactNode, VFC } from 'react'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { ModalContentProps } from 'src/hooks/useModal'
import { fadeIn } from 'src/styles/animation'
import { flexCenter } from 'src/styles/mixins'
import { Color } from 'src/styles/types'
import styled, { css } from 'styled-components'

export type MessageModalBaseProps = {
  title: string
  message: string
  children?: ReactNode
  iconColor?: Color
  messageDelay?: number
}

export const MessageModalBase: VFC<ModalContentProps<MessageModalBaseProps>> =
  ({ close, title, ...props }) => (
    <DefaultModalContent
      headerNode={title}
      bodyNode={<Body {...props} />}
      closeModal={close}
    />
  )

const Body: VFC<Omit<MessageModalBaseProps, 'title'>> = ({
  message,
  iconColor,
  children,
  messageDelay,
}) => (
  <BodyDiv iconColor={iconColor} messageDelay={messageDelay}>
    {children}
    <p>{message}</p>
  </BodyDiv>
)

const BodyDiv = styled.div<{ iconColor?: Color; messageDelay?: number }>`
  ${flexCenter};
  flex-direction: column;
  row-gap: 24px;
  padding: 96px 48px;
  text-align: center;
  line-height: 1.5;
  p {
    ${({ messageDelay }) =>
      messageDelay &&
      css`
        opacity: 0;
        animation: ${fadeIn} 0.25s ${messageDelay}s forwards;
      `}
  }
  svg {
    ${({ iconColor }) =>
      iconColor &&
      css`
        color: ${iconColor};
      `}
  }
`
