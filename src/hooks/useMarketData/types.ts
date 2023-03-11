import {
  PoolBaseCurrencyHumanized,
  ReserveDataHumanized,
  ReserveIncentiveWithFeedsResponse,
} from '@starlay-finance/contract-helpers'
import { BigNumber } from '@starlay-finance/math-utils'
import { EVMChainId } from 'src/libs/config'
import { AssetMarketData } from 'src/types/models'

export type MarketData = {
  assets: AssetMarketData[]
  marketReferenceCurrencyPriceInUSD: BigNumber
  marketReferenceCurrencyDecimals: number
  marketTimestamp: number
  chainId: EVMChainId
} & MarketDataRaw

export type MarketDataRaw = {
  rawReservesData: ReserveDataHumanized[]
  rawBaseCurrencyData: PoolBaseCurrencyHumanized
  rawReserveIncentivesData: ReserveIncentiveWithFeedsResponse[]
}
