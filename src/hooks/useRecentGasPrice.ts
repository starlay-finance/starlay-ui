import { BigNumber } from 'ethers'
import { useCallback } from 'react'
import { useBlockNumber } from './useBlockNumber'
import { useStaticRPCProviderEVM } from './useStaticRPCProviderEVM'

const DEFAULT_GAS_PRICE = BigNumber.from('1000000000')

export const useRecentGasPrice = () => {
  const { data: provider } = useStaticRPCProviderEVM()
  const blockNumber = useBlockNumber()
  const getRecentGasPrice = useCallback(async () => {
    if (!provider || !blockNumber) return DEFAULT_GAS_PRICE
    const txsArr = await Promise.all([
      provider.provider.getBlockWithTransactions(blockNumber),
      provider.provider.getBlockWithTransactions(blockNumber - 1),
      provider.provider.getBlockWithTransactions(blockNumber - 2),
    ])

    const gasPrices = txsArr
      .flatMap((txs) => txs.transactions)
      .map((tx) => tx.gasPrice)
      .filter(Boolean)
      .sort()
    return gasPrices[Math.floor(gasPrices.length / 2)] || DEFAULT_GAS_PRICE
  }, [provider, blockNumber])

  return { getRecentGasPrice }
}
