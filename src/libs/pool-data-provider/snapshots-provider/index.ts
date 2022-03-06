import { Dayjs } from 'dayjs'
import { GraphQLClient } from 'graphql-request'
import { ChainId, getNetworkConfig } from 'src/libs/config'
import { formatReserves } from '..'
import { getSdk } from './__generated__/graphql'

const graphqlClient = (endpoint: string, apiKey?: string) =>
  getSdk(
    new GraphQLClient(endpoint, {
      headers: apiKey ? { 'x-api-key': apiKey } : {},
    }),
  )

export const getPoolDataSnapshot = async (chainId: ChainId, date: Dayjs) => {
  const { baseAsset, rewardToken, snapshotProvider } = getNetworkConfig(chainId)
  if (!snapshotProvider) return undefined
  const client = graphqlClient(
    snapshotProvider.endpoint,
    snapshotProvider.apiKey,
  )
  const res = await client.GetAssetData({ date: date.toISOString() })
  const { poolData, reservesIncentives, timestamp } = res.getAssetData!
  return formatReserves(
    {
      baseCurrencyData: poolData.baseCurrencyData,
      reservesData: poolData.reservesData,
    },
    reservesIncentives,
    timestamp,
    baseAsset,
    {
      [rewardToken.address.toLowerCase()]:
        rewardToken.underlyingAsset.toLowerCase(),
    },
  )
}
