import { VotingEscrow } from '@starlay-finance/contract-helpers'
import { EthereumAddress } from 'src/types/web3'
import { StaticRPCProvider } from '../pool-data-provider'

export const votingEscrowContract = (
  { provider }: StaticRPCProvider,
  votingEscrowAddress: EthereumAddress,
  layAddress: EthereumAddress,
) => new VotingEscrow(provider, votingEscrowAddress, layAddress)
