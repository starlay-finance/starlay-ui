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
    voterAddress: EthereumAddress
    votingEscrowAddress: EthereumAddress
    claimerAddress: EthereumAddress
    multicallAddress: EthereumAddress
  }
  protocolDataUrl?: string
  cachingServerUrl?: string
  cachingWSServerUrl?: string
  baseAsset: {
    symbol: AssetSymbol
    wrapperAddress: EthereumAddress
  }
  rewardToken: {
    symbol: string
    address: EthereumAddress
    underlyingAsset: EthereumAddress
    decimals: number
  }
  snapshotProvider?: {
    endpoint: string
    apiKey?: string
  }
  launchpadDataProvider?: {
    endpoint: string
    apiKey?: string
  }
  launchpadHistoricalDataProvider?: {
    endpoint: string
    apiKey?: string
  }
  arthswapDataProvider?: {
    endpoint: string
  }
  explorerLinks?: string[]
  rpcOnly?: boolean
  isTestnet?: boolean
}

export const NETWORK_CONFIG: Record<ChainId, NetworkConfig> = {
  [CHAIN_ID.astar]: {
    name: 'Astar Network',
    publicJsonRPCUrl: ['https://evm.astar.network'],
    addresses: {
      walletBalanceProvider: '0x449b5A2c9c75d77283253625C03aE6336c957a0c',
      uiPoolDataProvider: '0x97Fc9e6aFB9d7A9C9898a2b6F97Da43EB5f56331',
      uiIncentiveDataProvider: '0x08ba69145938dD3CB0EE94c0D59EF6364059956B',
      stakeUiHelper: '0xa6FAB9Dfd104a6582c049266E7eCCB0b908c55E4',
      priceAggregatorAdapterAddress:
        '0xbB5893E0f744b3d6305D49B1da6bc04fE922AC15',
      voterAddress: '0xTODO',
      votingEscrowAddress: '0xTODO',
      claimerAddress: '0xTODO',
      multicallAddress: '0x7D6046156df81EF335E7e765d3bc714960B73207',
    },
    baseAsset: {
      symbol: 'ASTR',
      wrapperAddress: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    },
    rewardToken: {
      symbol: 'stkLAY',
      address: '0x6FD65f71B3FB5Aa9d794f010AFc65F174012994F',
      underlyingAsset: '0xc4335B1b76fA6d52877b3046ECA68F6E708a27dd',
      decimals: 18,
    },
    snapshotProvider: {
      endpoint:
        'https://xok6alsasvgthgl5ozss7upnuu.appsync-api.us-east-1.amazonaws.com/graphql',
      apiKey: 'da2-qvw2m7hf6jhonms4rhtqgix7ri',
    },
    launchpadDataProvider: {
      endpoint:
        'https://launchpad-subgraph.decartel.xyz/subgraphs/name/starlay/starlay-launchpad',
    },
    launchpadHistoricalDataProvider: {
      endpoint:
        'https://7fkvk2oqm5ewxbiealg7orclku.appsync-api.us-east-1.amazonaws.com/graphql',
      apiKey: 'da2-vm7th2zcezdmbpkbkcbmm766pe',
    },
    arthswapDataProvider: {
      endpoint: 'https://arthswap-apr-api.vercel.app/api/graphql',
    },
    explorerLinks: ['https://blockscout.com/astar'],
  },
}
