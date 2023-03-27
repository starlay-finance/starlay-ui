/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/controller';
import type * as ReturnTypes from '../types-returns/controller';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
import DATA_TYPE_DESCRIPTIONS from '../data/controller.json';


export default class Methods {
	private __nativeContract : ContractPromise;
	private __apiPromise: ApiPromise;
	private __callerAddress : string;

	constructor(
		nativeContract : ContractPromise,
		nativeApi : ApiPromise,
		callerAddress : string,
	) {
		this.__nativeContract = nativeContract;
		this.__callerAddress = callerAddress;
		this.__apiPromise = nativeApi;
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
	"transferAllowed" (
		pool: ArgumentTypes.AccountId,
		src: ArgumentTypes.AccountId,
		dst: ArgumentTypes.AccountId,
		transferTokens: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::transferAllowed", [pool, src, dst, transferTokens], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
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
	"mintVerify" (
		pool: ArgumentTypes.AccountId,
		minter: ArgumentTypes.AccountId,
		mintAmount: (string | number | BN),
		mintTokens: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::mintVerify", [pool, minter, mintAmount, mintTokens], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* markets
	*
	* @returns { Result<Array<ReturnTypes.AccountId>, ReturnTypes.LangError> }
	*/
	"markets" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Array<ReturnTypes.AccountId>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::markets", [], __options , (result) => { return handleReturnType(result, getTypeDescription(16, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getHypotheticalAccountLiquidity
	*
	* @param { ArgumentTypes.AccountId } account,
	* @param { ArgumentTypes.AccountId } token,
	* @param { (string | number | BN) } redeemTokens,
	* @param { (string | number | BN) } borrowAmount,
	* @returns { Result<Result<[ReturnTypes.U256, ReturnTypes.U256], ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"getHypotheticalAccountLiquidity" (
		account: ArgumentTypes.AccountId,
		token: ArgumentTypes.AccountId,
		redeemTokens: (string | number | BN),
		borrowAmount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<[ReturnTypes.U256, ReturnTypes.U256], ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::getHypotheticalAccountLiquidity", [account, token, redeemTokens, borrowAmount], __options , (result) => { return handleReturnType(result, getTypeDescription(17, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setMintGuardianPaused
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @param { boolean } paused,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setMintGuardianPaused" (
		pool: ArgumentTypes.AccountId,
		paused: boolean,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::setMintGuardianPaused", [pool, paused], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* redeemAllowed
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @param { ArgumentTypes.AccountId } redeemer,
	* @param { (string | number | BN) } redeemAmount,
	* @param { ArgumentTypes.PoolAttributes | null } poolAttribure,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"redeemAllowed" (
		pool: ArgumentTypes.AccountId,
		redeemer: ArgumentTypes.AccountId,
		redeemAmount: (string | number | BN),
		poolAttribure: ArgumentTypes.PoolAttributes | null,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::redeemAllowed", [pool, redeemer, redeemAmount, poolAttribure], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
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
	"transferVerify" (
		pool: ArgumentTypes.AccountId,
		src: ArgumentTypes.AccountId,
		dst: ArgumentTypes.AccountId,
		transferTokens: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::transferVerify", [pool, src, dst, transferTokens], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
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
	"seizeAllowed" (
		poolCollateral: ArgumentTypes.AccountId,
		poolBorrowed: ArgumentTypes.AccountId,
		liquidator: ArgumentTypes.AccountId,
		borrower: ArgumentTypes.AccountId,
		seizeTokens: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::seizeAllowed", [poolCollateral, poolBorrowed, liquidator, borrower, seizeTokens], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* transferGuardianPaused
	*
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"transferGuardianPaused" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::transferGuardianPaused", [], __options , (result) => { return handleReturnType(result, getTypeDescription(22, DATA_TYPE_DESCRIPTIONS)); });
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
	"liquidateBorrowVerify" (
		poolBorrowed: ArgumentTypes.AccountId,
		poolCollateral: ArgumentTypes.AccountId,
		liquidator: ArgumentTypes.AccountId,
		borrower: ArgumentTypes.AccountId,
		repayAmount: (string | number | BN),
		seizeTokens: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::liquidateBorrowVerify", [poolBorrowed, poolCollateral, liquidator, borrower, repayAmount, seizeTokens], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* supportMarket
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"supportMarket" (
		pool: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::supportMarket", [pool], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* isListed
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"isListed" (
		pool: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::isListed", [pool], __options , (result) => { return handleReturnType(result, getTypeDescription(22, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* liquidateBorrowAllowed
	*
	* @param { ArgumentTypes.AccountId } poolBorrowed,
	* @param { ArgumentTypes.AccountId } poolCollateral,
	* @param { ArgumentTypes.AccountId } liquidator,
	* @param { ArgumentTypes.AccountId } borrower,
	* @param { (string | number | BN) } repayAmount,
	* @param { ArgumentTypes.PoolAttributes | null } poolAttribure,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"liquidateBorrowAllowed" (
		poolBorrowed: ArgumentTypes.AccountId,
		poolCollateral: ArgumentTypes.AccountId,
		liquidator: ArgumentTypes.AccountId,
		borrower: ArgumentTypes.AccountId,
		repayAmount: (string | number | BN),
		poolAttribure: ArgumentTypes.PoolAttributes | null,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::liquidateBorrowAllowed", [poolBorrowed, poolCollateral, liquidator, borrower, repayAmount, poolAttribure], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* borrowCap
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @returns { Result<ReturnNumber | null, ReturnTypes.LangError> }
	*/
	"borrowCap" (
		pool: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::borrowCap", [pool], __options , (result) => { return handleReturnType(result, getTypeDescription(23, DATA_TYPE_DESCRIPTIONS)); });
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
	"redeemVerify" (
		pool: ArgumentTypes.AccountId,
		redeemer: ArgumentTypes.AccountId,
		redeemAmount: (string | number | BN),
		redeemTokens: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::redeemVerify", [pool, redeemer, redeemAmount, redeemTokens], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
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
	"repayBorrowVerify" (
		pool: ArgumentTypes.AccountId,
		payer: ArgumentTypes.AccountId,
		borrower: ArgumentTypes.AccountId,
		repayAmount: (string | number | BN),
		borrowerIndex: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::repayBorrowVerify", [pool, payer, borrower, repayAmount, borrowerIndex], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* mintGuardianPaused
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @returns { Result<boolean | null, ReturnTypes.LangError> }
	*/
	"mintGuardianPaused" (
		pool: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<boolean | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::mintGuardianPaused", [pool], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setBorrowGuardianPaused
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @param { boolean } paused,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setBorrowGuardianPaused" (
		pool: ArgumentTypes.AccountId,
		paused: boolean,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::setBorrowGuardianPaused", [pool, paused], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* borrowGuardianPaused
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @returns { Result<boolean | null, ReturnTypes.LangError> }
	*/
	"borrowGuardianPaused" (
		pool: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<boolean | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::borrowGuardianPaused", [pool], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
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
	"repayBorrowAllowed" (
		pool: ArgumentTypes.AccountId,
		payer: ArgumentTypes.AccountId,
		borrower: ArgumentTypes.AccountId,
		repayAmount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::repayBorrowAllowed", [pool, payer, borrower, repayAmount], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* liquidateCalculateSeizeTokens
	*
	* @param { ArgumentTypes.AccountId } poolBorrowed,
	* @param { ArgumentTypes.AccountId } poolCollateral,
	* @param { ArgumentTypes.WrappedU256 } exchangeRateMantissa,
	* @param { (string | number | BN) } repayAmount,
	* @param { ArgumentTypes.AccountId | null } poolBorrowedUnderlying,
	* @param { ArgumentTypes.AccountId | null } poolCollateralUnderlying,
	* @returns { Result<Result<ReturnNumber, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"liquidateCalculateSeizeTokens" (
		poolBorrowed: ArgumentTypes.AccountId,
		poolCollateral: ArgumentTypes.AccountId,
		exchangeRateMantissa: ArgumentTypes.WrappedU256,
		repayAmount: (string | number | BN),
		poolBorrowedUnderlying: ArgumentTypes.AccountId | null,
		poolCollateralUnderlying: ArgumentTypes.AccountId | null,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::liquidateCalculateSeizeTokens", [poolBorrowed, poolCollateral, exchangeRateMantissa, repayAmount, poolBorrowedUnderlying, poolCollateralUnderlying], __options , (result) => { return handleReturnType(result, getTypeDescription(28, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* borrowAllowed
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @param { ArgumentTypes.AccountId } borrower,
	* @param { (string | number | BN) } borrowAmount,
	* @param { ArgumentTypes.PoolAttributes | null } poolAttribure,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"borrowAllowed" (
		pool: ArgumentTypes.AccountId,
		borrower: ArgumentTypes.AccountId,
		borrowAmount: (string | number | BN),
		poolAttribure: ArgumentTypes.PoolAttributes | null,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::borrowAllowed", [pool, borrower, borrowAmount, poolAttribure], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setBorrowCap
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @param { (string | number | BN) } newCap,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setBorrowCap" (
		pool: ArgumentTypes.AccountId,
		newCap: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::setBorrowCap", [pool, newCap], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* mintAllowed
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @param { ArgumentTypes.AccountId } minter,
	* @param { (string | number | BN) } mintAmount,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"mintAllowed" (
		pool: ArgumentTypes.AccountId,
		minter: ArgumentTypes.AccountId,
		mintAmount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::mintAllowed", [pool, minter, mintAmount], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* seizeGuardianPaused
	*
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"seizeGuardianPaused" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::seizeGuardianPaused", [], __options , (result) => { return handleReturnType(result, getTypeDescription(22, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* oracle
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"oracle" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::oracle", [], __options , (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setTransferGuardianPaused
	*
	* @param { boolean } paused,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setTransferGuardianPaused" (
		paused: boolean,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::setTransferGuardianPaused", [paused], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* accountAssets
	*
	* @param { ArgumentTypes.AccountId } account,
	* @returns { Result<Array<ReturnTypes.AccountId>, ReturnTypes.LangError> }
	*/
	"accountAssets" (
		account: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Array<ReturnTypes.AccountId>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::accountAssets", [account], __options , (result) => { return handleReturnType(result, getTypeDescription(16, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setPriceOracle
	*
	* @param { ArgumentTypes.AccountId } newOracle,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setPriceOracle" (
		newOracle: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::setPriceOracle", [newOracle], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* borrowVerify
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @param { ArgumentTypes.AccountId } borrower,
	* @param { (string | number | BN) } borrowAmount,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"borrowVerify" (
		pool: ArgumentTypes.AccountId,
		borrower: ArgumentTypes.AccountId,
		borrowAmount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::borrowVerify", [pool, borrower, borrowAmount], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setSeizeGuardianPaused
	*
	* @param { boolean } paused,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setSeizeGuardianPaused" (
		paused: boolean,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::setSeizeGuardianPaused", [paused], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getAccountLiquidity
	*
	* @param { ArgumentTypes.AccountId } account,
	* @returns { Result<Result<[ReturnTypes.U256, ReturnTypes.U256], ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"getAccountLiquidity" (
		account: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<[ReturnTypes.U256, ReturnTypes.U256], ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::getAccountLiquidity", [account], __options , (result) => { return handleReturnType(result, getTypeDescription(17, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* manager
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"manager" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::manager", [], __options , (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* supportMarketWithCollateralFactorMantissa
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @param { ArgumentTypes.WrappedU256 } collateralFactorMantissa,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"supportMarketWithCollateralFactorMantissa" (
		pool: ArgumentTypes.AccountId,
		collateralFactorMantissa: ArgumentTypes.WrappedU256,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::supportMarketWithCollateralFactorMantissa", [pool, collateralFactorMantissa], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setCollateralFactorMantissa
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @param { ArgumentTypes.WrappedU256 } newCollateralFactorMantissa,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setCollateralFactorMantissa" (
		pool: ArgumentTypes.AccountId,
		newCollateralFactorMantissa: ArgumentTypes.WrappedU256,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::setCollateralFactorMantissa", [pool, newCollateralFactorMantissa], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setLiquidationIncentiveMantissa
	*
	* @param { ArgumentTypes.WrappedU256 } newLiquidationIncentiveMantissa,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setLiquidationIncentiveMantissa" (
		newLiquidationIncentiveMantissa: ArgumentTypes.WrappedU256,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::setLiquidationIncentiveMantissa", [newLiquidationIncentiveMantissa], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* collateralFactorMantissa
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @returns { Result<ReturnTypes.WrappedU256 | null, ReturnTypes.LangError> }
	*/
	"collateralFactorMantissa" (
		pool: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.WrappedU256 | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::collateralFactorMantissa", [pool], __options , (result) => { return handleReturnType(result, getTypeDescription(31, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setCloseFactorMantissa
	*
	* @param { ArgumentTypes.WrappedU256 } newCloseFactorMantissa,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setCloseFactorMantissa" (
		newCloseFactorMantissa: ArgumentTypes.WrappedU256,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::setCloseFactorMantissa", [newCloseFactorMantissa], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
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
	"seizeVerify" (
		poolCollateral: ArgumentTypes.AccountId,
		poolBorrowed: ArgumentTypes.AccountId,
		liquidator: ArgumentTypes.AccountId,
		borrower: ArgumentTypes.AccountId,
		seizeTokens: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::seizeVerify", [poolCollateral, poolBorrowed, liquidator, borrower, seizeTokens], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* liquidationIncentiveMantissa
	*
	* @returns { Result<ReturnTypes.WrappedU256, ReturnTypes.LangError> }
	*/
	"liquidationIncentiveMantissa" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.WrappedU256, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::liquidationIncentiveMantissa", [], __options , (result) => { return handleReturnType(result, getTypeDescription(33, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* closeFactorMantissa
	*
	* @returns { Result<ReturnTypes.WrappedU256, ReturnTypes.LangError> }
	*/
	"closeFactorMantissa" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.WrappedU256, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "controller::closeFactorMantissa", [], __options , (result) => { return handleReturnType(result, getTypeDescription(33, DATA_TYPE_DESCRIPTIONS)); });
	}

}