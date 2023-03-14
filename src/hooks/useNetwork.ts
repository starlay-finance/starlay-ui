import { useEffect } from 'react'
import { NetworkType } from 'src/libs/config'
import {
  getLastConnectedNetwork,
  setLastConnectedNetwork,
} from 'src/utils/localStorage'
import { useSWRLocal } from './base/useSWRLocal'

export const DEFAULT_NETWORK: NetworkType = 'EVM'

export const useNetworkType = () => {
  const values = useSWRLocal<NetworkType>('network-type', {
    fallbackData:
      (typeof window !== 'undefined' && getLastConnectedNetwork()) ||
      DEFAULT_NETWORK,
  })

  useEffect(() => {
    if (values.data) setLastConnectedNetwork(values.data)
  }, [values.data])

  return values
}
