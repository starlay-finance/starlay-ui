/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/manager';
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
	 * setPriceOracle
	 *
	 * @param { ArgumentTypes.AccountId } newOracle,
	*/
	"setPriceOracle" (
		newOracle: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "manager::setPriceOracle", [newOracle], __options);
	}

	/**
	 * setController
	 *
	 * @param { ArgumentTypes.AccountId } address,
	*/
	"setController" (
		address: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "manager::setController", [address], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "manager::supportMarket", [pool], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "manager::setMintGuardianPaused", [pool, paused], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "manager::setBorrowGuardianPaused", [pool, paused], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "manager::setBorrowCap", [pool, newCap], __options);
	}

	/**
	 * reduceReserves
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	 * @param { (string | number | BN) } amount,
	*/
	"reduceReserves" (
		pool: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "manager::reduceReserves", [pool, amount], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "manager::setLiquidationIncentiveMantissa", [newLiquidationIncentiveMantissa], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "manager::setCloseFactorMantissa", [newCloseFactorMantissa], __options);
	}

	/**
	 * controller
	 *
	*/
	"controller" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "manager::controller", [], __options);
	}

	/**
	 * grantRole
	 *
	 * @param { (number | string | BN) } role,
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"grantRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::grantRole", [role, account], __options);
	}

	/**
	 * getRoleAdmin
	 *
	 * @param { (number | string | BN) } role,
	*/
	"getRoleAdmin" (
		role: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::getRoleAdmin", [role], __options);
	}

	/**
	 * hasRole
	 *
	 * @param { (number | string | BN) } role,
	 * @param { ArgumentTypes.AccountId } address,
	*/
	"hasRole" (
		role: (number | string | BN),
		address: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::hasRole", [role, address], __options);
	}

	/**
	 * revokeRole
	 *
	 * @param { (number | string | BN) } role,
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"revokeRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::revokeRole", [role, account], __options);
	}

	/**
	 * renounceRole
	 *
	 * @param { (number | string | BN) } role,
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"renounceRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::renounceRole", [role, account], __options);
	}

}