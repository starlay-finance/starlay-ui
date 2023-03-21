import { ethers } from 'ethers'
import { getMarketConfig } from 'src/libs/config'
import { incentivesControllerContract } from 'src/libs/incentives-controller'
import { EthereumAddress } from 'src/types/web3'
import useSWRImmutable from 'swr/immutable'
import { useMarketData } from '../useMarketData'
import { useStaticRPCProviderEVM } from '../useStaticRPCProviderEVM'
import { useUserData } from '../useUserData'
import { useTxHandler } from './txHandler'

export const useIncentivesController = (
  account: EthereumAddress | null | undefined,
  signer: ethers.providers.JsonRpcSigner | undefined,
) => {
  const { data: provider } = useStaticRPCProviderEVM()
  const { data: incentivesController } = useSWRImmutable(
    provider && ['incentivescontroller', provider.chainId],
    () => incentivesControllerContract(provider!),
  )
  const { data: marketData } = useMarketData()
  const { data: userData } = useUserData()
  const { handleTx } = useTxHandler()

  const claim = async () => {
    if (!incentivesController || !account || !signer)
      throw new Error('Unexpected state')
    const {
      addresses: { INCENTIVES_CONTROLLER },
    } = getMarketConfig(provider!.chainId)
    const assets =
      !userData || !marketData
        ? []
        : marketData.assets.flatMap(
            ({ symbol, lTokenAddress, vdTokenAddress }) => {
              const asset = userData.balanceByAsset[symbol]
              const results = []
              if (!asset.deposited.isZero()) results.push(lTokenAddress)
              if (!asset.borrowed.isZero()) results.push(vdTokenAddress)
              return results
            },
          )
    return handleTx(
      await incentivesController.claimRewards({
        user: account,
        incentivesControllerAddress: INCENTIVES_CONTROLLER,
        assets,
      }),
      signer,
    )
  }

  return { claim }
}
