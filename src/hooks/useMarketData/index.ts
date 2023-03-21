import useSWR from 'swr'
import { useLAYPrice } from '../useLAYPrice'
import { useStarlay } from '../useStarlay'

export const useMarketData = () => {
  const { dataProvider } = useStarlay()
  const { data: layPriceInUSD } = useLAYPrice()
  return useSWR(
    () => dataProvider && layPriceInUSD && ['marketdata', dataProvider.chainId],
    () => dataProvider!.getMarketData({ layPriceInUSD }),
    { dedupingInterval: 10000, refreshInterval: 15000 },
  )
}
