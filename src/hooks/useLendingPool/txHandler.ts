import { t } from '@lingui/macro'
import {
  eEthereumTxType,
  EthereumTransactionTypeExtended,
} from '@starlay-finance/contract-helpers'
import { serializeError } from 'eth-rpc-errors'
import { BigNumber, ethers } from 'ethers'
import { useMessageModal } from 'src/components/parts/Modal/MessageModal'
import { useMarketData } from '../useMarketData'
import { useUserData } from '../useUserData'
import { useWalletBalance } from '../useWalletBalance'

export type LendingPoolTxs = {
  actionTx?: EthereumTransactionTypeExtended
  erc20ApprovalTx?: EthereumTransactionTypeExtended
}

export const useTxHandler = () => {
  const { open } = useMessageModal()
  // TODO fix revalidate
  const { mutate: mutateMarketData } = useMarketData()
  const { mutate: mutateUserData } = useUserData()
  const { mutate: mutateWalletBalance } = useWalletBalance()

  const handleTx = async (
    txsPromise: Promise<EthereumTransactionTypeExtended[]>,
    signer: ethers.providers.JsonRpcSigner,
  ) => {
    // TODO fix messages
    open({
      type: 'Loading',
      title: 'Transaction Preparing',
      message: t`Waiting for transaction to be ready...`,
    })
    const { actionTx, erc20ApprovalTx } = pickLendingPoolTxs(await txsPromise)

    try {
      if (erc20ApprovalTx) {
        open({
          type: 'Loading',
          title: 'Confirm Transaction',
          message: t`Approve sending the ERC-20 asset to the pool.`,
        })
        const approveRes = await signer.sendTransaction(
          await erc20ApprovalTx.tx(),
        )
        open({
          type: 'Loading',
          title: 'Transaction Pending',
          message: t`Waiting for the transaction to be confirmed...`,
        })
        await approveRes.wait(1)
      }
      if (actionTx) {
        open({
          type: 'Loading',
          title: 'Confirm Transaction',
          message: t`Confirm the transaction.`,
        })
        const tx = await actionTx.tx()
        const depostRes = await signer.sendTransaction({
          ...tx,
          value: tx.value ? BigNumber.from(tx.value) : undefined,
        })
        open({
          type: 'Loading',
          title: 'Transaction Pending',
          message: t`Waiting for the transaction to be confirmed...`,
        })
        await depostRes.wait(1)
        mutateMarketData()
        mutateUserData()
        mutateWalletBalance()
        open({
          type: 'Success',
          title: 'Succeeded!',
          message: t`You transaction confirmed!`,
        })
      }
    } catch (e) {
      const error = serializeError(e)
      // TODO handle error
      if (error.code === 4001) {
        open({
          type: 'Alert',
          title: 'Transaction Canceled',
          message: t`You have canceled the transaction.`,
        })
        return
      }
      open({
        type: 'Alert',
        title: 'Error',
        message: t`Something went wrong...`,
      })
      console.error(e)
    }
  }

  return { handleTx }
}

const pickLendingPoolTxs = (txs: EthereumTransactionTypeExtended[]) =>
  txs.reduce<LendingPoolTxs>((prev, current) => {
    if (current.txType === eEthereumTxType.ERC20_APPROVAL)
      return { ...prev, erc20ApprovalTx: current }
    return { ...prev, actionTx: current }
  }, {})
