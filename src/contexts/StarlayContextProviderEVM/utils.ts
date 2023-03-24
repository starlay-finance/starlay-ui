import { transactionType } from '@starlay-finance/contract-helpers'
import { valueToBigNumber } from '@starlay-finance/math-utils'
import { ethers } from 'ethers'
import { TxItem } from 'src/types/starlay'
import {
  getGasPriceMultiplier,
  getManualGasPrice,
} from 'src/utils/localStorage'
import { BN_ONE } from 'src/utils/number'

export const executeTx = async (
  item: TxItem<transactionType>,
  signer: ethers.Signer | undefined,
  recentGasPrice?: ethers.BigNumber,
) => {
  if (!signer) throw new Error('Unexpected state')
  const gasPrice = getMultipliedGasPrice(signer, recentGasPrice)
  const tx = await item.tx()
  const txPromise = await signer.sendTransaction({
    ...tx,
    value: tx.value ? ethers.BigNumber.from(tx.value) : undefined,
    gasPrice,
  })
  return { wait: () => txPromise.wait(1) }
}

export const getMultipliedGasPrice = async (
  signer: ethers.Signer,
  recentGasPrice?: ethers.BigNumber,
) => {
  const baseGasPrice = recentGasPrice || (await signer.getGasPrice())
  const gasPriceMultiplier = getGasPriceMultiplier()
  const manualGasPrice = getManualGasPrice()
  if (manualGasPrice) return ethers.BigNumber.from(+manualGasPrice * 10 ** 9)
  const gasPrice = valueToBigNumber(baseGasPrice.toString())
    .times(gasPriceMultiplier || BN_ONE)
    .toFixed(0)
  return ethers.BigNumber.from(gasPrice)
}
