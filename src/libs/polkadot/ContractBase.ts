import { ApiPromise, Keyring } from '@polkadot/api'
import { KeyringPair } from '@polkadot/keyring/types'
import BN from 'bn.js'
import { PolkadotAddress } from 'src/types/web3'

const keyring = new Keyring({ type: 'sr25519' })
let dummySigner: KeyringPair

export type ContractConstructor<T> = {
  new (address: string, signer: KeyringPair, nativeAPI: ApiPromise): T
}

export type Contract = {
  query: any
  buildExtrinsic: any
  tx: any
  methods: any
  events: any
}

export abstract class PolkadotContractBase<T extends Contract> {
  // @ts-ignore
  private _contract: T
  constructor(
    protected Contract: ContractConstructor<T>,
    protected api: ApiPromise,
    protected address?: PolkadotAddress,
    protected signer: KeyringPair = dummySigner,
  ) {
    if (!dummySigner) {
      dummySigner = keyring.addFromUri('//Alice')
      this.signer = dummySigner
    }
  }

  get contract() {
    if (!this._contract) this._contract = this.new()
    return this._contract
  }

  new = () => new this.Contract(this.address!, this.signer!, this.api)

  with(option?: {
    address?: PolkadotAddress
    signer?: KeyringPair
    caller?: PolkadotAddress
  }) {
    if (!option) return this
    if (option.address) this.address = option.address
    if (option.signer || option.caller) {
      const signer = option.signer || this.signer
      this.signer = {
        ...signer,
        address: option.caller || signer.address,
      }
    }
    this._contract = new this.Contract(this.address!, this.signer!, this.api)
    return this
  }

  buildUnsignedTx = async <F extends keyof T['tx']>(
    fn: F,
    args: Parameters<T['tx'][F]>,
  ) => {
    console.log(`${fn as string}(${JSON.stringify(args)})`)
    const { gasRequired, value } = await this.contract.query[fn](...args)
    if (value.err) return Promise.reject()
    if (value.ok?.err) return Promise.reject(parseError(value.ok.err))
    const gasLimit = this.api.registry.createType('WeightV2', {
      refTime: withMargin(gasRequired.refTime.toString()),
      proofSize: withMargin(gasRequired.proofSize.toString()),
    })
    console.log(JSON.stringify(gasRequired))
    return this.contract.buildExtrinsic[fn](...args, { gasLimit })
  }
}

const DEFAULT_MARGIN = new BN(110)
const MARGIN_SCALE = new BN(100)
const withMargin = (value: string, margin = DEFAULT_MARGIN) =>
  new BN(value).mul(margin).div(MARGIN_SCALE)

const parseError = (obj: Record<string, any>): string =>
  Object.keys(obj)
    .flatMap((key) => (obj[key] ? [key, parseError(obj[key])] : key))
    .join('.')
