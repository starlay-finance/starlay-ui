import dayjs from 'dayjs'
import { ChainId } from 'src/libs/config'
import { PoolDataProviderInterface } from 'src/libs/pool-data-provider'
import { onlyListed } from 'src/utils/assets'
import useSWR from 'swr'
import { usePoolDataProvider } from '../usePoolDataProvider'
import { toAssetMarketData } from './converters'
import { MarketData } from './types'

export type { MarketData }

export const useMarketData = () => {
  const { data } = usePoolDataProvider()
  return useSWR(
    () => data && ['marketdata', data?.chainId],
    (_key: string, chainId: ChainId) => getMarketData(data!.provider, chainId),
    { dedupingInterval: 10000, refreshInterval: 15000 },
  )
}

const getMarketData = async (
  provider: PoolDataProviderInterface,
  chainId: ChainId,
): Promise<MarketData> => {
  const currentTimestamp = dayjs().unix()
  const {
    reservesData,
    incentivesByUnderlyingAsset,
    marketReferenceCurrencyPriceInUSD,
    ...rawData
  } = await provider.getReservesWithIncentives(currentTimestamp)
  const assets = reservesData
    .filter(onlyListed)
    .map((reserve) =>
      toAssetMarketData(
        marketReferenceCurrencyPriceInUSD,
        reserve,
        incentivesByUnderlyingAsset[reserve.underlyingAsset],
      ),
    )
  return {
    assets,
    marketReferenceCurrencyPriceInUSD,
    marketTimestamp: currentTimestamp,
    chainId,
    ...rawData,
  }
}
