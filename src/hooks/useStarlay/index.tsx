import { createContext, useContext } from 'react'
import {
  DataProvider,
  Faucet,
  LendingPool,
  StarlayTxError,
  TxItem,
} from 'src/types/starlay'

export type StarlayContextValue = {
  dataProvider: DataProvider
  lendingPool: LendingPool
  txExecutor: (item: TxItem) => Promise<any>
  // Testnet only
  faucet?: Faucet
}
export const StarlayContext = createContext<Partial<StarlayContextValue>>({})

export const useStarlay = () => useContext(StarlayContext)

export const error = (
  type: StarlayTxError['type'],
  message?: StarlayTxError['message'],
): StarlayTxError => ({ isStarlayTxError: true, type, message })

export const isStarlayTxError = (e: any): e is StarlayTxError =>
  e.isStarlayTxError
