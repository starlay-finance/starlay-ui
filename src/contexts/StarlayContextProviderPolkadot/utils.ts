import { Signer, SubmittableExtrinsic } from '@polkadot/api/types'
import { TxItem } from 'src/types/starlay'

export const executeTx = async (
  item: TxItem<SubmittableExtrinsic<'promise'>>,
  account: string | undefined,
  signer: Signer | undefined,
) => {
  if (!account || !signer?.signPayload) throw new Error('Unexpected state')
  const tx = await item.tx()
  const payload = JSON.parse(tx.toJSON())
  const signature = await signer.signPayload(payload)
  tx.addSignature(account, signature.signature, payload)
  return new Promise<void>((res, rej) => {
    tx.send(({ isError }) =>
      isError
        ? rej('Transaction Failed') // TODO
        : res(),
    )
  })
}
