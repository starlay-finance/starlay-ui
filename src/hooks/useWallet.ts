import { NetworkType } from 'src/libs/config'
import { EVMWalletType } from 'src/libs/wallet-provider-evm'
import { EthereumAddress, PolkadotAddress } from 'src/types/web3'
import { EVMWalletInterface, useEVMWallet } from './useEVMWallet'
import { useNetworkType } from './useNetwork'
import { PolkadotWalletInterface, usePolkadotWallet } from './usePolkadotWallet'

export type WalletAdaptor = EVMWallet | PolkadotWallet

export type WalletAdaptorInterface<T extends NetworkType, A extends string, W> =
  {
    networkType: T
    account: A | null | undefined
    wallet: W | null
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

export const DEFAULT_NETWORK: NetworkType = 'EVM'

export const useWallet = (
  defaultNetwork: NetworkType = DEFAULT_NETWORK,
): WalletAdaptor => {
  const { data: networkType = defaultNetwork } = useNetworkType()

  const evmWallet = useEVMWallet(networkType === 'EVM')
  const polkadotWallet = usePolkadotWallet(networkType === 'Polkadot')

  if (networkType === 'Polkadot')
    return {
      networkType,
      account: polkadotWallet.account,
      wallet: polkadotWallet,
    }

  return {
    networkType,
    account: evmWallet.account,
    wallet: evmWallet,
  }
}
