import { isSupportedChain } from 'src/libs/config'
import { getProvider } from 'src/libs/static-rpc-provider'
import { DEFAULT_CHAIN_ID } from 'src/utils/env'
import useSWRImmutable from 'swr/immutable'
import { useEVMWallet } from './useEVMWallet'
import { useNetworkType } from './useNetwork'

export const useStaticRPCProvider = () => {
  const { chainId } = useEVMWallet()
  const { data: currentNetwork } = useNetworkType()
  const currentChainId = isSupportedChain(chainId) ? chainId : DEFAULT_CHAIN_ID
  return useSWRImmutable(
    ['staticrpcprovider', currentNetwork, currentChainId],
    ([_key, network, chainId]) =>
      network === 'EVM'
        ? { chainId, provider: getProvider(chainId) }
        : // TODO
          undefined,
  )
}
