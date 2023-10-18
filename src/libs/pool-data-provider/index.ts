import {
  EVMChainId,
  getMarketConfigEVM,
  getNetworkConfigEVM,
} from 'src/libs/config'
import { EthereumAddress } from 'src/types/web3'
import { StaticRPCProviderEVM } from '../static-rpc-provider'
import { RPCClient } from './providers'
import { PoolDataProviderInterface } from './types'

export * from './converters'
export * from './types'

export type PoolDataProvider = {
  chainId: EVMChainId
  provider: PoolDataProviderInterface
}

export const getPoolDataProvider = ({
  chainId,
  provider,
}: StaticRPCProviderEVM): PoolDataProvider => {
  const { addresses, baseAsset, rewardToken } = getNetworkConfigEVM(chainId)
  const {
    addresses: { LENDING_POOL_ADDRESS_PROVIDER },
  } = getMarketConfigEVM(chainId)
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
