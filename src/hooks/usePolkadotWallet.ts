import { Signer } from '@polkadot/api/types'
import type * as PolkadotProvider from '@polkadot/extension-dapp'
import { useEffect } from 'react'
import { PolkadotAddress } from 'src/types/web3'
import { useSWRLocal } from './base/useSWRLocal'

export type PolkadotWalletInterface = {
  account: PolkadotAddress | undefined
  signer: Signer | undefined
  connect: VoidFunction
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

  const connect = async () => {
    if (!polkadot) return
    await polkadot.web3Enable('Starlay Finance')
    const accounts = await polkadot.web3Accounts()
    changeActiveAccount(accounts[0].address)
  }

  const changeActiveAccount = async (address: PolkadotAddress) => {
    setActiveAccount(address)
    setSigner((await polkadot!.web3FromAddress(address)).signer)
  }

  useEffect(() => {
    if (!isNetworkActive) return
    if (!polkadot) {
      import('@polkadot/extension-dapp').then(setPolkadotProvider)
    }
    // TODO if already enabled, connect automatically
    connect()
  }, [polkadot, isNetworkActive])

  return {
    account,
    signer,
    connect,
    accounts,
    changeActiveAccount,
  }
}
