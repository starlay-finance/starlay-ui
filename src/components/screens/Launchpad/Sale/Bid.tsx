import { t } from '@lingui/macro'
import { VFC } from 'react'
import { BN_ZERO, formatAmt, formatPct, formatUSD } from 'src/utils/number'
import { Bid, LaunchpadData, Market } from '../types'
import { calcBoost } from '../utils'
import { CtaButton, Information, InformationItem, Section } from './parts'

type BidSecionProps = {
  bid: Bid
  market?: Market
  token: LaunchpadData['token']
  hasEnded: boolean
  openBiddingModal: VoidFunction
}
export const BidSecion: VFC<BidSecionProps> = ({
  bid,
  market,
  token,
  hasEnded,
  openBiddingModal,
}) => {
  const currentEstimatedPrice = market?.currentPriceInUSD || BN_ZERO
  const boost = calcBoost(bid)
  const currentEstimatedAmount =
    bid.limitPrice && bid.limitPrice.lt(currentEstimatedPrice)
      ? BN_ZERO
      : bid.amount.times(boost).div(currentEstimatedPrice)

  const receivableAmount = BN_ZERO // TODO
  const refundableAmount = BN_ZERO // TODO
  const requestRefund = () => {} //TODO
  return (
    <Section>
      <h2>{t`Your Bid`}</h2>
      <Information started>
        <ul>
          <InformationItem
            label={t`Bid Amount`}
            value={formatAmt(bid.amount, { symbol: 'USDC' })}
          />
          <InformationItem
            label={t`Limit Price`}
            value={bid.limitPrice ? formatUSD(bid.limitPrice) : '-'}
          />
          <InformationItem
            label={t`Cancel`}
            value={bid.cancelable ? t`Enabled` : 'Disabled'}
          />
          <InformationItem
            label={t`Boosted`}
            value={formatPct(calcBoost(bid) - 1)}
          />
          <InformationItem
            label={t`Receivable Amount`}
            tooltip={t`TODO description of receivable amount`}
            value={formatAmt(
              hasEnded ? receivableAmount : currentEstimatedAmount,
              { symbol: token.symbol, decimalPlaces: 2 },
            )}
          />
          {!receivableAmount.isZero() && (
            <InformationItem
              label={t`Vesting Period`}
              tooltip={t`TODO description of receivable amount`}
              value={'2022/07/02 - 2023/07/02'}
            />
          )}
        </ul>
      </Information>
      {!hasEnded ? (
        <CtaButton onClick={openBiddingModal}>
          <span>
            {bid.cancelable
              ? t`Cancel`
              : t`Increase Bid Amount and/or Limit Price`}
          </span>
        </CtaButton>
      ) : (
        !refundableAmount.isZero() && (
          <CtaButton onClick={requestRefund}>
            <span>
              {receivableAmount.isZero()
                ? t`Request Bid Amount Refund`
                : t`Partially Filled! Request Refund for Remained Amount`}
            </span>
          </CtaButton>
        )
      )}
    </Section>
  )
}
