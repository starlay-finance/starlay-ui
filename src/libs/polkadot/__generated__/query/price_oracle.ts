/* This file is auto-generated */

import type {
  GasLimit,
  QueryReturnType,
  Result,
} from '@727-ventures/typechain-types'
import { handleReturnType, queryOkJSON } from '@727-ventures/typechain-types'
import type { ApiPromise } from '@polkadot/api'
import type { ContractPromise } from '@polkadot/api-contract'
import type * as ArgumentTypes from '../types-arguments/price_oracle'
import type * as ReturnTypes from '../types-returns/price_oracle'
//@ts-ignore
import { ReturnNumber } from '@727-ventures/typechain-types'
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
   * getPrice
   *
   * @param { ArgumentTypes.AccountId } asset,
   * @returns { Result<ReturnNumber, ReturnTypes.LangError> }
   */
  getPrice(
    asset: ArgumentTypes.AccountId,
    __options?: GasLimit,
  ): Promise<QueryReturnType<Result<ReturnNumber, ReturnTypes.LangError>>> {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'priceOracle::getPrice',
      [asset],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(6, 'price_oracle'))
      },
    )
  }
}
