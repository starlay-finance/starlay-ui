import useSWR from 'swr'
import { useStarlay } from '../useStarlay'

export const useMarketData = () => {
  const { network, dataProvider } = useStarlay()
  return useSWR(
    () =>
      network && dataProvider && ['marketdata', network, dataProvider.chainId],
    () => dataProvider!.getMarketData(),
    { dedupingInterval: 10000, refreshInterval: 15000 },
  )
}
