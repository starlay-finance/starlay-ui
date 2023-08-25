import useSWRImmutable from 'swr/immutable'
import { matchIsInSafeAppContext } from 'src/libs/wallet-provider'

export const useMatchIsInSafeAppContext = () => {
  const { data, error, isLoading, isValidating } = useSWRImmutable( 'isInSafeContext', matchIsInSafeAppContext)

  return !isValidating && !error && !isLoading && data
}
