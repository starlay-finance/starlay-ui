import type BN from 'bn.js';

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export type AccountId = string | number[]

export type PoolMetadata = {
	pool: AccountId,
	poolDecimals: (number | string | BN),
	underlyingAssetAddress: AccountId,
	underlyingDecimals: (number | string | BN),
	isListed: boolean,
	totalCash: (string | number | BN),
	totalSupply: (string | number | BN),
	totalBorrows: (string | number | BN),
	totalReserves: (string | number | BN),
	exchangeRateCurrent: WrappedU256,
	supplyRatePerSec: WrappedU256,
	borrowRatePerSec: WrappedU256,
	collateralFactorMantissa: (string | number | BN),
	reserveFactorMantissa: WrappedU256,
	borrowCap: (string | number | BN) | null
}

export type WrappedU256 = U256;

export type U256 = Array<(number | string | BN)>;

export type PoolBalances = {
	pool: AccountId,
	balanceOf: (string | number | BN),
	balanceOfUnderlying: (string | number | BN),
	borrowBalanceCurrent: (string | number | BN),
	tokenBalance: (string | number | BN),
	tokenAllowance: (string | number | BN)
}

export type PoolUnderlyingPrice = {
	pool: AccountId,
	underlyingPrice: (string | number | BN)
}

