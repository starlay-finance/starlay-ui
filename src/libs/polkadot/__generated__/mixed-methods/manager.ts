/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/manager';
import type * as ReturnTypes from '../types-returns/manager';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import DATA_TYPE_DESCRIPTIONS from '../data/manager.json';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/manager.json';


export default class Methods {
	private __nativeContract : ContractPromise;
	private __keyringPair : KeyringPair;
	private __callerAddress : string;
	private __apiPromise: ApiPromise;

	constructor(
		apiPromise : ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
		this.__callerAddress = keyringPair.address;
	}

	/**
	* setLiquidationIncentiveMantissa
	*
	* @param { ArgumentTypes.WrappedU256 } newLiquidationIncentiveMantissa,
	* @returns { void }
	*/
	"setLiquidationIncentiveMantissa" (
		newLiquidationIncentiveMantissa: ArgumentTypes.WrappedU256,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "manager::setLiquidationIncentiveMantissa", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newLiquidationIncentiveMantissa], __options);
	}

	/**
	* sweepToken
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @param { ArgumentTypes.AccountId } asset,
	* @returns { void }
	*/
	"sweepToken" (
		pool: ArgumentTypes.AccountId,
		asset: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "manager::sweepToken", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, asset], __options);
	}

	/**
	* setController
	*
	* @param { ArgumentTypes.AccountId } address,
	* @returns { void }
	*/
	"setController" (
		address: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "manager::setController", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [address], __options);
	}

	/**
	* supportMarketWithCollateralFactorMantissa
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @param { ArgumentTypes.WrappedU256 } collateralFactorMantissa,
	* @returns { void }
	*/
	"supportMarketWithCollateralFactorMantissa" (
		pool: ArgumentTypes.AccountId,
		collateralFactorMantissa: ArgumentTypes.WrappedU256,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "manager::supportMarketWithCollateralFactorMantissa", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, collateralFactorMantissa], __options);
	}

	/**
	* setBorrowGuardianPaused
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @param { boolean } paused,
	* @returns { void }
	*/
	"setBorrowGuardianPaused" (
		pool: ArgumentTypes.AccountId,
		paused: boolean,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "manager::setBorrowGuardianPaused", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, paused], __options);
	}

	/**
	* setMintGuardianPaused
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @param { boolean } paused,
	* @returns { void }
	*/
	"setMintGuardianPaused" (
		pool: ArgumentTypes.AccountId,
		paused: boolean,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "manager::setMintGuardianPaused", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, paused], __options);
	}

	/**
	* setCollateralFactorMantissa
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @param { ArgumentTypes.WrappedU256 } newCollateralFactorMantissa,
	* @returns { void }
	*/
	"setCollateralFactorMantissa" (
		pool: ArgumentTypes.AccountId,
		newCollateralFactorMantissa: ArgumentTypes.WrappedU256,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "manager::setCollateralFactorMantissa", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, newCollateralFactorMantissa], __options);
	}

	/**
	* setPriceOracle
	*
	* @param { ArgumentTypes.AccountId } newOracle,
	* @returns { void }
	*/
	"setPriceOracle" (
		newOracle: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "manager::setPriceOracle", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newOracle], __options);
	}

	/**
	* supportMarket
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @returns { void }
	*/
	"supportMarket" (
		pool: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "manager::supportMarket", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool], __options);
	}

	/**
	* setCloseFactorMantissa
	*
	* @param { ArgumentTypes.WrappedU256 } newCloseFactorMantissa,
	* @returns { void }
	*/
	"setCloseFactorMantissa" (
		newCloseFactorMantissa: ArgumentTypes.WrappedU256,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "manager::setCloseFactorMantissa", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newCloseFactorMantissa], __options);
	}

	/**
	* setBorrowCap
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @param { (string | number | BN) } newCap,
	* @returns { void }
	*/
	"setBorrowCap" (
		pool: ArgumentTypes.AccountId,
		newCap: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "manager::setBorrowCap", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, newCap], __options);
	}

	/**
	* setReserveFactorMantissa
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @param { ArgumentTypes.WrappedU256 } newReserveFactorMantissa,
	* @returns { void }
	*/
	"setReserveFactorMantissa" (
		pool: ArgumentTypes.AccountId,
		newReserveFactorMantissa: ArgumentTypes.WrappedU256,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "manager::setReserveFactorMantissa", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, newReserveFactorMantissa], __options);
	}

	/**
	* controller
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"controller" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "manager::controller", [], __options, (result) => { return handleReturnType(result, getTypeDescription(17, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* reduceReserves
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"reduceReserves" (
		pool: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "manager::reduceReserves", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, amount], __options);
	}

	/**
	* getRoleAdmin
	*
	* @param { (number | string | BN) } role,
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getRoleAdmin" (
		role: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::getRoleAdmin", [role], __options, (result) => { return handleReturnType(result, getTypeDescription(18, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* revokeRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId } account,
	* @returns { void }
	*/
	"revokeRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::revokeRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role, account], __options);
	}

	/**
	* hasRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId } address,
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"hasRole" (
		role: (number | string | BN),
		address: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::hasRole", [role, address], __options, (result) => { return handleReturnType(result, getTypeDescription(21, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* grantRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId } account,
	* @returns { void }
	*/
	"grantRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::grantRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role, account], __options);
	}

	/**
	* renounceRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId } account,
	* @returns { void }
	*/
	"renounceRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::renounceRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role, account], __options);
	}

}