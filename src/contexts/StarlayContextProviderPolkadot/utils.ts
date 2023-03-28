import { ApiPromise } from '@polkadot/api'
import {
  Signer,
  SubmittableExtrinsic,
  SubmittableResultValue,
} from '@polkadot/api/types'
import { TxItem } from 'src/types/starlay'

export const executeTx = async (
  item: TxItem<SubmittableExtrinsic<'promise'>>,
  account: string | undefined,
  signer: Signer | undefined,
  api: ApiPromise,
) => {
  if (!account) throw new Error('Unexpected state')
  const tx = await item.tx()
  return new Promise<{ wait: () => Promise<void> }>(async (res, rej) => {
    const txPromise = new Promise<void>(async (...executor) => {
      try {
        await tx.signAndSend(account, { signer }, callback(api, ...executor))
        res({ wait: () => txPromise })
      } catch (e) {
        // TODO
        rej(e)
      }
    })
  })
}

const callback =
  (
    api: ApiPromise,
    res: (value: void | PromiseLike<void>) => void,
    rej: (reason?: any) => void,
  ) =>
  ({ status, dispatchError }: SubmittableResultValue) => {
    console.log(status.toHuman())
    if (!status.isFinalized) return
    if (!dispatchError) return res()
    if (!dispatchError.isModule) {
      console.log(dispatchError.toString())
      return rej()
    }
    // for module errors, we have the section indexed, lookup
    const decoded = api.registry.findMetaError(dispatchError.asModule)
    const { docs, method, section } = decoded
    console.log(`${section}.${method}: ${docs.join(' ')}`)
    rej()
  }
