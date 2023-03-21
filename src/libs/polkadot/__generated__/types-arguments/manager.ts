import type BN from 'bn.js';

export type AccountId = string | number[]

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export interface Error {
	accessControl ? : AccessControlError
}

export class ErrorBuilder {
	static AccessControl(value: AccessControlError): Error {
		return {
			accessControl: value,
		};
	}
}

export enum AccessControlError {
	invalidCaller = 'InvalidCaller',
	missingRole = 'MissingRole',
	roleRedundant = 'RoleRedundant'
}

export type WrappedU256 = U256;

export type U256 = Array<(number | string | BN)>;

