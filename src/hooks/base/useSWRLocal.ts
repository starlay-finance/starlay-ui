import useSWRImmutable from 'swr/immutable'

export const useSWRLocal = <T>(key: string) => useSWRImmutable<T>(key, null)
