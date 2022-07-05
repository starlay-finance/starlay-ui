import { normalizeBN } from '@starlay-finance/math-utils'
import { UserVoteData, VoteData } from 'src/types/models'
import { BN_ZERO } from 'src/utils/number'
import { useVoter } from './contracts/useVoter'
import { useVotingEscrow } from './contracts/useVotingEscrow'
import { useMarketData } from './useMarketData'

export const useVoteData = () => {
  const { data: market } = useMarketData()
  const { userData } = useVotingEscrow()
  const { data: voteData, userData: userVoteData } = useVoter()

  const data: VoteData | undefined = market &&
    voteData && {
      total: voteData.total,
      data: market.assets.reduce(
        (res, { lTokenAddress, decimals, priceInMarketReferenceCurrency }) => {
          const item = voteData.data[lTokenAddress.toLowerCase()]
          if (!item) return res
          const lastWeekRevenueInUSD = normalizeBN(
            item.rawLastWeekRevenue,
            decimals,
          ).times(priceInMarketReferenceCurrency)
          return {
            ...res,
            [lTokenAddress.toLowerCase()]: {
              weight: item.weight,
              lastWeekRevenueInUSD,
            },
          }
        },
        {},
      ),
    }
  if (!market || !userData || !userVoteData) return { data }

  const _userVoteData = market.assets.reduce(
    (res, { lTokenAddress, decimals, priceInMarketReferenceCurrency }) => {
      const item = userVoteData.data[lTokenAddress.toLowerCase()]
      if (!item) return res
      const claimableInUSD = normalizeBN(
        item.rawClaimable.toString(),
        decimals,
      ).times(priceInMarketReferenceCurrency)
      return {
        votedTotal: res.votedTotal.plus(item.vote),
        claimableTotalInUSD: res.claimableTotalInUSD.plus(claimableInUSD),
        data: {
          ...res.data,
          [lTokenAddress.toLowerCase()]: {
            weight: item.weight,
            vote: item.vote,
            claimableInUSD: claimableInUSD,
          },
        },
      }
    },
    {
      votedTotal: BN_ZERO,
      claimableTotalInUSD: BN_ZERO,
      data: {},
    },
  ) as unknown as Omit<UserVoteData, 'powerTotal'>
  return {
    data,
    userData: {
      powerTotal: userData.votingPower,
      ..._userVoteData,
      expiry: userVoteData.expiry,
    },
  }
}
