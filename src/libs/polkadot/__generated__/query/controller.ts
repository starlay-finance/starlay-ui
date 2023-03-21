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
import type * as ArgumentTypes from '../types-arguments/controller'
import type * as ReturnTypes from '../types-returns/controller'
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
   * supportMarket
   *
   * @param { ArgumentTypes.AccountId } pool,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  supportMarket(
    pool: ArgumentTypes.AccountId,
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
      'controller::supportMarket',
      [pool],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(13, 'controller'))
      },
    )
  }

  /**
   * collateralFactorMantissa
   *
   * @param { ArgumentTypes.AccountId } pool,
   * @returns { Result<ReturnTypes.WrappedU256 | null, ReturnTypes.LangError> }
   */
  collateralFactorMantissa(
    pool: ArgumentTypes.AccountId,
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<
      Result<ReturnTypes.WrappedU256 | null, ReturnTypes.LangError>
    >
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'controller::collateralFactorMantissa',
      [pool],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(16, 'controller'))
      },
    )
  }

  /**
   * liquidateBorrowAllowed
   *
   * @param { ArgumentTypes.AccountId } poolBorrowed,
   * @param { ArgumentTypes.AccountId } poolCollateral,
   * @param { ArgumentTypes.AccountId } liquidator,
   * @param { ArgumentTypes.AccountId } borrower,
   * @param { (string | number | BN) } repayAmount,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  liquidateBorrowAllowed(
    poolBorrowed: ArgumentTypes.AccountId,
    poolCollateral: ArgumentTypes.AccountId,
    liquidator: ArgumentTypes.AccountId,
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
      'controller::liquidateBorrowAllowed',
      [poolBorrowed, poolCollateral, liquidator, borrower, repayAmount],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(13, 'controller'))
      },
    )
  }

  /**
   * transferAllowed
   *
   * @param { ArgumentTypes.AccountId } pool,
   * @param { ArgumentTypes.AccountId } src,
   * @param { ArgumentTypes.AccountId } dst,
   * @param { (string | number | BN) } transferTokens,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  transferAllowed(
    pool: ArgumentTypes.AccountId,
    src: ArgumentTypes.AccountId,
    dst: ArgumentTypes.AccountId,
    transferTokens: string | number | BN,
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
      'controller::transferAllowed',
      [pool, src, dst, transferTokens],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(13, 'controller'))
      },
    )
  }

  /**
   * mintGuardianPaused
   *
   * @param { ArgumentTypes.AccountId } pool,
   * @returns { Result<boolean | null, ReturnTypes.LangError> }
   */
  mintGuardianPaused(
    pool: ArgumentTypes.AccountId,
    __options?: GasLimit,
  ): Promise<QueryReturnType<Result<boolean | null, ReturnTypes.LangError>>> {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'controller::mintGuardianPaused',
      [pool],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(18, 'controller'))
      },
    )
  }

  /**
   * repayBorrowAllowed
   *
   * @param { ArgumentTypes.AccountId } pool,
   * @param { ArgumentTypes.AccountId } payer,
   * @param { ArgumentTypes.AccountId } borrower,
   * @param { (string | number | BN) } repayAmount,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  repayBorrowAllowed(
    pool: ArgumentTypes.AccountId,
    payer: ArgumentTypes.AccountId,
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
      'controller::repayBorrowAllowed',
      [pool, payer, borrower, repayAmount],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(13, 'controller'))
      },
    )
  }

  /**
   * setLiquidationIncentiveMantissa
   *
   * @param { ArgumentTypes.WrappedU256 } newLiquidationIncentiveMantissa,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  setLiquidationIncentiveMantissa(
    newLiquidationIncentiveMantissa: ArgumentTypes.WrappedU256,
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
      'controller::setLiquidationIncentiveMantissa',
      [newLiquidationIncentiveMantissa],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(13, 'controller'))
      },
    )
  }

  /**
   * isListed
   *
   * @param { ArgumentTypes.AccountId } pool,
   * @returns { Result<boolean, ReturnTypes.LangError> }
   */
  isListed(
    pool: ArgumentTypes.AccountId,
    __options?: GasLimit,
  ): Promise<QueryReturnType<Result<boolean, ReturnTypes.LangError>>> {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'controller::isListed',
      [pool],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(20, 'controller'))
      },
    )
  }

  /**
   * setCollateralFactorMantissa
   *
   * @param { ArgumentTypes.AccountId } pool,
   * @param { ArgumentTypes.WrappedU256 } newCollateralFactorMantissa,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  setCollateralFactorMantissa(
    pool: ArgumentTypes.AccountId,
    newCollateralFactorMantissa: ArgumentTypes.WrappedU256,
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
      'controller::setCollateralFactorMantissa',
      [pool, newCollateralFactorMantissa],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(13, 'controller'))
      },
    )
  }

  /**
   * repayBorrowVerify
   *
   * @param { ArgumentTypes.AccountId } pool,
   * @param { ArgumentTypes.AccountId } payer,
   * @param { ArgumentTypes.AccountId } borrower,
   * @param { (string | number | BN) } repayAmount,
   * @param { (string | number | BN) } borrowerIndex,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  repayBorrowVerify(
    pool: ArgumentTypes.AccountId,
    payer: ArgumentTypes.AccountId,
    borrower: ArgumentTypes.AccountId,
    repayAmount: string | number | BN,
    borrowerIndex: string | number | BN,
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
      'controller::repayBorrowVerify',
      [pool, payer, borrower, repayAmount, borrowerIndex],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(13, 'controller'))
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
      'controller::manager',
      [],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(21, 'controller'))
      },
    )
  }

  /**
   * mintAllowed
   *
   * @param { ArgumentTypes.AccountId } pool,
   * @param { ArgumentTypes.AccountId } minter,
   * @param { (string | number | BN) } mintAmount,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  mintAllowed(
    pool: ArgumentTypes.AccountId,
    minter: ArgumentTypes.AccountId,
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
      'controller::mintAllowed',
      [pool, minter, mintAmount],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(13, 'controller'))
      },
    )
  }

  /**
   * setPriceOracle
   *
   * @param { ArgumentTypes.AccountId } newOracle,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  setPriceOracle(
    newOracle: ArgumentTypes.AccountId,
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
      'controller::setPriceOracle',
      [newOracle],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(13, 'controller'))
      },
    )
  }

  /**
   * markets
   *
   * @returns { Result<Array<ReturnTypes.AccountId>, ReturnTypes.LangError> }
   */
  markets(
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<Result<Array<ReturnTypes.AccountId>, ReturnTypes.LangError>>
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'controller::markets',
      [],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(22, 'controller'))
      },
    )
  }

  /**
   * closeFactorMantissa
   *
   * @returns { Result<ReturnTypes.WrappedU256, ReturnTypes.LangError> }
   */
  closeFactorMantissa(
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<Result<ReturnTypes.WrappedU256, ReturnTypes.LangError>>
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'controller::closeFactorMantissa',
      [],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(23, 'controller'))
      },
    )
  }

  /**
   * setMintGuardianPaused
   *
   * @param { ArgumentTypes.AccountId } pool,
   * @param { boolean } paused,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  setMintGuardianPaused(
    pool: ArgumentTypes.AccountId,
    paused: boolean,
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
      'controller::setMintGuardianPaused',
      [pool, paused],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(13, 'controller'))
      },
    )
  }

  /**
   * setBorrowGuardianPaused
   *
   * @param { ArgumentTypes.AccountId } pool,
   * @param { boolean } paused,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  setBorrowGuardianPaused(
    pool: ArgumentTypes.AccountId,
    paused: boolean,
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
      'controller::setBorrowGuardianPaused',
      [pool, paused],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(13, 'controller'))
      },
    )
  }

  /**
   * redeemAllowed
   *
   * @param { ArgumentTypes.AccountId } pool,
   * @param { ArgumentTypes.AccountId } redeemer,
   * @param { (string | number | BN) } redeemAmount,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  redeemAllowed(
    pool: ArgumentTypes.AccountId,
    redeemer: ArgumentTypes.AccountId,
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
      'controller::redeemAllowed',
      [pool, redeemer, redeemAmount],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(13, 'controller'))
      },
    )
  }

  /**
   * setCloseFactorMantissa
   *
   * @param { ArgumentTypes.WrappedU256 } newCloseFactorMantissa,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  setCloseFactorMantissa(
    newCloseFactorMantissa: ArgumentTypes.WrappedU256,
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
      'controller::setCloseFactorMantissa',
      [newCloseFactorMantissa],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(13, 'controller'))
      },
    )
  }

  /**
   * borrowVerify
   *
   * @param { ArgumentTypes.AccountId } pool,
   * @param { ArgumentTypes.AccountId } borrower,
   * @param { (string | number | BN) } borrowAmount,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  borrowVerify(
    pool: ArgumentTypes.AccountId,
    borrower: ArgumentTypes.AccountId,
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
      'controller::borrowVerify',
      [pool, borrower, borrowAmount],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(13, 'controller'))
      },
    )
  }

  /**
   * liquidateBorrowVerify
   *
   * @param { ArgumentTypes.AccountId } poolBorrowed,
   * @param { ArgumentTypes.AccountId } poolCollateral,
   * @param { ArgumentTypes.AccountId } liquidator,
   * @param { ArgumentTypes.AccountId } borrower,
   * @param { (string | number | BN) } repayAmount,
   * @param { (string | number | BN) } seizeTokens,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  liquidateBorrowVerify(
    poolBorrowed: ArgumentTypes.AccountId,
    poolCollateral: ArgumentTypes.AccountId,
    liquidator: ArgumentTypes.AccountId,
    borrower: ArgumentTypes.AccountId,
    repayAmount: string | number | BN,
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
      'controller::liquidateBorrowVerify',
      [
        poolBorrowed,
        poolCollateral,
        liquidator,
        borrower,
        repayAmount,
        seizeTokens,
      ],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(13, 'controller'))
      },
    )
  }

  /**
   * liquidationIncentiveMantissa
   *
   * @returns { Result<ReturnTypes.WrappedU256, ReturnTypes.LangError> }
   */
  liquidationIncentiveMantissa(
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<Result<ReturnTypes.WrappedU256, ReturnTypes.LangError>>
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'controller::liquidationIncentiveMantissa',
      [],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(23, 'controller'))
      },
    )
  }

  /**
   * borrowGuardianPaused
   *
   * @param { ArgumentTypes.AccountId } pool,
   * @returns { Result<boolean | null, ReturnTypes.LangError> }
   */
  borrowGuardianPaused(
    pool: ArgumentTypes.AccountId,
    __options?: GasLimit,
  ): Promise<QueryReturnType<Result<boolean | null, ReturnTypes.LangError>>> {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'controller::borrowGuardianPaused',
      [pool],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(18, 'controller'))
      },
    )
  }

  /**
   * borrowAllowed
   *
   * @param { ArgumentTypes.AccountId } pool,
   * @param { ArgumentTypes.AccountId } borrower,
   * @param { (string | number | BN) } borrowAmount,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  borrowAllowed(
    pool: ArgumentTypes.AccountId,
    borrower: ArgumentTypes.AccountId,
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
      'controller::borrowAllowed',
      [pool, borrower, borrowAmount],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(13, 'controller'))
      },
    )
  }

  /**
   * transferVerify
   *
   * @param { ArgumentTypes.AccountId } pool,
   * @param { ArgumentTypes.AccountId } src,
   * @param { ArgumentTypes.AccountId } dst,
   * @param { (string | number | BN) } transferTokens,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  transferVerify(
    pool: ArgumentTypes.AccountId,
    src: ArgumentTypes.AccountId,
    dst: ArgumentTypes.AccountId,
    transferTokens: string | number | BN,
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
      'controller::transferVerify',
      [pool, src, dst, transferTokens],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(13, 'controller'))
      },
    )
  }

  /**
   * borrowCap
   *
   * @param { ArgumentTypes.AccountId } pool,
   * @returns { Result<ReturnNumber | null, ReturnTypes.LangError> }
   */
  borrowCap(
    pool: ArgumentTypes.AccountId,
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<Result<ReturnNumber | null, ReturnTypes.LangError>>
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'controller::borrowCap',
      [pool],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(24, 'controller'))
      },
    )
  }

  /**
   * mintVerify
   *
   * @param { ArgumentTypes.AccountId } pool,
   * @param { ArgumentTypes.AccountId } minter,
   * @param { (string | number | BN) } mintAmount,
   * @param { (string | number | BN) } mintTokens,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  mintVerify(
    pool: ArgumentTypes.AccountId,
    minter: ArgumentTypes.AccountId,
    mintAmount: string | number | BN,
    mintTokens: string | number | BN,
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
      'controller::mintVerify',
      [pool, minter, mintAmount, mintTokens],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(13, 'controller'))
      },
    )
  }

  /**
   * oracle
   *
   * @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
   */
  oracle(
    __options?: GasLimit,
  ): Promise<
    QueryReturnType<Result<ReturnTypes.AccountId, ReturnTypes.LangError>>
  > {
    return queryOkJSON(
      this.__apiPromise,
      this.__nativeContract,
      this.__callerAddress,
      'controller::oracle',
      [],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(21, 'controller'))
      },
    )
  }

  /**
   * setBorrowCap
   *
   * @param { ArgumentTypes.AccountId } pool,
   * @param { (string | number | BN) } newCap,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  setBorrowCap(
    pool: ArgumentTypes.AccountId,
    newCap: string | number | BN,
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
      'controller::setBorrowCap',
      [pool, newCap],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(13, 'controller'))
      },
    )
  }

  /**
   * redeemVerify
   *
   * @param { ArgumentTypes.AccountId } pool,
   * @param { ArgumentTypes.AccountId } redeemer,
   * @param { (string | number | BN) } redeemAmount,
   * @param { (string | number | BN) } redeemTokens,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  redeemVerify(
    pool: ArgumentTypes.AccountId,
    redeemer: ArgumentTypes.AccountId,
    redeemAmount: string | number | BN,
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
      'controller::redeemVerify',
      [pool, redeemer, redeemAmount, redeemTokens],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(13, 'controller'))
      },
    )
  }

  /**
   * seizeVerify
   *
   * @param { ArgumentTypes.AccountId } poolCollateral,
   * @param { ArgumentTypes.AccountId } poolBorrowed,
   * @param { ArgumentTypes.AccountId } liquidator,
   * @param { ArgumentTypes.AccountId } borrower,
   * @param { (string | number | BN) } seizeTokens,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  seizeVerify(
    poolCollateral: ArgumentTypes.AccountId,
    poolBorrowed: ArgumentTypes.AccountId,
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
      'controller::seizeVerify',
      [poolCollateral, poolBorrowed, liquidator, borrower, seizeTokens],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(13, 'controller'))
      },
    )
  }

  /**
   * liquidateCalculateSeizeTokens
   *
   * @param { ArgumentTypes.AccountId } poolBorrowed,
   * @param { ArgumentTypes.AccountId } poolCollateral,
   * @param { ArgumentTypes.WrappedU256 } exchangeRateMantissa,
   * @param { (string | number | BN) } repayAmount,
   * @returns { Result<Result<ReturnNumber, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  liquidateCalculateSeizeTokens(
    poolBorrowed: ArgumentTypes.AccountId,
    poolCollateral: ArgumentTypes.AccountId,
    exchangeRateMantissa: ArgumentTypes.WrappedU256,
    repayAmount: string | number | BN,
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
      'controller::liquidateCalculateSeizeTokens',
      [poolBorrowed, poolCollateral, exchangeRateMantissa, repayAmount],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(26, 'controller'))
      },
    )
  }

  /**
   * seizeAllowed
   *
   * @param { ArgumentTypes.AccountId } poolCollateral,
   * @param { ArgumentTypes.AccountId } poolBorrowed,
   * @param { ArgumentTypes.AccountId } liquidator,
   * @param { ArgumentTypes.AccountId } borrower,
   * @param { (string | number | BN) } seizeTokens,
   * @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
   */
  seizeAllowed(
    poolCollateral: ArgumentTypes.AccountId,
    poolBorrowed: ArgumentTypes.AccountId,
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
      'controller::seizeAllowed',
      [poolCollateral, poolBorrowed, liquidator, borrower, seizeTokens],
      __options,
      (result) => {
        return handleReturnType(result, getTypeDescription(13, 'controller'))
      },
    )
  }
}
