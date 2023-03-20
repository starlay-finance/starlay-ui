import { FC } from 'react'
import { requireSupportedChain } from 'src/components/hoc/requireSupportedChain'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { AssetLabel } from 'src/components/parts/Modal/parts'
import { useLendingPool } from 'src/hooks/contracts/useLendingPool'
import { useEVMWallet } from 'src/hooks/useEVMWallet'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { useTracking } from 'src/hooks/useTracking'
import { DepositModalBody, DepositModalBodyProps } from './Body'

export const Deposit: FC<
  ModalContentProps<Omit<DepositModalBodyProps, 'deposit' | 'withdraw'>>
> = ({ close, ...props }) => {
  const { account } = useEVMWallet()
  const { deposit, withdraw } = useLendingPool(account)

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
              pool: '', // TODO
              asset: asset.underlyingAsset,
            })
          }
          withdraw={(amount, all) =>
            withdrawWithTracking({
              amount,
              pool: '', // TODO
              asset: asset.underlyingAsset,
              collateral: asset.lTokenAddress,
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
