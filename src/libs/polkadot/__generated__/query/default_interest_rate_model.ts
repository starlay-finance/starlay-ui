/* This file is auto-generated */

import type {
  GasLimit,
  QueryReturnType,
  Result,
} from '@727-ventures/typechain-types'
import { handleReturnType, queryOkJSON } from '@727-ventures/typechain-types'
import type { ApiPromise } from '@polkadot/api'
import type { ContractPromise } from '@polkadot/api-contract'
import type BN from 'bn.js'
import type * as ArgumentTypes from '../types-arguments/default_interest_rate_model'
import type * as ReturnTypes from '../types-returns/default_interest_rate_model'
//@ts-ignore
import { getTypeDescription } from '../shared/utils'

export default class Methods {
  private __nativeContract: ContractPromise
  private __apiPromise: ApiPromise
  private __callerAddress: string

  constructor(
    nativeContract: ContractPromise,
    nativeApi: ApiPromise,
    callerAddress: string,
  ) {
    this.__nativeContract = nativeContract
    this.__callerAddress = callerAddress
    this.__apiPromise = nativeApi
  }

  /**
   * getBorrowRate
   *
   * @param { (string | number | BN) } cash,
   * @param { (string | number | BN) } borrows,
   * @param { (string | number | BN) } reserves,
   * @returns { Result<ReturnTypes.WrappedU256, ReturnTypes.LangError> }
   */
  getBorrowRate(
    cash: string | number | BN,
    borrows: string | number | BN,
    reserves: string | number | BN,
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<Result<ReturnTypes.WrappedU256, ReturnTypes.LangError>>
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'interestRateModel::getBorrowRate',
      [cash, borrows, reserves],
      __options,
      (result) => {
        return handleReturnType(
          result,
          getTypeDescription(8, 'default_interest_rate_model'),
        )
      },
    )
  }

  /**
   * getSupplyRate
   *
   * @param { (string | number | BN) } cash,
   * @param { (string | number | BN) } borrows,
   * @param { (string | number | BN) } reserves,
   * @param { ArgumentTypes.WrappedU256 } reserveFactorMantissa,
   * @returns { Result<ReturnTypes.WrappedU256, ReturnTypes.LangError> }
   */
  getSupplyRate(
    cash: string | number | BN,
    borrows: string | number | BN,
    reserves: string | number | BN,
    reserveFactorMantissa: ArgumentTypes.WrappedU256,
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<Result<ReturnTypes.WrappedU256, ReturnTypes.LangError>>
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'interestRateModel::getSupplyRate',
      [cash, borrows, reserves, reserveFactorMantissa],
      __options,
      (result) => {
        return handleReturnType(
          result,
          getTypeDescription(8, 'default_interest_rate_model'),
        )
      },
    )
  }
}
