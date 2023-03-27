/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/controller';
import type BN from 'bn.js';
import type { ApiPromise } from '@polkadot/api';



export default class Methods {
	private __nativeContract : ContractPromise;
	private __apiPromise: ApiPromise;

	constructor(
		nativeContract : ContractPromise,
		apiPromise: ApiPromise,
	) {
		this.__nativeContract = nativeContract;
		this.__apiPromise = apiPromise;
	}
	/**
	 * transferAllowed
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	 * @param { ArgumentTypes.AccountId } src,
	 * @param { ArgumentTypes.AccountId } dst,
	 * @param { (string | number | BN) } transferTokens,
	*/
	"transferAllowed" (
		pool: ArgumentTypes.AccountId,
		src: ArgumentTypes.AccountId,
		dst: ArgumentTypes.AccountId,
		transferTokens: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::transferAllowed", [pool, src, dst, transferTokens], __options);
	}

	/**
	 * mintVerify
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	 * @param { ArgumentTypes.AccountId } minter,
	 * @param { (string | number | BN) } mintAmount,
	 * @param { (string | number | BN) } mintTokens,
	*/
	"mintVerify" (
		pool: ArgumentTypes.AccountId,
		minter: ArgumentTypes.AccountId,
		mintAmount: (string | number | BN),
		mintTokens: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::mintVerify", [pool, minter, mintAmount, mintTokens], __options);
	}

	/**
	 * markets
	 *
	*/
	"markets" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::markets", [], __options);
	}

	/**
	 * getHypotheticalAccountLiquidity
	 *
	 * @param { ArgumentTypes.AccountId } account,
	 * @param { ArgumentTypes.AccountId } token,
	 * @param { (string | number | BN) } redeemTokens,
	 * @param { (string | number | BN) } borrowAmount,
	*/
	"getHypotheticalAccountLiquidity" (
		account: ArgumentTypes.AccountId,
		token: ArgumentTypes.AccountId,
		redeemTokens: (string | number | BN),
		borrowAmount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::getHypotheticalAccountLiquidity", [account, token, redeemTokens, borrowAmount], __options);
	}

	/**
	 * setMintGuardianPaused
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	 * @param { boolean } paused,
	*/
	"setMintGuardianPaused" (
		pool: ArgumentTypes.AccountId,
		paused: boolean,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::setMintGuardianPaused", [pool, paused], __options);
	}

	/**
	 * redeemAllowed
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	 * @param { ArgumentTypes.AccountId } redeemer,
	 * @param { (string | number | BN) } redeemAmount,
	 * @param { ArgumentTypes.PoolAttributes | null } poolAttribure,
	*/
	"redeemAllowed" (
		pool: ArgumentTypes.AccountId,
		redeemer: ArgumentTypes.AccountId,
		redeemAmount: (string | number | BN),
		poolAttribure: ArgumentTypes.PoolAttributes | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::redeemAllowed", [pool, redeemer, redeemAmount, poolAttribure], __options);
	}

	/**
	 * transferVerify
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	 * @param { ArgumentTypes.AccountId } src,
	 * @param { ArgumentTypes.AccountId } dst,
	 * @param { (string | number | BN) } transferTokens,
	*/
	"transferVerify" (
		pool: ArgumentTypes.AccountId,
		src: ArgumentTypes.AccountId,
		dst: ArgumentTypes.AccountId,
		transferTokens: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::transferVerify", [pool, src, dst, transferTokens], __options);
	}

	/**
	 * seizeAllowed
	 *
	 * @param { ArgumentTypes.AccountId } poolCollateral,
	 * @param { ArgumentTypes.AccountId } poolBorrowed,
	 * @param { ArgumentTypes.AccountId } liquidator,
	 * @param { ArgumentTypes.AccountId } borrower,
	 * @param { (string | number | BN) } seizeTokens,
	*/
	"seizeAllowed" (
		poolCollateral: ArgumentTypes.AccountId,
		poolBorrowed: ArgumentTypes.AccountId,
		liquidator: ArgumentTypes.AccountId,
		borrower: ArgumentTypes.AccountId,
		seizeTokens: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::seizeAllowed", [poolCollateral, poolBorrowed, liquidator, borrower, seizeTokens], __options);
	}

	/**
	 * transferGuardianPaused
	 *
	*/
	"transferGuardianPaused" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::transferGuardianPaused", [], __options);
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
	*/
	"liquidateBorrowVerify" (
		poolBorrowed: ArgumentTypes.AccountId,
		poolCollateral: ArgumentTypes.AccountId,
		liquidator: ArgumentTypes.AccountId,
		borrower: ArgumentTypes.AccountId,
		repayAmount: (string | number | BN),
		seizeTokens: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::liquidateBorrowVerify", [poolBorrowed, poolCollateral, liquidator, borrower, repayAmount, seizeTokens], __options);
	}

	/**
	 * supportMarket
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	*/
	"supportMarket" (
		pool: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::supportMarket", [pool], __options);
	}

	/**
	 * isListed
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	*/
	"isListed" (
		pool: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::isListed", [pool], __options);
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
	*/
	"liquidateBorrowAllowed" (
		poolBorrowed: ArgumentTypes.AccountId,
		poolCollateral: ArgumentTypes.AccountId,
		liquidator: ArgumentTypes.AccountId,
		borrower: ArgumentTypes.AccountId,
		repayAmount: (string | number | BN),
		poolAttribure: ArgumentTypes.PoolAttributes | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::liquidateBorrowAllowed", [poolBorrowed, poolCollateral, liquidator, borrower, repayAmount, poolAttribure], __options);
	}

	/**
	 * borrowCap
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	*/
	"borrowCap" (
		pool: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::borrowCap", [pool], __options);
	}

	/**
	 * redeemVerify
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	 * @param { ArgumentTypes.AccountId } redeemer,
	 * @param { (string | number | BN) } redeemAmount,
	 * @param { (string | number | BN) } redeemTokens,
	*/
	"redeemVerify" (
		pool: ArgumentTypes.AccountId,
		redeemer: ArgumentTypes.AccountId,
		redeemAmount: (string | number | BN),
		redeemTokens: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::redeemVerify", [pool, redeemer, redeemAmount, redeemTokens], __options);
	}

	/**
	 * repayBorrowVerify
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	 * @param { ArgumentTypes.AccountId } payer,
	 * @param { ArgumentTypes.AccountId } borrower,
	 * @param { (string | number | BN) } repayAmount,
	 * @param { (string | number | BN) } borrowerIndex,
	*/
	"repayBorrowVerify" (
		pool: ArgumentTypes.AccountId,
		payer: ArgumentTypes.AccountId,
		borrower: ArgumentTypes.AccountId,
		repayAmount: (string | number | BN),
		borrowerIndex: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::repayBorrowVerify", [pool, payer, borrower, repayAmount, borrowerIndex], __options);
	}

	/**
	 * mintGuardianPaused
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	*/
	"mintGuardianPaused" (
		pool: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::mintGuardianPaused", [pool], __options);
	}

	/**
	 * setBorrowGuardianPaused
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	 * @param { boolean } paused,
	*/
	"setBorrowGuardianPaused" (
		pool: ArgumentTypes.AccountId,
		paused: boolean,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::setBorrowGuardianPaused", [pool, paused], __options);
	}

	/**
	 * borrowGuardianPaused
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	*/
	"borrowGuardianPaused" (
		pool: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::borrowGuardianPaused", [pool], __options);
	}

	/**
	 * repayBorrowAllowed
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	 * @param { ArgumentTypes.AccountId } payer,
	 * @param { ArgumentTypes.AccountId } borrower,
	 * @param { (string | number | BN) } repayAmount,
	*/
	"repayBorrowAllowed" (
		pool: ArgumentTypes.AccountId,
		payer: ArgumentTypes.AccountId,
		borrower: ArgumentTypes.AccountId,
		repayAmount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::repayBorrowAllowed", [pool, payer, borrower, repayAmount], __options);
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
	*/
	"liquidateCalculateSeizeTokens" (
		poolBorrowed: ArgumentTypes.AccountId,
		poolCollateral: ArgumentTypes.AccountId,
		exchangeRateMantissa: ArgumentTypes.WrappedU256,
		repayAmount: (string | number | BN),
		poolBorrowedUnderlying: ArgumentTypes.AccountId | null,
		poolCollateralUnderlying: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::liquidateCalculateSeizeTokens", [poolBorrowed, poolCollateral, exchangeRateMantissa, repayAmount, poolBorrowedUnderlying, poolCollateralUnderlying], __options);
	}

	/**
	 * borrowAllowed
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	 * @param { ArgumentTypes.AccountId } borrower,
	 * @param { (string | number | BN) } borrowAmount,
	 * @param { ArgumentTypes.PoolAttributes | null } poolAttribure,
	*/
	"borrowAllowed" (
		pool: ArgumentTypes.AccountId,
		borrower: ArgumentTypes.AccountId,
		borrowAmount: (string | number | BN),
		poolAttribure: ArgumentTypes.PoolAttributes | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::borrowAllowed", [pool, borrower, borrowAmount, poolAttribure], __options);
	}

	/**
	 * setBorrowCap
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	 * @param { (string | number | BN) } newCap,
	*/
	"setBorrowCap" (
		pool: ArgumentTypes.AccountId,
		newCap: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::setBorrowCap", [pool, newCap], __options);
	}

	/**
	 * mintAllowed
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	 * @param { ArgumentTypes.AccountId } minter,
	 * @param { (string | number | BN) } mintAmount,
	*/
	"mintAllowed" (
		pool: ArgumentTypes.AccountId,
		minter: ArgumentTypes.AccountId,
		mintAmount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::mintAllowed", [pool, minter, mintAmount], __options);
	}

	/**
	 * seizeGuardianPaused
	 *
	*/
	"seizeGuardianPaused" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::seizeGuardianPaused", [], __options);
	}

	/**
	 * oracle
	 *
	*/
	"oracle" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::oracle", [], __options);
	}

	/**
	 * setTransferGuardianPaused
	 *
	 * @param { boolean } paused,
	*/
	"setTransferGuardianPaused" (
		paused: boolean,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::setTransferGuardianPaused", [paused], __options);
	}

	/**
	 * accountAssets
	 *
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"accountAssets" (
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::accountAssets", [account], __options);
	}

	/**
	 * setPriceOracle
	 *
	 * @param { ArgumentTypes.AccountId } newOracle,
	*/
	"setPriceOracle" (
		newOracle: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::setPriceOracle", [newOracle], __options);
	}

	/**
	 * borrowVerify
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	 * @param { ArgumentTypes.AccountId } borrower,
	 * @param { (string | number | BN) } borrowAmount,
	*/
	"borrowVerify" (
		pool: ArgumentTypes.AccountId,
		borrower: ArgumentTypes.AccountId,
		borrowAmount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::borrowVerify", [pool, borrower, borrowAmount], __options);
	}

	/**
	 * setSeizeGuardianPaused
	 *
	 * @param { boolean } paused,
	*/
	"setSeizeGuardianPaused" (
		paused: boolean,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::setSeizeGuardianPaused", [paused], __options);
	}

	/**
	 * getAccountLiquidity
	 *
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"getAccountLiquidity" (
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::getAccountLiquidity", [account], __options);
	}

	/**
	 * manager
	 *
	*/
	"manager" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::manager", [], __options);
	}

	/**
	 * supportMarketWithCollateralFactorMantissa
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	 * @param { ArgumentTypes.WrappedU256 } collateralFactorMantissa,
	*/
	"supportMarketWithCollateralFactorMantissa" (
		pool: ArgumentTypes.AccountId,
		collateralFactorMantissa: ArgumentTypes.WrappedU256,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::supportMarketWithCollateralFactorMantissa", [pool, collateralFactorMantissa], __options);
	}

	/**
	 * setCollateralFactorMantissa
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	 * @param { ArgumentTypes.WrappedU256 } newCollateralFactorMantissa,
	*/
	"setCollateralFactorMantissa" (
		pool: ArgumentTypes.AccountId,
		newCollateralFactorMantissa: ArgumentTypes.WrappedU256,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::setCollateralFactorMantissa", [pool, newCollateralFactorMantissa], __options);
	}

	/**
	 * setLiquidationIncentiveMantissa
	 *
	 * @param { ArgumentTypes.WrappedU256 } newLiquidationIncentiveMantissa,
	*/
	"setLiquidationIncentiveMantissa" (
		newLiquidationIncentiveMantissa: ArgumentTypes.WrappedU256,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::setLiquidationIncentiveMantissa", [newLiquidationIncentiveMantissa], __options);
	}

	/**
	 * collateralFactorMantissa
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	*/
	"collateralFactorMantissa" (
		pool: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::collateralFactorMantissa", [pool], __options);
	}

	/**
	 * setCloseFactorMantissa
	 *
	 * @param { ArgumentTypes.WrappedU256 } newCloseFactorMantissa,
	*/
	"setCloseFactorMantissa" (
		newCloseFactorMantissa: ArgumentTypes.WrappedU256,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::setCloseFactorMantissa", [newCloseFactorMantissa], __options);
	}

	/**
	 * seizeVerify
	 *
	 * @param { ArgumentTypes.AccountId } poolCollateral,
	 * @param { ArgumentTypes.AccountId } poolBorrowed,
	 * @param { ArgumentTypes.AccountId } liquidator,
	 * @param { ArgumentTypes.AccountId } borrower,
	 * @param { (string | number | BN) } seizeTokens,
	*/
	"seizeVerify" (
		poolCollateral: ArgumentTypes.AccountId,
		poolBorrowed: ArgumentTypes.AccountId,
		liquidator: ArgumentTypes.AccountId,
		borrower: ArgumentTypes.AccountId,
		seizeTokens: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::seizeVerify", [poolCollateral, poolBorrowed, liquidator, borrower, seizeTokens], __options);
	}

	/**
	 * liquidationIncentiveMantissa
	 *
	*/
	"liquidationIncentiveMantissa" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::liquidationIncentiveMantissa", [], __options);
	}

	/**
	 * closeFactorMantissa
	 *
	*/
	"closeFactorMantissa" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "controller::closeFactorMantissa", [], __options);
	}

}