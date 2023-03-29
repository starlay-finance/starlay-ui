import { ApiPromise } from '@polkadot/api'
import { KeyringPair } from '@polkadot/keyring/types'
import { PolkadotAddress } from 'src/types/web3'
import { AccountId } from '../polkadot/__generated__/types-arguments/pool'
import {
  PoolMetadata,
  PoolUnderlyingPrice,
} from '../polkadot/__generated__/types-returns/lens'
import { PolkadotContractBase } from './ContractBase'
import Contract from './__generated__/contracts/lens'

const poolChunkSize = 3
export class Lens extends PolkadotContractBase<Contract> {
  constructor(api: ApiPromise, address: PolkadotAddress, signer?: KeyringPair) {
    super(Contract, api, address, signer)
  }

  pools = async (controller: PolkadotAddress) =>
    (await this.contract.query.pools(controller)).value.ok || []

  poolData = async (controller: PolkadotAddress) => {
    const pools = await this.pools(controller)

    const metadata: PoolMetadata[] = []
    const prices: PoolUnderlyingPrice[] = []
    for (let cursor = 0; cursor < pools.length; cursor += poolChunkSize) {
      const targetPools = pools.slice(cursor, cursor + poolChunkSize)
      const [_metadata, _prices] = await Promise.all([
        this.contract.query.poolMetadataAll(targetPools),
        this.contract.query.poolUnderlyingPriceAll(targetPools),
      ])
      metadata.push(...(_metadata.value.ok || []))
      prices.push(...(_prices.value.ok || []))
    }
    return {
      metadata,
      prices,
      configuration: (await this.contract.query.configuration(controller)).value
        .ok!,
    }
  }

  userData = async (pools: AccountId[], account: PolkadotAddress) =>
    (await this.contract.query.poolBalancesAll(pools, account)).value.ok || []

  underlyingBalance = async (pools: AccountId[], account: PolkadotAddress) =>
    (await this.contract.query.underlyingBalanceAll(pools, account)).value.ok ||
    []
}
