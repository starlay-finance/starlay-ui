import { ApiPromise } from '@polkadot/api'
import { KeyringPair } from '@polkadot/keyring/types'
import { BigNumber } from '@starlay-finance/math-utils'
import BN from 'bn.js'
import { TxItem } from 'src/types/starlay'
import { PolkadotAddress } from 'src/types/web3'
import { filterFalsy } from 'src/utils/array'
import { PolkadotContractBase } from './ContractBase'
import { Token } from './Token'
import Contract from './__generated__/contracts/pool'
import { toTxItem } from './utils'

export class LendingPool extends PolkadotContractBase<Contract> {
  constructor(
    api: ApiPromise,
    address?: PolkadotAddress,
    signer?: KeyringPair,
  ) {
    super(Contract, api, address, signer)
  }

  mint = async (params: {
    pool: PolkadotAddress
    account: PolkadotAddress
    amount: BigNumber
    decimals: number
    asset: PolkadotAddress
  }): Promise<TxItem[]> => {
    const amountBN = toBN(params.amount, params.decimals)
    const approvalTxItem = await this.token(params.asset).approveIfNeeded(
      params.account,
      params.pool,
      amountBN,
    )
    const tx = () => this.buildUnsignedTx('mint', [amountBN])
    return [approvalTxItem, toTxItem('Pool', tx)].filter(filterFalsy)
  }

  redeemUnderlying = async (params: {
    amount: BigNumber
    asset: PolkadotAddress
    decimals: number
  }): Promise<TxItem[]> => {
    const amountBN = toBN(params.amount, params.decimals)
    const tx = () => this.buildUnsignedTx('redeemUnderlying', [amountBN])
    return [toTxItem('Pool', tx)]
  }

  borrow = async (params: {
    amount: BigNumber
    asset: PolkadotAddress
    decimals: number
  }): Promise<TxItem[]> => {
    const amountBN = toBN(params.amount, params.decimals)
    const tx = () => this.buildUnsignedTx('borrow', [amountBN])
    return [toTxItem('Pool', tx)]
  }

  repayBorrow = async (params: {
    pool: PolkadotAddress
    account: PolkadotAddress
    amount: BigNumber
    asset: PolkadotAddress
    decimals: number
  }): Promise<TxItem[]> => {
    const amountBN = toBN(params.amount, params.decimals)
    const approvalTxItem = await this.token(params.asset).approveIfNeeded(
      params.account,
      params.pool,
      amountBN,
    )
    const tx = () => this.buildUnsignedTx('repayBorrow', [amountBN])
    return [approvalTxItem, toTxItem('Pool', tx)].filter(filterFalsy)
  }

  private token = (address: PolkadotAddress) =>
    new Token(this.api, address, this.signer!)
}

const toBN = (num: BigNumber, decimals: number) =>
  new BN(num.shiftedBy(decimals).integerValue(BigNumber.ROUND_FLOOR).toString())
