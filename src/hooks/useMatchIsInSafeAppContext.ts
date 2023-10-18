import { matchIsInSafeAppContext } from 'src/libs/wallet-provider-evm'
import useSWRImmutable from 'swr/immutable'

export const useMatchIsInSafeAppContext = () => {
  const { data, error, isLoading, isValidating } = useSWRImmutable(
    'isInSafeContext',
    matchIsInSafeAppContext,
  )

  return !isValidating && !error && !isLoading && data
}
