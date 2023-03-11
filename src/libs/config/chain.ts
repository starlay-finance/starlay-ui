import { BigNumber } from 'ethers'
import { EVMChainId, EVM_CHAIN_ID, NETWORK_CONFIG } from './network'

export const getEVMChainInfo = (chainId: number) =>
  // @ts-expect-error
  CHIAN_INFO[chainId]

const toChainIdHex = (chainId: number) =>
  `0x${(+BigNumber.from(chainId)).toString(16)}`

const CHIAN_INFO: Record<EVMChainId, AddEthereumChainParameter> = {
  [EVM_CHAIN_ID.astar]: {
    chainId: toChainIdHex(EVM_CHAIN_ID.astar),
    chainName: NETWORK_CONFIG[EVM_CHAIN_ID.astar].name,
    nativeCurrency: {
      name: 'Astar',
      symbol: NETWORK_CONFIG[EVM_CHAIN_ID.astar].baseAsset.symbol,
      decimals: 18,
    },
    rpcUrls: [...NETWORK_CONFIG[EVM_CHAIN_ID.astar].publicJsonRPCUrl],
    blockExplorerUrls: NETWORK_CONFIG[EVM_CHAIN_ID.astar].explorerLinks,
  },
}
