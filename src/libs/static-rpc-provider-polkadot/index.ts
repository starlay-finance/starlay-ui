import { ApiPromise, HttpProvider, WsProvider } from '@polkadot/api'
import { getNetworkConfigPokadot } from '../config'
import { PolkadotChainId } from '../config/network'

export const getProviderWs = (chainId: PolkadotChainId) =>
  ApiPromise.create({
    provider: new WsProvider(
      getNetworkConfigPokadot(chainId).publicJsonRPCWSUrl,
    ),
    throwOnConnect: true,
  })

export const getProvider = (chainId: PolkadotChainId) =>
  ApiPromise.create({
    provider: new HttpProvider(
      getNetworkConfigPokadot(chainId).publicJsonRPCUrl[0],
    ),
    throwOnConnect: true,
  })
