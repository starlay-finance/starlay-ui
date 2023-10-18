import { Voter } from '@starlay-finance/contract-helpers'
import { EthereumAddress } from 'src/types/web3'
import { StaticRPCProviderEVM } from '../static-rpc-provider'

export const voterContract = (
  { provider }: StaticRPCProviderEVM,
  voterAddress: EthereumAddress,
  multicallAddress: EthereumAddress,
) => new Voter(provider, voterAddress, multicallAddress)
