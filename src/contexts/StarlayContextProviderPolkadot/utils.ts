import { ApiPromise } from '@polkadot/api'
import {
  Signer,
  SubmittableExtrinsic,
  SubmittableResultValue,
} from '@polkadot/api/types'
import { error } from 'src/hooks/useStarlay'
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
      } catch (e: any) {
        if (e.message === 'Cancelled') rej(error('Cancelled'))
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
      return rej(dispatchError)
    }
    // for module errors, we have the section indexed, lookup
    const decoded = api.registry.findMetaError(dispatchError.asModule)
    console.log(decoded)
    const { docs, method, section } = decoded
    rej(`${section}.${method}: ${docs.join(' ')}`)
  }
