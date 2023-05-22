import { AbstractConnector } from '@web3-react/abstract-connector'

export type EVMWalletType = 'Metamask' | 'WalletConnect'

export type EVMWalletConnector<
  T extends AbstractConnector = AbstractConnector,
> = {
  type: EVMWalletType
  connector: T
  onConnect?: () => Promise<void>
  onDisconnect?: VoidFunction
}
