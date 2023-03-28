import { ApiPromise } from '@polkadot/api'
import { LendingPool } from 'src/types/starlay'
import { LendingPool as LendingPoolContract } from '../polkadot/LendingPool'

export class LendingPoolPolkadot implements LendingPool {
  constructor(private contract: LendingPoolContract) {}

  static new = ({ api }: { api: ApiPromise }) =>
    new LendingPoolPolkadot(new LendingPoolContract(api))

  deposit: LendingPool['deposit'] = async (params) =>
    this.contract
      .with({ address: params.pool, caller: params.account })
      .mint(params)

  withdraw: LendingPool['withdraw'] = async (params) =>
    this.contract
      .with({ address: params.pool, caller: params.account })
      .redeemUnderlying(params)

  borrow: LendingPool['borrow'] = async (params) =>
    this.contract
      .with({ address: params.pool, caller: params.account })
      .borrow(params)

  repay: LendingPool['repay'] = async (params) =>
    this.contract
      .with({ address: params.pool, caller: params.account })
      .repayBorrow(params)

  setUsageAsCollateral: LendingPool['setUsageAsCollateral'] = async () => {
    throw new Error('Unsupported')
  }
}
