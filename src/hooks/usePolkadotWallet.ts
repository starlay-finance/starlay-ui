import { Signer } from '@polkadot/api/types'
import type * as PolkadotProvider from '@polkadot/extension-dapp'
import { useEffect } from 'react'
import {
  DEFAULT_CHAIN_ID_POLKADOT,
  PolkadotChainId,
} from 'src/libs/config/network'
import { PolkadotAddress } from 'src/types/web3'
import {
  getHasConnected,
  setHasConnected,
  setLastConnectedNetwork,
} from 'src/utils/localStorage'
import { POLKADOT_JS_EXT_URL } from 'src/utils/routes'
import { useSWRLocal } from './base/useSWRLocal'

const APP_NAME = 'Starlay Finance'
export type PolkadotWalletType = 'polkadot-js'
export type PolkadotAccountWithMeta = { address: PolkadotAddress; meta: string }

export type PolkadotWalletInterface = {
  account: PolkadotAddress | undefined
  chainId: PolkadotChainId | undefined
  signer: Signer | undefined
  connect: (type: PolkadotWalletType) => Promise<void>
  accounts: () => Promise<PolkadotAccountWithMeta[]>
  changeActiveAccount: (address: PolkadotAddress) => void
}

export const usePolkadotWallet = (
  isNetworkActive: boolean,
): PolkadotWalletInterface => {
  const { data: polkadot, mutate: setPolkadotProvider } =
    useSWRLocal<typeof PolkadotProvider>('polkadot-provider')
  const { data: account, mutate: setActiveAccount } =
    useSWRLocal<PolkadotAddress>('polkadot-active-account')
  const { data: signer, mutate: setSigner } = useSWRLocal<Signer>(
    'polkadot-active-signer',
  )
  // TODO
  const chainId: PolkadotChainId = DEFAULT_CHAIN_ID_POLKADOT

  const accounts = async () =>
    polkadot?.web3Accounts().then((accounts) =>
      accounts.map(({ address, meta }) => ({
        address,
        meta: meta.name || 'No Name',
      })),
    )

  const connect = async (type: PolkadotWalletType, autoConnect?: boolean) => {
    if (
      !autoConnect &&
      (!window.injectedWeb3 || !Object.keys(window.injectedWeb3).length)
    ) {
      window.open(POLKADOT_JS_EXT_URL, '_blank', 'noopener')
      return
    }
    if (!polkadot) return
    // TODO handle errors
    await polkadot.web3Enable(APP_NAME)
    const accounts = await polkadot.web3Accounts()
    if (!accounts.length) {
      // TODO display an error message: no available accounts found
      return
    }
    changeActiveAccount(accounts[0].address)
    setLastConnectedNetwork('Polkadot')
    setHasConnected('Polkadot')
  }

  const changeActiveAccount = async (address: PolkadotAddress) => {
    setActiveAccount(address)
    setSigner((await polkadot!.web3FromAddress(address)).signer)
  }

  useEffect(() => {
    import('@polkadot/extension-dapp').then(setPolkadotProvider)
  }, [])

  useEffect(() => {
    if (
      !polkadot ||
      !isNetworkActive ||
      account ||
      !getHasConnected('Polkadot')
    )
      return
    connect('polkadot-js', true)
  }, [isNetworkActive, polkadot])

  return {
    account,
    chainId,
    signer,
    connect,
    accounts,
    changeActiveAccount,
  }
}
