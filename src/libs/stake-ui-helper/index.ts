import { StakeUiHelper } from '@starlay-finance/contract-helpers'
import {
  StakeDataHumanized,
  StakeGeneralDataT,
  StakeUserDataT,
} from '@starlay-finance/contract-helpers/dist/esm/stake-ui-helper/types/stake'
import {
  BigNumber,
  normalizeBN,
  valueToBigNumber,
} from '@starlay-finance/math-utils'
import { BN_ZERO } from 'src/utils/number'
import { getNetworkConfigEVM } from '../config'
import { StaticRPCProviderEVM } from '../static-rpc-provider'

export const stakeUiHelperContract = (
  provider: StaticRPCProviderEVM,
): StakeUiHelperInterface => StakeUiHelperWrapper.new(provider)

export type StakeUiHelperInterface = {
  getUserUIDataHumanized: (account: string) => Promise<ComputedStakeData>
}

class StakeUiHelperWrapper implements StakeUiHelperInterface {
  constructor(private proivder: StakeUiHelper) {}

  static new = ({ chainId, provider }: StaticRPCProviderEVM) => {
    const {
      addresses: { stakeUiHelper },
    } = getNetworkConfigEVM(chainId)
    return new StakeUiHelperWrapper(
      new StakeUiHelper({
        stakeUiHelperAddress: stakeUiHelper || '0x000',
        provider,
      }),
    )
  }

  getUserUIDataHumanized = async (account: string) => {
    const { proivder } = this
    const data = await proivder.getUserUIDataHumanized(account)
    return computeStakeData(data)
  }
}

type ComputedStakeData = StakeGeneralDataT<number, BigNumber> &
  StakeUserDataT<number, BigNumber> & {
    distributionPerDay: BigNumber
    userCooldownEndTime: number
    userEarningsPerDay: BigNumber
  }
const computeStakeData = (data: StakeDataHumanized): ComputedStakeData => ({
  stakeTokenTotalSupply: normalizeBN(data.stakeTokenTotalSupply, 18),
  stakeCooldownSeconds: data.stakeCooldownSeconds,
  stakeUnstakeWindow: data.stakeUnstakeWindow,
  stakeTokenPriceEth: normalizeBN(data.stakeTokenPriceEth, 18),
  rewardTokenPriceEth: normalizeBN(data.rewardTokenPriceEth, 18),
  stakeApy: normalizeBN(data.stakeApy, 4),
  distributionPerSecond: normalizeBN(data.distributionPerSecond, 18),
  distributionEnd: valueToBigNumber(data.distributionEnd),
  stakeTokenUserBalance: normalizeBN(data.stakeTokenUserBalance, 18),
  underlyingTokenUserBalance: normalizeBN(data.underlyingTokenUserBalance, 18),
  userCooldown: data.userCooldown,
  userIncentivesToClaim: normalizeBN(data.userIncentivesToClaim, 18),
  userPermitNonce: valueToBigNumber(data.userPermitNonce),
  distributionPerDay: normalizeBN(
    valueToBigNumber(data.distributionPerSecond).multipliedBy(60 * 60 * 24),
    18,
  ),
  userCooldownEndTime:
    data.userCooldown !== 0 ? data.userCooldown + data.stakeCooldownSeconds : 0,
  userEarningsPerDay:
    data.stakeTokenUserBalance !== '0'
      ? normalizeBN(
          valueToBigNumber(data.distributionPerSecond)
            .multipliedBy(60 * 60 * 24)
            .multipliedBy(data.stakeTokenUserBalance)
            .div(data.stakeTokenTotalSupply)
            .toString(),
          18,
        )
      : BN_ZERO,
})
