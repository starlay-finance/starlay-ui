import { EVMChainId } from 'src/libs/config'
import { MarketDataRawEVM } from 'src/libs/data-provider'
import { toAssetMarketData } from 'src/libs/data-provider/utils'
import { getPoolDataSnapshot } from 'src/libs/pool-data-provider/snapshots-provider'
import { MarketData } from 'src/types/models'
import { filterFalsy } from 'src/utils/array'
import { onlyListed } from 'src/utils/assets'
import { utcStartOfDate } from 'src/utils/date'
import useSWRImmutable from 'swr/immutable'
import { useNetworkType } from '../useNetwork'
import { useStaticRPCProviderEVM } from '../useStaticRPCProviderEVM'

export const useMarketDataSnapshot = () => {
  const { data: network } = useNetworkType()
  const { data } = useStaticRPCProviderEVM()
  return useSWRImmutable(
    () => network === 'EVM' && data && ['marketdatasnapshot', data?.chainId],
    ([_key, chainId]) => getMarketDataSnapshot(chainId),
  )
}

const getMarketDataSnapshot = async (
  chainId: EVMChainId,
): Promise<
  Omit<MarketData & { chainId: EVMChainId }, keyof MarketDataRawEVM> | undefined
> => {
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
    .filter(filterFalsy)
  return {
    assets,
    marketReferenceCurrencyPriceInUSD,
    marketReferenceCurrencyDecimals,
    marketTimestamp: timestamp.unix(),
    chainId,
  }
}
