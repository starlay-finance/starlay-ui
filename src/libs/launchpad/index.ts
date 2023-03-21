import { Launchpad } from '@starlay-finance/contract-helpers'
import { EthereumAddress } from 'src/types/web3'
import { StaticRPCProviderEVM } from '../static-rpc-provider'

export const launchpadContract = (
  { provider }: StaticRPCProviderEVM,
  launchpadAddress: EthereumAddress,
) => new Launchpad(provider, launchpadAddress)
