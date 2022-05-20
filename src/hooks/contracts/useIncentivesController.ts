import { ethers } from 'ethers'
import { getMarketConfig, getNetworkConfig } from 'src/libs/config'
import { incentivesControllerContract } from 'src/libs/incentives-controller'
import { EthereumAddress } from 'src/types/web3'
import useSWRImmutable from 'swr/immutable'
import { useStaticRPCProvider } from '../useStaticRPCProvider'
import { useTxHandler } from './txHandler'

export const useIncentivesController = (
  account: EthereumAddress | null | undefined,
  signer: ethers.providers.JsonRpcSigner | undefined,
) => {
  const { data: provider } = useStaticRPCProvider()
  const { data: incentivesController } = useSWRImmutable(
    provider && ['incentivescontroller', provider.chainId],
    () => incentivesControllerContract(provider!),
  )

  const { handleTx } = useTxHandler()

  const claim = async () => {
    if (!incentivesController || !account || !signer)
      throw new Error('Unexpected state')
    const { rewardToken } = getNetworkConfig(provider!.chainId)
    const {
      addresses: { INCENTIVES_CONTROLLER },
    } = getMarketConfig(provider!.chainId)
    return handleTx(
      await incentivesController.claimRewards({
        user: account,
        incentivesControllerAddress: INCENTIVES_CONTROLLER,
        assets: [rewardToken.underlyingAsset],
      }),
      signer,
    )
  }

  return { claim }
}
