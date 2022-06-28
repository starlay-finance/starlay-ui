import { Voter } from '@starlay-finance/contract-helpers'
import { EthereumAddress } from 'src/types/web3'
import { StaticRPCProvider } from '../pool-data-provider'

export const voterContract = (
  { provider }: StaticRPCProvider,
  voterAddress: EthereumAddress,
  multicallAddress: EthereumAddress,
) => new Voter(provider, voterAddress, multicallAddress)
