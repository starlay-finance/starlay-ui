import { VFC } from 'react'
import { requireSupportedChain } from 'src/components/hoc/requireSupportedChain'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { AssetLabel } from 'src/components/parts/Modal/parts'
import { useLendingPool } from 'src/hooks/useLendingPool'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { useWallet } from 'src/hooks/useWallet'
import {
  loopingLeverageToLtv,
  significantLoopingCount,
} from 'src/utils/calculator'
import { LoopingModalBody, LoopingModalBodyProps } from './Body'

export const Looping: VFC<
  ModalContentProps<Omit<LoopingModalBodyProps, 'loop'>>
> = ({ close, ...props }) => {
  const { account, signer } = useWallet()
  const { loop } = useLendingPool(account, signer)
  const { asset } = props
  return (
    <DefaultModalContent
      headerNode={<AssetLabel asset={asset} />}
      bodyNode={
        <LoopingModalBody
          {...props}
          loop={(amount, leverage) =>
            loop(
              amount,
              asset.underlyingAsset,
              asset.vdTokenAddress,
              loopingLeverageToLtv(leverage),
              significantLoopingCount(leverage),
            )
          }
        />
      }
      closeModal={close}
    />
  )
}

export const useLoopingModal = () =>
  useModalDialog(requireSupportedChain(Looping))
