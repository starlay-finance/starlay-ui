import { t } from '@lingui/macro'
import { valueToBigNumber } from '@starlay-finance/math-utils'
import { VFC } from 'react'
import { ShimmerPlaceholder } from 'src/components/parts/Loading'
import { darkPurple, darkRed, lightBlack, skyBlue } from 'src/styles/colors'
import {
  fontWeightBlack,
  fontWeightBold,
  fontWeightMedium,
} from 'src/styles/font'
import { formatWithTZ } from 'src/utils/date'
import { formatAmt, formatPct, formatUSD } from 'src/utils/number'
import styled, { css } from 'styled-components'
import { Bid, LaunchPadData, Market, Status } from './types'

type SaleProps = {
  token: LaunchPadData['token']
  information: LaunchPadData['sale']
  market: Market | undefined
  status: Status
}

const DATE_FORMAT = 'MMM, D HH:mm z'

const mockBid: Bid = {
  amount: valueToBigNumber(1000),
  cancelable: true,
  capPrice: valueToBigNumber(0.5),
}

const calcBoost = (bid: Bid) => {
  let boost = 0
  if (!bid.capPrice) boost += 0.05
  if (!bid.cancelable) boost += 0.1
  return boost
}

export const Sale: VFC<SaleProps> = ({ token, information, status }) => {
  const started = status !== 'Upcoming'
  const bid = mockBid // TODO
  return (
    <SaleDiv>
      {/* TODO closed */}
      {bid && (
        <Section>
          <h2>{t`Your Bid`}</h2>
          <Information started>
            <ul>
              <InformationItem
                label={t`Amount`}
                value={formatAmt(bid.amount, { symbol: 'USDC' })}
              />
              <InformationItem
                label={t`Price Limit`}
                value={bid.capPrice ? formatUSD(bid.capPrice) : '-'}
              />
              <InformationItem
                label={t`Cancel`}
                value={bid.cancelable ? t`Enabled` : 'Disabled'}
              />
              <InformationItem
                label={t`Boosted`}
                value={formatPct(calcBoost(bid))}
              />
              <InformationItem
                label={t`Estimated Amount`}
                // TODO estimate
                value={formatAmt(bid.amount, { symbol: token.symbol })}
              />
            </ul>
          </Information>
          {bid.cancelable ? (
            <CtaButton>
              <span>{t`Cancel`}</span>
            </CtaButton>
          ) : (
            <CtaButton>
              <span>{t`Increase Amount or Price Limit`}</span>
            </CtaButton>
          )}
        </Section>
      )}
      <Section>
        {started && <h2>{t`Sale Information`}</h2>}
        <Information started={started}>
          <ul>
            {!started && (
              <InformationItem label={t`Token`} value={token.symbol} />
            )}
            <InformationItem
              label={t`Raise Size`}
              value={formatAmt(valueToBigNumber(information.emissionAmount), {
                symbol: token.symbol,
              })}
            />
            <InformationItem
              label={t`Emission`}
              value={formatPct(information.emissionRatio)}
            />
            <InformationItem
              label={t`Bid with`}
              value={information.biddingAssets
                .map(({ symbol, name }) => `${symbol}(${name})`)
                .join('\n')}
            />
            <InformationItem
              label={t`Sale Start`}
              value={formatWithTZ(information.start, DATE_FORMAT)}
            />
            <InformationItem
              label={t`Sale End`}
              value={formatWithTZ(information.end, DATE_FORMAT)}
            />
          </ul>
        </Information>
        <CtaButton>
          <span>Bid</span>
        </CtaButton>
      </Section>
    </SaleDiv>
  )
}

const CtaButton = styled.button`
  position: relative;
  display: block;
  width: 100%;
  padding: 18px;
  border-radius: 6px;
  overflow: hidden;

  background: linear-gradient(90deg, ${skyBlue}cc, ${darkRed}cc);
  text-align: center;
  font-size: 16px;
  font-weight: ${fontWeightBlack};
  ::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.24);
    backdrop-filter: blur(24px) brightness(1.16);
  }
  span {
    position: relative;
  }
`

const InformationItem = styled<
  VFC<{ label: string; value: string | undefined; className?: string }>
>(({ label, value, className }) => (
  <li className={className}>
    <p>{label}</p>
    <p>{value ? value : <ShimmerPlaceholder />}</p>
  </li>
))``

const Information = styled.div<{ started?: boolean }>`
  background: linear-gradient(45deg, ${skyBlue}cc, ${darkRed}cc);
  padding: 2px;
  border-radius: 8px;
  > ul {
    border-radius: 6px;
    padding: 4px 0 2px;
    background: linear-gradient(30deg, #001a26f5, #00041af5, #000005, #000000);
    ${InformationItem} {
      display: flex;
      padding: 16px 22px;
      :not(:last-child) {
        border-bottom: 1px solid ${darkPurple}3d;
      }

      font-size: 16px;
      white-space: pre-wrap;
      > * {
        :first-child {
          flex: 4;
          font-weight: ${fontWeightBold};
        }
        :last-child {
          flex: 5;
          font-weight: ${fontWeightMedium};
          font-style: italic;
          ${ShimmerPlaceholder} {
            width: 50%;
          }
        }
      }
    }
  }
  ${({ started }) =>
    started &&
    css`
      background: ${lightBlack};
      ul {
        background: none;
        padding: 8px 0;
        ${InformationItem} {
          padding: 16px 24px;
        }
      }
    `}
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  h2 {
    font-size: 24px;
    font-weight: ${fontWeightBold};
  }
`

const SaleDiv = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column;
  row-gap: 64px;
`
