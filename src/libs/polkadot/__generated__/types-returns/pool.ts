import type BN from 'bn.js';
import type {ReturnNumber} from '@727-ventures/typechain-types';

export type AccountId = string | number[]

export type WrappedU256 = U256;

export type U256 = ReturnNumber;

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export interface Error {
	notImplemented ? : null,
	invalidParameter ? : null,
	onlyEitherRedeemTokensOrRedeemAmountIsZero ? : null,
	borrowCashNotAvailable ? : null,
	redeemTransferOutNotPossible ? : null,
	liquidateLiquidatorIsBorrower ? : null,
	liquidateCloseAmountIsZero ? : null,
	accrualBlockNumberIsNotFresh ? : null,
	liquidateSeizeLiquidatorIsBorrower ? : null,
	reduceReservesCashNotAvailable ? : null,
	reduceReservesCashValidation ? : null,
	borrowRateIsAbsurdlyHigh ? : null,
	setReserveFactorBoundsCheck ? : null,
	callerIsNotManager ? : null,
	psp22 ? : PSP22Error,
	lang ? : LangError
}

export class ErrorBuilder {
	static NotImplemented(): Error {
		return {
			notImplemented: null,
		};
	}
	static InvalidParameter(): Error {
		return {
			invalidParameter: null,
		};
	}
	static OnlyEitherRedeemTokensOrRedeemAmountIsZero(): Error {
		return {
			onlyEitherRedeemTokensOrRedeemAmountIsZero: null,
		};
	}
	static BorrowCashNotAvailable(): Error {
		return {
			borrowCashNotAvailable: null,
		};
	}
	static RedeemTransferOutNotPossible(): Error {
		return {
			redeemTransferOutNotPossible: null,
		};
	}
	static LiquidateLiquidatorIsBorrower(): Error {
		return {
			liquidateLiquidatorIsBorrower: null,
		};
	}
	static LiquidateCloseAmountIsZero(): Error {
		return {
			liquidateCloseAmountIsZero: null,
		};
	}
	static AccrualBlockNumberIsNotFresh(): Error {
		return {
			accrualBlockNumberIsNotFresh: null,
		};
	}
	static LiquidateSeizeLiquidatorIsBorrower(): Error {
		return {
			liquidateSeizeLiquidatorIsBorrower: null,
		};
	}
	static ReduceReservesCashNotAvailable(): Error {
		return {
			reduceReservesCashNotAvailable: null,
		};
	}
	static ReduceReservesCashValidation(): Error {
		return {
			reduceReservesCashValidation: null,
		};
	}
	static BorrowRateIsAbsurdlyHigh(): Error {
		return {
			borrowRateIsAbsurdlyHigh: null,
		};
	}
	static SetReserveFactorBoundsCheck(): Error {
		return {
			setReserveFactorBoundsCheck: null,
		};
	}
	static CallerIsNotManager(): Error {
		return {
			callerIsNotManager: null,
		};
	}
	static PSP22(value: PSP22Error): Error {
		return {
			psp22: value,
		};
	}
	static Lang(value: LangError): Error {
		return {
			lang: value,
		};
	}
}

export interface PSP22Error {
	custom ? : Array<number>,
	insufficientBalance ? : null,
	insufficientAllowance ? : null,
	zeroRecipientAddress ? : null,
	zeroSenderAddress ? : null,
	safeTransferCheckFailed ? : Array<number>
}

export class PSP22ErrorBuilder {
	static Custom(value: Array<number>): PSP22Error {
		return {
			custom: value,
		};
	}
	static InsufficientBalance(): PSP22Error {
		return {
			insufficientBalance: null,
		};
	}
	static InsufficientAllowance(): PSP22Error {
		return {
			insufficientAllowance: null,
		};
	}
	static ZeroRecipientAddress(): PSP22Error {
		return {
			zeroRecipientAddress: null,
		};
	}
	static ZeroSenderAddress(): PSP22Error {
		return {
			zeroSenderAddress: null,
		};
	}
	static SafeTransferCheckFailed(value: Array<number>): PSP22Error {
		return {
			safeTransferCheckFailed: value,
		};
	}
}

