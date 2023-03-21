import { ApiPromise, Keyring } from '@polkadot/api'
import { KeyringPair } from '@polkadot/keyring/types'
import { waitReady } from '@polkadot/wasm-crypto'
import { PolkadotAddress } from 'src/types/web3'

const keyring = new Keyring({ type: 'sr25519' })
let dummySigner: KeyringPair
waitReady().then(() => (dummySigner = keyring.addFromUri('//Alice')))

export type Contract<T> = {
  new (address: string, signer: KeyringPair, nativeAPI: ApiPromise): T
}

export abstract class PolkadotContractBase<T> {
  // @ts-ignore
  private _contract: T
  constructor(
    protected Contract: Contract<T>,
    protected api: ApiPromise,
    protected address?: PolkadotAddress,
    protected signer: KeyringPair = dummySigner,
  ) {}

  get contract() {
    if (!this._contract) this._contract = this.new()
    return this._contract
  }

  new = () => new this.Contract(this.address!, this.signer!, this.api)

  with(option?: { address?: PolkadotAddress; signer?: KeyringPair }) {
    if (!option) return
    if (option.address) this.address = option.address
    if (option.signer) this.signer = option.signer
    this._contract = new this.Contract(this.address!, this.signer!, this.api)
  }
}
