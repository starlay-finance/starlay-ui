import { InterestRate } from '@starlay-finance/contract-helpers'
import { BigNumber } from '@starlay-finance/math-utils'
import { ethers } from 'ethers'
import { EVMChainId, getMarketConfig, getNetworkConfig } from 'src/libs/config'
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
    onSucceeded?: VoidFunction
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
      param.onSucceeded,
    )
  }
  const repay = async (param: {
    amount: BigNumber
    underlyingAsset: EthereumAddress
    all?: boolean
  }) => {
    if (!lendingPool || !account || !signer) throw new Error('Unexpected state')
    const repayAmount = !param.all
      ? param.amount.toString()
      : equals(param.underlyingAsset, BASE_ASSET_DUMMY_ADDRESS)
      ? param.amount.times(1.01).toString()
      : '-1'
    return handleTx(
      await lendingPool.repay({
        user: account,
        reserve: param.underlyingAsset,
        amount: repayAmount,
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

  const loop = async (param: {
    amount: BigNumber
    underlyingAsset: EthereumAddress
    debtToken: EthereumAddress
    borrowRatio: BigNumber
    loopCount: number
  }) => {
    if (!leverager || !account || !signer) throw new Error('Unexpected state')
    return handleTx(
      await leverager.loop({
        user: account,
        reserve: param.underlyingAsset,
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
    deposit,
    withdraw,
    borrow,
    repay,
    setUsageAsCollateral,
    loop,
    closeLoop,
  }
}

const reserveAddress = (underlyingAsset: string, chainId: EVMChainId) => {
  if (!equals(underlyingAsset, BASE_ASSET_DUMMY_ADDRESS)) return underlyingAsset
  const {
    baseAsset: { wrapperAddress },
  } = getNetworkConfig(chainId)
  return wrapperAddress
}
