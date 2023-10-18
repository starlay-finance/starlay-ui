import { ApiPromise, HttpProvider, WsProvider } from '@polkadot/api'
import { getNetworkConfigPolkadot } from '../config'
import { PolkadotChainId } from '../config/network'

export type StaticRPCProviderPolkadot = {
  chainId: PolkadotChainId
  provider: ApiPromise
}
export const getProviderWs = (chainId: PolkadotChainId) =>
  ApiPromise.create({
    provider: new WsProvider(
      getNetworkConfigPolkadot(chainId).publicJsonRPCWSUrl,
    ),
    throwOnConnect: true,
  })

export const getProvider = (chainId: PolkadotChainId) =>
  ApiPromise.create({
    provider: new HttpProvider(
      getNetworkConfigPolkadot(chainId).publicJsonRPCUrl[0],
    ),
    throwOnConnect: true,
  })
