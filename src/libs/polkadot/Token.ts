import { ApiPromise } from '@polkadot/api'
import { KeyringPair } from '@polkadot/keyring/types'
import BN from 'bn.js'
import { TxItem } from 'src/types/starlay'
import { PolkadotAddress } from 'src/types/web3'
import { PolkadotContractBase } from './ContractBase'
import Contract from './__generated__/contracts/psp22_token'

export class Token extends PolkadotContractBase<Contract> {
  constructor(api: ApiPromise, address: PolkadotAddress, signer: KeyringPair) {
    super(Contract, api, address, signer)
  }

  approveIfNeeded = async (
    pool: PolkadotAddress,
    amount: BN,
  ): Promise<TxItem | undefined> => {
    const contract = this.contract
    const {
      value: { ok: allowance },
    } = await contract.query.allowance(this.signer!.address, pool)
    if (!allowance || allowance.rawNumber.lt(amount))
      return {
        type: 'Approval',
        tx: () => this.buildUnsignedTx('approve', [pool, amount]),
      }
  }
}
