import { CHAIN_MARKET_CONFIG, EVMMarketConfig } from './market'
import {
  EVMChainId,
  EVMNetworkConfig,
  EVM_NETWORK_CONFIG,
  POLKADOT_NETWORK_CONFIG,
  PolkadotChainId,
  PolkadotNetworkConfig,
  isSupportedChain,
} from './network'

export { isSupportedChain }
export type { EVMChainId, EVMMarketConfig, EVMNetworkConfig }

export type NetworkType = 'EVM' | 'Polkadot'

export const getNetworkConfig = (chainId: EVMChainId): EVMNetworkConfig =>
  EVM_NETWORK_CONFIG[chainId]

export const getMarketConfig = (chainId: EVMChainId): EVMMarketConfig =>
  CHAIN_MARKET_CONFIG[chainId]

export const getNetworkConfigPokadot = (
  chainId: PolkadotChainId,
): PolkadotNetworkConfig => POLKADOT_NETWORK_CONFIG[chainId]
