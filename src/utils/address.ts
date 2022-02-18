import { ellipsizeMid } from './string'

export const shortenAddress = (address: string): string => {
  return ellipsizeMid(address, 6, 4)
}

export const equals = (
  a: string | null | undefined,
  b: string | null | undefined,
) => (a && b ? a.toLowerCase() === b.toLowerCase() : false)
