import { ApiPromise } from '@polkadot/api'
import { KeyringPair } from '@polkadot/keyring/types'
import { PolkadotAddress } from 'src/types/web3'

export abstract class PolkadotContractBase<T> {
  // @ts-ignore
  private _contract: T
  constructor(
    protected api: ApiPromise,
    protected address?: PolkadotAddress,
    protected signer?: KeyringPair,
  ) {}

  get contract() {
    if (!this._contract) this._contract = this.new()
    return this._contract
  }

  abstract new: () => T

  with(option?: { address?: PolkadotAddress; signer?: KeyringPair }) {
    if (!option) return
    if (option.address) this.address = option.address
    if (option.signer) this.signer = option.signer
    this._contract = this.new()
  }
}
