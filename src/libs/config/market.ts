import { EthereumAddress } from 'src/types/web3'
import { ValueOf } from 'type-fest'
import { EVMChainId, EVM_CHAIN_ID } from './network'

export const EVM_CUSTOM_MARKET = {
  proto_mandala: 'proto_mandala',
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
  [EVM_CUSTOM_MARKET.proto_mandala]: {
    chainId: EVM_CHAIN_ID.mandala,
    enabledFeatures: {
      incentives: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER:
        '0x5Ec3d1411c20A24809ab0B72FBe746874b6E72a0',
      INCENTIVES_CONTROLLER: '0x5919be3B0Fce25A9500EE2548782C2c4C246a36C',
      LENDING_POOL: '0x5475fa29efA24d61D6BAF689191a5b1f7B3a4B2B',
    },
  },
} as const

export const CHAIN_MARKET_CONFIG: {
  [key in EVMChainId]: EVMMarketConfig
} = {
  [EVM_CHAIN_ID.mandala]: MARKET_CONFIGS.proto_mandala,
} as const
