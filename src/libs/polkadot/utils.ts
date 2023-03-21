import { TxItem, TxType } from "./types"

type ContactBase = {
  query: any
  tx: any
}

export const sendTxWithEstimate = async <C extends ContactBase, const F extends keyof C["tx"]>(
  contract: C,
  fn: F,
  args: Parameters<C['tx'][F]>,
) => {
  const { gasRequired, value } = await contract.query[fn](...args)
  // TODO handle error
  if (value.err) return Promise.reject()
  const res = await contract.tx[fn](...args, {
    gasLimit: gasRequired,
  })
  // TODO handle error
  if (res.result?.isError) return Promise.reject()
}

export const toTxItem = (type:TxType,tx: () =>Promise<any>): TxItem => ({type, tx})
