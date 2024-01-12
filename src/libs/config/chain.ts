import { BigNumber } from 'ethers'
import { EVMChainId, EVM_CHAIN_ID, EVM_NETWORK_CONFIG } from './network'

export const getEVMChainInfo = (chainId: number) =>
  // @ts-expect-error
  CHIAN_INFO[chainId]

const toChainIdHex = (chainId: number) =>
  `0x${(+BigNumber.from(chainId)).toString(16)}`

const CHIAN_INFO: Record<EVMChainId, AddEthereumChainParameter> = {
  [EVM_CHAIN_ID.mandala]: {
    chainId: toChainIdHex(EVM_CHAIN_ID.mandala),
    chainName: EVM_NETWORK_CONFIG[EVM_CHAIN_ID.mandala].name,
    nativeCurrency: {
      name: 'ACA',
      symbol: EVM_NETWORK_CONFIG[EVM_CHAIN_ID.mandala].baseAsset.symbol,
      decimals: 18,
    },
    rpcUrls: [...EVM_NETWORK_CONFIG[EVM_CHAIN_ID.mandala].publicJsonRPCUrl],
    blockExplorerUrls: EVM_NETWORK_CONFIG[EVM_CHAIN_ID.mandala].explorerLinks,
  },
}
