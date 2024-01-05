// @ts-nocheck
// @ts-nocheck
// @ts-nocheck
// @ts-nocheck
import type BN from 'bn.js';

export type WrappedU256 = U256;

export type U256 = Array<(number | string | BN)>;

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

