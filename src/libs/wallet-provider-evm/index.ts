import { metamaskConnector } from './providers/metamask'
import { walletConnectConnector } from './providers/wallecConnectV2'
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
      throw new Error(`Unknown connector type: ${type}`)
  }
}

export const getConnectors = () => {
  return [metamaskConnector.connector, walletConnectConnector.connector]
}
