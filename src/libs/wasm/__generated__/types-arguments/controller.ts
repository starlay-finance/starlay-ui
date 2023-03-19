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
	marketNotListed = 'MarketNotListed',
	controllerMismatch = 'ControllerMismatch',
	priceError = 'PriceError',
	tooMuchRepay = 'TooMuchRepay',
	borrowCapReached = 'BorrowCapReached',
	callerIsNotManager = 'CallerIsNotManager'
}

