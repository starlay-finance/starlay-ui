import { InterestRate } from '@starlay-finance/contract-helpers'
import { BigNumber } from '@starlay-finance/math-utils'
import { ethers } from 'ethers'
import { ChainId, getMarketConfig, getNetworkConfig } from 'src/libs/config'
import { lendingPoolContract } from 'src/libs/lending-pool'
import { leveragerContract } from 'src/libs/leverager'
import { BASE_ASSET_DUMMY_ADDRESS } from 'src/libs/pool-data-provider/converters/constants'
import { EthereumAddress } from 'src/types/web3'
import { equals } from 'src/utils/address'
import useSWRImmutable from 'swr/immutable'
import { useStaticRPCProvider } from '../useStaticRPCProvider'
import { useTxHandler } from './txHandler'

export const useLendingPool = (
  account: EthereumAddress | null | undefined,
  signer: ethers.providers.JsonRpcSigner | undefined,
) => {
  const { data: provider } = useStaticRPCProvider()
  const { data: lendingPool } = useSWRImmutable(
    provider && ['lendingpool', provider.chainId],
    () => lendingPoolContract(provider!),
  )
  const { data: leverager } = useSWRImmutable(
    provider && ['leverager', provider.chainId],
    () => {
      const { LEVERAGER } = getMarketConfig(provider!.chainId).addresses
      if (!LEVERAGER) return undefined
      return leveragerContract(provider!, LEVERAGER)
    },
  )
  const { handleTx } = useTxHandler()

  const deposit = async (param: {
    amount: BigNumber
    underlyingAsset: EthereumAddress
  }) => {
    if (!lendingPool || !account || !signer) throw new Error('Unexpected state')
    return handleTx(
      await lendingPool.deposit({
        user: account,
        reserve: param.underlyingAsset,
        amount: param.amount.toString(),
      }),
      signer,
    )
  }

  const withdraw = async (param: {
    amount: BigNumber
    underlyingAsset: EthereumAddress
    lTokenAddress: EthereumAddress
    all?: boolean
  }) => {
    if (!lendingPool || !account || !signer) throw new Error('Unexpected state')
    return handleTx(
      await lendingPool.withdraw({
        user: account,
        reserve: param.underlyingAsset,
        amount: param.all ? '-1' : param.amount.toString(),
        lTokenAddress: param.lTokenAddress,
      }),
      signer,
    )
  }
  const borrow = async (param: {
    amount: BigNumber
    underlyingAsset: EthereumAddress
    vdTokenAddress: EthereumAddress
  }) => {
    if (!lendingPool || !account || !signer) throw new Error('Unexpected state')
    return handleTx(
      await lendingPool.borrow({
        user: account,
        reserve: param.underlyingAsset,
        amount: param.amount.toString(),
        interestRateMode: InterestRate.Variable,
        debtTokenAddress: param.vdTokenAddress,
      }),
      signer,
    )
  }
  const repay = async (param: {
    amount: BigNumber
    underlyingAsset: EthereumAddress
    all?: boolean
  }) => {
    if (!lendingPool || !account || !signer) throw new Error('Unexpected state')
    return handleTx(
      await lendingPool.repay({
        user: account,
        reserve: param.underlyingAsset,
        amount: param.all ? '-1' : param.amount.toString(),
        interestRateMode: InterestRate.Variable,
      }),
      signer,
    )
  }
  const setUsageAsCollateral = async (
    usageAsCollateral: boolean,
    underlyingAsset: EthereumAddress,
  ) => {
    if (!lendingPool || !account || !signer || !provider)
      throw new Error('Unexpected state')
    return handleTx(
      lendingPool.setUsageAsCollateral({
        user: account,
        reserve: reserveAddress(underlyingAsset, provider.chainId),
        usageAsCollateral,
      }),
      signer,
    )
  }

  const loop = async (
    amount: BigNumber,
    underlyingAsset: EthereumAddress,
    debtToken: EthereumAddress,
    borrowRatio: BigNumber,
    loopCount: number,
  ) => {
    if (!leverager || !account || !signer) throw new Error('Unexpected state')
    return handleTx(
      await leverager.loop({
        user: account,
        reserve: underlyingAsset,
        amount: amount.toString(),
        debtToken,
        interestRateMode: InterestRate.Variable,
        borrowRatio: borrowRatio.toFixed(4, BigNumber.ROUND_FLOOR),
        loopCount: loopCount.toFixed(0),
      }),
      signer,
    )
  }

  return { deposit, withdraw, borrow, repay, setUsageAsCollateral, loop }
}

const reserveAddress = (underlyingAsset: string, chainId: ChainId) => {
  if (!equals(underlyingAsset, BASE_ASSET_DUMMY_ADDRESS)) return underlyingAsset
  const {
    baseAsset: { wrapperAddress },
  } = getNetworkConfig(chainId)
  return wrapperAddress
}
