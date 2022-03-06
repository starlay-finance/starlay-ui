import {
  PoolBaseCurrencyHumanized,
  ReserveDataHumanized,
  ReserveIncentiveWithFeedsResponse,
} from '@starlay-finance/contract-helpers'
import { BigNumber } from '@starlay-finance/math-utils'
import { ChainId } from 'src/libs/config'
import { AssetMarketData } from 'src/types/models'

export type MarketData = {
  assets: AssetMarketData[]
  marketReferenceCurrencyPriceInUSD: BigNumber
  marketTimestamp: number
  chainId: ChainId
} & MarketDataRaw

export type MarketDataRaw = {
  rawReservesData: ReserveDataHumanized[]
  rawBaseCurrencyData: PoolBaseCurrencyHumanized
  rawReserveIncentivesData: ReserveIncentiveWithFeedsResponse[]
}
