import { t } from '@lingui/macro'
import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { VFC } from 'react'
import { darkPurple, darkRed, skyBlue, trueBlack } from 'src/styles/colors'
import { fontWeightBold, fontWeightMedium } from 'src/styles/font'
import { formatWithTZ } from 'src/utils/date'
import { formatAmt, formatPct } from 'src/utils/number'
import styled from 'styled-components'
import { LaunchPadData } from './types'

type SaleProps = {
  token: LaunchPadData['token']
  information: LaunchPadData['sale']
  status:
    | {
        currentPriceInUSD: BigNumber
        bottomPriceInUSD: BigNumber
        raisedAmountInUSD: BigNumber
        numOfBids: BigNumber
      }
    | undefined
}

const DATE_FORMAT = 'MMM, D HH:mm z'

export const Sale: VFC<SaleProps> = ({ token, information, status }) => {
  return (
    <SaleDiv>
      <SaleInformation>
        <ul>
          <SaleInformationItem label={t`Token`} value={token.symbol} />
          <SaleInformationItem
            label={t`Price Per Token`}
            value={status ? 'TODO' : '-'}
          />
          <SaleInformationItem
            label={t`Amount Raised`}
            value={status ? 'TODO' : '-'}
          />
          <SaleInformationItem
            label={t`Number of Bidders`}
            value={status ? 'TODO' : '-'}
          />
          <SaleInformationItem
            label={t`Sale Start`}
            value={formatWithTZ(information.start, DATE_FORMAT)}
          />
          <SaleInformationItem
            label={t`Sale End`}
            value={formatWithTZ(information.end, DATE_FORMAT)}
          />
          <SaleInformationItem
            label={t`Bid with`}
            value={information.biddingAssets
              .map(({ symbol, name }) => `${symbol}(${name})`)
              .join('\n')}
          />
          <SaleInformationItem
            label={t`Emission`}
            value={formatPct(information.emissionRatio)}
          />
          <SaleInformationItem
            label={t`Raise Size`}
            value={formatAmt(valueToBigNumber(information.emissionAmount), {
              symbol: token.symbol,
            })}
          />
        </ul>
      </SaleInformation>
    </SaleDiv>
  )
}

const SaleInformationItem: VFC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <li>
    <div>{label}</div>
    <div>{value}</div>
  </li>
)

const SaleInformation = styled.div`
  background: linear-gradient(45deg, ${skyBlue}cc, ${darkRed}cc);
  padding: 2px;
  border-radius: 6px;
  > ul {
    border-radius: 6px;
    padding: 4px 0 2px;
    background: linear-gradient(45deg, ${trueBlack}bf, ${trueBlack});
    backdrop-filter: blur(24px) brightness(0.52);
    li {
      display: flex;
      padding: 16px 22px;
      border-bottom: 1px solid ${darkPurple}3d;

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
        }
      }
    }
  }
`

const SaleDiv = styled.div`
  width: 480px;
`
