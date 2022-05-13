import { BN_ONE } from 'src/utils/number'
import { Bid } from './types'

export const calcBoost = (bid: Omit<Bid, 'amount'>) => {
  let boost = BN_ONE
  if (!bid.limitPrice) boost = boost.plus('0.05')
  if (!bid.cancelable) boost = boost.plus('0.1')
  return boost.toNumber()
}
