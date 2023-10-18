import { EthereumAddress } from 'src/types/web3'
import { ValueOf } from 'type-fest'
import { EVMChainId, EVM_CHAIN_ID } from './network'

export const EVM_CUSTOM_MARKET = {
  proto_astar: 'proto_astar',
} as const
export type EVMCustomMarket = ValueOf<typeof EVM_CUSTOM_MARKET>

export type EVMMarketConfig = {
  chainId: EVMChainId
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
    INCENTIVES_CONTROLLER: EthereumAddress
    WETH_GATEWAY?: EthereumAddress
    SWAP_COLLATERAL_ADAPTER?: EthereumAddress
    REPAY_WITH_COLLATERAL_ADAPTER?: EthereumAddress
    FAUCET?: EthereumAddress
    PERMISSION_MANAGER?: EthereumAddress
    LEVERAGER?: EthereumAddress
    LAUNCHPAD?: EthereumAddress
  }
}

export const MARKET_CONFIGS: {
  [key in EVMCustomMarket]: EVMMarketConfig
} = {
  [EVM_CUSTOM_MARKET.proto_astar]: {
    chainId: EVM_CHAIN_ID.astar,
    enabledFeatures: {
      incentives: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER:
        '0x4c37A76Bf49c01f91E275d5257a228dad1b74EF9',
      INCENTIVES_CONTROLLER: '0x97Ab79B80E8904214413D8219E8B04373D1030AD',
      LENDING_POOL: '0x90384334333f3356eFDD5b20016350843b90f182',
      WETH_GATEWAY: '0xf630b6d8EB75d3DC9153AAB9e4b6666d4561D6e5',
      LEVERAGER: '0x8D2f5CDe2ABe0A8F96F28c892accBE3BC7C43d45',
    },
  },
} as const

export const CHAIN_MARKET_CONFIG: {
  [key in EVMChainId]: EVMMarketConfig
} = {
  [EVM_CHAIN_ID.astar]: MARKET_CONFIGS.proto_astar,
} as const
