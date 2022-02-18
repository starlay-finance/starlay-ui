import { getPoolDataProvider } from 'src/libs/pool-data-provider'
import useSWRImmutable from 'swr/immutable'
import { useStaticRPCProvider } from './useStaticRPCProvider'

export const usePoolDataProvider = () => {
  const { data: provider } = useStaticRPCProvider()
  return useSWRImmutable(
    provider && ['pooldataprovider', provider.chainId],
    () => getPoolDataProvider(provider!),
  )
}
