/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/price_oracle';
import type * as ReturnTypes from '../types-returns/price_oracle';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import DATA_TYPE_DESCRIPTIONS from '../data/price_oracle.json';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/price_oracle.json';


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
	* getUnderlyingPrice
	*
	* @param { ArgumentTypes.AccountId } asset,
	* @returns { Result<ReturnNumber | null, ReturnTypes.LangError> }
	*/
	"getUnderlyingPrice" (
		asset: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "priceOracle::getUnderlyingPrice", [asset], __options, (result) => { return handleReturnType(result, getTypeDescription(7, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getPrice
	*
	* @param { ArgumentTypes.AccountId } asset,
	* @returns { Result<ReturnNumber | null, ReturnTypes.LangError> }
	*/
	"getPrice" (
		asset: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "priceOracle::getPrice", [asset], __options, (result) => { return handleReturnType(result, getTypeDescription(7, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setFixedPrice
	*
	* @param { ArgumentTypes.AccountId } asset,
	* @param { (string | number | BN) } value,
	* @returns { void }
	*/
	"setFixedPrice" (
		asset: ArgumentTypes.AccountId,
		value: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "priceOracle::setFixedPrice", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [asset, value], __options);
	}

}