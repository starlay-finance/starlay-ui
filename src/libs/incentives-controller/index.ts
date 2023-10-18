import { IncentivesController } from '@starlay-finance/contract-helpers'
import { StaticRPCProviderEVM } from '../static-rpc-provider'

export const incentivesControllerContract = ({
  provider,
}: StaticRPCProviderEVM) => new IncentivesController(provider)
