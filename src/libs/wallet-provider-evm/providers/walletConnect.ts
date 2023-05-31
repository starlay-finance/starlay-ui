import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { COMMON_SEO_DATA } from 'src/constants/seo'
import { getNetworkConfigEVM } from 'src/libs/config'
import { DEFAULT_CHAIN_ID } from 'src/utils/env'
import { EVMWalletConnector } from '../types'

const config = getNetworkConfigEVM(DEFAULT_CHAIN_ID)
const connector = new WalletConnectConnector({
  chainId: DEFAULT_CHAIN_ID,
  rpc: {
    [DEFAULT_CHAIN_ID]: config.publicJsonRPCUrl[0],
    // config.privateJsonRPCUrl ||
  },
  supportedChainIds: [DEFAULT_CHAIN_ID],
  clientMeta: {
    url: COMMON_SEO_DATA.siteUrl!,
    name: COMMON_SEO_DATA.siteTitle!,
    description: COMMON_SEO_DATA.description!,
    icons: [`${COMMON_SEO_DATA.siteUrl}/${COMMON_SEO_DATA.image}`],
  },
})
const beforeConnect = async () => {
  localStorage.removeItem('walletconnect')
}
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
    beforeConnect,
    onDisconnect,
    listen,
  }
