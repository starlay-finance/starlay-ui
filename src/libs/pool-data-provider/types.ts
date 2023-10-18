import {
  PoolBaseCurrencyHumanized,
  ReserveDataHumanized,
  ReserveIncentiveWithFeedsResponse,
} from '@starlay-finance/contract-helpers'
import {
  BigNumber,
  FormatReserveResponse,
  FormatUserSummaryResponse,
  ReserveIncentiveDict,
} from '@starlay-finance/math-utils'
import { EthereumAddress } from 'src/types/web3'

export type FormattedReserveData = ReserveDataHumanized & FormatReserveResponse

export type PoolDataProviderInterface = {
  getReservesWithIncentives: (
    currentTimestamp: number,
    rewardToken?: {
      address: EthereumAddress
      priceInUSD: BigNumber
    },
  ) => Promise<{
    reservesData: FormattedReserveData[]
    incentivesByUnderlyingAsset: ReserveIncentiveDict
    marketReferenceCurrencyPriceInUSD: BigNumber
    marketReferenceCurrencyDecimals: number
    rawReservesData: ReserveDataHumanized[]
    rawBaseCurrencyData: PoolBaseCurrencyHumanized
    rawReserveIncentivesData: ReserveIncentiveWithFeedsResponse[]
  }>
  getUserReservesWithIncentive: (
    account: EthereumAddress,
    poolReservesData: PoolReservesData,
  ) => Promise<{
    reserves: FormatUserSummaryResponse
    incentive: {
      address: EthereumAddress
      underlyingAsset: EthereumAddress
      unclaimedBalance: BigNumber
    }
  }>
}

export type PoolReservesData = {
  reservesData: ReserveDataHumanized[]
  baseCurrencyData: PoolBaseCurrencyHumanized
  reserveIncentivesData: ReserveIncentiveWithFeedsResponse[]
  timestamp: number
}
