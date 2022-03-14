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
  const res = mockres.data || (await client.ListAPRs())
  return (
    res?.getAprs?.map((each) => ({
      symbols: parseArthswapPairs(each?.lpName || '', baseAsset.symbol),
      apr: each?.apr ? valueToBigNumber(each?.apr) : BN_ZERO,
    })) || []
  )
}

const mockres = {
  data: {
    getAprs: [
      {
        lpName: 'USDT/USDC-LP',
        apr: 0.54,
        liquidity: 29720054,
        multipler: 30,
        updatedAt: 1647250622236,
      },
      {
        lpName: 'BUSD/USDC-LP',
        apr: 0.57,
        liquidity: 28197666,
        multipler: 30,
        updatedAt: 1647250622236,
      },
      {
        lpName: 'DAI/USDC-LP',
        apr: 0.62,
        liquidity: 26017802,
        multipler: 30,
        updatedAt: 1647250622236,
      },
      {
        lpName: 'WETH/WASTR-LP',
        apr: 1.17,
        liquidity: 6852270,
        multipler: 15,
        updatedAt: 1647250622236,
      },
      {
        lpName: 'USDC/WASTR-LP',
        apr: 0.53,
        liquidity: 5031138,
        multipler: 5,
        updatedAt: 1647250622236,
      },
      {
        lpName: 'USDT/WASTR-LP',
        apr: 0.5,
        liquidity: 5336415,
        multipler: 5,
        updatedAt: 1647250622236,
      },
      {
        lpName: 'WBTC/WASTR-LP',
        apr: 0.09,
        liquidity: 576863,
        multipler: 0.1,
        updatedAt: 1647250622236,
      },
      {
        lpName: 'BNB/WASTR-LP',
        apr: 0.92,
        liquidity: 57726,
        multipler: 0.1,
        updatedAt: 1647250622236,
      },
      {
        lpName: 'MATIC/WASTR-LP',
        apr: 1.31,
        liquidity: 40782,
        multipler: 0.1,
        updatedAt: 1647250622236,
      },
      {
        lpName: 'WSDN/WASTR-LP',
        apr: 0.0054,
        liquidity: 9930343,
        multipler: 0.1,
        updatedAt: 1647250622236,
      },
    ],
  },
}
