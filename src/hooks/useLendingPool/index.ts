import { InterestRate } from '@starlay-finance/contract-helpers'
import { BigNumber } from '@starlay-finance/math-utils'
import { ethers } from 'ethers'
import { lendingPoolContract } from 'src/libs/lending-pool'
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
  const { handleTx } = useTxHandler()

  const deposit = async (
    amount: BigNumber,
    underlyingAsset: EthereumAddress,
  ) => {
    if (!lendingPool || !account || !signer) throw new Error('Unexpected state')
    return handleTx(
      lendingPool.deposit({
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
  ) => {
    if (!lendingPool || !account || !signer) throw new Error('Unexpected state')
    return handleTx(
      lendingPool.withdraw({
        user: account,
        reserve: underlyingAsset,
        amount: amount.toString(),
        lTokenAddress,
      }),
      signer,
    )
  }
  const borrow = async (
    amount: BigNumber,
    underlyingAsset: EthereumAddress,
    vdTokenAddress: EthereumAddress,
    onSucceeded?: VoidFunction,
  ) => {
    if (!lendingPool || !account || !signer) throw new Error('Unexpected state')
    return handleTx(
      lendingPool.borrow({
        user: account,
        reserve: underlyingAsset,
        amount: amount.toString(),
        interestRateMode: InterestRate.Variable,
        debtTokenAddress: vdTokenAddress,
      }),
      signer,
      onSucceeded,
    )
  }
  const repay = async (amount: BigNumber, underlyingAsset: EthereumAddress) => {
    if (!lendingPool || !account || !signer) throw new Error('Unexpected state')
    return handleTx(
      lendingPool.repay({
        user: account,
        reserve: underlyingAsset,
        amount: amount.toString(),
        interestRateMode: InterestRate.Variable,
      }),
      signer,
    )
  }

  return { deposit, withdraw, borrow, repay }
}
