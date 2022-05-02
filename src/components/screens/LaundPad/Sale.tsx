import { t } from '@lingui/macro'
import { valueToBigNumber } from '@starlay-finance/math-utils'
import { VFC } from 'react'
import { ShimmerPlaceholder } from 'src/components/parts/Loading'
import { darkPurple, darkRed, skyBlue } from 'src/styles/colors'
import { fontWeightBold, fontWeightMedium } from 'src/styles/font'
import { formatWithTZ } from 'src/utils/date'
import { formatAmt, formatPct } from 'src/utils/number'
import styled from 'styled-components'
import { LaunchPadData, Market } from './types'

type SaleProps = {
  token: LaunchPadData['token']
  information: LaunchPadData['sale']
  market: Market | undefined
}

const DATE_FORMAT = 'MMM, D HH:mm z'

export const Sale: VFC<SaleProps> = ({ token, information, market }) => {
  return (
    <SaleDiv>
      <SaleInformation>
        <ul>
          <SaleInformationItem label={t`Token`} value={token.symbol} />
          <SaleInformationItem
            label={t`Price Per Token`}
            value={market && 'TODO'}
          />
          <SaleInformationItem
            label={t`Amount Raised`}
            value={market && 'TODO'}
          />
          <SaleInformationItem
            label={t`Number of Bidders`}
            value={market && 'TODO'}
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

const SaleInformationItem = styled<
  VFC<{ label: string; value: string | undefined; className?: string }>
>(({ label, value, className }) => (
  <li className={className}>
    <p>{label}</p>
    <p>{value ? value : <ShimmerPlaceholder />}</p>
  </li>
))``

const SaleInformation = styled.div`
  background: linear-gradient(45deg, ${skyBlue}cc, ${darkRed}cc);
  padding: 2px;
  border-radius: 8px;
  > ul {
    border-radius: 6px;
    padding: 4px 0 2px;
    background: linear-gradient(30deg, #001a26f5, #00041af5, #000005, #000000);
    ${SaleInformationItem} {
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
          ${ShimmerPlaceholder} {
            width: 50%;
          }
        }
      }
    }
  }
`

const SaleDiv = styled.div`
  width: 480px;
`
