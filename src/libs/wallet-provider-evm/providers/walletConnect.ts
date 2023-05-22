import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { getNetworkConfigEVM } from 'src/libs/config'
import { DEFAULT_CHAIN_ID } from 'src/utils/env'
import { EVMWalletConnector } from '../types'

const config = getNetworkConfigEVM(DEFAULT_CHAIN_ID)
const connector = new WalletConnectConnector({
  chainId: DEFAULT_CHAIN_ID,
  rpc: {
    [DEFAULT_CHAIN_ID]: config.publicJsonRPCUrl[0],
  },
  supportedChainIds: [DEFAULT_CHAIN_ID],
})
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
