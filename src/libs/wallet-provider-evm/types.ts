import { Web3ReactHooks } from '@web3-react/core'
import { Connector, Web3ReactStore } from '@web3-react/types'

export type EVMWalletType = 'Metamask' | 'WalletConnect' | 'Safe'

export type EVMWalletConnector<T extends Connector> = {
  type: EVMWalletType
  connector: [T, Web3ReactHooks, Web3ReactStore]
  connect: () => Promise<void>
  connectEagerly?: () => Promise<void>
  disconnect?: VoidFunction
  beforeConnect?: () => Promise<void>
  onDisconnect?: VoidFunction
  listen?: (
    listeners: Partial<{ onChangeChain: (chainId: number) => void }>,
  ) => void
}
