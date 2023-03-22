import { ApiPromise } from '@polkadot/api'
import { KeyringPair } from '@polkadot/keyring/types'
import { PolkadotAddress } from 'src/types/web3'
import { AccountId } from '../polkadot/__generated__/types-arguments/pool'
import { PolkadotContractBase } from './ContractBase'
import Contract from './__generated__/contracts/lens'

export class Lens extends PolkadotContractBase<Contract> {
  constructor(api: ApiPromise, address: PolkadotAddress, signer?: KeyringPair) {
    super(Contract, api, address, signer)
  }

  pools = async (controller: PolkadotAddress) =>
    (await this.contract.query.pools(controller)).value.ok || []

  poolData = async (pools: AccountId[]) => {
    const [metadata, prices] = await Promise.all([
      this.contract.query.poolMetadataAll(pools),
      this.contract.query.poolUnderlyingPriceAll(pools),
    ])
    return { metadata: metadata.value.ok || [], prices: prices.value.ok || [] }
  }

  userData = async (pools: AccountId[], account: PolkadotAddress) =>
    (await this.contract.query.poolBalancesAll(pools, account)).value.ok || []

  underlyingBalance = async (pools: AccountId[], account: PolkadotAddress) =>
    (await this.contract.query.underlyingBalanceAll(pools, account)).value.ok ||
    []
}
