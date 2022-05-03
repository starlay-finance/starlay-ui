import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { VFC } from 'react'
import { BN_ZERO, formatAmt, formatPct, formatUSD } from 'src/utils/number'
import { Bid, LaunchPadData } from '../types'
import { calcBoost } from '../utils'
import { CtaButton, Information, InformationItem, Section } from './parts'

type BidSecionProps = {
  bid: Bid
  currentEstimatedPrice: BigNumber
  token: LaunchPadData['token']
  hasEnded: boolean
  openBiddingModal: VoidFunction
}
export const BidSecion: VFC<BidSecionProps> = ({
  bid,
  currentEstimatedPrice,
  token,
  hasEnded,
  openBiddingModal,
}) => {
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
            label={t`Amount`}
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
            value={formatPct(calcBoost(bid))}
          />
          {hasEnded ? (
            <InformationItem
              label={t`Estimated Amount`}
              tooltip={t`TODO description of estimated amount`}
              value={formatAmt(currentEstimatedAmount, {
                symbol: token.symbol,
                decimalPlaces: 2,
              })}
            />
          ) : (
            <InformationItem
              label={t`Receivable Amount`}
              tooltip={t`TODO description of receivable amount`}
              value={formatAmt(receivableAmount, {
                symbol: token.symbol,
                decimalPlaces: 2,
              })}
            />
          )}
        </ul>
      </Information>
      {hasEnded ? (
        <CtaButton onClick={openBiddingModal}>
          <span>
            {bid.cancelable ? t`Cancel` : t`Increase Amount or Limit Price`}
          </span>
        </CtaButton>
      ) : (
        !refundableAmount.isZero() && (
          <CtaButton onClick={requestRefund}>
            <span>{t`Request Refund`}</span>
          </CtaButton>
        )
      )}
    </Section>
  )
}
