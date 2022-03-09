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
  const { asset } = props
  const { deposit, withdraw } = useLendingPool(
    account,
    signer,
    asset.symbol,
    asset.priceInMarketReferenceCurrency,
  )

  return (
    <DefaultModalContent
      headerNode={<AssetLabel asset={asset} />}
      bodyNode={
        <DepositModalBody
          {...props}
          deposit={(amount) => deposit(amount, asset.underlyingAsset)}
          withdraw={(amount, all) =>
            withdraw(amount, asset.underlyingAsset, asset.lTokenAddress, all)
          }
        />
      }
      closeModal={close}
    />
  )
}

export const useDepositModal = () =>
  useModalDialog(requireSupportedChain(Deposit))
