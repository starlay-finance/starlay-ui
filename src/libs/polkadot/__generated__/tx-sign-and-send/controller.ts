/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/controller';
import type BN from 'bn.js';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/controller.json';


export default class Methods {
	private __nativeContract : ContractPromise;
	private __keyringPair : KeyringPair;
	private __apiPromise: ApiPromise;

	constructor(
		apiPromise: ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::setMintGuardianPaused", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, paused], __options);
	}

	/**
	* liquidateBorrowAllowed
	*
	* @param { ArgumentTypes.AccountId } poolBorrowed,
	* @param { ArgumentTypes.AccountId } poolCollateral,
	* @param { ArgumentTypes.AccountId } liquidator,
	* @param { ArgumentTypes.AccountId } borrower,
	* @param { (string | number | BN) } repayAmount,
	*/
	"liquidateBorrowAllowed" (
		poolBorrowed: ArgumentTypes.AccountId,
		poolCollateral: ArgumentTypes.AccountId,
		liquidator: ArgumentTypes.AccountId,
		borrower: ArgumentTypes.AccountId,
		repayAmount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::liquidateBorrowAllowed", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [poolBorrowed, poolCollateral, liquidator, borrower, repayAmount], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::liquidateBorrowVerify", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [poolBorrowed, poolCollateral, liquidator, borrower, repayAmount, seizeTokens], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::seizeVerify", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [poolCollateral, poolBorrowed, liquidator, borrower, seizeTokens], __options);
	}

	/**
	* setPriceOracle
	*
	* @param { ArgumentTypes.AccountId } newOracle,
	*/
	"setPriceOracle" (
		newOracle: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::setPriceOracle", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newOracle], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::seizeAllowed", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [poolCollateral, poolBorrowed, liquidator, borrower, seizeTokens], __options);
	}

	/**
	* redeemAllowed
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @param { ArgumentTypes.AccountId } redeemer,
	* @param { (string | number | BN) } redeemAmount,
	*/
	"redeemAllowed" (
		pool: ArgumentTypes.AccountId,
		redeemer: ArgumentTypes.AccountId,
		redeemAmount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::redeemAllowed", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, redeemer, redeemAmount], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::redeemVerify", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, redeemer, redeemAmount, redeemTokens], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::mintAllowed", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, minter, mintAmount], __options);
	}

	/**
	* supportMarket
	*
	* @param { ArgumentTypes.AccountId } pool,
	*/
	"supportMarket" (
		pool: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::supportMarket", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::mintVerify", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, minter, mintAmount, mintTokens], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::borrowVerify", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, borrower, borrowAmount], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::repayBorrowVerify", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, payer, borrower, repayAmount, borrowerIndex], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::setBorrowGuardianPaused", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, paused], __options);
	}

	/**
	* transferGuardianPaused
	*
	*/
	"transferGuardianPaused" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::transferGuardianPaused", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::repayBorrowAllowed", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, payer, borrower, repayAmount], __options);
	}

	/**
	* oracle
	*
	*/
	"oracle" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::oracle", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* isListed
	*
	* @param { ArgumentTypes.AccountId } pool,
	*/
	"isListed" (
		pool: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::isListed", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::getHypotheticalAccountLiquidity", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [account, token, redeemTokens, borrowAmount], __options);
	}

	/**
	* seizeGuardianPaused
	*
	*/
	"seizeGuardianPaused" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::seizeGuardianPaused", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setLiquidationIncentiveMantissa
	*
	* @param { ArgumentTypes.WrappedU256 } newLiquidationIncentiveMantissa,
	*/
	"setLiquidationIncentiveMantissa" (
		newLiquidationIncentiveMantissa: ArgumentTypes.WrappedU256,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::setLiquidationIncentiveMantissa", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newLiquidationIncentiveMantissa], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::transferVerify", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, src, dst, transferTokens], __options);
	}

	/**
	* setSeizeGuardianPaused
	*
	* @param { boolean } paused,
	*/
	"setSeizeGuardianPaused" (
		paused: boolean,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::setSeizeGuardianPaused", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [paused], __options);
	}

	/**
	* markets
	*
	*/
	"markets" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::markets", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* closeFactorMantissa
	*
	*/
	"closeFactorMantissa" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::closeFactorMantissa", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::setBorrowCap", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, newCap], __options);
	}

	/**
	* borrowGuardianPaused
	*
	* @param { ArgumentTypes.AccountId } pool,
	*/
	"borrowGuardianPaused" (
		pool: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::borrowGuardianPaused", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool], __options);
	}

	/**
	* liquidationIncentiveMantissa
	*
	*/
	"liquidationIncentiveMantissa" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::liquidationIncentiveMantissa", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setTransferGuardianPaused
	*
	* @param { boolean } paused,
	*/
	"setTransferGuardianPaused" (
		paused: boolean,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::setTransferGuardianPaused", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [paused], __options);
	}

	/**
	* borrowCap
	*
	* @param { ArgumentTypes.AccountId } pool,
	*/
	"borrowCap" (
		pool: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::borrowCap", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::transferAllowed", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, src, dst, transferTokens], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::setCollateralFactorMantissa", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, newCollateralFactorMantissa], __options);
	}

	/**
	* manager
	*
	*/
	"manager" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::manager", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* liquidateCalculateSeizeTokens
	*
	* @param { ArgumentTypes.AccountId } poolBorrowed,
	* @param { ArgumentTypes.AccountId } poolCollateral,
	* @param { ArgumentTypes.WrappedU256 } exchangeRateMantissa,
	* @param { (string | number | BN) } repayAmount,
	*/
	"liquidateCalculateSeizeTokens" (
		poolBorrowed: ArgumentTypes.AccountId,
		poolCollateral: ArgumentTypes.AccountId,
		exchangeRateMantissa: ArgumentTypes.WrappedU256,
		repayAmount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::liquidateCalculateSeizeTokens", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [poolBorrowed, poolCollateral, exchangeRateMantissa, repayAmount], __options);
	}

	/**
	* mintGuardianPaused
	*
	* @param { ArgumentTypes.AccountId } pool,
	*/
	"mintGuardianPaused" (
		pool: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::mintGuardianPaused", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool], __options);
	}

	/**
	* accountAssets
	*
	* @param { ArgumentTypes.AccountId } account,
	*/
	"accountAssets" (
		account: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::accountAssets", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [account], __options);
	}

	/**
	* collateralFactorMantissa
	*
	* @param { ArgumentTypes.AccountId } pool,
	*/
	"collateralFactorMantissa" (
		pool: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::collateralFactorMantissa", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool], __options);
	}

	/**
	* borrowAllowed
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @param { ArgumentTypes.AccountId } borrower,
	* @param { (string | number | BN) } borrowAmount,
	*/
	"borrowAllowed" (
		pool: ArgumentTypes.AccountId,
		borrower: ArgumentTypes.AccountId,
		borrowAmount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::borrowAllowed", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, borrower, borrowAmount], __options);
	}

	/**
	* setCloseFactorMantissa
	*
	* @param { ArgumentTypes.WrappedU256 } newCloseFactorMantissa,
	*/
	"setCloseFactorMantissa" (
		newCloseFactorMantissa: ArgumentTypes.WrappedU256,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "controller::setCloseFactorMantissa", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newCloseFactorMantissa], __options);
	}

}