import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/pool';

export interface Mint {
	minter: ReturnTypes.AccountId;
	mintAmount: ReturnNumber;
	mintTokens: ReturnNumber;
}

export interface Redeem {
	redeemer: ReturnTypes.AccountId;
	redeemAmount: ReturnNumber;
	redeemTokens: ReturnNumber;
}

export interface Borrow {
	borrower: ReturnTypes.AccountId;
	borrowAmount: ReturnNumber;
	accountBorrows: ReturnNumber;
	totalBorrows: ReturnNumber;
}

export interface RepayBorrow {
	payer: ReturnTypes.AccountId;
	borrower: ReturnTypes.AccountId;
	repayAmount: ReturnNumber;
	accountBorrows: ReturnNumber;
	totalBorrows: ReturnNumber;
}

export interface LiquidateBorrow {
	liquidator: ReturnTypes.AccountId;
	borrower: ReturnTypes.AccountId;
	repayAmount: ReturnNumber;
	tokenCollateral: ReturnTypes.AccountId;
	seizeTokens: ReturnNumber;
}

export interface ReservesAdded {
	benefactor: ReturnTypes.AccountId;
	addAmount: ReturnNumber;
	newTotalReserves: ReturnNumber;
}

