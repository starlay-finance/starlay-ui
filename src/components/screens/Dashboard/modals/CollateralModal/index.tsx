import { FC } from 'react'
import { requireSupportedChain } from 'src/components/hoc/requireSupportedChain'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { AssetLabel } from 'src/components/parts/Modal/parts'
import { useLendingPool } from 'src/hooks/contracts/useLendingPool'
import { useEVMWallet } from 'src/hooks/useEVMWallet'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { CollateralModalBody, CollateralModalBodyProps } from './Body'

export const Collateral: FC<
  ModalContentProps<Omit<CollateralModalBodyProps, 'setUsageAsCollateral'>>
> = ({ close, ...props }) => {
  const { account, signer } = useEVMWallet()
  const { setUsageAsCollateral } = useLendingPool(account, signer)

  const { asset } = props
  return (
    <DefaultModalContent
      headerNode={<AssetLabel asset={asset} />}
      bodyNode={
        <CollateralModalBody
          {...props}
          setUsageAsCollateral={(enabled) =>
            setUsageAsCollateral(enabled, asset.underlyingAsset)
          }
        />
      }
      closeModal={close}
    />
  )
}

export const useCollateralModal = () =>
  useModalDialog(requireSupportedChain(Collateral))
