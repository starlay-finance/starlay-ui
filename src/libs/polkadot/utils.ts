import { TxItem, TxType } from 'src/types/starlay'

type ContactBase = {
  query: any
  buildExtrinsic: any
  tx: any
  methods: any
  events: any
}

export const buildUnsignedTx = async <
  C extends ContactBase,
  F extends keyof C['tx'],
>(
  contract: C,
  fn: F,
  args: Parameters<C['tx'][F]>,
) => {
  const { gasRequired, value } = await contract.query[fn](...args)
  // TODO handle error
  if (value.err) return Promise.reject()
  return contract.buildExtrinsic[fn](...args, { gasLimit: gasRequired })
}

export const toTxItem = (type: TxType, tx: () => Promise<any>): TxItem => ({
  type,
  tx,
})
