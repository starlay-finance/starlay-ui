import { EthereumAddress } from 'src/types/web3'
import { ValueOf } from 'type-fest'
import { ChainId, CHAIN_ID } from './network'

export const CUSTOM_MARKET = {
  proto_astar: 'proto_astar',
} as const
export type CustomMarket = ValueOf<typeof CUSTOM_MARKET>

export type MarketDataType = {
  chainId: ChainId
  enabledFeatures?: {
    liquiditySwap?: boolean
    staking?: boolean
    governance?: boolean
    faucet?: boolean
    collateralRepay?: boolean
    incentives?: boolean
    permissions?: boolean
  }
  addresses: {
    LENDING_POOL_ADDRESS_PROVIDER: EthereumAddress
    LENDING_POOL: EthereumAddress
    WETH_GATEWAY?: EthereumAddress
    SWAP_COLLATERAL_ADAPTER?: EthereumAddress
    REPAY_WITH_COLLATERAL_ADAPTER?: EthereumAddress
    FAUCET?: EthereumAddress
    PERMISSION_MANAGER?: EthereumAddress
  }
}

export const MARKET_CONFIGS: {
  [key in CustomMarket]: MarketDataType
} = {
  [CUSTOM_MARKET.proto_astar]: {
    chainId: CHAIN_ID.astar,
    enabledFeatures: {
      incentives: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER:
        '0x6F540CdF68a913e64E5E271d2B7CaaEddd99e72A',
      LENDING_POOL: '0x39aa77Aa50dDC4a1d77074891E761f5B73092c79',
      WETH_GATEWAY: '0x6b73da0dE9CE461132fD4B1f2d0eA41E9bBf9Bd5',
    },
  },
} as const

export const CHAIN_MARKET_CONFIG: {
  [key in ChainId]: MarketDataType
} = {
  [CHAIN_ID.astar]: MARKET_CONFIGS.proto_astar,
} as const
