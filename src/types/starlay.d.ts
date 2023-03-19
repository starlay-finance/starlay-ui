import { BigNumber } from '@starlay-finance/math-utils'
import { AssetMetadata, MarketData, User, WalletBalance } from './models'
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

export type DataProvider<R = any> = {
  readonly chainId: any
  getMarketData: (params?: {
    layPriceInUSD?: BigNumber
  }) => Promise<MarketData & { chainId: any; raw: R }>
  getUserData: (params: {
    account: string
    marketData: MarketData & { raw: R }
  }) => Promise<User>
  getWalletBalance: (params: {
    account: string
    assets: AssetMetadata[]
  }) => Promise<WalletBalance>
}