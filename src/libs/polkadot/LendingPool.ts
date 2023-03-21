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
import { buildUnsignedTx, toTxItem } from './utils'

export class LendingPool extends PolkadotContractBase<Contract> {
  constructor(
    api: ApiPromise,
    address?: PolkadotAddress,
    signer?: KeyringPair,
  ) {
    super(Contract, api, address, signer)
  }

  mint = async (
    params: {
      amount: BigNumber
      asset: PolkadotAddress
    },
    _with: { address: PolkadotAddress },
  ): Promise<TxItem[]> => {
    this.with(_with)
    const amountBN = new BN(params.amount.toString())
    const approvalTxItem = await this.token(params.asset).approveIfNeeded(
      _with.address,
      amountBN,
    )
    const tx = () => buildUnsignedTx(this.contract, 'mint', [amountBN])
    return [approvalTxItem, toTxItem('Pool', tx)].filter(filterFalsy)
  }

  redeem = async (
    params: {
      amount: BigNumber
      asset: PolkadotAddress
    },
    _with: { address: PolkadotAddress },
  ): Promise<TxItem[]> => {
    this.with(_with)
    const amountBN = new BN(params.amount.toString())
    const tx = () => buildUnsignedTx(this.contract, 'redeem', [amountBN])
    return [toTxItem('Pool', tx)]
  }

  borrow = async (
    params: {
      amount: BigNumber
      asset: PolkadotAddress
    },
    _with: { address: PolkadotAddress },
  ): Promise<TxItem[]> => {
    this.with(_with)
    const amountBN = new BN(params.amount.toString())
    const tx = () => buildUnsignedTx(this.contract, 'borrow', [amountBN])
    return [toTxItem('Pool', tx)]
  }

  repayBorrow = async (
    params: {
      amount: BigNumber
      asset: PolkadotAddress
    },
    _with: { address: PolkadotAddress },
  ): Promise<TxItem[]> => {
    this.with(_with)
    const amountBN = new BN(params.amount.toString())
    const tx = () => buildUnsignedTx(this.contract, 'repayBorrow', [amountBN])
    return [toTxItem('Pool', tx)]
  }

  token = (address: PolkadotAddress) =>
    new Token(this.api, address, this.signer!)
}
