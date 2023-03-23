import { Signer, SubmittableExtrinsic } from '@polkadot/api/types'
import { TxItem } from 'src/types/starlay'

export const executeTx = async (
  item: TxItem<SubmittableExtrinsic<'promise'>>,
  account: string | undefined,
  signer: Signer | undefined,
) => {
  if (!account) throw new Error('Unexpected state')
  const tx = await item.tx()
  return new Promise<void>((res, rej) => {
    try {
      tx.signAndSend(account, { signer }, ({ isError }) => {
        if (!isError) return res()
        // TODO
        return rej('Transaction Failed')
      })
    } catch (e) {
      // TODO
      return rej(e)
    }
  })
}
