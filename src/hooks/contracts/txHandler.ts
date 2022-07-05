import { t } from '@lingui/macro'
import {
  eEthereumTxType,
  EthereumTransactionTypeExtended,
} from '@starlay-finance/contract-helpers'
import { valueToBigNumber } from '@starlay-finance/math-utils'
import { serializeError } from 'eth-rpc-errors'
import { BigNumber, ethers } from 'ethers'
import { useMessageModal } from 'src/components/parts/Modal/MessageModal'
import {
  getGasPriceMultiplier,
  getManualGasPrice,
} from 'src/utils/localStorage'
import { BN_ONE } from 'src/utils/number'
import { useMarketData } from '../useMarketData'
import { useRecentGasPrice } from '../useRecentGasPrice'
import { useUserData } from '../useUserData'
import { useWalletBalance } from '../useWalletBalance'

export type LendingPoolTxs = {
  actionTx?: EthereumTransactionTypeExtended
  erc20ApprovalTx?: EthereumTransactionTypeExtended
  debtErc20ApprovalTx?: EthereumTransactionTypeExtended
}

export const useTxHandler = () => {
  const { open } = useMessageModal()
  const { mutate: mutateMarketData } = useMarketData()
  const { mutate: mutateUserData } = useUserData()
  const { mutate: mutateWalletBalance } = useWalletBalance()
  const { getRecentGasPrice } = useRecentGasPrice()
  const revalidate = () => {
    mutateMarketData()
    mutateUserData()
    mutateWalletBalance()
  }

  const handleTx = async (
    txs: EthereumTransactionTypeExtended[],
    signer: ethers.providers.JsonRpcSigner,
    onSucceeded?: VoidFunction,
  ) => {
    open({
      type: 'Loading',
      title: t`Transaction Preparing`,
      message: t`Waiting for transaction to be ready...`,
    })

    const { actionTx, erc20ApprovalTx, debtErc20ApprovalTx } =
      pickLendingPoolTxs(txs)
    const gasPrice = getMultipliedGasPrice(signer, await getRecentGasPrice())

    try {
      if (erc20ApprovalTx) {
        open({
          type: 'Loading',
          title: t`Confirm Transaction`,
          message: t`Approve sending your asset...`,
        })
        const tx = await erc20ApprovalTx.tx()
        const approveRes = await signer.sendTransaction({ ...tx, gasPrice })
        open({
          type: 'Loading',
          title: t`Transaction Pending`,
          message: t`Waiting for the transaction to be confirmed...`,
        })
        await approveRes.wait(1)
      }
      if (debtErc20ApprovalTx) {
        open({
          type: 'Loading',
          title: t`Confirm Transaction`,
          message: t`Approve the contract to borrow ERC-20 assets on your credit.`,
        })
        const tx = await debtErc20ApprovalTx.tx()
        const approveRes = await signer.sendTransaction({ ...tx, gasPrice })
        open({
          type: 'Loading',
          title: t`Transaction Pending`,
          message: t`Waiting for the transaction to be confirmed...`,
        })
        await approveRes.wait(1)
      }
      if (actionTx) {
        open({
          type: 'Loading',
          title: t`Confirm Transaction`,
          message: t`Confirm the transaction.`,
        })
        const tx = await actionTx.tx()
        const depostRes = await signer.sendTransaction({
          ...tx,
          value: tx.value ? BigNumber.from(tx.value) : undefined,
          gasPrice,
        })
        open({
          type: 'Loading',
          title: t`Transaction Pending`,
          message: t`Waiting for the transaction to be confirmed...`,
        })
        await depostRes.wait(1)
        revalidate()
        open({
          type: 'Success',
          title: t`Succeeded!`,
          message: t`Your transaction confirmed!`,
          onClose: onSucceeded,
        })
      }
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

const pickLendingPoolTxs = (txs: EthereumTransactionTypeExtended[]) =>
  txs.reduce<LendingPoolTxs>((prev, current) => {
    if (current.txType === eEthereumTxType.ERC20_APPROVAL)
      return { ...prev, erc20ApprovalTx: current }
    if (current.txType === eEthereumTxType.DEBTERC20_APPROVAL)
      return { ...prev, debtErc20ApprovalTx: current }
    return { ...prev, actionTx: current }
  }, {})

const getMultipliedGasPrice = async (
  signer: ethers.Signer,
  latestGasPrice?: BigNumber,
) => {
  const baseGasPrice = latestGasPrice || (await signer.getGasPrice())
  const gasPriceMultiplier = getGasPriceMultiplier()
  const manualGasPrice = getManualGasPrice()
  if (manualGasPrice) return BigNumber.from(+manualGasPrice * 10 ** 9)
  const gasPrice = valueToBigNumber(baseGasPrice.toString())
    .times(gasPriceMultiplier || BN_ONE)
    .toFixed(0)
  return BigNumber.from(gasPrice)
}
