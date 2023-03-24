import { TxItem, TxType } from 'src/types/starlay'

export const toTxItem = (type: TxType, tx: () => Promise<any>): TxItem => ({
  type,
  tx,
})
