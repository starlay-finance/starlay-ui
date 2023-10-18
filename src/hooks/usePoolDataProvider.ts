import { getPoolDataProvider } from 'src/libs/pool-data-provider'
import useSWRImmutable from 'swr/immutable'
import { useStaticRPCProviderEVM } from './useStaticRPCProviderEVM'

export const usePoolDataProvider = () => {
  const { data: provider } = useStaticRPCProviderEVM()
  return useSWRImmutable(
    provider && ['pooldataprovider', provider.chainId],
    () => getPoolDataProvider(provider!),
  )
}
