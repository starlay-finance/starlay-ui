import { initializeConnector } from '@web3-react/core'
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'

import { getNetworkConfigEVM } from 'src/libs/config'
import { EVM_CHAIN_ID } from 'src/libs/config/network'
import { EVMWalletConnector } from '../types'

export const connector = initializeConnector<WalletConnectV2>(
  (actions) =>
    new WalletConnectV2({
      actions,
      options: {
        projectId: getNetworkConfigEVM(EVM_CHAIN_ID.mandala)
          .walletConnectProjectId,
        chains: [EVM_CHAIN_ID.mandala],
        showQrModal: true,
        rpcMap: {
          [EVM_CHAIN_ID.mandala]:
            getNetworkConfigEVM(EVM_CHAIN_ID.mandala).privateJsonRPCUrl ||
            getNetworkConfigEVM(EVM_CHAIN_ID.mandala).publicJsonRPCUrl,
        },
      },
    }),
)

const beforeConnect = async () => {
  localStorage.removeItem('walletconnect')
}

const connect = () => connector[0].activate()

const connectEagerly = () => connector[0].connectEagerly()

export const walletConnectConnector: EVMWalletConnector<WalletConnectV2> = {
  type: 'WalletConnect',
  connector,
  connect,
  connectEagerly,
  beforeConnect,
}
