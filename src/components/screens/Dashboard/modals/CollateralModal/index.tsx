import { FC } from 'react'
import { requireSupportedChain } from 'src/components/hoc/requireSupportedChain'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { AssetLabel } from 'src/components/parts/Modal/parts'
import { useLendingPool } from 'src/hooks/contracts/useLendingPool'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { useWallet } from 'src/hooks/useWallet'
import { CollateralModalBody, CollateralModalBodyProps } from './Body'

export const Collateral: FC<
  ModalContentProps<Omit<CollateralModalBodyProps, 'setUsageAsCollateral'>>
> = ({ close, ...props }) => {
  const { account } = useWallet()
  const { setUsageAsCollateral } = useLendingPool(account)

  const { asset } = props
  return (
    <DefaultModalContent
      headerNode={<AssetLabel asset={asset} />}
      bodyNode={
        <CollateralModalBody
          {...props}
          setUsageAsCollateral={(enabled) =>
            setUsageAsCollateral({
              usageAsCollateral: enabled,
              asset: asset.underlyingAsset,
            })
          }
        />
      }
      closeModal={close}
    />
  )
}

export const useCollateralModal = () =>
  useModalDialog(requireSupportedChain(Collateral))
