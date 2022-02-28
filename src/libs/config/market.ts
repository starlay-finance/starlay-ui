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
        '0x4c37A76Bf49c01f91E275d5257a228dad1b74EF9',
      LENDING_POOL: '0x90384334333f3356eFDD5b20016350843b90f182',
      WETH_GATEWAY: '0xf630b6d8EB75d3DC9153AAB9e4b6666d4561D6e5',
    },
  },
} as const

export const CHAIN_MARKET_CONFIG: {
  [key in ChainId]: MarketDataType
} = {
  [CHAIN_ID.astar]: MARKET_CONFIGS.proto_astar,
} as const
