import { VFC } from 'react'
import { requireSupportedChain } from 'src/components/hoc/requireSupportedChain'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { AssetLabel } from 'src/components/parts/Modal/parts'
import { useLendingPool } from 'src/hooks/useLendingPool'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { useTracking } from 'src/hooks/useTracking'
import { useWallet } from 'src/hooks/useWallet'
import { BorrowModalBody, BorrowModalBodyProps } from './Body'

export const Borrow: VFC<
  ModalContentProps<Omit<BorrowModalBodyProps, 'borrow' | 'repay'>>
> = ({ close, ...props }) => {
  const { account, signer } = useWallet()
  const { asset } = props
  const { borrow, repay } = useLendingPool(account, signer)
  const { withTracking } = useTracking()
  const borrowWithTracking = withTracking('borrow', borrow)
  const repayWithTracking = withTracking('repay', repay)

  return (
    <DefaultModalContent
      headerNode={<AssetLabel asset={asset} />}
      bodyNode={
        <BorrowModalBody
          {...props}
          borrow={(amount) =>
            borrowWithTracking({
              amount,
              underlyingAsset: asset.underlyingAsset,
              vdTokenAddress: asset.vdTokenAddress,
            })
          }
          repay={(amount, all) =>
            repayWithTracking({
              amount,
              underlyingAsset: asset.underlyingAsset,
              all,
            })
          }
        />
      }
      closeModal={close}
    />
  )
}

export const useBorrowModal = () =>
  useModalDialog(requireSupportedChain(Borrow))
