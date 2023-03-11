import { NetworkType } from 'src/libs/config'
import { useSWRLocal } from './base/useSWRLocal'

export const useNetworkType = () => useSWRLocal<NetworkType>('network-type')
