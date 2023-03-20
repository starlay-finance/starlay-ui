import { BigNumber } from '@starlay-finance/math-utils'
import { AssetMarketData } from 'src/types/models'
import { equals } from 'src/utils/address'
import { createTrackedData, EventType, sendEventData } from 'src/utils/gtm'
import { BN_ONE } from 'src/utils/number'
import { useMarketData } from './useMarketData'

type TrackingParams = {
  amount: BigNumber
  asset: string
}

export const useTracking = () => {
  const { data: marketData } = useMarketData()

  const assetFromUnderlyingAsset = (
    underlyingAsset: string,
  ): AssetMarketData | undefined =>
    marketData?.assets.find((asset) =>
      equals(asset.underlyingAsset, underlyingAsset),
    )

  const withTracking =
    <T extends TrackingParams>(
      event: EventType,
      fn: (param: T) => Promise<{ error: number } | undefined>,
    ) =>
    async (param: T) => {
      const res = await fn(param)
      if (res?.error) return

      const asset = assetFromUnderlyingAsset(param.asset)
      if (!asset) return

      const trackedData = createTrackedData(
        event,
        asset.symbol,
        param.amount,
        asset.priceInMarketReferenceCurrency,
        marketData?.marketReferenceCurrencyPriceInUSD || BN_ONE,
      )

      if (trackedData) sendEventData(trackedData)
    }
  return { withTracking }
}
