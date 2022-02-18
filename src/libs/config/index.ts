import { CHAIN_MARKET_CONFIG, MarketDataType } from './market'
import {
  ChainId,
  isSupportedChain,
  NetworkConfig,
  NETWORK_CONFIG,
} from './network'

export type { ChainId, NetworkConfig, MarketDataType }
export { isSupportedChain }

export const getNetworkConfig = (chainId: ChainId): NetworkConfig =>
  NETWORK_CONFIG[chainId]

export const getMarketConfig = (chainId: ChainId): MarketDataType =>
  CHAIN_MARKET_CONFIG[chainId]
