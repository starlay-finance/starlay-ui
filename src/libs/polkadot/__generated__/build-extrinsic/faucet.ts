/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/faucet';
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
	 * mint
	 *
	 * @param { ArgumentTypes.AccountId } asset,
	 * @param { (string | number | BN) } amount,
	 * @param { ArgumentTypes.AccountId | null } account,
	*/
	"mint" (
		asset: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		account: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "mint", [asset, amount, account], __options);
	}

	/**
	 * mintUnderlying
	 *
	 * @param { ArgumentTypes.AccountId } pool,
	 * @param { (string | number | BN) } amount,
	 * @param { ArgumentTypes.AccountId | null } account,
	*/
	"mintUnderlying" (
		pool: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		account: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "mintUnderlying", [pool, amount, account], __options);
	}

	/**
	 * mintUnderlyingAll
	 *
	 * @param { ArgumentTypes.AccountId } controller,
	 * @param { (string | number | BN) } amount,
	 * @param { ArgumentTypes.AccountId | null } account,
	*/
	"mintUnderlyingAll" (
		controller: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		account: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "mintUnderlyingAll", [controller, amount, account], __options);
	}

}