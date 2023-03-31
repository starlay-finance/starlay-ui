import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { NetworkType } from 'src/libs/config'
import {
  getLastConnectedNetwork,
  setLastConnectedNetwork,
} from 'src/utils/localStorage'
import { POLKADOT_PREFIX } from 'src/utils/routes'
import { useSWRLocal } from './base/useSWRLocal'

export const DEFAULT_NETWORK: NetworkType = 'EVM'

export const useNetworkType = () => {
  const { asPath, push } = useRouter()
  const last = useLastConnectedNetworkType()
  const values = useSWRLocal<NetworkType>('current-network')

  useEffect(() => {
    if (!values.data && last.data) values.mutate(last.data)
  }, [last.data])

  useEffect(() => {
    if (values.data === 'EVM' && asPath.includes(POLKADOT_PREFIX))
      push(asPath.replace(POLKADOT_PREFIX, ''))
    if (values.data === 'Polkadot' && !asPath.includes(POLKADOT_PREFIX))
      push(asPath.replace('/app', `/app${POLKADOT_PREFIX}`))
  }, [values.data, asPath])

  return values
}

export const useLastConnectedNetworkType = () => {
  const values = useSWRLocal<NetworkType>('last-connected-network', {
    fallbackData:
      (typeof window !== 'undefined' && getLastConnectedNetwork()) ||
      DEFAULT_NETWORK,
  })

  useEffect(() => {
    if (values.data) setLastConnectedNetwork(values.data)
  }, [values.data])

  return values
}
