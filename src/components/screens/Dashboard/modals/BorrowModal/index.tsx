import { VFC } from 'react'
import { requireSupportedChain } from 'src/components/hoc/requireSupportedChain'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { AssetLabel } from 'src/components/parts/Modal/parts'
import { useLendingPool } from 'src/hooks/useLendingPool'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { useWallet } from 'src/hooks/useWallet'
import { BorrowModalBody, BorrowModalBodyProps } from './Body'

export const Borrow: VFC<
  ModalContentProps<Omit<BorrowModalBodyProps, 'borrow' | 'repay'>>
> = ({ close, ...props }) => {
  const { account, signer } = useWallet()
  const { asset } = props
  const { borrow, repay } = useLendingPool(
    account,
    signer,
    asset.symbol,
    asset.priceInMarketReferenceCurrency,
  )

  return (
    <DefaultModalContent
      headerNode={<AssetLabel asset={asset} />}
      bodyNode={
        <BorrowModalBody
          {...props}
          borrow={(amount) =>
            borrow(amount, asset.underlyingAsset, asset.vdTokenAddress)
          }
          repay={(amount, all) => repay(amount, asset.underlyingAsset, all)}
        />
      }
      closeModal={close}
    />
  )
}

export const useBorrowModal = () =>
  useModalDialog(requireSupportedChain(Borrow))
