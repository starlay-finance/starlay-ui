import { LendingPool } from '@starlay-finance/contract-helpers'
import { getMarketConfig } from '../config'
import { StaticRPCProvider } from '../pool-data-provider'

export const lendingPoolContract = ({ chainId, provider }: StaticRPCProvider) =>
  new LendingPool(provider, getMarketConfig(chainId).addresses)
