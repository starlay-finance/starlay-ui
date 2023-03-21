import useSWR from 'swr'
import { useLAYPrice } from '../useLAYPrice'
import { useNetworkType } from '../useNetwork'
import { useStarlay } from '../useStarlay'

export const useMarketData = () => {
  const { data } = useNetworkType()
  const { dataProvider } = useStarlay()
  const { data: layPriceInUSD } = useLAYPrice()
  return useSWR(
    () =>
      dataProvider &&
      (data !== 'EVM' || layPriceInUSD) && ['marketdata', dataProvider.chainId],
    () => dataProvider!.getMarketData({ layPriceInUSD }),
    { dedupingInterval: 10000, refreshInterval: 15000 },
  )
}
