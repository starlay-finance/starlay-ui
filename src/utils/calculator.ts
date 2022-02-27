import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { AssetMarketData, User } from 'src/types/models'
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
        rewardInUSD: prev.rewardInUSD.plus(
          rewardInUSD.isFinite() ? rewardInUSD : BN_ZERO,
        ),
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
