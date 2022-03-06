import { VFC } from 'react'
import { requireSupportedChain } from 'src/components/hoc/requireSupportedChain'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { AssetLabel } from 'src/components/parts/Modal/parts'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { useWallet } from 'src/hooks/useWallet'
import { LoopingModalBody, LoopingModalBodyProps } from './Body'

export const Looping: VFC<ModalContentProps<LoopingModalBodyProps>> = ({
  close,
  ...props
}) => {
  const { account, signer } = useWallet()

  const { asset } = props
  return (
    <DefaultModalContent
      headerNode={<AssetLabel asset={asset} />}
      bodyNode={<LoopingModalBody {...props} />}
      closeModal={close}
    />
  )
}

export const useLoopingModal = () =>
  useModalDialog(requireSupportedChain(Looping))
