import { supportedChainOr } from 'src/libs/config/network'
import { getProvider } from 'src/libs/static-rpc-provider'
import { DEFAULT_CHAIN_ID } from 'src/utils/env'
import useSWRImmutable from 'swr/immutable'
import { useEVMWallet } from './useEVMWallet'

export const useStaticRPCProviderEVM = () => {
  const { chainId } = useEVMWallet(true)
  const activeChainId = supportedChainOr(chainId, DEFAULT_CHAIN_ID)
  return useSWRImmutable(
    ['evm', 'staticrpcprovider', activeChainId],
    ([_key1, _key2, chainId]) => ({ chainId, provider: getProvider(chainId) }),
  )
}
