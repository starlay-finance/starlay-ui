import { valueToBigNumber } from '@starlay-finance/math-utils'
import { GraphQLClient } from 'graphql-request'
import { Market, PriceChartData } from 'src/components/screens/Launchpad/types'
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
): Promise<
  Pick<Market, 'currentPriceInUSD' | 'bottomPriceInUSD'> | undefined
> => {
  const { launchpadHistoricalDataProvider } = getNetworkConfig(chainId)
  if (!launchpadHistoricalDataProvider) return undefined
  const client = graphqlClient(
    launchpadHistoricalDataProvider.endpoint,
    launchpadHistoricalDataProvider.apiKey,
  )
  const res = await client.GetCurrentPrice({ projectId })
  return {
    currentPriceInUSD: valueToBigNumber(res.priceCurrent.data),
    bottomPriceInUSD: valueToBigNumber(res.priceCurrent.bottomPrice),
  }
}

export const listPricesHistorical = async (
  chainId: ChainId,
  projectId: string,
  fromTimestamp?: number,
): Promise<PriceChartData[]> => {
  const { launchpadHistoricalDataProvider } = getNetworkConfig(chainId)
  if (!launchpadHistoricalDataProvider) return []
  const client = graphqlClient(
    launchpadHistoricalDataProvider.endpoint,
    launchpadHistoricalDataProvider.apiKey,
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
