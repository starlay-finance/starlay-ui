import { ApiPromise } from '@polkadot/api'
import { KeyringPair } from '@polkadot/keyring/types'
import BN from 'bn.js'
import { PolkadotAddress } from 'src/types/web3'
import { PolkadotContractBase } from './ContractBase'
import Contract from './__generated__/contracts/psp22_token'
import { TxItem } from './types'
import { sendTxWithEstimate } from './utils'

export class Token extends PolkadotContractBase<Contract> {
  constructor(api: ApiPromise, address: PolkadotAddress, signer: KeyringPair) {
    super(api, address, signer)
  }

  new = () => new Contract(this.address!, this.signer!, this.api)

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
        tx: () => sendTxWithEstimate(contract, 'approve', [pool, amount]),
      }
  }
}
