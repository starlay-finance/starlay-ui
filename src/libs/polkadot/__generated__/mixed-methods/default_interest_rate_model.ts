// @ts-nocheck
// @ts-nocheck
// @ts-nocheck
// @ts-nocheck
/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/default_interest_rate_model';
import type * as ReturnTypes from '../types-returns/default_interest_rate_model';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import DATA_TYPE_DESCRIPTIONS from '../data/default_interest_rate_model.json';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/default_interest_rate_model.json';


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
	* getSupplyRate
	*
	* @param { (string | number | BN) } cash,
	* @param { (string | number | BN) } borrows,
	* @param { (string | number | BN) } reserves,
	* @param { ArgumentTypes.WrappedU256 } reserveFactorMantissa,
	* @returns { Result<ReturnTypes.WrappedU256, ReturnTypes.LangError> }
	*/
	"getSupplyRate" (
		cash: (string | number | BN),
		borrows: (string | number | BN),
		reserves: (string | number | BN),
		reserveFactorMantissa: ArgumentTypes.WrappedU256,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.WrappedU256, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "interestRateModel::getSupplyRate", [cash, borrows, reserves, reserveFactorMantissa], __options, (result) => { return handleReturnType(result, getTypeDescription(8, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getBorrowRate
	*
	* @param { (string | number | BN) } cash,
	* @param { (string | number | BN) } borrows,
	* @param { (string | number | BN) } reserves,
	* @returns { Result<ReturnTypes.WrappedU256, ReturnTypes.LangError> }
	*/
	"getBorrowRate" (
		cash: (string | number | BN),
		borrows: (string | number | BN),
		reserves: (string | number | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.WrappedU256, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "interestRateModel::getBorrowRate", [cash, borrows, reserves], __options, (result) => { return handleReturnType(result, getTypeDescription(8, DATA_TYPE_DESCRIPTIONS)); });
	}

}