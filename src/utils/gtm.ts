import { BigNumber } from '@starlay-finance/math-utils'
import { AssetSymbol } from 'src/types/models'
import { convertToUSD } from './calculator'

declare const window: Window['window'] & {
  dataLayer?: Record<string, unknown>[]
}

export type TrackedData = {
  eventType: EventType
  assetSymbol: AssetSymbol
  valueInUSD: BigNumber
}

export type EventType = 'deposit' | 'withdraw' | 'borrow' | 'repay' | 'loop'

export const createTrackedData = (
  eventType: TrackedData['eventType'],
  assetSymbol: AssetSymbol,
  amount: BigNumber,
  priceInMarketReferenceCurrency: BigNumber,
  marketReferenceCurrencyPriceInUSD: BigNumber,
): TrackedData | undefined => {
  if (!assetSymbol || !priceInMarketReferenceCurrency) return
  return {
    eventType: eventType,
    assetSymbol: assetSymbol,
    valueInUSD: convertToUSD(
      priceInMarketReferenceCurrency,
      marketReferenceCurrencyPriceInUSD,
      amount,
    ),
  }
}

export const sendEventData = (trackedData: TrackedData): void => {
  if (!window.dataLayer) return
  window.dataLayer.push({
    event: trackedData.eventType,
    underlying_asset: trackedData.assetSymbol,
    value_in_usd: trackedData.valueInUSD.dp(0, BigNumber.ROUND_DOWN).toNumber(),
  })
}
