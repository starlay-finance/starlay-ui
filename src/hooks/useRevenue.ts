import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { AssetSymbol } from 'src/types/models'
import { useMarketData } from './useMarketData'

export type RevenueData = Record<AssetSymbol, BigNumber>

// TODO replace mock value
const MockRevenueInUSD = valueToBigNumber('600')

export const useRevenueData = (): { data: RevenueData | undefined } => {
  const { data: market } = useMarketData()
  return {
    data: market?.assets.reduce(
      (res, { symbol }) => ({
        ...res,
        [symbol]: MockRevenueInUSD,
      }),
      {},
    ) as RevenueData,
  }
}
