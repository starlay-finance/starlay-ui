import { Bid } from './types'

export const calcBoost = (bid: Omit<Bid, 'amount'>) => {
  let boost = 0
  if (!bid.limitPrice) boost += 0.05
  if (!bid.cancelable) boost += 0.1
  return boost
}
