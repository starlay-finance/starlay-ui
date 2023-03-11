import { CHAIN_MARKET_CONFIG, EVMMarketConfig } from './market'
import {
  EVMChainId,
  EVMNetworkConfig,
  isSupportedChain,
  NETWORK_CONFIG,
} from './network'

export type { EVMChainId, EVMNetworkConfig, EVMMarketConfig }
export { isSupportedChain }

export type NetworkType = 'EVM' | 'Polkadot'

export const getNetworkConfig = (chainId: EVMChainId): EVMNetworkConfig =>
  NETWORK_CONFIG[chainId]

export const getMarketConfig = (chainId: EVMChainId): EVMMarketConfig =>
  CHAIN_MARKET_CONFIG[chainId]
