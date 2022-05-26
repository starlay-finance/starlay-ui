import { valueToBigNumber } from '@starlay-finance/math-utils'
import { GraphQLClient } from 'graphql-request'
import { ChainId, getNetworkConfig } from 'src/libs/config'
import { BN_ZERO } from 'src/utils/number'
import { getSdk } from './__generated__/graphql'

const graphqlClient = (endpoint: string) => getSdk(new GraphQLClient(endpoint))

const parseArthswapPairs = (
  lpName: string,
  baseAssetSymbol: string,
): [string, string] => {
  const [symbol1, symbol2] = lpName.split(/[\/-]/)
  if (symbol1 === `W${baseAssetSymbol}`) return [baseAssetSymbol, symbol2]
  if (symbol2 === `W${baseAssetSymbol}`) return [symbol1, baseAssetSymbol]
  return [symbol1, symbol2]
}

export const listArthswapAprs = async (chainId: ChainId) => {
  const { arthswapDataProvider, baseAsset } = getNetworkConfig(chainId)
  if (!arthswapDataProvider) return undefined
  const client = graphqlClient(arthswapDataProvider.endpoint)
  const res = await client.ListAPRs()
  return (
    res?.getAprs?.map((each) => ({
      symbols: parseArthswapPairs(each?.lpName || '', baseAsset.symbol),
      apr: each?.apr ? valueToBigNumber(each?.apr) : BN_ZERO,
      url: each?.liquidityProvidingURL || '',
    })) || []
  )
}

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
