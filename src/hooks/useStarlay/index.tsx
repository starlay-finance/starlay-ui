import { createContext, useContext } from 'react'
import { DataProvider, Faucet, LendingPool, TxItem } from 'src/types/starlay'

export type StarlayContext = {
  dataProvider: DataProvider
  lendingPool: LendingPool
  txExecutor: (item: TxItem) => Promise<any>
  // Testnet only
  faucet?: Faucet
}
export const StarlayContext = createContext<Partial<StarlayContext>>({})

export const useStarlay = () => useContext(StarlayContext)
