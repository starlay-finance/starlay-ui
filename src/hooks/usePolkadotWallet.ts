import { Signer } from '@polkadot/api/types'
import type * as PolkadotProvider from '@polkadot/extension-dapp'
import { useEffect } from 'react'
import { PolkadotAddress } from 'src/types/web3'
import { useSWRLocal } from './base/useSWRLocal'

const APP_NAME = 'Starlay Finance'
export type PolkadotWalletType = 'polkadot-js'

export type PolkadotWalletInterface = {
  account: PolkadotAddress | undefined
  signer: Signer | undefined
  connect: (type: PolkadotWalletType) => Promise<void>
  accounts: () => Promise<PolkadotAddress[]>
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

  const accounts = async () =>
    polkadot
      ?.web3Accounts()
      .then((accounts) => accounts.map(({ address }) => address)) || []

  const connect = async (type: PolkadotWalletType) => {
    if (!polkadot) return
    // TODO handle errors
    try {
      await polkadot.web3Enable(APP_NAME)
    } catch (e) {
      console.error(e)
      return
    }
    const accounts = await polkadot.web3Accounts()
    changeActiveAccount(accounts[0].address)
  }

  const changeActiveAccount = async (address: PolkadotAddress) => {
    setActiveAccount(address)
    setSigner((await polkadot!.web3FromAddress(address)).signer)
  }

  useEffect(() => {
    import('@polkadot/extension-dapp').then(setPolkadotProvider)
  }, [])

  return {
    account,
    signer,
    connect,
    accounts,
    changeActiveAccount,
  }
}
