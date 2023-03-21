export type TxType = 'Approval' | 'Pool'

export type TxItem = {
  type: TxType
  tx: () => Promise<any>
}
