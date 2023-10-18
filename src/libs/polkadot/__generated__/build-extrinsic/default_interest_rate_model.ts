/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/default_interest_rate_model';
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
	 * getSupplyRate
	 *
	 * @param { (string | number | BN) } cash,
	 * @param { (string | number | BN) } borrows,
	 * @param { (string | number | BN) } reserves,
	 * @param { ArgumentTypes.WrappedU256 } reserveFactorMantissa,
	*/
	"getSupplyRate" (
		cash: (string | number | BN),
		borrows: (string | number | BN),
		reserves: (string | number | BN),
		reserveFactorMantissa: ArgumentTypes.WrappedU256,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "interestRateModel::getSupplyRate", [cash, borrows, reserves, reserveFactorMantissa], __options);
	}

	/**
	 * getBorrowRate
	 *
	 * @param { (string | number | BN) } cash,
	 * @param { (string | number | BN) } borrows,
	 * @param { (string | number | BN) } reserves,
	*/
	"getBorrowRate" (
		cash: (string | number | BN),
		borrows: (string | number | BN),
		reserves: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "interestRateModel::getBorrowRate", [cash, borrows, reserves], __options);
	}

}