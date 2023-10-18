import { Claimer } from '@starlay-finance/contract-helpers'
import { EthereumAddress } from 'src/types/web3'
import { StaticRPCProviderEVM } from '../static-rpc-provider'

export const claimerContract = (
  { provider }: StaticRPCProviderEVM,
  claimerAddress: EthereumAddress,
) => new Claimer(provider, claimerAddress)
