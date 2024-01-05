// @ts-nocheck
// @ts-nocheck
// @ts-nocheck
// @ts-nocheck
/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/faucet';
import type BN from 'bn.js';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/faucet.json';


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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "mint", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [asset, amount, account], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "mintUnderlying", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, amount, account], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "mintUnderlyingAll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [controller, amount, account], __options);
	}

}