import { SWRConfiguration } from 'swr'
import useSWRImmutable from 'swr/immutable'

export const useSWRLocal = <T>(key: string, config?: SWRConfiguration) =>
  useSWRImmutable<T>(key, null, config)
