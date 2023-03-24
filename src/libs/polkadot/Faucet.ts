import { ApiPromise } from '@polkadot/api'
import { KeyringPair } from '@polkadot/keyring/types'
import { BigNumber } from '@starlay-finance/math-utils'
import { TxItem } from 'src/types/starlay'
import { PolkadotAddress } from 'src/types/web3'
import { PolkadotContractBase } from './ContractBase'
import { toTxItem } from './utils'
import Contract from './__generated__/contracts/faucet'

export class Faucet extends PolkadotContractBase<Contract> {
  constructor(api: ApiPromise, address: PolkadotAddress, signer?: KeyringPair) {
    super(Contract, api, address, signer)
  }

  mint = async (
    controller: PolkadotAddress,
    amount: BigNumber,
  ): Promise<TxItem[]> => {
    const tx = () =>
      this.buildUnsignedTx('mintUnderlyingAll', [
        controller,
        amount.toString(),
        null,
      ])
    return [toTxItem('Pool', tx)]
  }
}
