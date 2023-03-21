import { ApiPromise } from '@polkadot/api'
import { LendingPool } from 'src/types/starlay'
import { LendingPool as LendingPoolContract } from '../polkadot/LendingPool'

export class LendingPoolPolkadot implements LendingPool {
  constructor(private contract: LendingPoolContract) {}

  static new = ({ api }: { api: ApiPromise }) =>
    new LendingPoolPolkadot(new LendingPoolContract(api))

  deposit: LendingPool['deposit'] = async ({ amount, asset, pool }) =>
    this.contract.mint({ amount, asset }, { address: pool })

  // TODO redeeem underlying
  withdraw: LendingPool['withdraw'] = async ({ amount, asset, pool }) =>
    this.contract.redeem({ amount, asset }, { address: pool })

  borrow: LendingPool['borrow'] = async ({ amount, asset, pool }) =>
    this.contract.borrow({ amount, asset }, { address: pool })

  repay: LendingPool['repay'] = async ({ amount, asset, pool }) =>
    this.contract.repayBorrow({ amount, asset }, { address: pool })

  setUsageAsCollateral: LendingPool['setUsageAsCollateral'] = async () => {
    throw new Error('Unsupported')
  }
}
