import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { AssetMarketData, User } from 'src/types/models'
import { ValueOf } from 'type-fest'
import { BN_ZERO } from './number'

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
