import { ApiPromise } from '@polkadot/api'
import { KeyringPair } from '@polkadot/keyring/types'
import { BigNumber } from '@starlay-finance/math-utils'
import BN from 'bn.js'
import { PolkadotAddress } from 'src/types/web3'
import { PolkadotContractBase } from './ContractBase'
import { Token } from './Token'
import Contract from './__generated__/contracts/pool'
import { TxItem } from './types'
import { sendTxWithEstimate, toTxItem } from './utils'

export class LendingPool extends PolkadotContractBase<Contract> {
  constructor(
    api: ApiPromise,
    address?: PolkadotAddress,
    signer?: KeyringPair,
  ) {
    super(api, address, signer)
  }

  new = () => new Contract(this.address!, this.signer!, this.api)

  deposit = async (
    params: {
      amount: BigNumber
      underlyingAsset: PolkadotAddress
    },
    _with: { address: PolkadotAddress; signer: KeyringPair },
  ): Promise<(TxItem | undefined)[]> => {
    this.with(_with)
    const amountBN = new BN(params.amount.toString())
    const approvalTxItem = await this.token(
      params.underlyingAsset,
    ).approveIfNeeded(_with.address, amountBN)
    const tx = () => sendTxWithEstimate(this.contract, 'mint', [amountBN])
    return [approvalTxItem, toTxItem('Pool', tx)]
  }

  token = (address: PolkadotAddress) =>
    new Token(this.api, address, this.signer!)
}
