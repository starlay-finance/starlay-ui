import {
  PoolBaseCurrencyHumanized,
  ReserveDataHumanized,
} from '@starlay-finance/contract-helpers'
import {
  BigNumber,
  FormatReserveResponse,
  FormatUserSummaryResponse,
  ReserveIncentiveDict,
} from '@starlay-finance/math-utils'
import { ethers } from 'ethers'
import { EthereumAddress } from 'src/types/web3'
import { ChainId } from '../config'

export type FormattedReserveData = ReserveDataHumanized & FormatReserveResponse

export type PoolDataProviderInterface = {
  getReservesWithIncentives: (currentTimestamp: number) => Promise<{
    reservesData: FormattedReserveData[]
    incentivesByUnderlyingAsset: ReserveIncentiveDict
    marketReferenceCurrencyPriceInUSD: BigNumber
    rawReservesData: ReserveDataHumanized[]
    rawBaseCurrencyData: PoolBaseCurrencyHumanized
  }>
  getUserReserves: (
    account: EthereumAddress,
    poolReservesData: PoolReservesData,
  ) => Promise<FormatUserSummaryResponse>
}

export type PoolReservesData = {
  reservesData: ReserveDataHumanized[]
  baseCurrencyData: PoolBaseCurrencyHumanized
  timestamp: number
}

export type StaticRPCProvider = {
  chainId: ChainId
  provider: ethers.providers.Provider
}
