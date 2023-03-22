/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/default_interest_rate_model';
import type BN from 'bn.js';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/default_interest_rate_model.json';


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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "interestRateModel::getBorrowRate", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [cash, borrows, reserves], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "interestRateModel::getSupplyRate", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [cash, borrows, reserves, reserveFactorMantissa], __options);
	}

}