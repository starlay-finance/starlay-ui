import { Signer, SubmittableExtrinsic } from '@polkadot/api/types'
import { TxItem } from 'src/types/starlay'

export const executeTx = async (
  item: TxItem<SubmittableExtrinsic<'promise'>>,
  account: string | undefined,
  signer: Signer | undefined,
) => {
  if (!account) throw new Error('Unexpected state')
  const tx = await item.tx()
  return new Promise<{ wait: () => Promise<void> }>(async (res, rej) => {
    const txPromise = new Promise<void>(async (resTx, rejTx) => {
      try {
        await tx.signAndSend(account, { signer }, (result) => {
          if (result.isError) return rejTx('Transaction Failed')
          if (result.isCompleted) return resTx()
        })
        res({ wait: () => txPromise })
      } catch (e) {
        // TODO
        rej(e)
      }
    })
  })
}
