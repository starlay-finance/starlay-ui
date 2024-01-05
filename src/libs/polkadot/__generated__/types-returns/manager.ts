// @ts-nocheck
// @ts-nocheck
// @ts-nocheck
// @ts-nocheck
import type BN from 'bn.js';
import type {ReturnNumber} from '@727-ventures/typechain-types';

export type AccountId = string | number[]

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export interface manager_Error {
	accessControl ? : AccessControlError,
	controller ? : controller_Error,
	pool ? : pool_Error
}

export class manager_ErrorBuilder {
	static AccessControl(value: AccessControlError): manager_Error {
		return {
			accessControl: value,
		};
	}
	static Controller(value: controller_Error): manager_Error {
		return {
			controller: value,
		};
	}
	static Pool(value: pool_Error): manager_Error {
		return {
			pool: value,
		};
	}
}

export enum AccessControlError {
	invalidCaller = 'InvalidCaller',
	missingRole = 'MissingRole',
	roleRedundant = 'RoleRedundant'
}

export enum controller_Error {
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

export interface pool_Error {
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
	cannotSweepUnderlyingToken ? : null,
	callerIsNotManager ? : null,
	controller ? : controller_Error,
	psp22 ? : PSP22Error,
	lang ? : LangError
}

export class pool_ErrorBuilder {
	static NotImplemented(): pool_Error {
		return {
			notImplemented: null,
		};
	}
	static InvalidParameter(): pool_Error {
		return {
			invalidParameter: null,
		};
	}
	static OnlyEitherRedeemTokensOrRedeemAmountIsZero(): pool_Error {
		return {
			onlyEitherRedeemTokensOrRedeemAmountIsZero: null,
		};
	}
	static BorrowCashNotAvailable(): pool_Error {
		return {
			borrowCashNotAvailable: null,
		};
	}
	static RedeemTransferOutNotPossible(): pool_Error {
		return {
			redeemTransferOutNotPossible: null,
		};
	}
	static LiquidateLiquidatorIsBorrower(): pool_Error {
		return {
			liquidateLiquidatorIsBorrower: null,
		};
	}
	static LiquidateCloseAmountIsZero(): pool_Error {
		return {
			liquidateCloseAmountIsZero: null,
		};
	}
	static AccrualBlockNumberIsNotFresh(): pool_Error {
		return {
			accrualBlockNumberIsNotFresh: null,
		};
	}
	static LiquidateSeizeLiquidatorIsBorrower(): pool_Error {
		return {
			liquidateSeizeLiquidatorIsBorrower: null,
		};
	}
	static ReduceReservesCashNotAvailable(): pool_Error {
		return {
			reduceReservesCashNotAvailable: null,
		};
	}
	static ReduceReservesCashValidation(): pool_Error {
		return {
			reduceReservesCashValidation: null,
		};
	}
	static BorrowRateIsAbsurdlyHigh(): pool_Error {
		return {
			borrowRateIsAbsurdlyHigh: null,
		};
	}
	static SetReserveFactorBoundsCheck(): pool_Error {
		return {
			setReserveFactorBoundsCheck: null,
		};
	}
	static CannotSweepUnderlyingToken(): pool_Error {
		return {
			cannotSweepUnderlyingToken: null,
		};
	}
	static CallerIsNotManager(): pool_Error {
		return {
			callerIsNotManager: null,
		};
	}
	static Controller(value: controller_Error): pool_Error {
		return {
			controller: value,
		};
	}
	static PSP22(value: PSP22Error): pool_Error {
		return {
			psp22: value,
		};
	}
	static Lang(value: LangError): pool_Error {
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

export type WrappedU256 = U256;

export type U256 = ReturnNumber;

