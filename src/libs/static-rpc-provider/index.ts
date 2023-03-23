import { ethers } from 'ethers'
import { EVMChainId, getNetworkConfigEVM } from 'src/libs/config'

export type StaticRPCProviderEVM = {
  chainId: EVMChainId
  provider: ethers.providers.Provider
}

export const getProvider = (chainId: EVMChainId): ethers.providers.Provider => {
  const config = getNetworkConfigEVM(chainId)
  if (config.privateJsonRPCUrl) {
    return new ethers.providers.StaticJsonRpcProvider(
      config.privateJsonRPCUrl,
      chainId,
    )
  }
  const chainProviders = config.publicJsonRPCUrl.map(
    (rpc) => new ethers.providers.StaticJsonRpcProvider(rpc, chainId),
  )
  if (!chainProviders.length) {
    throw new Error(`${chainId} has no jsonRPCUrl configured`)
  }
  if (chainProviders.length === 1) {
    return chainProviders[0]
  }
  return new ethers.providers.FallbackProvider(chainProviders)
}
