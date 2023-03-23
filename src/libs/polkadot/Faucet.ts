import { ApiPromise } from '@polkadot/api'
import { KeyringPair } from '@polkadot/keyring/types'
import { BigNumber } from '@starlay-finance/math-utils'
import { TxItem } from 'src/types/starlay'
import { PolkadotAddress } from 'src/types/web3'
import { PolkadotContractBase } from './ContractBase'
import Contract from './__generated__/contracts/faucet'
import { buildUnsignedTx, toTxItem } from './utils'

export class Faucet extends PolkadotContractBase<Contract> {
  constructor(api: ApiPromise, address: PolkadotAddress, signer?: KeyringPair) {
    super(Contract, api, address, signer)
  }

  mint = async (
    controller: PolkadotAddress,
    amount: BigNumber,
  ): Promise<TxItem[]> => {
    const tx = () =>
      buildUnsignedTx(this.contract, 'mintUnderlyingAll', [
        controller,
        amount.toString(),
        null,
      ])
    return [toTxItem('Pool', tx)]
  }
}
