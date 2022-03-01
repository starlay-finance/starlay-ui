import { ChainId, getMarketConfig, getNetworkConfig } from 'src/libs/config'
import { EthereumAddress } from 'src/types/web3'
import { RPCClient } from './providers'
import { PoolDataProviderInterface, StaticRPCProvider } from './types'

export * from './converters'
export * from './types'

export type PoolDataProvider = {
  chainId: ChainId
  provider: PoolDataProviderInterface
}

export const getPoolDataProvider = ({
  chainId,
  provider,
}: StaticRPCProvider): PoolDataProvider => {
  const { addresses, baseAsset, rewardToken } = getNetworkConfig(chainId)
  const {
    addresses: { LENDING_POOL_ADDRESS_PROVIDER },
  } = getMarketConfig(chainId)
  const {
    uiPoolDataProvider,
    uiIncentiveDataProvider,
    priceAggregatorAdapterAddress,
  } = addresses
  const rewardTokenAddress =
    rewardToken.address.toLowerCase() as EthereumAddress
  return {
    chainId,
    provider: RPCClient.new({
      uiPoolDataProvider,
      uiIncentiveDataProvider,
      priceAggregatorAdapterAddress,
      lendingPoolAddressProvider: LENDING_POOL_ADDRESS_PROVIDER,
      baseAsset,
      provider,
      rewardToken: rewardTokenAddress,
      rewardUndelyingAssetDict: {
        [rewardTokenAddress]: rewardToken.underlyingAsset.toLowerCase(),
      },
    }),
  }
}
