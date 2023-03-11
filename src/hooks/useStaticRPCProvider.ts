import { isSupportedChain } from 'src/libs/config'
import { getProvider } from 'src/libs/static-rpc-provider'
import { DEFAULT_CHAIN_ID } from 'src/utils/env'
import useSWRImmutable from 'swr/immutable'
import { useEVMWallet } from './useEVMWallet'

export const useStaticRPCProvider = () => {
  const { chainId } = useEVMWallet()
  const currentChainId = isSupportedChain(chainId) ? chainId : DEFAULT_CHAIN_ID
  return useSWRImmutable(
    ['staticrpcprovider', currentChainId],
    ([_key, chainId]) => ({
      chainId,
      provider: getProvider(chainId),
    }),
  )
}
