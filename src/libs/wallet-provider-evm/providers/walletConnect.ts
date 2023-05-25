import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { getNetworkConfigEVM } from 'src/libs/config'
import { DEFAULT_CHAIN_ID } from 'src/utils/env'
import { EVMWalletConnector } from '../types'

const config = getNetworkConfigEVM(DEFAULT_CHAIN_ID)
const connector = new WalletConnectConnector({
  rpc: {
    [DEFAULT_CHAIN_ID]: config.publicJsonRPCUrl[0],
    // config.privateJsonRPCUrl ||
  },
})
const onDisconnect = () => {
  connector.getProvider().then((provider) => {
    provider.removeAllListeners()
  })
  connector.close()
}

const listen: NonNullable<EVMWalletConnector['listen']> = ({
  onChangeChain,
}) => {
  connector.getProvider().then((provider) => {
    if (onChangeChain)
      provider.on('chainChanged', (chainId: number) => {
        onChangeChain(chainId)
      })
  })
}

export const walletConnectConnector: EVMWalletConnector<WalletConnectConnector> =
  {
    type: 'WalletConnect',
    connector,
    onDisconnect,
    listen,
  }
