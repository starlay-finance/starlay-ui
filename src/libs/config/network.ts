import { AssetSymbol } from 'src/types/models'
import { EthereumAddress, PolkadotAddress } from 'src/types/web3'
import { ValueOf } from 'type-fest'

export const EVM_CHAIN_ID = {
  mandala: 595,
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
  walletConnectProjectId: string
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
  | 'priceAggregatorAdapterAddress'
>

export const EVM_NETWORK_CONFIG: Record<EVMChainId, EVMNetworkConfig> = {
  [EVM_CHAIN_ID.mandala]: {
    name: 'Acala Testnet / EVM',
    publicJsonRPCUrl: ['https://eth-rpc-tc9.aca-staging.network'],
    privateJsonRPCUrl: 'https://eth-rpc-tc9.aca-staging.network',
    walletConnectProjectId: '7077959b8319331ea75408788eae93b5',
    addresses: {
      walletBalanceProvider: '0x59300Abd7e80076EC2b361769aeEb4fb041a5435',
      uiPoolDataProvider: '0x7A305Ea702987D2dbc20E794d095E21fAe94e568',
      uiIncentiveDataProvider: '0xDDB5114C69791e366398287f0510fe87f7571cF7',
      priceAggregatorAdapterAddress:
        '0x0493895d637A8500e3d7cB35AdabF57d32198ba8',
    },
    baseAsset: {
      symbol: 'ACA',
      wrapperAddress: '0x',
    },
    rewardToken: {
      symbol: '',
      address: '0x',
      underlyingAsset: '0x0000000000000000000000000000000000000000',
      decimals: 18,
    },
    explorerLinks: ['https://blockscout.mandala.aca-staging.network/'],
    isTestnet: true,
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
    name: 'Shibuya Testnet / WASM',
    publicJsonRPCUrl: ['https://shibuya-rpc.dwellir.com'],
    publicJsonRPCWSUrl: 'wss://shibuya-rpc.dwellir.com',
    walletConnectProjectId: '7077959b8319331ea75408788eae93b5',
    addresses: {
      lens: 'b7ZAWXs65EzkF1qnbbcARVFhB5z4WwuajzVqsKijigB4QdW',
      faucet: 'b3rWbCnVNCW9qkeGcUxafatV4TEoXBYVxf4wGbQgwyhJaZL',
      controller: 'X2vJWQUXZMyKc81JDdJkRxroUE6TFkqDd5EnXcjpmA5F8XA',
    },
    baseAsset: {
      symbol: 'ACA',
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
