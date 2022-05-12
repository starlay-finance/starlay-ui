import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { VFC } from 'react'
import { BN_ZERO, formatAmt, formatPct, formatUSD } from 'src/utils/number'
import { Bid, Market, ProjectData } from '../types'
import { calcBoost } from '../utils'
import { CtaButton, Information, InformationItem, Section } from './parts'

type BidSecionProps = {
  bid: Bid
  market?: Market
  token: ProjectData['token']
  vesting: ProjectData['vesting']
  hasEnded: boolean
  openBiddingModal: VoidFunction
  maxAmount: BigNumber
  receivableAmount?: BigNumber
  refundableAmount?: BigNumber
  requestRefund: VoidFunction
}
export const BidSecion: VFC<BidSecionProps> = ({
  bid,
  market,
  token,
  vesting,
  hasEnded,
  openBiddingModal,
  maxAmount,
  receivableAmount,
  refundableAmount,
  requestRefund,
}) => {
  const currentEstimatedPrice = market?.currentPriceInUSD || BN_ZERO
  const boost = calcBoost(bid)
  const currentEstimatedAmount =
    bid.limitPrice && bid.limitPrice.lt(currentEstimatedPrice)
      ? BN_ZERO
      : currentEstimatedPrice.isZero()
      ? maxAmount
      : BigNumber.min(
          bid.amount.times(boost).div(currentEstimatedPrice),
          maxAmount,
        )
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
              market?.closed
                ? receivableAmount || BN_ZERO
                : currentEstimatedAmount,
              { symbol: token.symbol, decimalPlaces: 2 },
            )}
          />
          {market?.closed && !receivableAmount?.isZero() && (
            <InformationItem
              label={t`Vesting Period`}
              value={`${vesting.start.format('MMM, D YYYY')} - ${vesting.start
                .add(vesting.seconds, 's')
                .format('MMM, D YYYY')}`}
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
        refundableAmount?.gt(BN_ZERO) &&
        receivableAmount && (
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
