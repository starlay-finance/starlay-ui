import { transactionType } from '@starlay-finance/contract-helpers'
import { valueToBigNumber } from '@starlay-finance/math-utils'
import { serializeError } from 'eth-rpc-errors'
import { ethers } from 'ethers'
import { isMobile } from 'react-device-detect'
import { error } from 'src/hooks/useStarlay'
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
  const gasPrice = await getMultipliedGasPrice(signer, recentGasPrice)
  const tx = await item.tx()
  try {
    const txPromise = await signer.sendTransaction({
      ...tx,
      value: tx.value ? ethers.BigNumber.from(tx.value) : undefined,
      gasPrice: isMobile ? undefined : gasPrice,
    })
    return { wait: () => txPromise.wait(1) }
  } catch (e) {
    const err = serializeError(e)
    if (
      err.code === 4001 ||
      err.code === -32603 ||
      err.message === 'User rejected the transaction'
    )
      throw error('Cancelled')
    throw e
  }
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
