import type BN from 'bn.js';
import type {ReturnNumber} from '@727-ventures/typechain-types';

export type AccountId = string | number[]

export type WrappedU256 = U256;

export type U256 = ReturnNumber;

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export enum Error {
	mintIsPaused = 'MintIsPaused',
	borrowIsPaused = 'BorrowIsPaused',
	seizeIsPaused = 'SeizeIsPaused',
	transferIsPaused = 'TransferIsPaused',
	marketNotListed = 'MarketNotListed',
	controllerMismatch = 'ControllerMismatch',
	priceError = 'PriceError',
	tooMuchRepay = 'TooMuchRepay',
	borrowCapReached = 'BorrowCapReached',
	callerIsNotManager = 'CallerIsNotManager',
	invalidCollateralFactor = 'InvalidCollateralFactor'
}

