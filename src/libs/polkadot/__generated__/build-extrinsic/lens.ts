// @ts-nocheck
// @ts-nocheck
// @ts-nocheck
// @ts-nocheck
/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/lens';
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
	 * pools
	 *
	 * @param { ArgumentTypes.AccountId } controller,
	*/
	"pools" (
		controller: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "pools", [controller], __options);
	}

	/**
	 * poolMetadata
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	*/
	"poolMetadata" (
		pool: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolMetadata", [pool], __options);
	}

	/**
	 * poolMetadataAll
	 *
	 * @param { Array<ArgumentTypes.AccountId> } pools,
	*/
	"poolMetadataAll" (
		pools: Array<ArgumentTypes.AccountId>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolMetadataAll", [pools], __options);
	}

	/**
	 * poolBalances
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"poolBalances" (
		pool: ArgumentTypes.AccountId,
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolBalances", [pool, account], __options);
	}

	/**
	 * poolBalancesAll
	 *
	 * @param { Array<ArgumentTypes.AccountId> } pools,
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"poolBalancesAll" (
		pools: Array<ArgumentTypes.AccountId>,
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolBalancesAll", [pools, account], __options);
	}

	/**
	 * underlyingBalance
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"underlyingBalance" (
		pool: ArgumentTypes.AccountId,
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "underlyingBalance", [pool, account], __options);
	}

	/**
	 * underlyingBalanceAll
	 *
	 * @param { Array<ArgumentTypes.AccountId> } pools,
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"underlyingBalanceAll" (
		pools: Array<ArgumentTypes.AccountId>,
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "underlyingBalanceAll", [pools, account], __options);
	}

	/**
	 * poolUnderlyingPrice
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	*/
	"poolUnderlyingPrice" (
		pool: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolUnderlyingPrice", [pool], __options);
	}

	/**
	 * poolUnderlyingPriceAll
	 *
	 * @param { Array<ArgumentTypes.AccountId> } pools,
	*/
	"poolUnderlyingPriceAll" (
		pools: Array<ArgumentTypes.AccountId>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolUnderlyingPriceAll", [pools], __options);
	}

	/**
	 * configuration
	 *
	 * @param { ArgumentTypes.AccountId } controller,
	*/
	"configuration" (
		controller: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "configuration", [controller], __options);
	}

}