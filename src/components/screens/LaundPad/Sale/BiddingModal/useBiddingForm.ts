import { BigNumber } from '@starlay-finance/math-utils'
import { useState } from 'react'
import {
  BN_ONE,
  BN_ZERO,
  formatAmt,
  formattedToBigNumber,
} from 'src/utils/number'
import { Bid } from '../../types'
import { calcBoost } from '../../utils'

type BiddingFormProps = {
  maxAmount: BigNumber
  boostedRaisedAmount: BigNumber
  currentEstimatedPrice: BigNumber
  bid?: Bid
}
export const useBiddingForm = ({
  maxAmount,
  currentEstimatedPrice,
  boostedRaisedAmount,
  bid,
}: BiddingFormProps) => {
  const [amount, setAmount] = useState(bid ? formatAmt(bid.amount) : '')
  const [noPriceLimitEnabled, setNoPriceLimitEnabled] = useState(
    !bid?.limitPrice,
  )
  const [limitPrice, setLimitPrice] = useState(
    bid?.limitPrice ? formatAmt(bid.limitPrice) : '',
  )
  const [cancelable, setCancelable] = useState(bid?.cancelable)
  const boost = calcBoost({
    limitPrice: noPriceLimitEnabled ? undefined : BN_ZERO,
    cancelable,
  })
  const amountBn =
    (amount && formattedToBigNumber(amount)?.times(BN_ONE.plus(boost))) ||
    BN_ZERO
  const estimatedAmount =
    !amountBn.isZero() &&
    (noPriceLimitEnabled || currentEstimatedPrice.lte(limitPrice))
      ? amountBn.div(amountBn.plus(boostedRaisedAmount)).times(maxAmount)
      : BN_ZERO

  return {
    amount,
    setAmount,
    noPriceLimitEnabled,
    setNoPriceLimitEnabled,
    limitPrice,
    setLimitPrice,
    cancelable,
    setCancelable,
    boost,
    estimatedAmount,
  }
}
