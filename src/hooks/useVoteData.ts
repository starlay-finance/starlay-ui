import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { AssetSymbol } from 'src/types/models'
import { BN_ZERO } from 'src/utils/number'
import { useMarketData } from './useMarketData'

export type VoteData = {
  total: BigNumber
  data: Record<AssetSymbol, BigNumber>
}

// TODO replace mock value
const MockVoteWeight = valueToBigNumber('10000000')

export const useVoteData = (): { data: VoteData | undefined } => {
  const { data: market } = useMarketData()
  return {
    data: market?.assets.reduce(
      (res, { symbol }) => ({
        total: res.total.plus(MockVoteWeight),
        data: {
          ...res.data,
          [symbol]: MockVoteWeight,
        },
      }),
      { total: BN_ZERO, data: {} },
    ) as VoteData,
  }
}
