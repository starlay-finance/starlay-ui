import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { useState } from 'react'
import { BN_ZERO, formatAmt, formattedToBigNumber } from 'src/utils/number'
import { Bid } from '../../types'
import { calcBoost } from '../../utils'

type BiddingFormProps = {
  maxAmount: BigNumber
  boostedRaisedAmount: BigNumber
  currentEstimatedPrice: BigNumber
  bid?: Bid
  submit: (bid: Bid) => VoidFunction
}
export const useBiddingForm = ({
  maxAmount,
  currentEstimatedPrice,
  boostedRaisedAmount,
  bid,
  submit,
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
  const amountBn = (amount && formattedToBigNumber(amount)) || BN_ZERO
  const limitPriceBn =
    !noPriceLimitEnabled && limitPrice && formattedToBigNumber(limitPrice)
  const boostedAmountBn = amountBn.times(boost)
  const estimatedAmount =
    !amountBn.isZero() &&
    (noPriceLimitEnabled ||
      (limitPriceBn && currentEstimatedPrice.lte(limitPriceBn)))
      ? boostedAmountBn
          .div(boostedAmountBn.plus(boostedRaisedAmount))
          .times(maxAmount)
      : BN_ZERO

  const newBid = {
    amount: amountBn,
    limitPrice: limitPriceBn || undefined,
    cancelable,
  }
  const error = validate(newBid, noPriceLimitEnabled, bid)

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
    submit: () => submit(newBid),
    error,
  }
}

export const validate = (
  bid: Bid,
  noPriceLimitEnabled: boolean,
  currentBid?: Bid,
) => {
  // cancel only
  if (currentBid?.cancelable) return
  if (bid.amount.isZero()) return t`Enter Amount`
  if (!noPriceLimitEnabled) {
    if (currentBid && !currentBid.limitPrice)
      return t`Limit Price cannot be added`
    if (!bid.limitPrice?.gt(BN_ZERO)) return t`Enter Limit Price`
  }
  if (!currentBid) return
  if (!!bid.cancelable !== !!currentBid.cancelable)
    return t`Cancelable or not is unchangeable`
  if (bid.amount.lt(currentBid.amount))
    return t`Amount must be larger than current`
  if (noPriceLimitEnabled) {
    if (!currentBid.limitPrice && bid.amount.eq(currentBid.amount))
      return t`No changes`
    return
  }
  if (bid.limitPrice?.lt(currentBid.limitPrice || BN_ZERO))
    return t`Limit Price must be higher than current`
  if (
    bid.amount.eq(currentBid.amount) &&
    (!currentBid.limitPrice || bid.limitPrice?.eq(currentBid.limitPrice))
  )
    return t`No changes`
}
