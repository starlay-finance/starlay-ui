import { BigNumber } from '@starlay-finance/math-utils'
import dayjs from 'dayjs'
import { EVMChainId, getNetworkConfig } from 'src/libs/config'
import { PoolDataProviderInterface } from 'src/libs/pool-data-provider'
import { onlyListed } from 'src/utils/assets'
import useSWR from 'swr'
import { useLAYPrice } from '../useLAYPrice'
import { usePoolDataProvider } from '../usePoolDataProvider'
import { toAssetMarketData } from './converters'
import { MarketData } from './types'

export type { MarketData }

export const useMarketData = () => {
  const { data } = usePoolDataProvider()
  const { data: layPriceInUSD } = useLAYPrice()
  return useSWR(
    () => data && layPriceInUSD && ['marketdata', data?.chainId],
    ([_key, chainId]) => getMarketData(data!.provider, chainId, layPriceInUSD!),
    { dedupingInterval: 10000, refreshInterval: 15000 },
  )
}

export const getMarketData = async (
  provider: PoolDataProviderInterface,
  chainId: EVMChainId,
  layPriceInUSD: BigNumber,
): Promise<MarketData> => {
  const currentTimestamp = dayjs().unix()
  const { rewardToken } = getNetworkConfig(chainId)
  const {
    reservesData,
    incentivesByUnderlyingAsset,
    marketReferenceCurrencyPriceInUSD,
    ...rawData
  } = await provider.getReservesWithIncentives(currentTimestamp, {
    address: rewardToken.underlyingAsset,
    priceInUSD: layPriceInUSD,
  })
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
