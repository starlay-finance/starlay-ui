import type * as EventTypes from '../event-types/pool';
import type {ContractPromise} from "@polkadot/api-contract";
import type {ApiPromise} from "@polkadot/api";
import {getEventTypeDescription} from "../shared/utils";
import {handleEventReturn} from "@727-ventures/typechain-types";

export default class EventsClass {
	private __nativeContract : ContractPromise;
	private __api : ApiPromise;

	constructor(
		nativeContract : ContractPromise,
		api : ApiPromise,
	) {
		this.__nativeContract = nativeContract;
		this.__api = api;
	}

	public subscribeOnMintEvent(callback : (event : EventTypes.Mint) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('Mint', 'pool')) as EventTypes.Mint);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'Mint');
	}

	public subscribeOnRedeemEvent(callback : (event : EventTypes.Redeem) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('Redeem', 'pool')) as EventTypes.Redeem);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'Redeem');
	}

	public subscribeOnBorrowEvent(callback : (event : EventTypes.Borrow) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('Borrow', 'pool')) as EventTypes.Borrow);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'Borrow');
	}

	public subscribeOnRepayBorrowEvent(callback : (event : EventTypes.RepayBorrow) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('RepayBorrow', 'pool')) as EventTypes.RepayBorrow);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'RepayBorrow');
	}

	public subscribeOnLiquidateBorrowEvent(callback : (event : EventTypes.LiquidateBorrow) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('LiquidateBorrow', 'pool')) as EventTypes.LiquidateBorrow);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'LiquidateBorrow');
	}

	public subscribeOnReservesAddedEvent(callback : (event : EventTypes.ReservesAdded) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('ReservesAdded', 'pool')) as EventTypes.ReservesAdded);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'ReservesAdded');
	}


	private __subscribeOnEvent(
		callback : (args: any[], event: any) => void,
		filter : (eventName: string) => boolean = () => true
	) {
		// @ts-ignore
		return this.__api.query.system.events((events) => {
			events.forEach((record: any) => {
				const { event } = record;

				if (event.method == 'ContractEmitted') {
					const [address, data] = record.event.data;

					if (address.toString() === this.__nativeContract.address.toString()) {
						const {args, event} = this.__nativeContract.abi.decodeEvent(data);

						if (filter(event.identifier.toString()))
							callback(args, event);
					}
				}
			});
		});
	}

}