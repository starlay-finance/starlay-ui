import { TokenSaleVesting } from '@starlay-finance/contract-helpers'
import { EthereumAddress } from 'src/types/web3'
import { StaticRPCProvider } from '../pool-data-provider'

export const tokenSaleVestingContract = (
  { provider }: StaticRPCProvider,
  tokenSaleVestingAddress: EthereumAddress,
  multicallAddress: EthereumAddress,
) => new TokenSaleVesting(provider, tokenSaleVestingAddress, multicallAddress)
