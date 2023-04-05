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

  withdraw: LendingPool['withdraw'] = async (params) => {
    const contract = this.contract.with({
      address: params.pool,
      caller: params.account,
    })
    if (params.all) return contract.redeemAll()
    return contract.redeemUnderlying(params)
  }

  borrow: LendingPool['borrow'] = async (params) =>
    this.contract
      .with({ address: params.pool, caller: params.account })
      .borrow(params)

  repay: LendingPool['repay'] = async (params) => {
    const contract = this.contract.with({
      address: params.pool,
      caller: params.account,
    })
    if (params.all) return contract.repayBorrowAll(params)
    return contract.repayBorrow(params)
  }
  setUsageAsCollateral: LendingPool['setUsageAsCollateral'] = async () => {
    throw new Error('Unsupported')
  }
}
