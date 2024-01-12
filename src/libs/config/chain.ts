import { BigNumber } from 'ethers'
import { EVMChainId, EVM_CHAIN_ID, EVM_NETWORK_CONFIG } from './network'

export const getEVMChainInfo = (chainId: number) =>
  // @ts-expect-error
  CHIAN_INFO[chainId]

const toChainIdHex = (chainId: number) =>
  `${(+BigNumber.from(chainId)).toString(16)}`

const CHIAN_INFO: Record<EVMChainId, AddEthereumChainParameter> = {
  [EVM_CHAIN_ID.acala]: {
    chainId: toChainIdHex(EVM_CHAIN_ID.acala),
    chainName: EVM_NETWORK_CONFIG[EVM_CHAIN_ID.acala].name,
    nativeCurrency: {
      name: 'ACA',
      symbol: EVM_NETWORK_CONFIG[EVM_CHAIN_ID.acala].baseAsset.symbol,
      decimals: 18,
    },
    rpcUrls: [...EVM_NETWORK_CONFIG[EVM_CHAIN_ID.acala].publicJsonRPCUrl],
    blockExplorerUrls: EVM_NETWORK_CONFIG[EVM_CHAIN_ID.acala].explorerLinks,
  },
}
