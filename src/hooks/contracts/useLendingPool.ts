import { BigNumber } from '@starlay-finance/math-utils'
import { useStarlay } from '../useStarlay'
import { useTxHandler } from './useTxHandler'

export const useLendingPool = (account: string | null | undefined) => {
  const { lendingPool, txExecutor } = useStarlay()
  const { handleTx } = useTxHandler()

  const deposit = async (params: {
    amount: BigNumber
    asset: string
    pool: string
    decimals: number
  }) => {
    if (!lendingPool || !txExecutor || !account)
      throw new Error('Unexpected state')
    return handleTx(
      await lendingPool.deposit({ account, ...params }),
      txExecutor,
    )
  }

  const withdraw = async (params: {
    amount: BigNumber
    pool: string
    asset: string
    decimals: number
    collateral: string
    all?: boolean
  }) => {
    if (!lendingPool || !txExecutor || !account)
      throw new Error('Unexpected state')
    return handleTx(
      await lendingPool.withdraw({ account, ...params }),
      txExecutor,
    )
  }

  const borrow = async (params: {
    amount: BigNumber
    pool: string
    asset: string
    decimals: number
    debt?: string
    onSucceeded?: VoidFunction
  }) => {
    if (!lendingPool || !txExecutor || !account)
      throw new Error('Unexpected state')
    return handleTx(
      await lendingPool.borrow({ account, ...params }),
      txExecutor,
      params.onSucceeded,
    )
  }
  const repay = async (params: {
    amount: BigNumber
    pool: string
    asset: string
    decimals: number
    all?: boolean
  }) => {
    if (!lendingPool || !txExecutor || !account)
      throw new Error('Unexpected state')
    return handleTx(await lendingPool.repay({ account, ...params }), txExecutor)
  }

  const setUsageAsCollateral = async (params: {
    asset: string
    usageAsCollateral: boolean
  }) => {
    if (!lendingPool || !txExecutor || !account)
      throw new Error('Unexpected state')
    return handleTx(
      await lendingPool.setUsageAsCollateral({ account, ...params }),
      txExecutor,
    )
  }

  return {
    deposit,
    withdraw,
    borrow,
    repay,
    setUsageAsCollateral,
  }
}
