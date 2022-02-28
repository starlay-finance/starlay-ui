import {
  ReservesDataHumanized,
  UserReserveDataHumanized,
} from '@starlay-finance/contract-helpers'
import {
  formatUserSummary,
  FormatUserSummaryResponse,
  normalize,
} from '@starlay-finance/math-utils'
import { NetworkConfig } from 'src/libs/config'
import { equals } from 'src/utils/address'
import { PoolReservesData } from '../types'
import { BASE_ASSET_DUMMY_ADDRESS } from './constants'

export const formatUserReserves = (
  poolUserData: UserReserveDataHumanized[],
  poolReservesData: PoolReservesData,
  baseAsset: NetworkConfig['baseAsset'],
): FormatUserSummaryResponse => {
  const { timestamp, reservesData, baseCurrencyData } = poolReservesData
  const { networkBaseTokenPriceDecimals } = baseCurrencyData
  const userSummary = toUserSummary(
    poolUserData,
    reservesData,
    baseCurrencyData,
    timestamp,
    baseAsset,
  )
  return {
    ...userSummary,
    totalLiquidityUSD: normalize(
      userSummary.totalLiquidityUSD,
      networkBaseTokenPriceDecimals,
    ),
    totalCollateralUSD: normalize(
      userSummary.totalCollateralUSD,
      networkBaseTokenPriceDecimals,
    ),
    totalBorrowsUSD: normalize(
      userSummary.totalBorrowsUSD,
      networkBaseTokenPriceDecimals,
    ),
    availableBorrowsUSD: normalize(
      userSummary.availableBorrowsUSD,
      networkBaseTokenPriceDecimals,
    ),
  }
}

const toUserSummary = (
  userData: UserReserveDataHumanized[],
  reserves: ReservesDataHumanized['reservesData'],
  baseCurrencyData: ReservesDataHumanized['baseCurrencyData'],
  currentTimestamp: number,
  baseAsset: NetworkConfig['baseAsset'],
) =>
  formatUserSummary({
    currentTimestamp,
    marketRefCurrencyDecimals: baseCurrencyData.marketReferenceCurrencyDecimals,
    marketRefPriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    rawUserReserves: userData
      .map((userReserve) => {
        const reserve = reserves.find((reserve) =>
          equals(reserve.underlyingAsset, userReserve.underlyingAsset),
        )
        if (!reserve) return
        const reserveWithBase = {
          ...userReserve,
          reserve,
        }
        if (!equals(reserve.underlyingAsset, baseAsset.wrapperAddress))
          return reserveWithBase
        return {
          ...userReserve,
          underlyingAsset: BASE_ASSET_DUMMY_ADDRESS,
          reserve: {
            ...reserve,
            symbol: baseAsset.symbol,
            underlyingAsset: BASE_ASSET_DUMMY_ADDRESS,
          },
        }
      })
      .filter(onlyNonNull),
  })

const onlyNonNull = <T>(value: T | null | undefined): value is T =>
  value != null
