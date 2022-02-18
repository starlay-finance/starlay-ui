import { VFC } from 'react'
import { requireSupportedChain } from 'src/components/hoc/requireSupportedChain'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { AssetLabel } from 'src/components/parts/Modal/parts'
import { useLendingPool } from 'src/hooks/useLendingPool'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { useWallet } from 'src/hooks/useWallet'
import { DepositModalBody, DepositModalBodyProps } from './Body'

export const Deposit: VFC<
  ModalContentProps<Omit<DepositModalBodyProps, 'deposit' | 'withdraw'>>
> = ({ close, ...props }) => {
  const { account, signer } = useWallet()
  const { deposit, withdraw } = useLendingPool(account, signer)

  const { asset } = props
  return (
    <DefaultModalContent
      headerNode={<AssetLabel asset={asset} />}
      bodyNode={
        <DepositModalBody
          {...props}
          deposit={(amount) => deposit(amount, asset.underlyingAsset)}
          withdraw={(amount) =>
            withdraw(amount, asset.underlyingAsset, asset.lTokenAddress)
          }
        />
      }
      closeModal={close}
    />
  )
}

export const useDepositModal = () =>
  useModalDialog(requireSupportedChain(Deposit))
