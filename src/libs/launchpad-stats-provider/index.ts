import { valueToBigNumber } from '@starlay-finance/math-utils'
import { GraphQLClient } from 'graphql-request'
import { Market } from 'src/components/screens/Launchpad/types'
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
  projectId: string,
): Promise<
  Omit<Market, 'currentPriceInUSD' | 'bottomPriceInUSD'> | undefined
> => {
  const { launchpadDataProvider } = getNetworkConfig(chainId)
  if (!launchpadDataProvider) return undefined
  const client = graphqlClient(
    launchpadDataProvider.endpoint,
    launchpadDataProvider.apiKey,
  )
  const {
    projectStatistics: [stats],
  } = await client.GetCurrentData({ projectId })
  if (!stats) return undefined
  return {
    raisedAmountInUSD: valueToBigNumber(stats.totalAmount),
    boostedRaisedAmountInUSD: valueToBigNumber(stats.totalMultiplied),
    numOfBids: valueToBigNumber(stats.numOfBidders),
  }
}
