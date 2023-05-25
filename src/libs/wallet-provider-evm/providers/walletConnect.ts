import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { EVMWalletConnector } from '../types'

const connector = new WalletConnectConnector({})
const onConnect = async () => {}
const onDisconnect = () => {
  connector.close()
}

export const walletConnectConnector: EVMWalletConnector<WalletConnectConnector> =
  {
    type: 'WalletConnect',
    connector,
    onConnect,
    onDisconnect,
  }
