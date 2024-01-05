import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { FC } from 'react'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { useStaticRPCProviderEVM } from 'src/hooks/useStaticRPCProviderEVM'
import { useWalletBalance } from 'src/hooks/useWalletBalance'
import { getNetworkConfigEVM } from 'src/libs/config'
import { DEFAULT_CHAIN_ID } from 'src/utils/env'
import { GasSettingsModalBody } from './Body'

export const GasSettings: FC<ModalContentProps> = ({ close }) => {
  const { data } = useStaticRPCProviderEVM()
  const { baseAsset } = getNetworkConfigEVM(data?.chainId || DEFAULT_CHAIN_ID)
  const { data: balance } = useWalletBalance()

  return (
    <DefaultModalContent
      headerNode={t`Set Gas Fee`}
      bodyNode={
        <GasSettingsModalBody
          currentMultiplier={new BigNumber(0)}
          currentManualValue={new BigNumber(0)}
          inWallet={balance[baseAsset.symbol]}
          save={(multiplier, manual) => {
            close()
          }}
          symbol={baseAsset.symbol}
        />
      }
      closeModal={close}
    />
  )
}

export const useGasSettingsModal = () => useModalDialog(GasSettings)
