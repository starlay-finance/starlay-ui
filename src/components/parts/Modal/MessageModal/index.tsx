import { VFC } from 'react'
import { LoadingProtocolIcon } from 'src/components/parts/Loading/ProtocolIcon'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { attention, success } from 'src/styles/colors'
import { AnimatedAlert, AnimatedSuccess } from './icons'
import { MessageModalBase, MessageModalBaseProps } from './MessageModalBase'

type MessageType = 'Message' | 'Success' | 'Alert' | 'Loading'
type MessageModalProps = MessageModalBaseProps & {
  type?: MessageType
}
export const MessageModal: VFC<ModalContentProps<MessageModalProps>> = ({
  type = 'Message',
  ...props
}) => <MessageModalBase {...props} {...MESSAGE_TYPE_PROPS_DICT[type]} />

const MESSAGE_TYPE_PROPS_DICT: Record<
  MessageType,
  Partial<MessageModalBaseProps>
> = {
  Message: {},
  Success: {
    iconColor: success,
    messageDelay: 0.75,
    children: <AnimatedSuccess />,
  },
  Alert: {
    iconColor: attention,
    messageDelay: 0.4,
    children: <AnimatedAlert />,
  },
  Loading: {
    children: <LoadingProtocolIcon />,
  },
}

export const useMessageModal = () => useModalDialog(MessageModal)
