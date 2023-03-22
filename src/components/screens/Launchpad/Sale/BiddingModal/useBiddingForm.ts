import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { useState } from 'react'
import { useWalletBalance } from 'src/hooks/useWalletBalance'
import { ERC20Asset } from 'src/types/models'
import { EthereumAddress } from 'src/types/web3'
import { BN_ZERO, formatAmt, formattedToBigNumber } from 'src/utils/number'
import { Bid } from '../../types'
import { calcBoost } from '../../utils'

type BiddingFormProps = {
  maxAmount: BigNumber
  boostedRaisedAmount: BigNumber
  currentEstimatedPrice: BigNumber
  biddingAssets: ERC20Asset[]
  currentBid?: Bid
  submit: (currentBid: Bid & { asset: EthereumAddress }) => VoidFunction
}
export const useBiddingForm = ({
  biddingAssets,
  currentBid,
  submit,
  ...market
}: BiddingFormProps) => {
  const [isSubmitting, setSubmiting] = useState(false)

  const { data } = useWalletBalance()
  const [amount, setAmount] = useState(
    currentBid ? formatAmt(currentBid.amount) : '',
  )
  const [noPriceLimitEnabled, setNoPriceLimitEnabled] = useState(
    !currentBid?.limitPrice,
  )
  const [limitPrice, setLimitPrice] = useState(
    currentBid?.limitPrice ? formatAmt(currentBid.limitPrice) : '',
  )
  const [cancelable, setCancelable] = useState(currentBid?.cancelable)
  const boost = calcBoost({
    limitPrice: noPriceLimitEnabled ? undefined : BN_ZERO,
    cancelable,
  })

  const biddingAsset = biddingAssets[0]
  const bid = newBid(
    biddingAsset.address as EthereumAddress,
    amount,
    noPriceLimitEnabled,
    limitPrice,
    cancelable,
  )
  const estimatedAmount = calcEstimatedAmount(
    bid,
    noPriceLimitEnabled,
    market,
    currentBid,
  )
  const inWallet = data[biddingAsset.symbol]
  const maxBiddableAmount = inWallet.plus(currentBid?.amount || BN_ZERO)
  const error = validate(bid, noPriceLimitEnabled, inWallet, currentBid)

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
    maxBiddableAmount,
    submit: () => {
      setSubmiting(true)
      return submit(bid)
    },
    isSubmitting,
    error,
  }
}

const newBid = (
  asset: EthereumAddress,
  amount: string,
  noPriceLimitEnabled: boolean,
  limitPrice?: string,
  cancelable?: boolean,
) => {
  const amountBn = (amount && formattedToBigNumber(amount)) || BN_ZERO
  const limitPriceBn =
    !noPriceLimitEnabled && limitPrice && formattedToBigNumber(limitPrice)

  return {
    amount: amountBn,
    asset,
    limitPrice: limitPriceBn || undefined,
    cancelable,
  }
}

export const calcEstimatedAmount = (
  bid: Bid,
  noPriceLimitEnabled: boolean,
  market: {
    maxAmount: BigNumber
    boostedRaisedAmount: BigNumber
    currentEstimatedPrice: BigNumber
  },
  currentBid?: Bid,
) => {
  if (bid.amount.isZero()) return BN_ZERO
  if (market.boostedRaisedAmount.isZero()) return market.maxAmount
  const boost = calcBoost({
    limitPrice: noPriceLimitEnabled ? undefined : BN_ZERO,
    cancelable: bid.cancelable,
  })
  if (
    !noPriceLimitEnabled &&
    bid.limitPrice &&
    bid.limitPrice.lt(market.currentEstimatedPrice)
  )
    return BN_ZERO

  const currentBoostedAmountBn = currentBid
    ? currentBid.amount.times(calcBoost(currentBid))
    : BN_ZERO

  const boostedAmountBn = bid.amount.times(boost)

  const newRaisedAmount = boostedAmountBn.plus(
    market.boostedRaisedAmount.minus(currentBoostedAmountBn),
  )
  return boostedAmountBn
    .div(newRaisedAmount)
    .times(market.maxAmount)
    .decimalPlaces(18, BigNumber.ROUND_FLOOR)
}

export const validate = (
  bid: Bid,
  noPriceLimitEnabled: boolean,
  inWallet: BigNumber,
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
  if (!currentBid && inWallet.lt(bid.amount)) return t`No Balance to Bid`
  if (!currentBid) return
  if (!!bid.cancelable !== !!currentBid.cancelable)
    return t`Cancelable or not is unchangeable`
  if (bid.amount.lt(currentBid.amount)) return t`Only Allowed to Add Bid`
  if (inWallet.lt(bid.amount.minus(currentBid.amount)))
    return t`No Balance to Add Bid`
  if (noPriceLimitEnabled) {
    if (!currentBid.limitPrice && bid.amount.eq(currentBid.amount))
      return t`Nothing Changed`
    return
  }
  if (bid.limitPrice?.lt(currentBid.limitPrice || BN_ZERO))
    return t`Only Allowed to Raise or Disable Limit Price`
  if (
    bid.amount.eq(currentBid.amount) &&
    (!currentBid.limitPrice || bid.limitPrice?.eq(currentBid.limitPrice))
  )
    return t`Nothing Changed`
}
