import { VotingEscrow } from '@starlay-finance/contract-helpers'
import { EthereumAddress } from 'src/types/web3'
import { StaticRPCProviderEVM } from '../static-rpc-provider'

export const votingEscrowContract = (
  { provider }: StaticRPCProviderEVM,
  votingEscrowAddress: EthereumAddress,
  layAddress: EthereumAddress,
) => new VotingEscrow(provider, votingEscrowAddress, layAddress)
