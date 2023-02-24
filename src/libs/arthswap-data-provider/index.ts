import { valueToBigNumber } from '@starlay-finance/math-utils'
import { GraphQLClient } from 'graphql-request'
import { ChainId, getNetworkConfig } from 'src/libs/config'
import { getSdk } from './__generated__/graphql'

const graphqlClient = (endpoint: string) => getSdk(new GraphQLClient(endpoint))

export const getLAYPrice = async (chainId: ChainId) => {
  const { arthswapDataProvider, baseAsset, rewardToken } =
    getNetworkConfig(chainId)
  if (!arthswapDataProvider) return undefined
  const client = graphqlClient(arthswapDataProvider.endpoint)
  const res = await client.ListPrices({
    input: {
      quoteToken: baseAsset.wrapperAddress,
      tokens: [rewardToken.underlyingAsset],
    },
  })
  const priceInQuoteToken = res.getPrices.prices[0]?.priceInQuoteToken
  const quoteTokenPriceInUSD = res.getPrices.quoteTokenPriceInUSD
  if (!priceInQuoteToken || !quoteTokenPriceInUSD) return undefined
  return valueToBigNumber(priceInQuoteToken).times(quoteTokenPriceInUSD)
}
