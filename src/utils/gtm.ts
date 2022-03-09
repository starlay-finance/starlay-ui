import { BigNumber } from '@starlay-finance/math-utils'
import { AssetSymbol } from 'src/types/models'

declare const window: Window['window'] & {
  dataLayer?: Record<string, unknown>[]
}

export type TrackedData = {
  eventType: EventType
  assetSymbol: AssetSymbol
  valueInUSD: BigNumber
}

export type EventType = 'deposit' | 'withdraw' | 'borrow' | 'repay'

export const sendEventData = (trackedData: TrackedData): void => {
  if (!window.dataLayer) return
  window.dataLayer.push({
    event: trackedData.eventType,
    underlying_asset: trackedData.assetSymbol,
    value_in_usd: trackedData.valueInUSD.dp(0, BigNumber.ROUND_DOWN).toNumber(),
  })
}
