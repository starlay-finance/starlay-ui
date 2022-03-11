import { VFC } from 'react'
import { requireSupportedChain } from 'src/components/hoc/requireSupportedChain'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { AssetLabel } from 'src/components/parts/Modal/parts'
import { useLendingPool } from 'src/hooks/useLendingPool'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { useTracking } from 'src/hooks/useTracking'
import { useWallet } from 'src/hooks/useWallet'
import { DepositModalBody, DepositModalBodyProps } from './Body'

export const Deposit: VFC<
  ModalContentProps<Omit<DepositModalBodyProps, 'deposit' | 'withdraw'>>
> = ({ close, ...props }) => {
  const { account, signer } = useWallet()
  const { deposit, withdraw } = useLendingPool(account, signer)

  const { withTracking } = useTracking()
  const depositWithTracking = withTracking('deposit', deposit)
  const withdrawWithTracking = withTracking('withdraw', withdraw)

  const { asset } = props
  return (
    <DefaultModalContent
      headerNode={<AssetLabel asset={asset} />}
      bodyNode={
        <DepositModalBody
          {...props}
          deposit={(amount) =>
            depositWithTracking({
              amount,
              underlyingAsset: asset.underlyingAsset,
            })
          }
          withdraw={(amount, all) =>
            withdrawWithTracking({
              amount,
              underlyingAsset: asset.underlyingAsset,
              lTokenAddress: asset.lTokenAddress,
              all,
            })
          }
        />
      }
      closeModal={close}
    />
  )
}

export const useDepositModal = () =>
  useModalDialog(requireSupportedChain(Deposit))
