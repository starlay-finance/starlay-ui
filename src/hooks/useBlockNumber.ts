import { useEffect, useState } from 'react'
import { useMarketData } from './useMarketData'
import { useStaticRPCProvider } from './useStaticRPCProvider'

export const useBlockNumber = () => {
  const [blockNumber, setBlockNumber] = useState<number>()
  const { data: provider } = useStaticRPCProvider()
  const { data } = useMarketData()
  useEffect(() => {
    if (!data || !provider) return
    provider.provider.getBlockNumber().then(setBlockNumber)
  }, [provider, data])
  return blockNumber
}
