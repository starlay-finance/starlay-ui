import { createContext, useContext } from 'react'
import { LendingPool, TxItem } from 'src/types/starlay'

export type StarlayContext = {
  lendingPool: LendingPool
  txExecutor: (item: TxItem) => Promise<any>
}
export const StarlayContext = createContext<Partial<StarlayContext>>({})

export const useStarlay = () => useContext(StarlayContext)
