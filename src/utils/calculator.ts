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
  userAssetBalance: UserAssetBalance
  marketReferenceCurrencyPriceInUSD: BigNumber
}

export const estimateDeposit = ({
  amount,
  userAssetBalance,
  userSummary,
  marketReferenceCurrencyPriceInUSD,
  asset: {
    baseLTVasCollateral,
    priceInMarketReferenceCurrency,
    reserveLiquidationThreshold,
  },
}: EstimationParam): EstimationResult => {
  const maxAmount = userAssetBalance.inWallet
  if (!validEstimationInput(amount))
    return { unavailableReason: t`Enter amount`, maxAmount }

  const {
    availableBorrowsInUSD: currentBorrowable,
    totalBorrowedInUSD: currentBorrowed,
  } = userSummary

  const amountInMarketReferenceCurrency = amount.multipliedBy(
    priceInMarketReferenceCurrency,
  )
  const ltvInUSD = amountInMarketReferenceCurrency
    .multipliedBy(marketReferenceCurrencyPriceInUSD)
    .multipliedBy(baseLTVasCollateral)

  const availableBorrowsInUSD = currentBorrowable.plus(ltvInUSD)
  const borrowLimitInUSD = availableBorrowsInUSD.plus(currentBorrowed)
  const borrowLimitUsed = calcBorrowLimitUsed(borrowLimitInUSD, currentBorrowed)

  const healthFactor = calculateHealthFactor({
    userSummary,
    amountInMarketReferenceCurrency,
    reserveLiquidationThreshold,
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
    userAssetBalance,
    userSummary,
    asset,
    marketReferenceCurrencyPriceInUSD,
  } = params
  const {
    baseLTVasCollateral,
    liquidity,
    priceInMarketReferenceCurrency,
    reserveLiquidationThreshold,
  } = asset
  const maxAmount = BigNumber.min(
    userAssetBalance.deposited,
    liquidity,
    totalCollateralToWithdrawInMarketReferenceCurrency(params),
  )

  if (!validEstimationInput(amount))
    return { unavailableReason: t`Enter amount`, maxAmount }

  if (amount.gt(maxAmount))
    return {
      unavailableReason: t`No balance or liquidity to withdraw`,
      maxAmount,
    }

  if (!userAssetBalance.usageAsCollateralEnabled)
    return {
      maxAmount,
      availableBorrowsInUSD: userSummary.availableBorrowsInUSD,
      borrowLimitUsed: userSummary.borrowLimitUsed,
      healthFactor: userSummary.healthFactor,
    }

  const {
    totalBorrowedInUSD: currentBorrowed,
    borrowLimitInUSD: currentLimit,
  } = userSummary
  const amountInMarketReferenceCurrency = amount.multipliedBy(
    priceInMarketReferenceCurrency,
  )
  const ltvInUSD = amountInMarketReferenceCurrency
    .multipliedBy(marketReferenceCurrencyPriceInUSD)
    .multipliedBy(baseLTVasCollateral)

  const borrowLimitInUSD = currentLimit.minus(ltvInUSD)
  const availableBorrowsInUSD = BigNumber.max(
    borrowLimitInUSD.minus(currentBorrowed),
    BN_ZERO,
  )
  const borrowLimitUsed = calcBorrowLimitUsed(borrowLimitInUSD, currentBorrowed)

  const healthFactor = calculateHealthFactor({
    userSummary,
    amountInMarketReferenceCurrency,
    reserveLiquidationThreshold,
    isNegative: true,
  })
  return {
    unavailableReason:
      healthFactor.isPositive() && healthFactor.lt(HEALTH_FACTOR_THRESHOLD)
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
  userAssetBalance,
}: EstimationParam) => {
  if (
    !userAssetBalance.usageAsCollateralEnabled ||
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
  if (!validEstimationInput(amount))
    return { unavailableReason: t`Enter Amount`, maxAmount }

  const amountInMarketReferenceCurrency = amount.multipliedBy(
    priceInMarketReferenceCurrency,
  )
  const amountInUSD = amountInMarketReferenceCurrency.multipliedBy(
    marketReferenceCurrencyPriceInUSD,
  )

  const totalBorrowedInUSD = currentBorrowed.plus(amountInUSD)
  const borrowLimitUsed = borrowLimitInUSD.gt(0)
    ? totalBorrowedInUSD.dividedBy(borrowLimitInUSD)
    : undefined

  const healthFactor = calculateHealthFactor({
    ...userSummary,
    totalBorrowedInMarketReferenceCurrency:
      totalBorrowedInMarketReferenceCurrency.plus(
        amountInMarketReferenceCurrency,
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
  userAssetBalance,
  userSummary,
  asset: { priceInMarketReferenceCurrency },
  marketReferenceCurrencyPriceInUSD,
}: EstimationParam): EstimationResult => {
  const { borrowed: currentBorrowed, inWallet } = userAssetBalance
  const maxAmount = BigNumber.min(
    currentBorrowed.multipliedBy('1.0025'),
    inWallet,
  )
  if (!validEstimationInput(amount))
    return { unavailableReason: t`Enter amount`, maxAmount }

  const {
    totalBorrowedInUSD: currentBorrowedInUSD,
    borrowLimitInUSD,
    totalBorrowedInMarketReferenceCurrency,
  } = userSummary
  const amountInMarketReferenceCurrency = amount.multipliedBy(
    priceInMarketReferenceCurrency,
  )
  const amountInUSD = amountInMarketReferenceCurrency.multipliedBy(
    marketReferenceCurrencyPriceInUSD,
  )

  const totalBorrowedInUSD = currentBorrowedInUSD.minus(amountInUSD)
  const borrowLimitUsed = borrowLimitInUSD.gt(0)
    ? totalBorrowedInUSD.dividedBy(borrowLimitInUSD)
    : valueToBigNumber(1)

  const healthFactor = calculateHealthFactor({
    ...userSummary,
    totalBorrowedInMarketReferenceCurrency:
      totalBorrowedInMarketReferenceCurrency.plus(
        amountInMarketReferenceCurrency,
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
const calcBorrowLimitUsed = (
  borrowLimitInUSD: BigNumber,
  totalBorrowed: BigNumber,
) =>
  borrowLimitInUSD.gt(0) ? totalBorrowed.dividedBy(borrowLimitInUSD) : undefined

const calculateHealthFactor = (param: {
  userSummary: UserSummary
  amountInMarketReferenceCurrency: BigNumber
  reserveLiquidationThreshold: number
  isNegative?: boolean
}) => {
  const {
    userSummary,
    amountInMarketReferenceCurrency,
    reserveLiquidationThreshold,
    isNegative,
  } = param

  const {
    totalBorrowedInMarketReferenceCurrency,
    totalCollateralInMarketReferenceCurrency:
      currentCollateralInMarketReferenceCurrency,
    currentLiquidationThreshold,
  } = userSummary

  const totalCollateralInMarketReferenceCurrency =
    currentCollateralInMarketReferenceCurrency.plus(
      isNegative
        ? amountInMarketReferenceCurrency.negated()
        : amountInMarketReferenceCurrency,
    )

  const delta = amountInMarketReferenceCurrency.multipliedBy(
    reserveLiquidationThreshold,
  )
  const liquidationThreshold = currentLiquidationThreshold
    .multipliedBy(currentCollateralInMarketReferenceCurrency)
    .plus(isNegative ? delta.negated() : delta)
    .div(totalCollateralInMarketReferenceCurrency)

  return calculateHealthFactorFromBalancesBigUnits({
    collateralBalanceMarketReferenceCurrency:
      totalCollateralInMarketReferenceCurrency,
    borrowBalanceMarketReferenceCurrency:
      totalBorrowedInMarketReferenceCurrency,
    currentLiquidationThreshold: liquidationThreshold,
  })
}

const validEstimationInput = (
  amount: BigNumber | undefined,
): amount is BigNumber => !!(amount && !amount.isNaN() && amount.gt(BN_ZERO))

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
