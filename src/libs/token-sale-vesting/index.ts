import { TokenSaleVesting } from '@starlay-finance/contract-helpers'
import { EthereumAddress } from 'src/types/web3'
import { StaticRPCProviderEVM } from '../static-rpc-provider'

export const tokenSaleVestingContract = (
  { provider }: StaticRPCProviderEVM,
  tokenSaleVestingAddress: EthereumAddress,
  multicallAddress: EthereumAddress,
) => new TokenSaleVesting(provider, tokenSaleVestingAddress, multicallAddress)
