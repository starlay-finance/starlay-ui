import { createContext, useContext } from 'react'
import { NetworkType } from 'src/libs/config'
import {
  DataProvider,
  Faucet,
  LendingPool,
  StarlayTxError,
  TxItem,
} from 'src/types/starlay'

export type StarlayContextValue = {
  network: NetworkType
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
