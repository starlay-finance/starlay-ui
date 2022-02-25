import { EthereumAddress } from 'src/types/web3'
import { ValueOf } from 'type-fest'
import { ChainId, CHAIN_ID } from './network'

export const CUSTOM_MARKET = {
  proto_shiden: 'proto_shiden',
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
  [CUSTOM_MARKET.proto_shiden]: {
    chainId: CHAIN_ID.shiden,
    enabledFeatures: {
      incentives: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER:
        '0x1E1254263708b7309e23425BD4509f9820480974',
      LENDING_POOL: '0xcb7e8E25B3A7619c4b656f1d8cE808a0bE39862F',
      WETH_GATEWAY: '0xD5Bec33eB0a5cD8889ea0d19C6aeEC8Ea36E2E8a',
    },
  },
} as const

export const CHAIN_MARKET_CONFIG: {
  [key in ChainId]: MarketDataType
} = {
  [CHAIN_ID.shiden]: MARKET_CONFIGS.proto_shiden,
} as const
