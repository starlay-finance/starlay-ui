import { useEffect } from 'react'
import { useSWRLocal } from './base/useSWRLocal'
import { useMarketData } from './useMarketData'
import { useStaticRPCProvider } from './useStaticRPCProvider'

export const useBlockNumber = () => {
  const { data: blockNumber, mutate } = useSWRLocal<number>('blocknumber')
  const { data: provider } = useStaticRPCProvider()
  const { data } = useMarketData()
  useEffect(() => {
    if (!data || !provider) return
    provider.provider.getBlockNumber().then(mutate)
  }, [provider, data])
  return blockNumber
}
