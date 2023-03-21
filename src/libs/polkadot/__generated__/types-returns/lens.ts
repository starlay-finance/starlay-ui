import type BN from 'bn.js';
import type {ReturnNumber} from '@727-ventures/typechain-types';

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export type AccountId = string | number[]

export type PoolMetadata = {
	pool: AccountId,
	poolDecimals: number,
	underlyingAssetAddress: AccountId,
	underlyingDecimals: number,
	isListed: boolean,
	totalCash: ReturnNumber,
	totalSupply: ReturnNumber,
	totalBorrows: ReturnNumber,
	totalReserves: ReturnNumber,
	exchangeRateCurrent: WrappedU256,
	supplyRatePerSec: WrappedU256,
	borrowRatePerSec: WrappedU256,
	collateralFactorMantissa: ReturnNumber,
	reserveFactorMantissa: WrappedU256,
	borrowCap: ReturnNumber | null
}

export type WrappedU256 = U256;

export type U256 = ReturnNumber;

export type PoolBalances = {
	pool: AccountId,
	balanceOf: ReturnNumber,
	balanceOfUnderlying: ReturnNumber,
	borrowBalanceCurrent: ReturnNumber,
	tokenBalance: ReturnNumber,
	tokenAllowance: ReturnNumber
}

export type PoolUnderlyingPrice = {
	pool: AccountId,
	underlyingPrice: ReturnNumber
}

