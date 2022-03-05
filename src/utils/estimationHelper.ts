import { t } from '@lingui/macro'
import {
  BigNumber,
  calculateHealthFactorFromBalancesBigUnits,
  valueToBigNumber,
} from '@starlay-finance/math-utils'
import {
  AssetMarketData,
  UserAssetBalance,
  UserSummary,
} from 'src/types/models'
import { convertFromUSD } from './calculator'
import { BN_ONE, BN_ZERO } from './number'

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
    totalBorrowedInMarketReferenceCurrency,
    totalCollateralInMarketReferenceCurrency:
      currentCollateralInMarketReferenceCurrency,
    currentLiquidationThreshold,
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

  const liquidationThreshold = calcLiquidationThreshold(
    {
      threshold: currentLiquidationThreshold,
      collateral: currentCollateralInMarketReferenceCurrency,
    },
    {
      threshold: reserveLiquidationThreshold,
      collateral: amountInMarketReferenceCurrency,
    },
  )
  const healthFactor = calculateHealthFactor({
    totalBorrowedInMarketReferenceCurrency,
    totalCollateralInMarketReferenceCurrency:
      currentCollateralInMarketReferenceCurrency.plus(
        amountInMarketReferenceCurrency,
      ),
    liquidationThreshold,
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
  const unusedCollateral = unusedCollateralOnWithdraw(params)
  const maxAmount = BigNumber.min(
    userAssetBalance.deposited,
    liquidity,
    unusedCollateral,
  )

  if (!validEstimationInput(amount))
    return { unavailableReason: t`Enter amount`, maxAmount }

  const {
    totalBorrowedInUSD: currentBorrowed,
    borrowLimitInUSD: currentLimit,
    totalBorrowedInMarketReferenceCurrency,
    totalCollateralInMarketReferenceCurrency:
      currentCollateralInMarketReferenceCurrency,
    currentLiquidationThreshold,
  } = userSummary

  if (
    !amount.gt(maxAmount) &&
    (!userAssetBalance.usageAsCollateralEnabled || currentBorrowed.isZero())
  )
    return {
      maxAmount,
      availableBorrowsInUSD: userSummary.availableBorrowsInUSD,
      borrowLimitUsed: userSummary.borrowLimitUsed,
      healthFactor: userSummary.healthFactor,
    }

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

  const liquidationThreshold = calcLiquidationThreshold(
    {
      threshold: currentLiquidationThreshold,
      collateral: currentCollateralInMarketReferenceCurrency,
    },
    {
      threshold: reserveLiquidationThreshold,
      collateral: amountInMarketReferenceCurrency.negated(),
    },
  )
  const healthFactor = calculateHealthFactor({
    totalBorrowedInMarketReferenceCurrency,
    totalCollateralInMarketReferenceCurrency:
      currentCollateralInMarketReferenceCurrency.minus(
        amountInMarketReferenceCurrency,
      ),
    liquidationThreshold,
  })

  const unavailableReason = withdrawUnavailableReason(
    amount,
    userAssetBalance.deposited,
    unusedCollateral,
    asset.liquidity,
    healthFactor,
  )
  return {
    unavailableReason,
    maxAmount,
    availableBorrowsInUSD,
    borrowLimitUsed,
    healthFactor,
  }
}

const withdrawUnavailableReason = (
  amount: BigNumber,
  deposited: BigNumber,
  unusedCollateral: BigNumber,
  liquidity: BigNumber,
  healthFactor: BigNumber,
) => {
  if (amount.gt(deposited)) return t`No balance to withdraw`
  if (amount.gt(unusedCollateral)) return t`Insufficient collateral`
  if (amount.gt(liquidity)) return t`No liquidity to withdraw`
  if (healthFactor.gte(HEALTH_FACTOR_THRESHOLD)) return undefined
  return t`Health factor too low`
}

export const estimateBorrow = ({
  amount,
  userSummary,
  asset: { priceInMarketReferenceCurrency, liquidity },
  marketReferenceCurrencyPriceInUSD,
}: EstimationParam): EstimationResult => {
  const {
    availableBorrowsInUSD: currentBorrowableInUSD,
    totalBorrowedInUSD: currentBorrowedInUSD,
    borrowLimitInUSD,
    totalCollateralInMarketReferenceCurrency,
    totalBorrowedInMarketReferenceCurrency:
      currentBorrowedInMarketReferenceCurrency,
    currentLiquidationThreshold,
  } = userSummary
  const currentBorrowable = convertFromUSD(
    priceInMarketReferenceCurrency,
    marketReferenceCurrencyPriceInUSD,
    currentBorrowableInUSD,
  )
  const maxAmount = BigNumber.min(currentBorrowable, liquidity)
  if (!validEstimationInput(amount))
    return { unavailableReason: t`Enter amount`, maxAmount }

  const amountInMarketReferenceCurrency = amount.multipliedBy(
    priceInMarketReferenceCurrency,
  )
  const totalBorrowedInUSD = currentBorrowedInUSD.plus(
    amountInMarketReferenceCurrency.multipliedBy(
      marketReferenceCurrencyPriceInUSD,
    ),
  )

  const borrowLimitUsed = calcBorrowLimitUsed(
    borrowLimitInUSD,
    totalBorrowedInUSD,
  )

  const healthFactor = calculateHealthFactor({
    totalBorrowedInMarketReferenceCurrency:
      currentBorrowedInMarketReferenceCurrency.plus(
        amountInMarketReferenceCurrency,
      ),
    totalCollateralInMarketReferenceCurrency,
    liquidationThreshold: currentLiquidationThreshold,
  })
  const unavailableReason = borrowUnavailableReason(
    amount,
    currentBorrowable,
    liquidity,
    healthFactor,
  )
  return {
    unavailableReason,
    maxAmount,
    totalBorrowedInUSD,
    borrowLimitUsed,
    healthFactor,
  }
}
export const borrowUnavailableReason = (
  amount: BigNumber,
  currentBorrowable: BigNumber,
  liquidity: BigNumber,
  healthFactor: BigNumber,
) => {
  if (amount.gt(currentBorrowable)) return t`Borrowing limit reached`
  if (amount.gt(liquidity)) return t`No liquidity to borrow`
  if (healthFactor.isPositive() && healthFactor.lt(HEALTH_FACTOR_THRESHOLD))
    return t`Health factor too low`
  return undefined
}

export const estimateRepayment = ({
  amount,
  userAssetBalance,
  userSummary,
  asset: { priceInMarketReferenceCurrency },
  marketReferenceCurrencyPriceInUSD,
}: EstimationParam): EstimationResult => {
  const { borrowed: currentBorrowed, inWallet } = userAssetBalance
  const maxAmount = BigNumber.min(currentBorrowed, inWallet)
  if (!validEstimationInput(amount))
    return { unavailableReason: t`Enter amount`, maxAmount }

  const {
    totalBorrowedInUSD: currentBorrowedInUSD,
    totalBorrowedInMarketReferenceCurrency:
      currentBorrowedInMarketReferenceCurrency,
    borrowLimitInUSD,
    totalCollateralInMarketReferenceCurrency,
    currentLiquidationThreshold,
  } = userSummary
  const amountInMarketReferenceCurrency = amount.multipliedBy(
    priceInMarketReferenceCurrency,
  )
  const totalBorrowedInUSD = currentBorrowedInUSD.minus(
    amountInMarketReferenceCurrency.multipliedBy(
      marketReferenceCurrencyPriceInUSD,
    ),
  )

  const borrowLimitUsed = calcBorrowLimitUsed(
    borrowLimitInUSD,
    totalBorrowedInUSD,
    BN_ONE,
  )

  const healthFactor = calculateHealthFactor({
    totalBorrowedInMarketReferenceCurrency:
      currentBorrowedInMarketReferenceCurrency.minus(
        amountInMarketReferenceCurrency,
      ),
    totalCollateralInMarketReferenceCurrency,
    liquidationThreshold: currentLiquidationThreshold,
  })

  return {
    unavailableReason: amount.gt(inWallet) ? t`No balance to repay` : undefined,
    maxAmount,
    totalBorrowedInUSD,
    borrowLimitUsed,
    healthFactor,
  }
}

const unusedCollateralOnWithdraw = ({
  asset,
  userSummary,
  userAssetBalance,
}: EstimationParam) => {
  if (
    !userAssetBalance.usageAsCollateralEnabled ||
    !asset.usageAsCollateralEnabled ||
    userSummary.totalBorrowedInMarketReferenceCurrency.isZero()
  )
    return valueToBigNumber(Infinity)
  const excessHF = userSummary.healthFactor.minus('1')
  if (!excessHF.isPositive()) return BN_ZERO
  return (
    excessHF
      .multipliedBy(userSummary.totalBorrowedInMarketReferenceCurrency)
      // because of the rounding issue on the contracts side this value still can be incorrect
      .div(asset.reserveLiquidationThreshold.plus('0.01'))
      .multipliedBy('0.99')
      .dividedBy(asset.priceInMarketReferenceCurrency)
  )
}

const calcBorrowLimitUsed = (
  borrowLimitInUSD: BigNumber,
  totalBorrowed: BigNumber,
  defaultValue?: BigNumber,
) =>
  borrowLimitInUSD.gt(0)
    ? totalBorrowed.dividedBy(borrowLimitInUSD)
    : defaultValue

const calcLiquidationThreshold = (
  current: { threshold: BigNumber; collateral: BigNumber },
  delta: { threshold: number; collateral: BigNumber },
) =>
  current.collateral
    .multipliedBy(current.threshold)
    .plus(delta.collateral.multipliedBy(delta.threshold))
    .div(current.collateral.plus(delta.collateral))

const calculateHealthFactor = (param: {
  totalCollateralInMarketReferenceCurrency: BigNumber
  totalBorrowedInMarketReferenceCurrency: BigNumber
  liquidationThreshold: BigNumber
}) => {
  const result = calculateHealthFactorFromBalancesBigUnits({
    collateralBalanceMarketReferenceCurrency:
      param.totalCollateralInMarketReferenceCurrency,
    borrowBalanceMarketReferenceCurrency:
      param.totalBorrowedInMarketReferenceCurrency,
    currentLiquidationThreshold: param.liquidationThreshold,
  })
  if (param.totalBorrowedInMarketReferenceCurrency.isZero()) return result
  return result.isPositive() ? result : BN_ZERO
}

const validEstimationInput = (
  amount: BigNumber | undefined,
): amount is BigNumber => !!(amount && !amount.isNaN() && amount.gt(BN_ZERO))
