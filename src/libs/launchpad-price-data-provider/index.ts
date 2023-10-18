import { valueToBigNumber } from '@starlay-finance/math-utils'
import { GraphQLClient } from 'graphql-request'
import { Market, PriceChartData } from 'src/components/screens/Launchpad/types'
import { BN_ZERO } from 'src/utils/number'
import { EVMChainId, getNetworkConfigEVM } from '../config'
import { getSdk } from './__generated__/graphql'

const graphqlClient = (endpoint: string, apiKey?: string) =>
  getSdk(
    new GraphQLClient(endpoint, {
      headers: apiKey ? { 'x-api-key': apiKey } : {},
    }),
  )

export const getCurrentPrice = async (
  chainId: EVMChainId,
  projectId: string,
): Promise<Omit<Market, 'numOfBids'> | undefined> => {
  const { launchpadHistoricalDataProvider } = getNetworkConfigEVM(chainId)
  if (!launchpadHistoricalDataProvider) return undefined
  const client = graphqlClient(
    launchpadHistoricalDataProvider.endpoint,
    launchpadHistoricalDataProvider.apiKey,
  )
  const res = await client.GetCurrentPrice({ projectId })
  if (!res.priceCurrent)
    return {
      currentPriceInUSD: BN_ZERO,
      bottomPriceInUSD: BN_ZERO,
      raisedAmountInUSD: BN_ZERO,
      boostedRaisedAmountInUSD: BN_ZERO,
    }
  return {
    currentPriceInUSD: valueToBigNumber(res.priceCurrent.data),
    bottomPriceInUSD: valueToBigNumber(res.priceCurrent.bottomPrice),
    raisedAmountInUSD: valueToBigNumber(res.priceCurrent.amountOfRaised),
    boostedRaisedAmountInUSD: valueToBigNumber(
      res.priceCurrent.boostedAmountOfRaised,
    ),
  }
}

export const listPricesHistorical = async (
  chainId: EVMChainId,
  projectId: string,
  fromTimestamp?: number,
): Promise<PriceChartData[]> => {
  const { launchpadHistoricalDataProvider } = getNetworkConfigEVM(chainId)
  if (!launchpadHistoricalDataProvider) return []
  const client = graphqlClient(
    launchpadHistoricalDataProvider.endpoint,
    launchpadHistoricalDataProvider.apiKey,
  )
  const res = await client.ListPricesHistorical({
    input: { projectId, fromTimestamp },
  })
  return res.prices5Min.items.map(({ data, bottomPrice, timestamp }) => ({
    priceInUSD: +data,
    bottomPriceInUSD: +bottomPrice,
    timestamp,
  }))
}
