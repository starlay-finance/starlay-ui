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

  poolData = async (controller: PolkadotAddress) => {
    const pools = await this.pools(controller)
    const [metadata, prices, configuration] = await Promise.all([
      this.contract.query.poolMetadataAll(pools),
      this.contract.query.poolUnderlyingPriceAll(pools),
      this.contract.query.configuration(controller),
    ])
    return {
      metadata: metadata.value.ok || [],
      prices: prices.value.ok || [],
      configuration: configuration.value.ok!,
    }
  }

  userData = async (pools: AccountId[], account: PolkadotAddress) =>
    (await this.contract.query.poolBalancesAll(pools, account)).value.ok || []

  underlyingBalance = async (pools: AccountId[], account: PolkadotAddress) =>
    (await this.contract.query.underlyingBalanceAll(pools, account)).value.ok ||
    []
}
