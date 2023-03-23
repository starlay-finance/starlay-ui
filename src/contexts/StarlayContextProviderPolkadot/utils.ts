import { Signer, SubmittableExtrinsic } from '@polkadot/api/types'
import { TxItem } from 'src/types/starlay'

export const executeTx = async (
  item: TxItem<SubmittableExtrinsic<'promise'>>,
  account: string | undefined,
  signer: Signer | undefined,
) => {
  if (!account) throw new Error('Unexpected state')
  const tx = await item.tx()
  return new Promise<void>(async (res, rej) => {
    try {
      await tx.signAndSend(account, { signer }, (result) => {
        // TODO
        if (result.isError) return rej('Transaction Failed')

        waitUntil(() => {
          console.log(result.status.isInBlock, result.status.isFinalized)
          return result.status.isInBlock
        }, 1000).then(() => res())
      })
    } catch (e) {
      // TODO
      rej(e)
    }
  })
}

const waitUntil = async (cb: () => boolean, interval: number) => {
  let timer: any
  return new Promise<void>((res) => {
    timer = setInterval(() => {
      if (!cb()) return
      clearInterval(timer)
      res()
    }, interval)
  })
}
