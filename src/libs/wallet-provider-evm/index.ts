import { ethers } from 'ethers'
import { metamaskConnector } from './providers/metamask'
import { walletConnectConnector } from './providers/walletConnect'
import { EVMWalletType } from './types'

export * as metamask from './providers/metamask'
export * from './providers/safe'
export * from './types'

export const getConnector = (type: EVMWalletType) => {
  switch (type) {
    case 'WalletConnect':
      return walletConnectConnector
    case 'Metamask':
      return metamaskConnector
    default:
      throw new Error(`Unexpected WalletType - ${type}`)
  }
}

export const getLibrary = (provider: any): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(
    provider,
    typeof provider.chainId === 'number'
      ? provider.chainId
      : typeof provider.chainId === 'string'
      ? parseInt(provider.chainId)
      : 'any',
  )
  return library
}
