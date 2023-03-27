import type BN from 'bn.js';

export type AccountId = string | number[]

export type WrappedU256 = U256;

export type U256 = Array<(number | string | BN)>;

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export enum Error {
	mintIsPaused = 'MintIsPaused',
	borrowIsPaused = 'BorrowIsPaused',
	seizeIsPaused = 'SeizeIsPaused',
	transferIsPaused = 'TransferIsPaused',
	marketNotListed = 'MarketNotListed',
	marketAlreadyListed = 'MarketAlreadyListed',
	controllerMismatch = 'ControllerMismatch',
	priceError = 'PriceError',
	tooMuchRepay = 'TooMuchRepay',
	borrowCapReached = 'BorrowCapReached',
	insufficientLiquidity = 'InsufficientLiquidity',
	insufficientShortfall = 'InsufficientShortfall',
	callerIsNotManager = 'CallerIsNotManager',
	invalidCollateralFactor = 'InvalidCollateralFactor'
}

export type PoolAttributes = {
	underlying: AccountId,
	accountBalance: (string | number | BN),
	accountBorrowBalance: (string | number | BN),
	exchangeRate: U256,
	totalBorrows: (string | number | BN)
}

