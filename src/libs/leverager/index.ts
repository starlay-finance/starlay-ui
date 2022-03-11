import { Leverager } from '@starlay-finance/contract-helpers'
import { EthereumAddress } from 'src/types/web3'
import { StaticRPCProvider } from '../pool-data-provider'

export const leveragerContract = (
  { provider }: StaticRPCProvider,
  leveragerAddress: EthereumAddress,
) => new Leverager(provider, leveragerAddress)
