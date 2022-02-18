import { AbstractConnector } from '@web3-react/abstract-connector'

export type WalletType = 'Metamask'

export type WalletConnector<T extends AbstractConnector = AbstractConnector> = {
  type: WalletType
  connector: T
  onConnect?: () => Promise<void>
  onDisconnect?: VoidFunction
}
