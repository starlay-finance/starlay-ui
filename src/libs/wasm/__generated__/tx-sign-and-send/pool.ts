/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/pool';
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
	* exchangeRateCurrent
	*
	*/
	"exchangeRateCurrent" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::exchangeRateCurrent", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [], __options);
	}

	/**
	* getAccrualBlockTimestamp
	*
	*/
	"getAccrualBlockTimestamp" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::getAccrualBlockTimestamp", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [], __options);
	}

	/**
	* balanceOfUnderlyingCurrent
	*
	* @param { ArgumentTypes.AccountId } account,
	*/
	"balanceOfUnderlyingCurrent" (
		account: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::balanceOfUnderlyingCurrent", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [account], __options);
	}

	/**
	* borrow
	*
	* @param { (string | number | BN) } borrowAmount,
	*/
	"borrow" (
		borrowAmount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::borrow", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [borrowAmount], __options);
	}

	/**
	* totalReserves
	*
	*/
	"totalReserves" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::totalReserves", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [], __options);
	}

	/**
	* manager
	*
	*/
	"manager" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::manager", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [], __options);
	}

	/**
	* underlying
	*
	*/
	"underlying" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::underlying", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [], __options);
	}

	/**
	* borrowBalanceStored
	*
	* @param { ArgumentTypes.AccountId } account,
	*/
	"borrowBalanceStored" (
		account: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::borrowBalanceStored", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [account], __options);
	}

	/**
	* repayBorrow
	*
	* @param { (string | number | BN) } repayAmount,
	*/
	"repayBorrow" (
		repayAmount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::repayBorrow", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [repayAmount], __options);
	}

	/**
	* mint
	*
	* @param { (string | number | BN) } mintAmount,
	*/
	"mint" (
		mintAmount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::mint", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [mintAmount], __options);
	}

	/**
	* borrowBalanceCurrent
	*
	* @param { ArgumentTypes.AccountId } account,
	*/
	"borrowBalanceCurrent" (
		account: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::borrowBalanceCurrent", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [account], __options);
	}

	/**
	* exchageRateStored
	*
	*/
	"exchageRateStored" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::exchageRateStored", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [], __options);
	}

	/**
	* getCashPrior
	*
	*/
	"getCashPrior" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::getCashPrior", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [], __options);
	}

	/**
	* controller
	*
	*/
	"controller" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::controller", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [], __options);
	}

	/**
	* redeemUnderlying
	*
	* @param { (string | number | BN) } redeemAmount,
	*/
	"redeemUnderlying" (
		redeemAmount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::redeemUnderlying", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [redeemAmount], __options);
	}

	/**
	* reserveFactorMantissa
	*
	*/
	"reserveFactorMantissa" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::reserveFactorMantissa", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [], __options);
	}

	/**
	* totalBorrows
	*
	*/
	"totalBorrows" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::totalBorrows", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [], __options);
	}

	/**
	* liquidateBorrow
	*
	* @param { ArgumentTypes.AccountId } borrower,
	* @param { (string | number | BN) } repayAmount,
	* @param { ArgumentTypes.AccountId } collateral,
	*/
	"liquidateBorrow" (
		borrower: ArgumentTypes.AccountId,
		repayAmount: (string | number | BN),
		collateral: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::liquidateBorrow", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [borrower, repayAmount, collateral], __options);
	}

	/**
	* borrowRatePerMsec
	*
	*/
	"borrowRatePerMsec" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::borrowRatePerMsec", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [], __options);
	}

	/**
	* supplyRatePerMsec
	*
	*/
	"supplyRatePerMsec" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::supplyRatePerMsec", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [], __options);
	}

	/**
	* reduceReserves
	*
	* @param { (string | number | BN) } amount,
	*/
	"reduceReserves" (
		amount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::reduceReserves", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [amount], __options);
	}

	/**
	* repayBorrowBehalf
	*
	* @param { ArgumentTypes.AccountId } borrower,
	* @param { (string | number | BN) } repayAmount,
	*/
	"repayBorrowBehalf" (
		borrower: ArgumentTypes.AccountId,
		repayAmount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::repayBorrowBehalf", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [borrower, repayAmount], __options);
	}

	/**
	* seize
	*
	* @param { ArgumentTypes.AccountId } liquidator,
	* @param { ArgumentTypes.AccountId } borrower,
	* @param { (string | number | BN) } seizeTokens,
	*/
	"seize" (
		liquidator: ArgumentTypes.AccountId,
		borrower: ArgumentTypes.AccountId,
		seizeTokens: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::seize", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [liquidator, borrower, seizeTokens], __options);
	}

	/**
	* redeem
	*
	* @param { (string | number | BN) } redeemTokens,
	*/
	"redeem" (
		redeemTokens: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::redeem", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [redeemTokens], __options);
	}

	/**
	* allowance
	*
	* @param { ArgumentTypes.AccountId } owner,
	* @param { ArgumentTypes.AccountId } spender,
	*/
	"allowance" (
		owner: ArgumentTypes.AccountId,
		spender: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp22::allowance", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [owner, spender], __options);
	}

	/**
	* balanceOf
	*
	* @param { ArgumentTypes.AccountId } owner,
	*/
	"balanceOf" (
		owner: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp22::balanceOf", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [owner], __options);
	}

	/**
	* transferFrom
	*
	* @param { ArgumentTypes.AccountId } from,
	* @param { ArgumentTypes.AccountId } to,
	* @param { (string | number | BN) } value,
	* @param { Array<(number | string | BN)> } data,
	*/
	"transferFrom" (
		from: ArgumentTypes.AccountId,
		to: ArgumentTypes.AccountId,
		value: (string | number | BN),
		data: Array<(number | string | BN)>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp22::transferFrom", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [from, to, value, data], __options);
	}

	/**
	* approve
	*
	* @param { ArgumentTypes.AccountId } spender,
	* @param { (string | number | BN) } value,
	*/
	"approve" (
		spender: ArgumentTypes.AccountId,
		value: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp22::approve", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [spender, value], __options);
	}

	/**
	* decreaseAllowance
	*
	* @param { ArgumentTypes.AccountId } spender,
	* @param { (string | number | BN) } deltaValue,
	*/
	"decreaseAllowance" (
		spender: ArgumentTypes.AccountId,
		deltaValue: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp22::decreaseAllowance", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [spender, deltaValue], __options);
	}

	/**
	* transfer
	*
	* @param { ArgumentTypes.AccountId } to,
	* @param { (string | number | BN) } value,
	* @param { Array<(number | string | BN)> } data,
	*/
	"transfer" (
		to: ArgumentTypes.AccountId,
		value: (string | number | BN),
		data: Array<(number | string | BN)>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp22::transfer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [to, value, data], __options);
	}

	/**
	* totalSupply
	*
	*/
	"totalSupply" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp22::totalSupply", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [], __options);
	}

	/**
	* increaseAllowance
	*
	* @param { ArgumentTypes.AccountId } spender,
	* @param { (string | number | BN) } deltaValue,
	*/
	"increaseAllowance" (
		spender: ArgumentTypes.AccountId,
		deltaValue: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp22::increaseAllowance", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [spender, deltaValue], __options);
	}

	/**
	* tokenSymbol
	*
	*/
	"tokenSymbol" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp22Metadata::tokenSymbol", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [], __options);
	}

	/**
	* tokenName
	*
	*/
	"tokenName" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp22Metadata::tokenName", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [], __options);
	}

	/**
	* tokenDecimals
	*
	*/
	"tokenDecimals" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp22Metadata::tokenDecimals", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [], __options);
	}

}