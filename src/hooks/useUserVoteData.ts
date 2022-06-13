import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { AssetSymbol } from 'src/types/models'
import { BN_ZERO } from 'src/utils/number'
import { useMarketData } from './useMarketData'

export type UserVoteData = {
  total: BigNumber
  votedTotal: BigNumber
  claimableTotalInUSD: BigNumber
  data: Record<AssetSymbol, { voted: BigNumber; claimableInUSD: BigNumber }>
}

// TODO replace mock value
const MockVoteWeight = valueToBigNumber('1000')
const MockClaimable = valueToBigNumber('10')

export const useUserVoteData = (): { data: UserVoteData | undefined } => {
  const { data: market } = useMarketData()
  return {
    data: market?.assets.reduce(
      (res, { symbol }) => ({
        total: res.total.plus(MockVoteWeight),
        votedTotal: res.votedTotal.plus(MockVoteWeight),
        claimableTotalInUSD: res.claimableTotalInUSD.plus(MockClaimable),
        data: {
          ...res.data,
          [symbol]: { voted: MockVoteWeight, claimableInUSD: MockClaimable },
        },
      }),
      {
        total: BN_ZERO,
        votedTotal: BN_ZERO,
        claimableTotalInUSD: BN_ZERO,
        data: {},
      },
    ) as UserVoteData,
  }
}
