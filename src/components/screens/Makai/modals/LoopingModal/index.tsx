import { FC } from 'react'
import { requireSupportedChain } from 'src/components/hoc/requireSupportedChain'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { AssetLabel } from 'src/components/parts/Modal/parts'
import { useLeverager } from 'src/hooks/contracts/useLeverager'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { useTracking } from 'src/hooks/useTracking'
import { EthereumAddress } from 'src/types/web3'
import {
  loopingLeverageToLtv,
  significantLoopingCount,
} from 'src/utils/calculator'
import { LoopingModalBody, LoopingModalBodyProps } from './Body'

export const Looping: FC<
  ModalContentProps<Omit<LoopingModalBodyProps, 'loop' | 'close'>>
> = ({ close, ...props }) => {
  const { loop, closeLoop } = useLeverager()
  const { withTracking } = useTracking()
  const { asset } = props

  const loopWithTracking = withTracking('loop', loop)

  return (
    <DefaultModalContent
      headerNode={<AssetLabel asset={asset} />}
      bodyNode={
        <LoopingModalBody
          {...props}
          loop={(amount, leverage) =>
            loopWithTracking({
              amount,
              asset: asset.underlyingAsset as EthereumAddress,
              debtToken: asset.vdTokenAddress as EthereumAddress,
              borrowRatio: loopingLeverageToLtv(leverage),
              loopCount: significantLoopingCount(leverage),
            })
          }
          close={() =>
            closeLoop({
              underlyingAsset: asset.underlyingAsset as EthereumAddress,
              lToken: asset.lTokenAddress as EthereumAddress,
            })
          }
        />
      }
      closeModal={close}
    />
  )
}

export const useLoopingModal = () =>
  useModalDialog(requireSupportedChain(Looping))
