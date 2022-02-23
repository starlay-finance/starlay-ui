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
        '0x21cB8301FFDE9138C018D09DC2811117348EbEe0',
      LENDING_POOL: '0x2547ED579aac7f8974925541FD1F6c8BD85F1Ca1',
      WETH_GATEWAY: '0x5bF42C9b98732B21c7A6e2a6BC09bdd09e88e2ce',
    },
  },
} as const

export const CHAIN_MARKET_CONFIG: {
  [key in ChainId]: MarketDataType
} = {
  [CHAIN_ID.shiden]: MARKET_CONFIGS.proto_shiden,
} as const
