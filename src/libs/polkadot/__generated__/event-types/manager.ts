// @ts-nocheck
// @ts-nocheck
// @ts-nocheck
// @ts-nocheck
import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/manager';

export interface RoleAdminChanged {
	role: number;
	previousAdminRole: number;
	newAdminRole: number;
}

export interface RoleGranted {
	role: number;
	grantee: ReturnTypes.AccountId;
	grantor: ReturnTypes.AccountId | null;
}

export interface RoleRevoked {
	role: number;
	account: ReturnTypes.AccountId;
	admin: ReturnTypes.AccountId;
}

