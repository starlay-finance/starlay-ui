import { t } from '@lingui/macro'
import {
  BigNumber,
  calculateHealthFactorFromBalancesBigUnits,
  valueToBigNumber,
} from '@starlay-finance/math-utils'
import {
  AssetMarketData,
  User,
  UserAssetBalance,
  UserSummary,
} from 'src/types/models'
import { BN_ZERO } from './number'

const HEALTH_FACTOR_THRESHOLD = 1

type EstimationResult = {
  availableBorrowsInUSD?: BigNumber
  totalBorrowedInUSD?: BigNumber
  borrowLimitUsed?: BigNumber
  healthFactor?: BigNumber
  maxAmount: BigNumber
  unavailableReason?: string
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
    return { unavailableReason: t`Enter amount`, maxAmount }

  const {
    availableBorrowsInUSD: currentBorrowable,
    totalBorrowedInUSD: currentBorrowed,
    totalCollateralInMarketReferenceCurrency,
  } = userSummary
  const availableBorrowsInUSD = currentBorrowable.plus(
    baseLTVasCollateral.multipliedBy(amount),
  )
  const borrowLimitInUSD = availableBorrowsInUSD.plus(currentBorrowed)
  const borrowLimitUsed = borrowLimitInUSD.gt(0)
    ? currentBorrowed.dividedBy(borrowLimitInUSD)
    : undefined

  const healthFactor = calculateHealthFactor({
    ...userSummary,
    totalCollateralInMarketReferenceCurrency:
      totalCollateralInMarketReferenceCurrency.plus(
        amount.multipliedBy(baseLTVasCollateral),
      ),
  })
  return {
    unavailableReason: amount.gt(maxAmount)
      ? t`No balance to deposit`
      : undefined,
    maxAmount,
    availableBorrowsInUSD,
    borrowLimitUsed,
    healthFactor,
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
    return { unavailableReason: t`Enter Amount`, maxAmount }

  if (!userAssetStatus.usageAsCollateralEnabled)
    return {
      unavailableReason: amount.gt(maxAmount)
        ? t`No balance to withdraw`
        : undefined,
      maxAmount,
      availableBorrowsInUSD: userSummary.availableBorrowsInUSD,
      borrowLimitUsed: userSummary.borrowLimitUsed,
    }

  const {
    totalBorrowedInUSD: currentBorrowed,
    borrowLimitInUSD: currentLimit,
    totalCollateralInMarketReferenceCurrency,
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

  const healthFactor = calculateHealthFactor({
    ...userSummary,
    totalCollateralInMarketReferenceCurrency:
      totalCollateralInMarketReferenceCurrency.minus(
        amount.multipliedBy(baseLTVasCollateral),
      ),
  })
  return {
    unavailableReason: amount.gt(maxAmount)
      ? t`No balance to withdraw`
      : healthFactor.isPositive() && healthFactor.lt(HEALTH_FACTOR_THRESHOLD)
      ? t`Health factor too low`
      : undefined,
    maxAmount,
    availableBorrowsInUSD,
    borrowLimitUsed,
    healthFactor,
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
    totalBorrowedInMarketReferenceCurrency,
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
    return { unavailableReason: t`Enter Amount`, maxAmount }

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

  const healthFactor = calculateHealthFactor({
    ...userSummary,
    totalBorrowedInMarketReferenceCurrency:
      totalBorrowedInMarketReferenceCurrency.plus(
        amount.multipliedBy(priceInMarketReferenceCurrency),
      ),
  })
  return {
    unavailableReason: amount.gt(maxAmount)
      ? t`Borrowing limit reached`
      : healthFactor.isPositive() && healthFactor.lt(HEALTH_FACTOR_THRESHOLD)
      ? t`Health factor too low`
      : undefined,
    maxAmount,
    totalBorrowedInUSD,
    borrowLimitUsed,
    healthFactor,
  }
}

export const estimateRepayment = ({
  amount,
  userAssetStatus,
  userSummary,
  asset: { priceInMarketReferenceCurrency },
  marketReferenceCurrencyPriceInUSD,
}: EstimationParam): EstimationResult => {
  const { borrowed: currentBorrowed, inWallet } = userAssetStatus
  const maxAmount = BigNumber.min(
    currentBorrowed.multipliedBy('1.0025'),
    inWallet,
  )
  if (!amount || amount.isNaN() || amount.lte(BN_ZERO))
    return { unavailableReason: t`Enter Amount`, maxAmount }

  const {
    totalBorrowedInUSD: currentBorrowedInUSD,
    borrowLimitInUSD,
    totalBorrowedInMarketReferenceCurrency,
  } = userSummary
  const totalBorrowedInUSD = currentBorrowedInUSD.minus(
    convertToUSD(
      priceInMarketReferenceCurrency,
      marketReferenceCurrencyPriceInUSD,
      valueToBigNumber(amount),
    ),
  )
  const borrowLimitUsed = borrowLimitInUSD.gt(0)
    ? totalBorrowedInUSD.dividedBy(borrowLimitInUSD)
    : valueToBigNumber(1)

  const healthFactor = calculateHealthFactor({
    ...userSummary,
    totalBorrowedInMarketReferenceCurrency:
      totalBorrowedInMarketReferenceCurrency.plus(
        amount.multipliedBy(priceInMarketReferenceCurrency),
      ),
  })
  return {
    unavailableReason: amount.gt(maxAmount)
      ? t`No balance to repay`
      : undefined,
    maxAmount,
    totalBorrowedInUSD,
    borrowLimitUsed,
    healthFactor,
  }
}

const calculateHealthFactor = (
  params: Pick<
    UserSummary,
    | 'totalCollateralInMarketReferenceCurrency'
    | 'totalBorrowedInMarketReferenceCurrency'
    | 'currentLiquidationThreshold'
  >,
) =>
  calculateHealthFactorFromBalancesBigUnits({
    collateralBalanceMarketReferenceCurrency:
      params.totalCollateralInMarketReferenceCurrency,
    borrowBalanceMarketReferenceCurrency:
      params.totalBorrowedInMarketReferenceCurrency,
    currentLiquidationThreshold: params.currentLiquidationThreshold,
  })

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
