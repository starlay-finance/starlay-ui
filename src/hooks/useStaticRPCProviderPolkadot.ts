import { getProvider } from 'src/libs/static-rpc-provider-polkadot'
import useSWRImmutable from 'swr/immutable'
import { usePolkadotWallet } from './usePolkadotWallet'

export const useStaticRPCProviderPolkadot = () => {
  const {} = usePolkadotWallet(true)
  const chainId = 'Development' as const // TODO
  return useSWRImmutable(
    ['polkadot', 'staticrpcprovider', chainId],
    async ([_key1, _key2, chainId]) => ({
      chainId,
      provider: await getProvider(chainId),
    }),
  )
}
