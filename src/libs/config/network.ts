import { AssetSymbol } from 'src/types/models'
import { EthereumAddress, PolkadotAddress } from 'src/types/web3'
import { ValueOf } from 'type-fest'

export const EVM_CHAIN_ID = {
  astar: 592,
} as const
export type EVMChainId = ValueOf<typeof EVM_CHAIN_ID>

export const POLKADOT_CHAIN_ID = {
  // astar: "Astar",
  shibuya: 'Shibuya Testnet',
  // local: 'Development',
} as const
export type PolkadotChainId = ValueOf<typeof POLKADOT_CHAIN_ID>
export const DEFAULT_CHAIN_ID_POLKADOT = POLKADOT_CHAIN_ID.shibuya

export const isSupportedChain = (arg: any): arg is EVMChainId =>
  Object.values(EVM_CHAIN_ID).includes(arg)
export const supportedChainOr = (arg: any, _default: EVMChainId): EVMChainId =>
  isSupportedChain(arg) ? arg : _default

export type NetworkConfig<ADDRESS extends string, C extends string> = {
  name: string
  privateJsonRPCUrl?: string
  privateJsonRPCWSUrl?: string
  publicJsonRPCUrl: string[]
  publicJsonRPCWSUrl?: string
  addresses: Record<C, ADDRESS>
  protocolDataUrl?: string
  cachingServerUrl?: string
  cachingWSServerUrl?: string
  baseAsset: {
    symbol: AssetSymbol
    wrapperAddress: ADDRESS
  }
  rewardToken: {
    symbol: string
    address: ADDRESS
    underlyingAsset: ADDRESS
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

export type EVMNetworkConfig = NetworkConfig<
  EthereumAddress,
  | 'walletBalanceProvider'
  | 'uiPoolDataProvider'
  | 'uiIncentiveDataProvider'
  | 'stakeUiHelper'
  | 'priceAggregatorAdapterAddress'
  | 'voterAddress'
  | 'votingEscrowAddress'
  | 'claimerAddress'
  | 'idoVestingAddress'
  | 'tokenSaleVestingAddress'
  | 'multicallAddress'
>

export const EVM_NETWORK_CONFIG: Record<EVMChainId, EVMNetworkConfig> = {
  [EVM_CHAIN_ID.astar]: {
    name: 'Astar Network',
    publicJsonRPCUrl: ['https://astar.public.blastapi.io'],
    privateJsonRPCUrl:
      'https://astar.blastapi.io/b783cb07-7f1a-48dc-88fb-cedca75fafa0',
    addresses: {
      walletBalanceProvider: '0x449b5A2c9c75d77283253625C03aE6336c957a0c',
      uiPoolDataProvider: '0x97Fc9e6aFB9d7A9C9898a2b6F97Da43EB5f56331',
      uiIncentiveDataProvider: '0x08ba69145938dD3CB0EE94c0D59EF6364059956B',
      stakeUiHelper: '0xa6FAB9Dfd104a6582c049266E7eCCB0b908c55E4',
      priceAggregatorAdapterAddress:
        '0xbB5893E0f744b3d6305D49B1da6bc04fE922AC15',
      voterAddress: '0xB45Ae34e16D97D87c021DAf03a15142935cFB177',
      votingEscrowAddress: '0xDf32D28c1BdF25c457E82797316d623C2fcB29C8',
      claimerAddress: '0x05aed49d7979D50cA2D76479a63d5560EeDf243A',
      idoVestingAddress: '0x54F5002b5F44E2ef5a98761b6fa97a2eF4437099',
      tokenSaleVestingAddress: '0xFb5504e1F1F147c7Db1bd9B47dD0465DF3C16310',
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
        'https://33ikriwlbzcxpp76t242xedcvu.appsync-api.us-east-1.amazonaws.com/graphql',
      apiKey: 'da2-vfzww7t765hfla6tdrzx6w4pvq',
    },
    launchpadDataProvider: {
      endpoint:
        'https://launchpad-subgraph.decartel.xyz/subgraphs/name/starlay/starlay-launchpad',
    },
    launchpadHistoricalDataProvider: {
      endpoint:
        'https://urdn7gyh2bfgbh4cg72eddclrq.appsync-api.us-east-1.amazonaws.com/graphql',
      apiKey: 'da2-eeucjwshhbh3vg44ovhg27x54m',
    },
    arthswapDataProvider: {
      endpoint: 'https://arthswap-graphql.starlay.finance/api/graphql',
    },
    explorerLinks: ['https://blockscout.com/astar'],
  },
}

export type PolkadotNetworkConfig = NetworkConfig<
  PolkadotAddress,
  'controller' | 'lens' | 'faucet'
>

export const POLKADOT_NETWORK_CONFIG: Record<
  PolkadotChainId,
  PolkadotNetworkConfig
> = {
  [POLKADOT_CHAIN_ID.shibuya]: {
    name: 'Shibuya Testnet',
    publicJsonRPCUrl: ['https://shibuya-rpc.dwellir.com'],
    publicJsonRPCWSUrl: 'wss://shibuya-rpc.dwellir.com',
    addresses: {
      lens: 'ajLoPupEuQaZotK8SNRGpcBTYMeDsQGWBAQpa2giM26vwXC',
      controller: 'W1M8b4DXf544Z7TrPMNx4JBJSipkLtXS9gqi8LfiJLM3j1n',
      faucet: 'YwnPYnuK1ob9tcBzW8zEqGSSYHnGwbbXSqwN4q4jLeHGRvC',
    },
    baseAsset: {
      symbol: 'ASTR',
      wrapperAddress: '',
    },
    rewardToken: {
      symbol: '',
      address: '',
      underlyingAsset: '',
      decimals: 0,
    },
    explorerLinks: ['https://blockscout.com/astar'],
    isTestnet: true,
  },
}
