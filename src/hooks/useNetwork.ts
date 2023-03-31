import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { NetworkType } from 'src/libs/config'
import {
  getLastConnectedNetwork,
  setLastConnectedNetwork,
} from 'src/utils/localStorage'
import {
  EVM_PREFIX,
  POLKADOT_APP,
  POLKADOT_PREFIX,
  POLKADOT_SUPPORTED_PAGES,
} from 'src/utils/routes'
import { useSWRLocal } from './base/useSWRLocal'

export const useNetworkType = () => {
  const { asPath, push } = useRouter()
  const last = useLastConnectedNetworkType()
  const values = useSWRLocal<NetworkType>('current-network', {
    fallbackData: asPath.includes('evm')
      ? 'EVM'
      : asPath.includes('wasm')
      ? 'Polkadot'
      : undefined,
  })

  useEffect(() => {
    if (!values.data && last.data) values.mutate(last.data)
  }, [last.data])

  useEffect(() => {
    if (values.data === 'EVM' && asPath.includes(EVM_PREFIX))
      push(asPath.replace(POLKADOT_PREFIX, EVM_PREFIX))

    if (values.data === 'Polkadot' && !asPath.includes(POLKADOT_PREFIX)) {
      if (POLKADOT_SUPPORTED_PAGES.includes(asPath))
        push(asPath.replace(EVM_PREFIX, POLKADOT_PREFIX))
      else push(POLKADOT_APP)
    }
  }, [values.data, asPath])

  return values
}

export const useLastConnectedNetworkType = () => {
  const values = useSWRLocal<NetworkType>('last-connected-network', {
    fallbackData: typeof window !== 'undefined' && getLastConnectedNetwork(),
  })

  useEffect(() => {
    if (values.data) setLastConnectedNetwork(values.data)
  }, [values.data])

  return values
}
