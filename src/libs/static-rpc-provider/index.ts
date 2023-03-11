import { ethers } from 'ethers'
import { EVMChainId, getNetworkConfig } from 'src/libs/config'

export const getProvider = (chainId: EVMChainId): ethers.providers.Provider => {
  const config = getNetworkConfig(chainId)
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
