import { ApiPromise } from '@polkadot/api'
import { KeyringPair } from '@polkadot/keyring/types'
import { PolkadotAddress } from 'src/types/web3'
import { PolkadotContractBase } from './ContractBase'
import Contract from './__generated__/contracts/lens'

export class Lens extends PolkadotContractBase<Contract> {
  constructor(api: ApiPromise, address: PolkadotAddress, signer?: KeyringPair) {
    super(Contract, api, address, signer)
  }

  poolData = async () => {
    const [metadata, prices] = await Promise.all([
      // TODO
      this.contract.query.poolMetadataAll([
        '5EVVxdNs7JGH1snDsi1tU2dLqmb3Crc5WHJdrZvnhGX9yQA8',
      ]),
      this.contract.query.poolUnderlyingPriceAll([
        '5EVVxdNs7JGH1snDsi1tU2dLqmb3Crc5WHJdrZvnhGX9yQA8',
      ]),
    ])
    return { metadata: metadata.value.ok || [], prices: prices.value.ok || [] }
  }

  userData = async (params: { account: PolkadotAddress }) =>
    (await this.contract.query.poolBalancesAll([], params.account)).value.ok ||
    []
}
