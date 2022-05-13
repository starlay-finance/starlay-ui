import { Launchpad } from '@starlay-finance/contract-helpers'
import { EthereumAddress } from 'src/types/web3'
import { StaticRPCProvider } from '../pool-data-provider'

export const launchpadContract = (
  { provider }: StaticRPCProvider,
  launchpadAddress: EthereumAddress,
) => new Launchpad(provider, launchpadAddress)
