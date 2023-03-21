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
import type * as ArgumentTypes from '../types-arguments/pool'
import type * as ReturnTypes from '../types-returns/pool'
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
   * exchangeRateCurrent
   *
   * @returns { Result<Result<ReturnTypes.WrappedU256, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  exchangeRateCurrent(
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<
      Result<
        Result<ReturnTypes.WrappedU256, ReturnTypes.Error>,
        ReturnTypes.LangError
      >
    >
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'pool::exchangeRateCurrent',
      [],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(12, 'pool'))
      },
    )
  }

  /**
   * getAccrualBlockTimestamp
   *
   * @returns { Result<number, ReturnTypes.LangError> }
   */
  getAccrualBlockTimestamp(
    __options?: GasLimit,
  ): Promise<QueryReturnType<Result<number, ReturnTypes.LangError>>> {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'pool::getAccrualBlockTimestamp',
      [],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(16, 'pool'))
      },
    )
  }

  /**
   * balanceOfUnderlyingCurrent
   *
   * @param { ArgumentTypes.AccountId } account,
   * @returns { Result<Result<ReturnNumber, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  balanceOfUnderlyingCurrent(
    account: ArgumentTypes.AccountId,
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<
      Result<Result<ReturnNumber, ReturnTypes.Error>, ReturnTypes.LangError>
    >
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'pool::balanceOfUnderlyingCurrent',
      [account],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(17, 'pool'))
      },
    )
  }

  /**
   * borrow
   *
   * @param { (string | number | BN) } borrowAmount,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  borrow(
    borrowAmount: string | number | BN,
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<
      Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError>
    >
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'pool::borrow',
      [borrowAmount],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(19, 'pool'))
      },
    )
  }

  /**
   * totalReserves
   *
   * @returns { Result<ReturnNumber, ReturnTypes.LangError> }
   */
  totalReserves(
    __options?: GasLimit,
  ): Promise<QueryReturnType<Result<ReturnNumber, ReturnTypes.LangError>>> {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'pool::totalReserves',
      [],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(21, 'pool'))
      },
    )
  }

  /**
   * manager
   *
   * @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
   */
  manager(
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<Result<ReturnTypes.AccountId, ReturnTypes.LangError>>
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'pool::manager',
      [],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(22, 'pool'))
      },
    )
  }

  /**
   * underlying
   *
   * @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
   */
  underlying(
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<Result<ReturnTypes.AccountId, ReturnTypes.LangError>>
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'pool::underlying',
      [],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(22, 'pool'))
      },
    )
  }

  /**
   * borrowBalanceStored
   *
   * @param { ArgumentTypes.AccountId } account,
   * @returns { Result<ReturnNumber, ReturnTypes.LangError> }
   */
  borrowBalanceStored(
    account: ArgumentTypes.AccountId,
    __options?: GasLimit,
  ): Promise<QueryReturnType<Result<ReturnNumber, ReturnTypes.LangError>>> {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'pool::borrowBalanceStored',
      [account],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(21, 'pool'))
      },
    )
  }

  /**
   * repayBorrow
   *
   * @param { (string | number | BN) } repayAmount,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  repayBorrow(
    repayAmount: string | number | BN,
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<
      Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError>
    >
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'pool::repayBorrow',
      [repayAmount],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(19, 'pool'))
      },
    )
  }

  /**
   * mint
   *
   * @param { (string | number | BN) } mintAmount,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  mint(
    mintAmount: string | number | BN,
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<
      Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError>
    >
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'pool::mint',
      [mintAmount],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(19, 'pool'))
      },
    )
  }

  /**
   * borrowBalanceCurrent
   *
   * @param { ArgumentTypes.AccountId } account,
   * @returns { Result<Result<ReturnNumber, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  borrowBalanceCurrent(
    account: ArgumentTypes.AccountId,
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<
      Result<Result<ReturnNumber, ReturnTypes.Error>, ReturnTypes.LangError>
    >
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'pool::borrowBalanceCurrent',
      [account],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(17, 'pool'))
      },
    )
  }

  /**
   * exchageRateStored
   *
   * @returns { Result<ReturnTypes.WrappedU256, ReturnTypes.LangError> }
   */
  exchageRateStored(
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<Result<ReturnTypes.WrappedU256, ReturnTypes.LangError>>
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'pool::exchageRateStored',
      [],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(23, 'pool'))
      },
    )
  }

  /**
   * getCashPrior
   *
   * @returns { Result<ReturnNumber, ReturnTypes.LangError> }
   */
  getCashPrior(
    __options?: GasLimit,
  ): Promise<QueryReturnType<Result<ReturnNumber, ReturnTypes.LangError>>> {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'pool::getCashPrior',
      [],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(21, 'pool'))
      },
    )
  }

  /**
   * controller
   *
   * @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
   */
  controller(
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<Result<ReturnTypes.AccountId, ReturnTypes.LangError>>
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'pool::controller',
      [],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(22, 'pool'))
      },
    )
  }

  /**
   * redeemUnderlying
   *
   * @param { (string | number | BN) } redeemAmount,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  redeemUnderlying(
    redeemAmount: string | number | BN,
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<
      Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError>
    >
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'pool::redeemUnderlying',
      [redeemAmount],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(19, 'pool'))
      },
    )
  }

  /**
   * reserveFactorMantissa
   *
   * @returns { Result<ReturnTypes.WrappedU256, ReturnTypes.LangError> }
   */
  reserveFactorMantissa(
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<Result<ReturnTypes.WrappedU256, ReturnTypes.LangError>>
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'pool::reserveFactorMantissa',
      [],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(23, 'pool'))
      },
    )
  }

  /**
   * totalBorrows
   *
   * @returns { Result<ReturnNumber, ReturnTypes.LangError> }
   */
  totalBorrows(
    __options?: GasLimit,
  ): Promise<QueryReturnType<Result<ReturnNumber, ReturnTypes.LangError>>> {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'pool::totalBorrows',
      [],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(21, 'pool'))
      },
    )
  }

  /**
   * liquidateBorrow
   *
   * @param { ArgumentTypes.AccountId } borrower,
   * @param { (string | number | BN) } repayAmount,
   * @param { ArgumentTypes.AccountId } collateral,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  liquidateBorrow(
    borrower: ArgumentTypes.AccountId,
    repayAmount: string | number | BN,
    collateral: ArgumentTypes.AccountId,
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<
      Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError>
    >
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'pool::liquidateBorrow',
      [borrower, repayAmount, collateral],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(19, 'pool'))
      },
    )
  }

  /**
   * borrowRatePerMsec
   *
   * @returns { Result<ReturnTypes.WrappedU256, ReturnTypes.LangError> }
   */
  borrowRatePerMsec(
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<Result<ReturnTypes.WrappedU256, ReturnTypes.LangError>>
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'pool::borrowRatePerMsec',
      [],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(23, 'pool'))
      },
    )
  }

  /**
   * supplyRatePerMsec
   *
   * @returns { Result<ReturnTypes.WrappedU256, ReturnTypes.LangError> }
   */
  supplyRatePerMsec(
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<Result<ReturnTypes.WrappedU256, ReturnTypes.LangError>>
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'pool::supplyRatePerMsec',
      [],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(23, 'pool'))
      },
    )
  }

  /**
   * reduceReserves
   *
   * @param { (string | number | BN) } amount,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  reduceReserves(
    amount: string | number | BN,
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<
      Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError>
    >
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'pool::reduceReserves',
      [amount],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(19, 'pool'))
      },
    )
  }

  /**
   * repayBorrowBehalf
   *
   * @param { ArgumentTypes.AccountId } borrower,
   * @param { (string | number | BN) } repayAmount,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  repayBorrowBehalf(
    borrower: ArgumentTypes.AccountId,
    repayAmount: string | number | BN,
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<
      Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError>
    >
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'pool::repayBorrowBehalf',
      [borrower, repayAmount],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(19, 'pool'))
      },
    )
  }

  /**
   * seize
   *
   * @param { ArgumentTypes.AccountId } liquidator,
   * @param { ArgumentTypes.AccountId } borrower,
   * @param { (string | number | BN) } seizeTokens,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  seize(
    liquidator: ArgumentTypes.AccountId,
    borrower: ArgumentTypes.AccountId,
    seizeTokens: string | number | BN,
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<
      Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError>
    >
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'pool::seize',
      [liquidator, borrower, seizeTokens],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(19, 'pool'))
      },
    )
  }

  /**
   * redeem
   *
   * @param { (string | number | BN) } redeemTokens,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  redeem(
    redeemTokens: string | number | BN,
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<
      Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError>
    >
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'pool::redeem',
      [redeemTokens],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(19, 'pool'))
      },
    )
  }

  /**
   * allowance
   *
   * @param { ArgumentTypes.AccountId } owner,
   * @param { ArgumentTypes.AccountId } spender,
   * @returns { Result<ReturnNumber, ReturnTypes.LangError> }
   */
  allowance(
    owner: ArgumentTypes.AccountId,
    spender: ArgumentTypes.AccountId,
    __options?: GasLimit,
  ): Promise<QueryReturnType<Result<ReturnNumber, ReturnTypes.LangError>>> {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'psp22::allowance',
      [owner, spender],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(21, 'pool'))
      },
    )
  }

  /**
   * balanceOf
   *
   * @param { ArgumentTypes.AccountId } owner,
   * @returns { Result<ReturnNumber, ReturnTypes.LangError> }
   */
  balanceOf(
    owner: ArgumentTypes.AccountId,
    __options?: GasLimit,
  ): Promise<QueryReturnType<Result<ReturnNumber, ReturnTypes.LangError>>> {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'psp22::balanceOf',
      [owner],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(21, 'pool'))
      },
    )
  }

  /**
   * transferFrom
   *
   * @param { ArgumentTypes.AccountId } from,
   * @param { ArgumentTypes.AccountId } to,
   * @param { (string | number | BN) } value,
   * @param { Array<(number | string | BN)> } data,
   * @returns { Result<Result<null, ReturnTypes.PSP22Error>, ReturnTypes.LangError> }
   */
  transferFrom(
    from: ArgumentTypes.AccountId,
    to: ArgumentTypes.AccountId,
    value: string | number | BN,
    data: Array<number | string | BN>,
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<
      Result<Result<null, ReturnTypes.PSP22Error>, ReturnTypes.LangError>
    >
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'psp22::transferFrom',
      [from, to, value, data],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(24, 'pool'))
      },
    )
  }

  /**
   * approve
   *
   * @param { ArgumentTypes.AccountId } spender,
   * @param { (string | number | BN) } value,
   * @returns { Result<Result<null, ReturnTypes.PSP22Error>, ReturnTypes.LangError> }
   */
  approve(
    spender: ArgumentTypes.AccountId,
    value: string | number | BN,
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<
      Result<Result<null, ReturnTypes.PSP22Error>, ReturnTypes.LangError>
    >
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'psp22::approve',
      [spender, value],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(24, 'pool'))
      },
    )
  }

  /**
   * decreaseAllowance
   *
   * @param { ArgumentTypes.AccountId } spender,
   * @param { (string | number | BN) } deltaValue,
   * @returns { Result<Result<null, ReturnTypes.PSP22Error>, ReturnTypes.LangError> }
   */
  decreaseAllowance(
    spender: ArgumentTypes.AccountId,
    deltaValue: string | number | BN,
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<
      Result<Result<null, ReturnTypes.PSP22Error>, ReturnTypes.LangError>
    >
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'psp22::decreaseAllowance',
      [spender, deltaValue],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(24, 'pool'))
      },
    )
  }

  /**
   * transfer
   *
   * @param { ArgumentTypes.AccountId } to,
   * @param { (string | number | BN) } value,
   * @param { Array<(number | string | BN)> } data,
   * @returns { Result<Result<null, ReturnTypes.PSP22Error>, ReturnTypes.LangError> }
   */
  transfer(
    to: ArgumentTypes.AccountId,
    value: string | number | BN,
    data: Array<number | string | BN>,
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<
      Result<Result<null, ReturnTypes.PSP22Error>, ReturnTypes.LangError>
    >
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'psp22::transfer',
      [to, value, data],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(24, 'pool'))
      },
    )
  }

  /**
   * totalSupply
   *
   * @returns { Result<ReturnNumber, ReturnTypes.LangError> }
   */
  totalSupply(
    __options?: GasLimit,
  ): Promise<QueryReturnType<Result<ReturnNumber, ReturnTypes.LangError>>> {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'psp22::totalSupply',
      [],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(21, 'pool'))
      },
    )
  }

  /**
   * increaseAllowance
   *
   * @param { ArgumentTypes.AccountId } spender,
   * @param { (string | number | BN) } deltaValue,
   * @returns { Result<Result<null, ReturnTypes.PSP22Error>, ReturnTypes.LangError> }
   */
  increaseAllowance(
    spender: ArgumentTypes.AccountId,
    deltaValue: string | number | BN,
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<
      Result<Result<null, ReturnTypes.PSP22Error>, ReturnTypes.LangError>
    >
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'psp22::increaseAllowance',
      [spender, deltaValue],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(24, 'pool'))
      },
    )
  }

  /**
   * tokenSymbol
   *
   * @returns { Result<Array<number> | null, ReturnTypes.LangError> }
   */
  tokenSymbol(
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<Result<Array<number> | null, ReturnTypes.LangError>>
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'psp22Metadata::tokenSymbol',
      [],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(26, 'pool'))
      },
    )
  }

  /**
   * tokenName
   *
   * @returns { Result<Array<number> | null, ReturnTypes.LangError> }
   */
  tokenName(
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<Result<Array<number> | null, ReturnTypes.LangError>>
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'psp22Metadata::tokenName',
      [],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(26, 'pool'))
      },
    )
  }

  /**
   * tokenDecimals
   *
   * @returns { Result<number, ReturnTypes.LangError> }
   */
  tokenDecimals(
    __options?: GasLimit,
  ): Promise<QueryReturnType<Result<number, ReturnTypes.LangError>>> {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'psp22Metadata::tokenDecimals',
      [],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(28, 'pool'))
      },
    )
  }
}
