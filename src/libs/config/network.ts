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
    symbol: AssetSymbol
    address: EthereumAddress
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
      walletBalanceProvider: '0x40Ea75a8cCa05606870a13463bc7d05508780f9B',
      uiPoolDataProvider: '0x80012814a73F0b500f69E6367CeF7717928B26a9',
      uiIncentiveDataProvider: '0x6294bDe73FB179172C91338cD426786465a89c73',
      stakeUiHelper: '0x7D0e655722E280b03dbFA4235f1ba593f87DF113',
      priceAggregatorAdapterAddress:
        '0xf09C187d39A4998F25d6C3Bf2d693D355f563363',
    },
    baseAsset: {
      symbol: 'SDN',
      wrapperAddress: '0x44a26AE046a01d99eBAbecc24B4d61B388656871',
    },
    rewardToken: {
      symbol: 'LAY',
      address: '0x75AC15EbCA4e93D61bCc878ded9Ba338FD23E761',
      decimals: 18,
    },
    explorerLinks: ['https://blockscout.com/shiden'],
    isTestnet: true,
  },
}
