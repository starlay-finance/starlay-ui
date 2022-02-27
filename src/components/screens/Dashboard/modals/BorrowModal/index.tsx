import { VFC } from 'react'
import { requireSupportedChain } from 'src/components/hoc/requireSupportedChain'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { AssetLabel } from 'src/components/parts/Modal/parts'
import { useLendingPool } from 'src/hooks/useLendingPool'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { useWallet } from 'src/hooks/useWallet'
import { BorrowModalBody, BorrowModalBodyProps } from './Body'

export const Borrow: VFC<
  ModalContentProps<
    Omit<BorrowModalBodyProps, 'borrow' | 'repay'> & {
      openSuggestModal: VoidFunction
    }
  >
> = ({ close, openSuggestModal, ...props }) => {
  const { account, signer } = useWallet()
  const { borrow, repay } = useLendingPool(account, signer)

  const { asset } = props
  return (
    <DefaultModalContent
      headerNode={<AssetLabel asset={asset} />}
      bodyNode={
        <BorrowModalBody
          {...props}
          borrow={(amount) =>
            borrow(
              amount,
              asset.underlyingAsset,
              asset.vdTokenAddress,
              openSuggestModal,
            )
          }
          repay={(amount) => repay(amount, asset.underlyingAsset)}
        />
      }
      closeModal={close}
    />
  )
}

export const useBorrowModal = () =>
  useModalDialog(requireSupportedChain(Borrow))
