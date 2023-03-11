import { useStaticRPCProvider } from 'src/hooks/useStaticRPCProvider'
import { EVMChainId } from 'src/libs/config'
import { getPoolDataSnapshot } from 'src/libs/pool-data-provider/snapshots-provider'
import { onlyListed } from 'src/utils/assets'
import { utcStartOfDate } from 'src/utils/date'
import useSWRImmutable from 'swr/immutable'
import { toAssetMarketData } from './converters'
import { MarketData, MarketDataRaw } from './types'

export const useMarketDataSnapshot = () => {
  const { data } = useStaticRPCProvider()
  return useSWRImmutable(
    () => data && ['marketdatasnapshot', data?.chainId],
    ([_key, chainId]) => getMarketDataSnapshot(chainId),
  )
}

const getMarketDataSnapshot = async (
  chainId: EVMChainId,
): Promise<Omit<MarketData, keyof MarketDataRaw> | undefined> => {
  const timestamp = utcStartOfDate()
  const res = await getPoolDataSnapshot(chainId, timestamp)
  if (!res) return
  const {
    reservesData,
    incentivesByUnderlyingAsset,
    marketReferenceCurrencyPriceInUSD,
    marketReferenceCurrencyDecimals,
  } = res
  const assets = reservesData
    .filter(onlyListed)
    .map((reserve) =>
      toAssetMarketData(
        marketReferenceCurrencyPriceInUSD,
        reserve,
        incentivesByUnderlyingAsset[reserve.underlyingAsset.toLowerCase()],
      ),
    )
  return {
    assets,
    marketReferenceCurrencyPriceInUSD,
    marketReferenceCurrencyDecimals,
    marketTimestamp: timestamp.unix(),
    chainId,
  }
}
