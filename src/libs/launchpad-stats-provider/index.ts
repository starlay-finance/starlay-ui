import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { GraphQLClient } from 'graphql-request'
import { Bid, Market } from 'src/components/screens/Launchpad/types'
import { BN_ZERO } from 'src/utils/number'
import { ChainId, getNetworkConfig } from '../config'
import { getSdk } from './__generated__/graphql'

const graphqlClient = (endpoint: string, apiKey?: string) =>
  getSdk(
    new GraphQLClient(endpoint, {
      headers: apiKey ? { 'x-api-key': apiKey } : {},
    }),
  )

export const getCurrentStats = async (
  chainId: ChainId,
  id: string,
): Promise<(Partial<Market> & { numOfBids: BigNumber }) | undefined> => {
  const { launchpadDataProvider } = getNetworkConfig(chainId)
  if (!launchpadDataProvider) return undefined
  const client = graphqlClient(
    launchpadDataProvider.endpoint,
    launchpadDataProvider.apiKey,
  )
  const { projectStatistic, projectResult } = await client.GetCurrentData({
    id: id.toLowerCase(),
  })
  if (!projectResult)
    return {
      numOfBids: projectStatistic
        ? valueToBigNumber(projectStatistic.numOfBidders)
        : BN_ZERO,
    }
  return {
    currentPriceInUSD: valueToBigNumber(projectResult.price),
    bottomPriceInUSD: valueToBigNumber(projectResult.bottomPrice),
    raisedAmountInUSD: valueToBigNumber(projectResult.totalAmount),
    boostedRaisedAmountInUSD: valueToBigNumber(projectResult.totalMultiplied),
    numOfBids: valueToBigNumber(projectResult.numOfBidders),
  }
}

export const getBid = async (
  chainId: ChainId,
  projectId: string,
  account: string,
): Promise<Bid | undefined> => {
  const { launchpadDataProvider } = getNetworkConfig(chainId)
  if (!launchpadDataProvider) return undefined
  const client = graphqlClient(
    launchpadDataProvider.endpoint,
    launchpadDataProvider.apiKey,
  )
  const { bid } = await client.GetBid({
    id: `${projectId}:${account}`.toLowerCase(),
  })
  if (!bid) return undefined
  const limitPrice = valueToBigNumber(bid.cap)
  return {
    amount: valueToBigNumber(bid.amount),
    limitPrice: limitPrice.isZero() ? undefined : limitPrice,
    cancelable: bid.cancellable,
  }
}
