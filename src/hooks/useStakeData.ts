import {
  stakeUiHelperContract,
  StakeUiHelperInterface,
} from 'src/libs/stake-ui-helper'
import { StakeData } from 'src/types/models'
import { SWRResponseWithFallback } from 'src/types/swr'
import { EthereumAddress } from 'src/types/web3'
import { BN_ZERO } from 'src/utils/number'
import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import { useStaticRPCProvider } from './useStaticRPCProvider'
import { useWallet } from './useWallet'

const EMPTY_STAKE_DATA: StakeData = {
  userIncentivesToClaim: BN_ZERO,
}

export const useStakeData = () => {
  const { account } = useWallet()
  const { data: provider } = useStakeUiHelper()
  return useSWR(
    () => account && provider && ['stakedata', provider.chainId, account],
    ([_key, _chainId, account]) =>
      getUnclaimedBalance(provider!.provider, account),
    { fallbackData: EMPTY_STAKE_DATA },
  ) as SWRResponseWithFallback<StakeData>
}

const useStakeUiHelper = () => {
  const { data: provider } = useStaticRPCProvider()
  return useSWRImmutable(
    provider && ['stakeuihelper', provider.chainId],
    () => ({
      chainId: provider!.chainId,
      provider: stakeUiHelperContract(provider!),
    }),
  )
}

const getUnclaimedBalance = async (
  provider: StakeUiHelperInterface,
  account: EthereumAddress,
): Promise<StakeData> => provider.getUserUIDataHumanized(account)
