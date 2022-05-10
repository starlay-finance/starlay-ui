import { valueToBigNumber } from '@starlay-finance/math-utils'
import { GraphQLClient } from 'graphql-request'
import { Market, PriceChartData } from 'src/components/screens/LaundPad/types'
import { BN_ZERO } from 'src/utils/number'
import { ChainId, getNetworkConfig } from '../config'
import { getSdk } from './__generated__/graphql'

const graphqlClient = (endpoint: string, apiKey?: string) =>
  getSdk(
    new GraphQLClient(endpoint, {
      headers: apiKey ? { 'x-api-key': apiKey } : {},
    }),
  )

export const getCurrentPrice = async (
  chainId: ChainId,
  projectId: string,
): Promise<Market | undefined> => {
  const { launchpadDataProvider } = getNetworkConfig(chainId)
  if (!launchpadDataProvider) return undefined
  const client = graphqlClient(
    launchpadDataProvider.endpoint,
    launchpadDataProvider.apiKey,
  )
  const res = await client.GetCurrentPrice({ projectId })
  return {
    currentPriceInUSD: valueToBigNumber(res.priceCurrent.data),
    bottomPriceInUSD: BN_ZERO,
    raisedAmountInUSD: BN_ZERO,
    boostedRaisedAmountInUSD: BN_ZERO,
    numOfBids: BN_ZERO,
  }
}

export const listPricesHistorical = async (
  chainId: ChainId,
  projectId: string,
  fromTimestamp?: number,
): Promise<PriceChartData[]> => {
  const { launchpadDataProvider } = getNetworkConfig(chainId)
  if (!launchpadDataProvider) return []
  const client = graphqlClient(
    launchpadDataProvider.endpoint,
    launchpadDataProvider.apiKey,
  )
  const res = await client.ListPricesHistorical({
    input: { projectId, fromTimestamp },
  })
  return res.prices5Min.items.map(({ data, timestamp }) => ({
    priceInUSD: +data,
    bottomPriceInUSD: 0,
    timestamp,
  }))
}
