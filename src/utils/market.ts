import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { SYMBOL_ORDER } from 'src/constants/assets'
import {
  AssetMarketData,
  AssetSymbol,
  MarketComposition,
  MarketCompositions,
} from 'src/types/models'
import { Sorter } from 'src/types/utili'
import { IterableElement } from 'type-fest'

const EMPTY_MARKET_COMPSITION: MarketComposition = {
  totalInUSD: valueToBigNumber(0),
  amountByAssets: [],
}

const EMPTY_MARKET_COMPOSITIONS: MarketCompositions = {
  deposit: EMPTY_MARKET_COMPSITION,
  borrow: EMPTY_MARKET_COMPSITION,
}

export const symbolSorter: Sorter<{ symbol: AssetSymbol }> = (a, b) => {
  return SYMBOL_ORDER[a.symbol] > SYMBOL_ORDER[b.symbol] ? 1 : -1
}

export const amountByAssetsSorter: Sorter<
  IterableElement<MarketComposition['amountByAssets']>
> = (a, b) => {
  if (a.amountInUSD.lt(b.amountInUSD)) return 1
  if (a.amountInUSD.gt(b.amountInUSD)) return -1
  return a.symbol > b.symbol ? 1 : -1
}
export const aprSorter: Sorter<{ apr: BigNumber }> = (a, b) => {
  if (a.apr.lt(b.apr)) return 1
  if (a.apr.gt(b.apr)) return -1
  return 0
}

export const toMarketCompositions = (data: AssetMarketData[]) =>
  data.reduce<MarketCompositions>((prev, current) => {
    const { deposit, borrow } = prev
    const { symbol, totalDepositedInUSD, totalBorrowedInUSD } = current
    return {
      deposit: addToMarketComposition(symbol, totalDepositedInUSD, deposit),
      borrow: addToMarketComposition(symbol, totalBorrowedInUSD, borrow),
    }
  }, EMPTY_MARKET_COMPOSITIONS)

const addToMarketComposition = (
  symbol: AssetSymbol,
  amountInUSD: BigNumber,
  market: MarketComposition,
) => {
  let existing = false
  const amountByAssets = market.amountByAssets.map((value) => {
    if (value.symbol == symbol) {
      existing = true
      return {
        symbol,
        amountInUSD: value.amountInUSD.plus(amountInUSD),
      }
    }
    return value
  })

  return {
    totalInUSD: market.totalInUSD.plus(amountInUSD),
    amountByAssets: existing
      ? amountByAssets
      : amountByAssets.concat({
          symbol,
          amountInUSD: amountInUSD,
        }),
  }
}
