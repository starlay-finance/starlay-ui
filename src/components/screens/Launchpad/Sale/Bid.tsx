import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { VFC } from 'react'
import { Reel } from 'src/components/parts/Number/Reel'
import { BN_ZERO, formatAmt, formatPct, formatUSD } from 'src/utils/number'
import { Bid, Market, ProjectData } from '../types'
import { calcBoost } from '../utils'
import {
  CtaButton,
  Information,
  InformationItem,
  LimitPriceTooltip,
  Section,
} from './parts'

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
            tooltip={<LimitPriceTooltip />}
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
            tooltip={t`The estimated amount of ${token.symbol} you may receive according to the current Price Per Token updates every minute.
LAYs will be unlocked linearly and can be claimed during the vesting period.`}
            value={
              market ? (
                !market.closed ? (
                  <Reel
                    text={formatAmt(currentEstimatedAmount, {
                      symbol: token.symbol,
                      decimalPlaces: 2,
                    })}
                  />
                ) : receivableAmount ? (
                  <Reel
                    text={formatAmt(receivableAmount, {
                      symbol: token.symbol,
                      decimalPlaces: 2,
                    })}
                  />
                ) : undefined
              ) : undefined
            }
          />
          {market?.closed && receivableAmount?.gt(BN_ZERO) && (
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
