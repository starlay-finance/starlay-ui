import { CHAIN_MARKET_CONFIG, EVMMarketConfig } from './market'
import {
  EVMChainId,
  EVMNetworkConfig,
  EVM_NETWORK_CONFIG,
  isSupportedChain,
  PolkadotChainId,
  PolkadotNetworkConfig,
  POLKADOT_NETWORK_CONFIG,
} from './network'

export { isSupportedChain }
export type { EVMChainId, EVMMarketConfig, EVMNetworkConfig }

export type NetworkType = 'EVM' | 'Polkadot'

export const getNetworkConfig = <T extends NetworkType>(
  network: T,
  chainId: any,
): T extends 'Polkadot' ? PolkadotNetworkConfig : EVMNetworkConfig =>
  // @ts-ignore
  network === 'Polkadot'
    ? getNetworkConfigPolkadot(chainId)
    : getNetworkConfigEVM(chainId)

export const getNetworkConfigEVM = (chainId: EVMChainId): EVMNetworkConfig =>
  EVM_NETWORK_CONFIG[chainId]

export const getMarketConfigEVM = (chainId: EVMChainId): EVMMarketConfig =>
  CHAIN_MARKET_CONFIG[chainId]

export const getNetworkConfigPolkadot = (
  chainId: PolkadotChainId,
): PolkadotNetworkConfig => POLKADOT_NETWORK_CONFIG[chainId]
