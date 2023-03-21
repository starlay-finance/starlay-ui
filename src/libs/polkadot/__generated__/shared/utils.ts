import { handleEventReturn } from '@727-ventures/typechain-types'
import type { ContractPromise } from '@polkadot/api-contract'

export function getTypeDescription(id: number | string, fileName: string): any {
  return
}

export function getEventTypeDescription(name: string, fileName: string): any {
  return
}

export function decodeEvents(
  events: any[],
  contract: ContractPromise,
  fileName: string,
): any[] {
  return events
    .filter((record: any) => {
      const { event } = record

      const [address, data] = record.event.data

      return (
        event.method == 'ContractEmitted' &&
        address.toString() === contract.address.toString()
      )
    })
    .map((record: any) => {
      const [address, data] = record.event.data

      const { args, event } = contract.abi.decodeEvent(data)

      const _event: Record<string, any> = {}

      for (let i = 0; i < args.length; i++) {
        _event[event.args[i]!.name] = args[i]!.toJSON()
      }

      handleEventReturn(
        _event,
        getEventTypeDescription(event.identifier.toString(), fileName),
      )

      return {
        name: event.identifier.toString(),
        args: _event,
      }
    })
}
