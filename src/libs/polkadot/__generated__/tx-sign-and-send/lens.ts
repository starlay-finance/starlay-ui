/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/lens';
import type BN from 'bn.js';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";


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
	* poolMetadata
	*
	* @param { ArgumentTypes.AccountId } pool,
	*/
	"poolMetadata" (
		pool: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolMetadata", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "lens");
		}, [pool], __options);
	}

	/**
	* poolMetadataAll
	*
	* @param { Array<ArgumentTypes.AccountId> } pools,
	*/
	"poolMetadataAll" (
		pools: Array<ArgumentTypes.AccountId>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolMetadataAll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "lens");
		}, [pools], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolBalances", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "lens");
		}, [pool, account], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolBalancesAll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "lens");
		}, [pools, account], __options);
	}

	/**
	* poolUnderlyingPrice
	*
	* @param { ArgumentTypes.AccountId } pool,
	*/
	"poolUnderlyingPrice" (
		pool: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolUnderlyingPrice", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "lens");
		}, [pool], __options);
	}

	/**
	* poolUnderlyingPriceAll
	*
	* @param { Array<ArgumentTypes.AccountId> } pools,
	*/
	"poolUnderlyingPriceAll" (
		pools: Array<ArgumentTypes.AccountId>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolUnderlyingPriceAll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "lens");
		}, [pools], __options);
	}

}