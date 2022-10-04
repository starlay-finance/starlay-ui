import {
  BigNumber,
  ReserveIncentiveDict,
  valueToBigNumber,
} from '@starlay-finance/math-utils'
import { FormattedReserveData } from 'src/libs/pool-data-provider'
import { AssetMarketData, AssetSymbol } from 'src/types/models'
import { EthereumAddress } from 'src/types/web3'
import { assetFromSymbolAndAddress } from 'src/utils/assets'
import { convertToUSDBulk } from 'src/utils/calculator'
import { ValueOf } from 'type-fest'

const EMPTY_INCENTIVE: ValueOf<ReserveIncentiveDict> = {
  lIncentives: { incentiveAPR: '0', rewardTokenAddress: '' },
  vdIncentives: { incentiveAPR: '0', rewardTokenAddress: '' },
  sdIncentives: { incentiveAPR: '0', rewardTokenAddress: '' },
}

export const toAssetMarketData = (
  marketReferenceCurrencyPriceInUSD: BigNumber,
  reserve: Omit<FormattedReserveData, 'symbol'> & { symbol: AssetSymbol },
  incentive: ValueOf<ReserveIncentiveDict> = EMPTY_INCENTIVE,
): AssetMarketData => {
  const [liquidityInUSD, totalDepositedInUSD, totalBorrowedInUSD] =
    convertToUSDBulk(
      valueToBigNumber(reserve.priceInMarketReferenceCurrency),
      marketReferenceCurrencyPriceInUSD,
      valueToBigNumber(reserve.availableLiquidity),
      valueToBigNumber(reserve.totalLiquidity),
      valueToBigNumber(reserve.totalVariableDebt).plus(reserve.totalStableDebt),
    )
  return {
    ...assetFromSymbolAndAddress(reserve.symbol, reserve.underlyingAsset),
    underlyingAsset: reserve.underlyingAsset.toLowerCase() as EthereumAddress,
    depositAPY: valueToBigNumber(reserve.supplyAPY),
    variableBorrowAPY: valueToBigNumber(reserve.variableBorrowAPY),
    depositIncentiveAPR: valueToBigNumber(incentive.lIncentives.incentiveAPR),
    variableBorrowIncentiveAPR: valueToBigNumber(
      incentive.vdIncentives.incentiveAPR,
    ),
    liquidity: valueToBigNumber(reserve.availableLiquidity),
    liquidityInUSD,
    totalDepositedInUSD,
    totalBorrowedInUSD,
    baseLTVasCollateral: valueToBigNumber(reserve.baseLTVasCollateral),
    priceInMarketReferenceCurrency: valueToBigNumber(
      reserve.priceInMarketReferenceCurrency,
    ),
    reserveLiquidationThreshold: valueToBigNumber(
      reserve.reserveLiquidationThreshold,
    ),
    usageAsCollateralEnabled: reserve.usageAsCollateralEnabled,
    reserveFactor: valueToBigNumber(reserve.reserveFactor),
    liquidationPenalty: valueToBigNumber(reserve.reserveLiquidationBonus),
    decimals: reserve.decimals,
    lTokenAddress: reserve.lTokenAddress as EthereumAddress,
    vdTokenAddress: reserve.variableDebtTokenAddress as EthereumAddress,
    isActive: reserve.isActive,
    isFrozen: reserve.isFrozen,
    borrowingEnabled: reserve.borrowingEnabled,
  }
}
