import { createContext, useContext } from 'react'
import { DataProvider, Faucet, LendingPool, TxItem } from 'src/types/starlay'

export type StarlayContextValue = {
  dataProvider: DataProvider
  lendingPool: LendingPool
  txExecutor: (item: TxItem) => Promise<any>
  // Testnet only
  faucet?: Faucet
}
export const StarlayContext = createContext<Partial<StarlayContextValue>>({})

export const useStarlay = () => useContext(StarlayContext)
