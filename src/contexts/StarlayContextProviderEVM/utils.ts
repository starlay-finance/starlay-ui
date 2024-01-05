import { transactionType } from '@starlay-finance/contract-helpers'
import { serializeError } from 'eth-rpc-errors'
import { ethers } from 'ethers'
import { error } from 'src/hooks/useStarlay'
import { TxItem } from 'src/types/starlay'

export const executeTx = async (
  item: TxItem<transactionType>,
  signer: ethers.Signer | undefined,
  recentGasPrice?: ethers.BigNumber,
) => {
  if (!signer) throw new Error('Unexpected state')
  const { gasLimit, ...tx } = await item.tx()
  try {
    const txPromise = await signer.sendTransaction({
      ...tx,
      value: tx.value ? ethers.BigNumber.from(tx.value) : undefined,
    })
    return { wait: () => txPromise.wait(1) }
  } catch (e) {
    const err = serializeError(e)
    if (
      err.code === 4001 ||
      err.code === -32603 ||
      err.message === 'User rejected the transaction'
    )
      throw error('Cancelled')
    throw e
  }
}
