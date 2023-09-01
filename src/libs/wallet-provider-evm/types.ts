import { AbstractConnector } from '@web3-react/abstract-connector'

export type EVMWalletType = 'Metamask' | 'WalletConnect' | 'Safe'

export type EVMWalletConnector<
  T extends AbstractConnector = AbstractConnector,
> = {
  type: EVMWalletType
  connector: T
  beforeConnect?: () => Promise<void>
  onDisconnect?: VoidFunction
  listen?: (
    listeners: Partial<{ onChangeChain: (chainId: number) => void }>,
  ) => void
}
