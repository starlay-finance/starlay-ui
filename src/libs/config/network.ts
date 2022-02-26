import { AssetSymbol } from 'src/types/models'
import { EthereumAddress } from 'src/types/web3'
import { ValueOf } from 'type-fest'

export const CHAIN_ID = {
  astar: 592,
} as const

export type ChainId = ValueOf<typeof CHAIN_ID>

export const isSupportedChain = (arg: any): arg is ChainId =>
  Object.values(CHAIN_ID).includes(arg)

export type NetworkConfig = {
  name: string
  privateJsonRPCUrl?: string
  privateJsonRPCWSUrl?: string
  publicJsonRPCUrl: string[]
  publicJsonRPCWSUrl?: string
  addresses: {
    walletBalanceProvider: EthereumAddress
    uiPoolDataProvider: EthereumAddress
    uiIncentiveDataProvider: EthereumAddress
    stakeUiHelper: EthereumAddress
    priceAggregatorAdapterAddress: EthereumAddress
  }
  protocolDataUrl?: string
  cachingServerUrl?: string
  cachingWSServerUrl?: string
  baseAsset: {
    symbol: AssetSymbol
    wrapperAddress: EthereumAddress
  }
  rewardToken?: {
    symbol: string
    address: EthereumAddress
    underlyingAsset: EthereumAddress
    decimals: number
  }
  explorerLinks?: string[]
  rpcOnly?: boolean
  isTestnet?: boolean
}

export const NETWORK_CONFIG: Record<ChainId, NetworkConfig> = {
  [CHAIN_ID.astar]: {
    name: 'Astar Network',
    publicJsonRPCUrl: ['https://rpc.astar.network:8545'],
    addresses: {
      walletBalanceProvider: '0x64064C72E3174466661b7d201074a7266A7c364B',
      uiPoolDataProvider: '0xa5b24DaF2164745BC5282efdddd275d4489c555d',
      uiIncentiveDataProvider: '0x0E8026a0554B1eBB8fDBAdCbf89531337500576C',
      stakeUiHelper: '0xCD821F1B938beB2EeD757ad34C3a53F220E968Fa',
      priceAggregatorAdapterAddress:
        '0x533ECB70ed59ceDBfcC67A27e1D533f43bEed108',
    },
    baseAsset: {
      symbol: 'ASTR',
      wrapperAddress: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    },
    explorerLinks: ['https://blockscout.com/astar'],
  },
}
