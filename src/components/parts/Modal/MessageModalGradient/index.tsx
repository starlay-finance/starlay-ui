import { t } from '@lingui/macro'
import { FC } from 'react'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { secondary } from 'src/styles/colors'
import { fontWeightHeavy, fontWeightRegular } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'
import { GradientModalContent } from '../base/Content/Gradient'

type MessageModalGradientProps = {
  title: string
  message: string
  closeLabel?: string
}
const MessageModalGradient: FC<ModalContentProps<MessageModalGradientProps>> =
  ({ title, message, close, closeLabel = t`Close` }) => (
    <MessageContent>
      <Title>{title}</Title>
      <Message>{message}</Message>
      <Button onClick={close}>{closeLabel}</Button>
    </MessageContent>
  )

const Title = styled.p`
  font-size: 32px;
  font-weight: ${fontWeightHeavy};
`
const Message = styled.p`
  font-size: 14px;
  font-weight: ${fontWeightRegular};
  line-height: 1.75;
  color: ${secondary};
`
const Button = styled.button`
  ${flexCenter};
  width: 240px;
  height: 44px;
  border-radius: 20px;
  backdrop-filter: blur(30px) brightness(1.15);
  background-color: rgba(255, 255, 255, 0.15);

  font-size: 14px;
  font-weight: ${fontWeightRegular};
`

const MessageContent = styled(GradientModalContent)`
  text-align: center;
  white-space: pre-wrap;
  ${Title} {
    margin-bottom: 16px;
  }
  ${Button} {
    margin: 56px auto 0;
  }
`

export const useMessageModalGradient = () =>
  useModalDialog(MessageModalGradient)
