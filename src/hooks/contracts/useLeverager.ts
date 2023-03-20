import { InterestRate } from '@starlay-finance/contract-helpers'
import { BigNumber } from '@starlay-finance/math-utils'
import { getMarketConfig, getNetworkConfig } from 'src/libs/config'
import { leveragerContract } from 'src/libs/leverager'
import { BASE_ASSET_DUMMY_ADDRESS } from 'src/libs/pool-data-provider/converters/constants'
import { EthereumAddress } from 'src/types/web3'
import { equals } from 'src/utils/address'
import useSWRImmutable from 'swr/immutable'
import { useEVMWallet } from '../useEVMWallet'
import { useStaticRPCProvider } from '../useStaticRPCProvider'
import { useTxHandler } from './txHandler'

export const useLeverager = () => {
  const { data: provider } = useStaticRPCProvider()
  const { account, signer } = useEVMWallet()
  const { data: leverager } = useSWRImmutable(
    provider && ['leverager', provider.chainId],
    () => {
      const { LEVERAGER } = getMarketConfig(provider!.chainId).addresses
      if (!LEVERAGER) return undefined
      return leveragerContract(provider!, LEVERAGER)
    },
  )

  const { handleTx } = useTxHandler()

  const loop = async (param: {
    amount: BigNumber
    asset: EthereumAddress
    debtToken: EthereumAddress
    borrowRatio: BigNumber
    loopCount: number
  }) => {
    if (!leverager || !account || !signer) throw new Error('Unexpected state')
    return handleTx(
      await leverager.loop({
        user: account,
        reserve: param.asset,
        amount: param.amount.toString(),
        debtToken: param.debtToken,
        interestRateMode: InterestRate.Variable,
        borrowRatio: param.borrowRatio.toFixed(4, BigNumber.ROUND_FLOOR),
        loopCount: param.loopCount.toFixed(0),
      }),
      signer,
    )
  }

  const closeLoop = async (param: {
    underlyingAsset: EthereumAddress
    lToken: EthereumAddress
  }) => {
    if (!leverager || !account || !signer) throw new Error('Unexpected state')
    const { baseAsset } = getNetworkConfig(provider!.chainId)

    return handleTx(
      await leverager.close({
        user: account,
        reserve: !equals(param.underlyingAsset, BASE_ASSET_DUMMY_ADDRESS)
          ? param.underlyingAsset
          : baseAsset.wrapperAddress,
        lToken: param.lToken,
      }),
      signer,
    )
  }

  return {
    loop,
    closeLoop,
  }
}
