import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import {
  AssetMarketData,
  User,
  UserAssetBalance,
  UserSummary,
} from 'src/types/models'
import { BN_ZERO } from './number'

type EstimationResult = {
  availableBorrowsInUSD?: BigNumber
  totalBorrowedInUSD?: BigNumber
  borrowLimitUsed?: BigNumber
  maxAmount: BigNumber
  isAvailable: boolean
}

export type EstimationParam = {
  amount: BigNumber | undefined
  asset: AssetMarketData
  userSummary: UserSummary
  userAssetStatus: UserAssetBalance
  marketReferenceCurrencyPriceInUSD: BigNumber
}

export const estimateDeposit = ({
  amount,
  userAssetStatus,
  userSummary,
  asset: { baseLTVasCollateral },
}: EstimationParam): EstimationResult => {
  const maxAmount = userAssetStatus.inWallet

  if (!amount || amount.isNaN() || amount.lte(BN_ZERO))
    return { isAvailable: false, maxAmount }

  const {
    availableBorrowsInUSD: currentBorrowable,
    totalBorrowedInUSD: currentBorrowed,
  } = userSummary
  const availableBorrowsInUSD = currentBorrowable.plus(
    baseLTVasCollateral.multipliedBy(amount),
  )
  const borrowLimitInUSD = availableBorrowsInUSD.plus(currentBorrowed)
  const borrowLimitUsed = borrowLimitInUSD.gt(0)
    ? currentBorrowed.dividedBy(borrowLimitInUSD)
    : undefined
  return {
    isAvailable: maxAmount.gte(amount),
    maxAmount,
    availableBorrowsInUSD,
    borrowLimitUsed,
  }
}

export const estimateWithdrawal = (
  params: EstimationParam,
): EstimationResult => {
  const {
    amount,
    userAssetStatus,
    userSummary,
    asset,
    marketReferenceCurrencyPriceInUSD,
  } = params
  const { baseLTVasCollateral, liquidity } = asset
  const maxAmount = BigNumber.min(
    userAssetStatus.deposited,
    liquidity,
    totalCollateralToWithdrawInMarketReferenceCurrency(params),
  )

  if (!amount || amount.isNaN() || amount.lte(BN_ZERO))
    return { isAvailable: false, maxAmount }

  const isAvailable = maxAmount.gte(amount)
  if (!userAssetStatus.usageAsCollateralEnabled)
    return {
      isAvailable,
      maxAmount,
      availableBorrowsInUSD: userSummary.availableBorrowsInUSD,
      borrowLimitUsed: userSummary.borrowLimitUsed,
    }

  const {
    totalBorrowedInUSD: currentBorrowed,
    borrowLimitInUSD: currentLimit,
  } = userSummary
  const borrowLimitInUSD = currentLimit.minus(
    baseLTVasCollateral.multipliedBy(
      convertToUSD(
        asset.priceInMarketReferenceCurrency,
        marketReferenceCurrencyPriceInUSD,
        valueToBigNumber(amount),
      ),
    ),
  )
  const availableBorrowsInUSD = BigNumber.max(
    borrowLimitInUSD.minus(currentBorrowed),
    BN_ZERO,
  )
  const borrowLimitUsed = borrowLimitInUSD.gt(0)
    ? currentBorrowed.dividedBy(borrowLimitInUSD)
    : valueToBigNumber(1)
  return {
    isAvailable,
    maxAmount,
    availableBorrowsInUSD,
    borrowLimitUsed,
  }
}

const totalCollateralToWithdrawInMarketReferenceCurrency = ({
  asset,
  userSummary,
  userAssetStatus,
}: EstimationParam) => {
  if (
    !userAssetStatus.usageAsCollateralEnabled ||
    !asset.usageAsCollateralEnabled ||
    userSummary.totalBorrowedInMarketReferenceCurrency.eq(BN_ZERO)
  )
    return valueToBigNumber(Infinity)
  // if we have any borrowings we should check how much we can withdraw without liquidation
  // with 0.5% gap to avoid reverting of tx
  const excessHF = userSummary.healthFactor.minus('1')
  if (!excessHF.gt('0')) return BN_ZERO
  return (
    excessHF
      .multipliedBy(userSummary.totalBorrowedInMarketReferenceCurrency)
      // because of the rounding issue on the contracts side this value still can be incorrect
      .div(asset.reserveLiquidationThreshold + 0.01)
      .multipliedBy('0.99')
      .dividedBy(asset.priceInMarketReferenceCurrency)
  )
}

export const estimateBorrow = ({
  amount,
  userSummary,
  asset: { priceInMarketReferenceCurrency, liquidity },
  marketReferenceCurrencyPriceInUSD,
}: EstimationParam): EstimationResult => {
  const {
    availableBorrowsInUSD: currentBorrowable,
    totalBorrowedInUSD: currentBorrowed,
    borrowLimitInUSD,
  } = userSummary
  const maxAmount = BigNumber.min(
    convertFromUSD(
      priceInMarketReferenceCurrency,
      marketReferenceCurrencyPriceInUSD,
      currentBorrowable,
    ),
    liquidity,
  )
  if (!amount || amount.isNaN() || amount.lte(BN_ZERO))
    return { isAvailable: false, maxAmount }

  const isAvailable = maxAmount.gte(amount)
  const totalBorrowedInUSD = currentBorrowed.plus(
    convertFromUSD(
      priceInMarketReferenceCurrency,
      marketReferenceCurrencyPriceInUSD,
      valueToBigNumber(amount),
    ),
  )
  const borrowLimitUsed = borrowLimitInUSD.gt(0)
    ? totalBorrowedInUSD.dividedBy(borrowLimitInUSD)
    : undefined
  return {
    isAvailable,
    maxAmount,
    totalBorrowedInUSD,
    borrowLimitUsed,
  }
}

export const estimateRepayment = ({
  amount,
  userAssetStatus,
  userSummary,
  asset,
  marketReferenceCurrencyPriceInUSD,
}: EstimationParam): EstimationResult => {
  const { borrowed: currentBorrowed, inWallet } = userAssetStatus
  const maxAmount = BigNumber.min(
    currentBorrowed.multipliedBy('1.0025'),
    inWallet,
  )
  if (!amount || amount.isNaN() || amount.lte(BN_ZERO))
    return { isAvailable: false, maxAmount }

  const isAvailable = maxAmount.gte(amount)
  const { totalBorrowedInUSD: currentBorrowedInUSD, borrowLimitInUSD } =
    userSummary
  const totalBorrowedInUSD = currentBorrowedInUSD.minus(
    convertToUSD(
      asset.priceInMarketReferenceCurrency,
      marketReferenceCurrencyPriceInUSD,
      valueToBigNumber(amount),
    ),
  )
  const borrowLimitUsed = borrowLimitInUSD.gt(0)
    ? totalBorrowedInUSD.dividedBy(borrowLimitInUSD)
    : valueToBigNumber(1)
  return {
    isAvailable,
    maxAmount,
    totalBorrowedInUSD,
    borrowLimitUsed,
  }
}

export const calculateNetAPY = (
  balanceByAsset: User['balanceByAsset'],
  assets: AssetMarketData[],
  marketReferenceCurrencyPriceInUSD: BigNumber,
  totalDepositedInUSD: BigNumber,
) => {
  if (totalDepositedInUSD.lte(BN_ZERO)) return BN_ZERO
  const { profitInUSD, lossInUSD, rewardInUSD } = Object.entries(
    balanceByAsset,
  ).reduce(
    (prev, [symbol, { borrowed, deposited }]) => {
      const asset = assets.find((each) => each.symbol === symbol)
      if (!asset) return prev

      const [profitInUSD, lossInUSD, rewardInUSD] = convertToUSDBulk(
        asset.priceInMarketReferenceCurrency,
        marketReferenceCurrencyPriceInUSD,
        deposited.multipliedBy(asset.depositAPY),
        borrowed.multipliedBy(asset.variableBorrowAPY),
        deposited
          .multipliedBy(asset.depositIncentiveAPR)
          .plus(borrowed.multipliedBy(asset.variableBorrowIncentiveAPR)),
      )
      return {
        profitInUSD: prev.profitInUSD.plus(profitInUSD),
        lossInUSD: prev.lossInUSD.plus(lossInUSD),
        rewardInUSD: prev.rewardInUSD.plus(rewardInUSD),
      }
    },
    {
      profitInUSD: BN_ZERO,
      lossInUSD: BN_ZERO,
      rewardInUSD: BN_ZERO,
    },
  )
  return profitInUSD
    .plus(rewardInUSD)
    .minus(lossInUSD)
    .dividedBy(totalDepositedInUSD)
}

export const convertToUSD = (
  priceInMarketReferenceCurrency: BigNumber,
  marketReferenceCurrencyPriceInUSD: BigNumber,
  amount: BigNumber,
) =>
  valueToBigNumber(amount)
    .multipliedBy(priceInMarketReferenceCurrency)
    .multipliedBy(marketReferenceCurrencyPriceInUSD)

export const convertToUSDBulk = (
  priceInMarketReferenceCurrency: BigNumber,
  marketReferenceCurrencyPriceInUSD: BigNumber,
  ...amounts: BigNumber[]
) =>
  amounts.map((amount) =>
    convertToUSD(
      priceInMarketReferenceCurrency,
      marketReferenceCurrencyPriceInUSD,
      amount,
    ),
  )

export const convertFromUSD = (
  priceInMarketReferenceCurrency: BigNumber,
  marketReferenceCurrencyPriceInUSD: BigNumber,
  amount: BigNumber,
) =>
  valueToBigNumber(amount)
    .div(marketReferenceCurrencyPriceInUSD)
    .div(priceInMarketReferenceCurrency)
