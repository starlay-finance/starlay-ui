import { NetworkType } from 'src/libs/config'
import { EVMWalletType } from 'src/libs/wallet-provider-evm'
import { EthereumAddress, PolkadotAddress } from 'src/types/web3'
import { EVMWalletInterface, useEVMWallet } from './useEVMWallet'
import { useNetworkType } from './useNetwork'
import {
  PolkadotWalletInterface,
  PolkadotWalletType,
  usePolkadotWallet,
} from './usePolkadotWallet'

export type WalletAdaptor = EVMWallet | PolkadotWallet

export type WalletAdaptorInterface<T extends NetworkType, A extends string, W> =
  {
    networkType: T | undefined
    account: A | null | undefined
    wallet: W | null
    chainId: any
    connect: WalletConnector
  }

export type WalletConnector = {
  (networkType: 'EVM', walletType: EVMWalletType): Promise<void>
  (networkType: 'Polkadot', walletType: PolkadotWalletType): Promise<void>
}

export type EVMWallet = WalletAdaptorInterface<
  'EVM',
  EthereumAddress,
  EVMWalletInterface
>

export type PolkadotWallet = WalletAdaptorInterface<
  'Polkadot',
  PolkadotAddress,
  PolkadotWalletInterface
>

export const useWallet = (defaultNetwork?: NetworkType): WalletAdaptor => {
  const { data: networkType = defaultNetwork } = useNetworkType()

  const evmWallet = useEVMWallet(networkType === 'EVM')
  const polkadotWallet = usePolkadotWallet(networkType === 'Polkadot')

  const connect: WalletAdaptor['connect'] = async (networkType, walletType) => {
    if (networkType === 'Polkadot') {
      await polkadotWallet.connect(walletType as PolkadotWalletType)
    } else {
      await evmWallet.connect(walletType as EVMWalletType)
    }
  }

  if (networkType === 'Polkadot')
    return {
      networkType,
      account: polkadotWallet.account,
      chainId: polkadotWallet.chainId,
      wallet: polkadotWallet,
      connect,
    }

  return {
    networkType,
    account: evmWallet.account,
    chainId: evmWallet.chainId,
    wallet: evmWallet,
    connect,
  }
}
