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
      walletBalanceProvider: '0x03416c018C7202A1aE7e27d8D1D16f989F347f06',
      uiPoolDataProvider: '0xC649aA738A2677Cca93a6a3bD5a1cF18D11815E5',
      uiIncentiveDataProvider: '0x07CAaB4baD2856109C3bdbc9E396e42E53E9D988',
      stakeUiHelper: '0x4Bf59A3F1D9419cb2234BbDFD8cb5f3654a79e9a',
      priceAggregatorAdapterAddress:
        '0xA762C9B14600bD3583069E5fc4a4090AabaDA13e',
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
