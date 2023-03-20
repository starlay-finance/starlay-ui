import { BigNumber } from '@starlay-finance/math-utils'
export type TxType = 'Pool' | 'Approval' | 'DebtApproval'

export type TxItem<T = any> = {
  type: TxType
  tx: () => Promise<T>
}

export type LendingPoolCommonParams = {
  account: string
  pool: string
  asset: string
  amount: BigNumber
}
export type LendingPool = {
  deposit: (params: LendingPoolCommonParams) => Promise<TxItem[]>

  withdraw: (
    params: LendingPoolCommonParams & { collateral?: string; all?: boolean },
  ) => Promise<TxItem[]>

  borrow: (
    params: LendingPoolCommonParams & { debt?: string },
  ) => Promise<TxItem[]>

  repay: (
    params: LendingPoolCommonParams & { all?: boolean },
  ) => Promise<TxItem[]>

  setUsageAsCollateral: (params: {
    account: string
    asset: string
    usageAsCollateral: boolean
  }) => Promise<TxItem[]>
}
