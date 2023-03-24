import { t } from '@lingui/macro'
import { serializeError } from 'eth-rpc-errors'
import { useMessageModal } from 'src/components/parts/Modal/MessageModal'
import { TxItem } from 'src/types/starlay'
import { useMarketData } from '../useMarketData'
import { useUserData } from '../useUserData'
import { useWalletBalance } from '../useWalletBalance'

export const useTxHandler = () => {
  const { open } = useMessageModal()
  const { mutate: mutateMarketData } = useMarketData()
  const { mutate: mutateUserData } = useUserData()
  const { mutate: mutateWalletBalance } = useWalletBalance()
  const revalidate = () => {
    mutateMarketData()
    mutateUserData()
    mutateWalletBalance()
  }

  const handleTx = async <T = any>(
    txs: TxItem<T>[],
    executor: (item: TxItem<T>) => Promise<{ wait: () => Promise<void> }>,
    onSucceeded?: VoidFunction,
  ) => {
    open({
      type: 'Loading',
      title: t`Transaction Preparing`,
      message: t`Waiting for transaction to be ready...`,
    })

    try {
      for (const tx of txs) {
        open({
          type: 'Loading',
          title: t`Confirm Transaction`,
          message:
            tx.type === 'Approval'
              ? t`Approve sending your asset...`
              : tx.type === 'DebtApproval'
              ? t`Approve the contract to borrow ERC-20 assets on your credit.`
              : t`Confirm the transaction.`,
        })
        const txPromise = await executor(tx)
        open({
          type: 'Loading',
          title: t`Transaction Pending`,
          message: t`Waiting for the transaction to be confirmed...`,
        })
        await txPromise.wait()
      }
      revalidate()
      open({
        type: 'Success',
        title: t`Succeeded!`,
        message: t`Your transaction confirmed!`,
        onClose: onSucceeded,
      })
    } catch (e) {
      const error = serializeError(e)
      if (error.code === 4001) {
        open({
          type: 'Alert',
          title: t`Transaction Canceled`,
          message: t`You have canceled the transaction.`,
        })
        return { error: error.code }
      }
      open({
        type: 'Alert',
        title: t`Error`,
        message: t`Something went wrong...`,
      })
      console.error(e)
      return { error: error.code }
    }
  }

  return { handleTx }
}
