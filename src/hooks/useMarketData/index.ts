import useSWR from 'swr'
import { useLAYPrice } from '../useLAYPrice'
import { useStarlay } from '../useStarlay'

export const useMarketData = () => {
  const { network, dataProvider } = useStarlay()
  const { data: layPriceInUSD } = useLAYPrice()
  return useSWR(
    () =>
      network &&
      dataProvider &&
      (network !== 'EVM' || layPriceInUSD) && [
        'marketdata',
        network,
        dataProvider.chainId,
      ],
    () => dataProvider!.getMarketData({ layPriceInUSD }),
    { dedupingInterval: 10000, refreshInterval: 15000 },
  )
}
