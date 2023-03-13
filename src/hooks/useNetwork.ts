import { NetworkType } from 'src/libs/config'
import { useSWRLocal } from './base/useSWRLocal'

export const DEFAULT_NETWORK: NetworkType = 'EVM'

export const useNetworkType = () =>
  useSWRLocal<NetworkType>('network-type', {
    fallbackData: DEFAULT_NETWORK,
  })
