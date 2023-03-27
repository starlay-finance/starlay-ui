/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/price_oracle';
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
	 * setFixedPrice
	 *
	 * @param { ArgumentTypes.AccountId } asset,
	 * @param { (string | number | BN) } value,
	*/
	"setFixedPrice" (
		asset: ArgumentTypes.AccountId,
		value: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "priceOracle::setFixedPrice", [asset, value], __options);
	}

	/**
	 * getPrice
	 *
	 * @param { ArgumentTypes.AccountId } asset,
	*/
	"getPrice" (
		asset: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "priceOracle::getPrice", [asset], __options);
	}

	/**
	 * getUnderlyingPrice
	 *
	 * @param { ArgumentTypes.AccountId } asset,
	*/
	"getUnderlyingPrice" (
		asset: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "priceOracle::getUnderlyingPrice", [asset], __options);
	}

}