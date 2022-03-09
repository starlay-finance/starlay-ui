import { InterestRate } from '@starlay-finance/contract-helpers'
import { BigNumber } from '@starlay-finance/math-utils'
import { ethers } from 'ethers'
import { getMarketConfig } from 'src/libs/config'
import { lendingPoolContract } from 'src/libs/lending-pool'
import { leveragerContract } from 'src/libs/leverager'
import { EthereumAddress } from 'src/types/web3'
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
    provider && ['lendingpool', provider.chainId],
    () => {
      const { LEVERAGER } = getMarketConfig(provider!.chainId).addresses
      if (!LEVERAGER) return undefined
      return leveragerContract(provider!, LEVERAGER)
    },
  )
  const { handleTx } = useTxHandler()

  const deposit = async (
    amount: BigNumber,
    underlyingAsset: EthereumAddress,
  ) => {
    if (!lendingPool || !account || !signer) throw new Error('Unexpected state')
    return handleTx(
      await lendingPool.deposit({
        user: account,
        reserve: underlyingAsset,
        amount: amount.toString(),
      }),
      signer,
    )
  }
  const withdraw = async (
    amount: BigNumber,
    underlyingAsset: EthereumAddress,
    lTokenAddress: EthereumAddress,
    all?: boolean,
  ) => {
    if (!lendingPool || !account || !signer) throw new Error('Unexpected state')
    return handleTx(
      await lendingPool.withdraw({
        user: account,
        reserve: underlyingAsset,
        amount: all ? '-1' : amount.toString(),
        lTokenAddress,
      }),
      signer,
    )
  }
  const borrow = async (
    amount: BigNumber,
    underlyingAsset: EthereumAddress,
    vdTokenAddress: EthereumAddress,
  ) => {
    if (!lendingPool || !account || !signer) throw new Error('Unexpected state')
    return handleTx(
      await lendingPool.borrow({
        user: account,
        reserve: underlyingAsset,
        amount: amount.toString(),
        interestRateMode: InterestRate.Variable,
        debtTokenAddress: vdTokenAddress,
      }),
      signer,
    )
  }
  const repay = async (
    amount: BigNumber,
    underlyingAsset: EthereumAddress,
    all?: boolean,
  ) => {
    if (!lendingPool || !account || !signer) throw new Error('Unexpected state')
    return handleTx(
      await lendingPool.repay({
        user: account,
        reserve: underlyingAsset,
        amount: all ? '-1' : amount.toString(),
        interestRateMode: InterestRate.Variable,
      }),
      signer,
    )
  }
  const setUsageAsCollateral = async (
    usageAsCollateral: boolean,
    underlyingAsset: EthereumAddress,
  ) => {
    if (!lendingPool || !account || !signer) throw new Error('Unexpected state')
    return handleTx(
      lendingPool.setUsageAsCollateral({
        user: account,
        reserve: underlyingAsset,
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
        borrowRatio: borrowRatio.toString(),
        loopCount,
      }),
      signer,
    )
  }

  return { deposit, withdraw, borrow, repay, setUsageAsCollateral, loop }
}
