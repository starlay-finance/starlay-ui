import { IncentivesController } from '@starlay-finance/contract-helpers'
import { StaticRPCProvider } from '../pool-data-provider'

export const incentivesControllerContract = ({ provider }: StaticRPCProvider) =>
  new IncentivesController(provider)
