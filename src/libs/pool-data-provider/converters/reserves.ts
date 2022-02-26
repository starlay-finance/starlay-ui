import {
  ReserveIncentiveWithFeedsResponse,
  ReservesDataHumanized,
} from '@starlay-finance/contract-helpers'
import {
  calculateAllReserveIncentives,
  formatReserve,
  getComputedReserveFields,
  normalize,
  normalizeBN,
} from '@starlay-finance/math-utils'
import { NetworkConfig } from 'src/libs/config'
import { equals } from 'src/utils/address'
import { BASE_ASSET_DUMMY_ADDRESS } from './constants'

export const formatReserves = (
  protocolData: ReservesDataHumanized,
  reserveIncentives: ReserveIncentiveWithFeedsResponse[],
  currentTimestamp: number,
  baseAsset: NetworkConfig['baseAsset'],
  rewardUndelyingAssetDict?: Record<string, string>,
) => {
  const {
    reservesData,
    baseCurrencyData: {
      marketReferenceCurrencyDecimals,
      marketReferenceCurrencyPriceInUsd,
      networkBaseTokenPriceDecimals,
    },
  } = protocolData

  const formattedReserves = reservesData.map((reserve) => {
    const formattedReserve = {
      ...reserve,
      ...formatReserve({ reserve, currentTimestamp }),
      priceInMarketReferenceCurrency: normalize(
        reserve.priceInMarketReferenceCurrency,
        marketReferenceCurrencyDecimals,
      ),
      marketReferenceCurrencyDecimals,
    }
    if (!equals(formattedReserve.underlyingAsset, baseAsset.wrapperAddress))
      return formattedReserve
    return {
      ...formattedReserve,
      symbol: baseAsset.symbol,
      underlyingAsset: BASE_ASSET_DUMMY_ADDRESS,
    }
  })

  const incentivesByUnderlyingAsset = calculateAllReserveIncentives({
    reserveIncentives: reserveIncentives.map((each) =>
      !equals(each.underlyingAsset, baseAsset.wrapperAddress)
        ? each
        : { ...each, underlyingAsset: BASE_ASSET_DUMMY_ADDRESS },
    ),
    reserves: reservesData.map((reserve) => {
      const computed = getComputedReserveFields({ reserve, currentTimestamp })
      return {
        underlyingAsset: reserve.underlyingAsset,
        symbol: reserve.symbol.toLowerCase(),
        totalLiquidity: computed.totalLiquidity.toString(),
        totalVariableDebt: computed.totalVariableDebt.toString(),
        totalStableDebt: computed.totalStableDebt.toString(),
        priceInMarketReferenceCurrency: normalize(
          reserve.priceInMarketReferenceCurrency,
          marketReferenceCurrencyDecimals,
        ),
        decimals: reserve.decimals,
        marketReferenceCurrencyDecimals,
      }
    }),
    underlyingAsserDict: rewardUndelyingAssetDict,
  })

  return {
    reservesData: formattedReserves,
    incentivesByUnderlyingAsset,
    marketReferenceCurrencyPriceInUSD: normalizeBN(
      marketReferenceCurrencyPriceInUsd,
      networkBaseTokenPriceDecimals,
    ),
  }
}
