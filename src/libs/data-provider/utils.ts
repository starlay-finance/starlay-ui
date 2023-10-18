import {
  BigNumber,
  ComputedUserReserve,
  FormatUserSummaryResponse,
  normalizeBN,
  ReserveIncentiveDict,
  valueToBigNumber,
} from '@starlay-finance/math-utils'
import { ethers } from 'ethers'
import { ASSETS_DICT } from 'src/constants/assets'
import { FormattedReserveData } from 'src/libs/pool-data-provider'
import {
  AssetMarketData,
  AssetSymbol,
  MarketData,
  User,
  WalletBalance,
} from 'src/types/models'
import { EthereumAddress } from 'src/types/web3'
import {
  assetFromSymbolAndAddress,
  EMPTY_BALANCE_BY_ASSET,
} from 'src/utils/assets'
import { calculateNetAPY, convertToUSDBulk } from 'src/utils/calculator'
import { BN_ZERO } from 'src/utils/number'
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
    pool: '', // unused
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
    isDepositInactive: reserve.isFrozen,
    isBorrowInactive: reserve.isFrozen,
    borrowingEnabled: reserve.borrowingEnabled,
  }
}

export const toUser = (
  userReserves: FormatUserSummaryResponse,
  incentive: {
    address: EthereumAddress
    underlyingAsset: EthereumAddress
    unclaimedBalance: BigNumber
  },
  { assets, marketReferenceCurrencyPriceInUSD }: MarketData,
): User => {
  const totalDepositedInUSD = valueToBigNumber(userReserves.totalLiquidityUSD)
  const totalBorrowedInUSD = valueToBigNumber(userReserves.totalBorrowsUSD)
  const availableBorrowsInUSD = valueToBigNumber(
    userReserves.availableBorrowsUSD,
  )

  const borrowLimitInUSD = totalBorrowedInUSD.plus(availableBorrowsInUSD)
  const balanceByAsset = toBalanceByAsset(userReserves.userReservesData)
  const netAPY = calculateNetAPY(
    balanceByAsset,
    assets,
    marketReferenceCurrencyPriceInUSD,
    totalDepositedInUSD,
  )

  return {
    summary: {
      totalDepositedInUSD,
      totalBorrowedInMarketReferenceCurrency: valueToBigNumber(
        userReserves.totalBorrowsMarketReferenceCurrency,
      ),
      totalBorrowedInUSD,
      totalCollateralInMarketReferenceCurrency: valueToBigNumber(
        userReserves.totalCollateralMarketReferenceCurrency,
      ),
      availableBorrowsInUSD,
      borrowLimitInUSD,
      borrowLimitUsed: borrowLimitInUSD.gt(BN_ZERO)
        ? totalBorrowedInUSD.dividedBy(borrowLimitInUSD)
        : undefined,
      currentLiquidationThreshold: valueToBigNumber(
        userReserves.currentLiquidationThreshold,
      ),
      healthFactor: valueToBigNumber(userReserves.healthFactor),
      netAPY,
    },
    balanceByAsset,
    rewards: incentive,
  }
}

const toBalanceByAsset = (userReservesData: ComputedUserReserve[]) =>
  userReservesData.reduce(
    (prev, { reserve: { symbol, underlyingAsset }, ...userReserve }) => ({
      ...prev,
      [assetFromSymbolAndAddress(symbol as AssetSymbol, underlyingAsset)
        .symbol]: {
        deposited: valueToBigNumber(userReserve.underlyingBalance),
        borrowed: valueToBigNumber(userReserve.totalBorrows),
        usageAsCollateralEnabled: userReserve.usageAsCollateralEnabledOnUser,
      },
    }),
    EMPTY_BALANCE_BY_ASSET,
  )

export const toWalletBalance = async (
  balancesDict: Record<EthereumAddress, ethers.BigNumber>,
  rewardBalance: ethers.BigNumber,
  assets: {
    symbol: AssetSymbol
    address: string
    decimals: number
  }[],
  rewardToken: {
    symbol: AssetSymbol
    address: string
    decimals: number
  },
): Promise<WalletBalance> => {
  const balances = assets.reduce((prev, asset) => {
    const balance = balancesDict[asset.address.toLowerCase() as EthereumAddress]
    return {
      ...prev,
      [asset.symbol]: balance
        ? normalizeBN(balance.toString(), asset.decimals)
        : BN_ZERO,
    }
  }, {}) as WalletBalance

  return {
    ...balances,
    [ASSETS_DICT.LAY.symbol]: normalizeBN(
      rewardBalance.toString(),
      rewardToken.decimals,
    ),
  }
}
