import { AssetSymbol } from 'src/types/models'
import { EthereumAddress } from 'src/types/web3'
import { ValueOf } from 'type-fest'

export const CHAIN_ID = {
  shiden: 336,
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
  [CHAIN_ID.shiden]: {
    name: 'Shiden Network',
    publicJsonRPCUrl: ['https://rpc.shiden.astar.network:8545'],
    addresses: {
      walletBalanceProvider: '0x8f8bc2b26ed0917B6cCCE31f56ad6285f736eD2b',
      uiPoolDataProvider: '0x5ee008fBfDd911A88a8F79f28236Af82C4e9D362',
      uiIncentiveDataProvider: '0x9bF9780695736cD44EFcEEFF51Acc823377cb81F',
      stakeUiHelper: '0xe612C6C60FFbbE63e5822a9E7A098761b08D3C08',
      priceAggregatorAdapterAddress:
        '0x1722dcd654c9c2C62753480D12d389497A541e75',
    },
    baseAsset: {
      symbol: 'SDN',
      wrapperAddress: '0x44a26AE046a01d99eBAbecc24B4d61B388656871',
    },
    rewardToken: {
      symbol: 'stkLAY',
      address: '0x4cff3b5f6ba3d64083963de201089f3267490c65',
      underlyingAsset: '0xb163716cb6c8b0a56e4f57c394A50F173E34181b',
      decimals: 18,
    },
    explorerLinks: ['https://blockscout.com/shiden'],
    isTestnet: true,
  },
}
