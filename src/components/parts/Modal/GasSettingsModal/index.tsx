import { t } from '@lingui/macro'
import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { utils } from 'ethers'
import { useEffect, useState, VFC } from 'react'
import { DefaultModalContent } from 'src/components/parts/Modal/base'
import { ModalContentProps, useModalDialog } from 'src/hooks/useModal'
import { useStaticRPCProvider } from 'src/hooks/useStaticRPCProvider'
import { useWalletBalance } from 'src/hooks/useWalletBalance'
import { getNetworkConfig } from 'src/libs/config'
import { DEFAULT_CHAIN_ID } from 'src/utils/env'
import {
  getGasPriceMultiplier,
  setGasPriceMultiplier,
} from 'src/utils/localStorage'
import { GasSettingsModalBody } from './Body'

export const GasSettings: VFC<ModalContentProps> = ({ close }) => {
  const { data } = useStaticRPCProvider()
  const { baseAsset } = getNetworkConfig(data?.chainId || DEFAULT_CHAIN_ID)
  const { data: balance } = useWalletBalance()
  const current = getGasPriceMultiplier()
  const [baseGasPrice, setBaseGasPrice] = useState<BigNumber>()

  useEffect(() => {
    data?.provider
      .getGasPrice()
      .then((price) =>
        setBaseGasPrice(valueToBigNumber(utils.formatEther(price))),
      )
  }, [data?.provider])

  return (
    <DefaultModalContent
      headerNode={t`Gas Priority Fee`}
      bodyNode={
        <GasSettingsModalBody
          current={current}
          inWallet={balance[baseAsset.symbol]}
          save={(ratio) => {
            setGasPriceMultiplier(ratio)
            close()
          }}
          symbol={baseAsset.symbol}
          baseGasPrice={baseGasPrice}
        />
      }
      closeModal={close}
    />
  )
}

export const useGasSettingsModal = () => useModalDialog(GasSettings)
