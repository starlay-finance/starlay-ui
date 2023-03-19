/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/pool';
import type * as ReturnTypes from '../types-returns/pool';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";


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
	* exchangeRateCurrent
	*
	* @returns { void }
	*/
	"exchangeRateCurrent" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::exchangeRateCurrent", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [], __options);
	}

	/**
	* getAccrualBlockTimestamp
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getAccrualBlockTimestamp" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pool::getAccrualBlockTimestamp", [], __options, (result) => { return handleReturnType(result, getTypeDescription(16, 'pool')); });
	}

	/**
	* balanceOfUnderlyingCurrent
	*
	* @param { ArgumentTypes.AccountId } account,
	* @returns { void }
	*/
	"balanceOfUnderlyingCurrent" (
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::balanceOfUnderlyingCurrent", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [account], __options);
	}

	/**
	* borrow
	*
	* @param { (string | number | BN) } borrowAmount,
	* @returns { void }
	*/
	"borrow" (
		borrowAmount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::borrow", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [borrowAmount], __options);
	}

	/**
	* totalReserves
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"totalReserves" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pool::totalReserves", [], __options, (result) => { return handleReturnType(result, getTypeDescription(21, 'pool')); });
	}

	/**
	* manager
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"manager" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pool::manager", [], __options, (result) => { return handleReturnType(result, getTypeDescription(22, 'pool')); });
	}

	/**
	* underlying
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"underlying" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pool::underlying", [], __options, (result) => { return handleReturnType(result, getTypeDescription(22, 'pool')); });
	}

	/**
	* borrowBalanceStored
	*
	* @param { ArgumentTypes.AccountId } account,
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"borrowBalanceStored" (
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pool::borrowBalanceStored", [account], __options, (result) => { return handleReturnType(result, getTypeDescription(21, 'pool')); });
	}

	/**
	* repayBorrow
	*
	* @param { (string | number | BN) } repayAmount,
	* @returns { void }
	*/
	"repayBorrow" (
		repayAmount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::repayBorrow", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [repayAmount], __options);
	}

	/**
	* mint
	*
	* @param { (string | number | BN) } mintAmount,
	* @returns { void }
	*/
	"mint" (
		mintAmount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::mint", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [mintAmount], __options);
	}

	/**
	* borrowBalanceCurrent
	*
	* @param { ArgumentTypes.AccountId } account,
	* @returns { void }
	*/
	"borrowBalanceCurrent" (
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::borrowBalanceCurrent", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [account], __options);
	}

	/**
	* exchageRateStored
	*
	* @returns { Result<ReturnTypes.WrappedU256, ReturnTypes.LangError> }
	*/
	"exchageRateStored" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.WrappedU256, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pool::exchageRateStored", [], __options, (result) => { return handleReturnType(result, getTypeDescription(23, 'pool')); });
	}

	/**
	* getCashPrior
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getCashPrior" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pool::getCashPrior", [], __options, (result) => { return handleReturnType(result, getTypeDescription(21, 'pool')); });
	}

	/**
	* controller
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"controller" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pool::controller", [], __options, (result) => { return handleReturnType(result, getTypeDescription(22, 'pool')); });
	}

	/**
	* redeemUnderlying
	*
	* @param { (string | number | BN) } redeemAmount,
	* @returns { void }
	*/
	"redeemUnderlying" (
		redeemAmount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::redeemUnderlying", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [redeemAmount], __options);
	}

	/**
	* reserveFactorMantissa
	*
	* @returns { Result<ReturnTypes.WrappedU256, ReturnTypes.LangError> }
	*/
	"reserveFactorMantissa" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.WrappedU256, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pool::reserveFactorMantissa", [], __options, (result) => { return handleReturnType(result, getTypeDescription(23, 'pool')); });
	}

	/**
	* totalBorrows
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"totalBorrows" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pool::totalBorrows", [], __options, (result) => { return handleReturnType(result, getTypeDescription(21, 'pool')); });
	}

	/**
	* liquidateBorrow
	*
	* @param { ArgumentTypes.AccountId } borrower,
	* @param { (string | number | BN) } repayAmount,
	* @param { ArgumentTypes.AccountId } collateral,
	* @returns { void }
	*/
	"liquidateBorrow" (
		borrower: ArgumentTypes.AccountId,
		repayAmount: (string | number | BN),
		collateral: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::liquidateBorrow", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [borrower, repayAmount, collateral], __options);
	}

	/**
	* borrowRatePerMsec
	*
	* @returns { Result<ReturnTypes.WrappedU256, ReturnTypes.LangError> }
	*/
	"borrowRatePerMsec" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.WrappedU256, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pool::borrowRatePerMsec", [], __options, (result) => { return handleReturnType(result, getTypeDescription(23, 'pool')); });
	}

	/**
	* supplyRatePerMsec
	*
	* @returns { Result<ReturnTypes.WrappedU256, ReturnTypes.LangError> }
	*/
	"supplyRatePerMsec" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.WrappedU256, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pool::supplyRatePerMsec", [], __options, (result) => { return handleReturnType(result, getTypeDescription(23, 'pool')); });
	}

	/**
	* reduceReserves
	*
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"reduceReserves" (
		amount: (string | number | BN),
		__options: GasLimit,
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
	* @returns { void }
	*/
	"repayBorrowBehalf" (
		borrower: ArgumentTypes.AccountId,
		repayAmount: (string | number | BN),
		__options: GasLimit,
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
	* @returns { void }
	*/
	"seize" (
		liquidator: ArgumentTypes.AccountId,
		borrower: ArgumentTypes.AccountId,
		seizeTokens: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pool::seize", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [liquidator, borrower, seizeTokens], __options);
	}

	/**
	* redeem
	*
	* @param { (string | number | BN) } redeemTokens,
	* @returns { void }
	*/
	"redeem" (
		redeemTokens: (string | number | BN),
		__options: GasLimit,
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
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"allowance" (
		owner: ArgumentTypes.AccountId,
		spender: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp22::allowance", [owner, spender], __options, (result) => { return handleReturnType(result, getTypeDescription(21, 'pool')); });
	}

	/**
	* balanceOf
	*
	* @param { ArgumentTypes.AccountId } owner,
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"balanceOf" (
		owner: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp22::balanceOf", [owner], __options, (result) => { return handleReturnType(result, getTypeDescription(21, 'pool')); });
	}

	/**
	* transferFrom
	*
	* @param { ArgumentTypes.AccountId } from,
	* @param { ArgumentTypes.AccountId } to,
	* @param { (string | number | BN) } value,
	* @param { Array<(number | string | BN)> } data,
	* @returns { void }
	*/
	"transferFrom" (
		from: ArgumentTypes.AccountId,
		to: ArgumentTypes.AccountId,
		value: (string | number | BN),
		data: Array<(number | string | BN)>,
		__options: GasLimit,
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
	* @returns { void }
	*/
	"approve" (
		spender: ArgumentTypes.AccountId,
		value: (string | number | BN),
		__options: GasLimit,
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
	* @returns { void }
	*/
	"decreaseAllowance" (
		spender: ArgumentTypes.AccountId,
		deltaValue: (string | number | BN),
		__options: GasLimit,
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
	* @returns { void }
	*/
	"transfer" (
		to: ArgumentTypes.AccountId,
		value: (string | number | BN),
		data: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp22::transfer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [to, value, data], __options);
	}

	/**
	* totalSupply
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"totalSupply" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp22::totalSupply", [], __options, (result) => { return handleReturnType(result, getTypeDescription(21, 'pool')); });
	}

	/**
	* increaseAllowance
	*
	* @param { ArgumentTypes.AccountId } spender,
	* @param { (string | number | BN) } deltaValue,
	* @returns { void }
	*/
	"increaseAllowance" (
		spender: ArgumentTypes.AccountId,
		deltaValue: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp22::increaseAllowance", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "pool");
		}, [spender, deltaValue], __options);
	}

	/**
	* tokenSymbol
	*
	* @returns { Result<Array<number> | null, ReturnTypes.LangError> }
	*/
	"tokenSymbol" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Array<number> | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp22Metadata::tokenSymbol", [], __options, (result) => { return handleReturnType(result, getTypeDescription(26, 'pool')); });
	}

	/**
	* tokenName
	*
	* @returns { Result<Array<number> | null, ReturnTypes.LangError> }
	*/
	"tokenName" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Array<number> | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp22Metadata::tokenName", [], __options, (result) => { return handleReturnType(result, getTypeDescription(26, 'pool')); });
	}

	/**
	* tokenDecimals
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"tokenDecimals" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp22Metadata::tokenDecimals", [], __options, (result) => { return handleReturnType(result, getTypeDescription(28, 'pool')); });
	}

}