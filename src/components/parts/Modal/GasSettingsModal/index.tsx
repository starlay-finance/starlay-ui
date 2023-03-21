import { t } from '@lingui/macro'
import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { FC, useEffect, useState } from 'react'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { useRecentGasPrice } from 'src/hooks/useRecentGasPrice'
import { useStaticRPCProviderEVM } from 'src/hooks/useStaticRPCProviderEVM'
import { useWalletBalance } from 'src/hooks/useWalletBalance'
import { getNetworkConfig } from 'src/libs/config'
import { DEFAULT_CHAIN_ID } from 'src/utils/env'
import {
  getGasPriceMultiplier,
  getManualGasPrice,
  setGasPriceMultiplier,
  setManualGasPrice,
} from 'src/utils/localStorage'
import { GasSettingsModalBody } from './Body'

export const GasSettings: FC<ModalContentProps> = ({ close }) => {
  const { data } = useStaticRPCProviderEVM()
  const { baseAsset } = getNetworkConfig(data?.chainId || DEFAULT_CHAIN_ID)
  const { data: balance } = useWalletBalance()
  const multiplier = getGasPriceMultiplier()
  const manual = getManualGasPrice()
  const { getRecentGasPrice } = useRecentGasPrice()
  const [gasPrice, setGasPrice] = useState<BigNumber>()
  useEffect(() => {
    getRecentGasPrice().then((v) => setGasPrice(valueToBigNumber(v.toString())))
  }, [])

  return (
    <DefaultModalContent
      headerNode={t`Set Gas Fee`}
      bodyNode={
        <GasSettingsModalBody
          currentMultiplier={multiplier}
          currentManualValue={manual}
          inWallet={balance[baseAsset.symbol]}
          save={(multiplier, manual) => {
            setGasPriceMultiplier(multiplier)
            setManualGasPrice(manual)
            close()
          }}
          symbol={baseAsset.symbol}
          baseGasPrice={gasPrice}
        />
      }
      closeModal={close}
    />
  )
}

export const useGasSettingsModal = () => useModalDialog(GasSettings)
