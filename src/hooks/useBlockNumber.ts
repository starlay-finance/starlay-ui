import { useEffect } from 'react'
import { useSWRLocal } from './base/useSWRLocal'
import { useMarketData } from './useMarketData'
import { useStaticRPCProviderEVM } from './useStaticRPCProviderEVM'

export const useBlockNumber = () => {
  const { data: blockNumber, mutate } = useSWRLocal<number>('blocknumber')
  const { data: provider } = useStaticRPCProviderEVM()
  const { data } = useMarketData()
  useEffect(() => {
    if (!data || !provider) return
    provider.provider.getBlockNumber().then(mutate)
  }, [provider, data])
  return blockNumber
}
