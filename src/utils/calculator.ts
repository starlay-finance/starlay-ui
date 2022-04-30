import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { AssetMarketData, User } from 'src/types/models'
import { ValueOf } from 'type-fest'
import { BN_ONE, BN_ZERO } from './number'

BigNumber.config({ EXPONENTIAL_AT: 1e9 })

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
    (prev, [symbol, balance]) => {
      const asset = assets.find((each) => each.symbol === symbol)
      if (!asset) return prev
      const pl = calculateAssetPL(
        balance,
        asset,
        marketReferenceCurrencyPriceInUSD,
      )
      return {
        profitInUSD: prev.profitInUSD.plus(pl.profitInUSD),
        lossInUSD: prev.lossInUSD.plus(pl.lossInUSD),
        rewardInUSD: prev.rewardInUSD.plus(pl.rewardInUSD),
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

export const calculateAssetPL = (
  { deposited, borrowed }: ValueOf<User['balanceByAsset']>,
  asset: AssetMarketData,
  marketReferenceCurrencyPriceInUSD: BigNumber,
) => {
  const {
    priceInMarketReferenceCurrency,
    depositAPY,
    depositIncentiveAPR,
    variableBorrowAPY,
    variableBorrowIncentiveAPR,
  } = asset

  const assetPriceInUSD = priceInMarketReferenceCurrency.multipliedBy(
    marketReferenceCurrencyPriceInUSD,
  )
  const depositedInUSD = deposited.multipliedBy(assetPriceInUSD)
  const borrowedInUSD = borrowed.multipliedBy(assetPriceInUSD)
  const rewardInUSD = depositedInUSD
    .multipliedBy(
      depositIncentiveAPR.isFinite() ? asset.depositIncentiveAPR : BN_ZERO,
    )
    .plus(
      borrowedInUSD.multipliedBy(
        variableBorrowIncentiveAPR.isFinite()
          ? asset.variableBorrowIncentiveAPR
          : BN_ZERO,
      ),
    )
  return {
    profitInUSD: depositedInUSD.multipliedBy(depositAPY),
    lossInUSD: borrowedInUSD.multipliedBy(variableBorrowAPY),
    rewardInUSD,
  }
}

export const calculateLoopingAPR = (params: {
  leverage: BigNumber
  depositIncentiveAPR: BigNumber
  variableBorrowIncentiveAPR: BigNumber
}) => {
  const base = BN_ONE
  const maxDeposit = base.multipliedBy(params.leverage)
  const maxBorrow = maxDeposit.minus(base)
  return maxDeposit
    .multipliedBy(params.depositIncentiveAPR)
    .plus(maxBorrow.multipliedBy(params.variableBorrowIncentiveAPR))
    .div(base)
}

export const ltvToLoopingLeverage = (ltv: BigNumber) =>
  BN_ONE.div(BN_ONE.minus(ltv))

export const loopingLeverageToLtv = (leverage: BigNumber) =>
  BN_ONE.minus(BN_ONE.div(leverage))

export const significantLoopingCount = (
  leverage: BigNumber,
  significantDigits = 1,
  maxCount = 40,
) => {
  const ltv = loopingLeverageToLtv(leverage)
  let currentleverage = BN_ONE
  let prevLtv = ltv
  const significantNum = BN_ONE.shiftedBy(significantDigits * -1)
  for (let i = 1; i < 40; i++) {
    currentleverage = currentleverage.plus(prevLtv)
    prevLtv = prevLtv.multipliedBy(ltv)
    if (leverage.minus(currentleverage).lt(significantNum))
      return Math.max(i, 2)
  }
  return maxCount
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
