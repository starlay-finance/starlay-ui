import { Claimer } from '@starlay-finance/contract-helpers'
import { EthereumAddress } from 'src/types/web3'
import { StaticRPCProvider } from '../pool-data-provider'

export const claimerContract = (
  { provider }: StaticRPCProvider,
  claimerAddress: EthereumAddress,
) => new Claimer(provider, claimerAddress)
