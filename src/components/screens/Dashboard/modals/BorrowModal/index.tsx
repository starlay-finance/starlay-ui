import { FC } from 'react'
import { requireSupportedChain } from 'src/components/hoc/requireSupportedChain'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { AssetLabel } from 'src/components/parts/Modal/parts'
import { useLendingPool } from 'src/hooks/contracts/useLendingPool'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { useTracking } from 'src/hooks/useTracking'
import { useWallet } from 'src/hooks/useWallet'
import { BorrowModalBody, BorrowModalBodyProps } from './Body'

export const Borrow: FC<
  ModalContentProps<
    Omit<BorrowModalBodyProps, 'borrow' | 'repay'> & {
      openSuggestModal?: VoidFunction
    }
  >
> = ({ close, openSuggestModal, ...props }) => {
  const { account } = useWallet()
  const { borrow, repay } = useLendingPool(account)

  const { withTracking } = useTracking()
  const borrowWithTracking = withTracking('borrow', borrow)
  const repayWithTracking = withTracking('repay', repay)

  const { asset } = props
  return (
    <DefaultModalContent
      headerNode={<AssetLabel asset={asset} />}
      bodyNode={
        <BorrowModalBody
          {...props}
          borrow={(amount) =>
            borrowWithTracking({
              amount,
              pool: asset.pool,
              asset: asset.underlyingAsset,
              debt: asset.vdTokenAddress,
              onSucceeded: openSuggestModal,
            })
          }
          repay={(amount, all) =>
            repayWithTracking({
              amount,
              pool: asset.pool,
              asset: asset.underlyingAsset,
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
