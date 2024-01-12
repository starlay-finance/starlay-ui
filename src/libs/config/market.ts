import { EthereumAddress } from 'src/types/web3'
import { ValueOf } from 'type-fest'
import { EVMChainId, EVM_CHAIN_ID } from './network'

export const EVM_CUSTOM_MARKET = {
  proto_acala: 'proto_acala',
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
  [EVM_CUSTOM_MARKET.proto_acala]: {
    chainId: EVM_CHAIN_ID.acala,
    enabledFeatures: {
      incentives: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER:
        '0x5AA0f1456dA50828F6eFb5B751F51a402bB25bBD',
      INCENTIVES_CONTROLLER: '0x6b26AB9ABB4f8c2354EB0360602490d72a187907',
      LENDING_POOL: '0x2669ff3a081ddA63E7c353b6dF64fA33050A9D6D',
    },
  },
} as const

export const CHAIN_MARKET_CONFIG: {
  [key in EVMChainId]: EVMMarketConfig
} = {
  [EVM_CHAIN_ID.acala]: MARKET_CONFIGS.proto_acala,
} as const
