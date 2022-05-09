import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import dayjs from 'dayjs'
import { CSSProperties, VFC } from 'react'
import {
  Area,
  ComposedChart,
  Label,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from 'recharts'
import { ShimmerPlaceholder } from 'src/components/parts/Loading'
import { TooltipMessage } from 'src/components/parts/ToolTip'
import {
  attention,
  darkPurple,
  darkRed,
  lightPurple,
  lightYellow,
  secondary,
  skyBlue,
  success,
  trueWhite,
} from 'src/styles/colors'
import {
  fontWeightBlack,
  fontWeightBold,
  fontWeightRegular,
} from 'src/styles/font'
import { formatWithTZ } from 'src/utils/date'
import { formatAmt, formatUSD } from 'src/utils/number'
import styled from 'styled-components'
import { LaunchpadData, Market, PriceChartData } from './types'

type StatisticsProps = {
  token: LaunchpadData['token']
  market: Market | undefined
  priceChartData: PriceChartData[]
  limitPrice?: BigNumber
}

export const Statistics: VFC<StatisticsProps> = ({
  token,
  market,
  priceChartData,
  limitPrice,
}) => {
  const limitPriceLineColor = limitPrice
    ? market?.currentPriceInUSD.gt(limitPrice)
      ? attention
      : market?.currentPriceInUSD.eq(limitPrice)
      ? lightYellow
      : success
    : undefined
  return (
    <StatisticsDiv>
      <div>
        <Items>
          <Item label={t`Token`} value={token.symbol} />
          <Item
            label={t`Price Per Token`}
            value={
              market && formatAmt(market.currentPriceInUSD, { prefix: '$' })
            }
          />
          <Item
            label={t`Bottom Price`}
            value={
              market && formatAmt(market.bottomPriceInUSD, { prefix: '$' })
            }
            tooltip={t`TODO description of bottom price`}
          />
          <Item
            label={t`Total Raised`}
            value={
              market &&
              formatUSD(market.raisedAmountInUSD, { decimalPlaces: 0 })
            }
          />
          <Item
            label={t`Number of Bidders`}
            value={market && formatAmt(market.numOfBids)}
          />
        </Items>
        <Chart>
          <ResponsiveContainer width={800} height="99%">
            <ComposedChart
              width={730}
              data={priceChartData}
              margin={{ top: 0, right: 8, left: 8, bottom: 8 }}
            >
              <defs>
                <linearGradient id="colorPx" x1="0" y1=".5" x2="1" y2=".5">
                  <stop offset="0%" stopColor={skyBlue} stopOpacity={0.48} />
                  <stop offset="100%" stopColor={darkRed} stopOpacity={0.48} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="priceInUSD"
                stroke={trueWhite}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPx)"
              />
              <Area
                type="monotone"
                dataKey="bottomPriceInUSD"
                stroke={lightPurple}
                strokeWidth={1}
                fillOpacity={1}
                fill="url(#colorBottomPx)"
              />
              {limitPrice && (
                <ReferenceLine
                  y={limitPrice.toNumber()}
                  stroke={limitPriceLineColor}
                  strokeDasharray="5"
                >
                  <Label
                    value={t`Your Limit = ${formatUSD(limitPrice)}`}
                    fill={limitPriceLineColor}
                    transform="translate(-6 -28)"
                    position="insideTopLeft"
                  />
                </ReferenceLine>
              )}
              <Tooltip
                position={{ y: 0 }}
                offset={-100}
                content={TooltipRenderer}
                cursor={{
                  strokeDashoffset: 540,
                  strokeDasharray: 300,
                }}
                active
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Chart>
      </div>
    </StatisticsDiv>
  )
}

const TooltipRenderer: VFC<TooltipProps<number, string>> = ({
  active,
  payload,
  coordinate,
}) => {
  if (!active || !payload?.length) return null
  if (
    Number.isNaN(payload[0].value) ||
    Number.isNaN(payload[0].payload.timestamp)
  )
    return null
  return (
    <ChartTooltip
      priceInUSD={payload[0].payload.priceInUSD}
      bottomPriceInUSD={payload[0].payload.bottomPriceInUSD}
      timestamp={payload[0].payload.timestamp}
      style={{
        marginRight: coordinate?.x
          ? `${Math.max(coordinate?.x - 696, 0)}px`
          : undefined,
      }}
    />
  )
}

const FORMAT = 'MMM, d HH:mm z'
const ChartTooltip: VFC<{
  priceInUSD: number
  bottomPriceInUSD: number
  timestamp: number
  style?: CSSProperties
}> = ({ priceInUSD, bottomPriceInUSD, timestamp, style }) => (
  <TooltipDiv style={style}>
    <p>
      {t`Price Per LAY`}
      <span>{`$${bottomPriceInUSD.toFixed(2)} - $${priceInUSD.toFixed(
        2,
      )}`}</span>
    </p>
    <p>{formatWithTZ(dayjs.unix(timestamp), FORMAT)}</p>
  </TooltipDiv>
)

const TooltipDiv = styled.div`
  text-align: center;
  font-weight: ${fontWeightRegular};
  p:first-child {
    font-size: 16px;
    span {
      margin-left: 4px;
      font-style: italic;
      font-weight: ${fontWeightBlack};
    }
  }
  p:last-child {
    margin-top: 4px;
    color: ${secondary};
    font-size: 14px;
  }
`

const Item = styled<
  VFC<{
    label: string
    value: string | undefined
    tooltip?: string
    className?: string
  }>
>(({ label, value, tooltip, className }) => (
  <li className={className}>
    <div>
      {label}
      {tooltip && <TooltipMessage message={tooltip} />}
    </div>
    <div>{value ? value : <ShimmerPlaceholder />}</div>
  </li>
))``

const Items = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  ${Item} {
    :not(:last-child) {
      padding-bottom: 12px;
      border-bottom: 1px solid ${darkPurple}3d;
    }
    > div {
      :first-child {
        display: flex;
        align-items: center;
        column-gap: 4px;
        font-size: 16px;
        font-weight: ${fontWeightRegular};
        ${TooltipMessage} {
          width: 240px;
        }
      }
      :last-child {
        margin-top: 4px;
        font-size: 20px;
        font-weight: ${fontWeightBold};
        ${ShimmerPlaceholder} {
          width: 50%;
        }
      }
    }
  }
`
const Chart = styled.figure`
  margin-right: -8px;
  margin-bottom: -8px;
`

const StatisticsDiv = styled.div`
  width: 100%;
  padding: 2px;
  border-radius: 16px;
  background: linear-gradient(45deg, ${skyBlue}, ${darkRed});
  backdrop-filter: blur(50px);
  > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 32px;
    border-radius: 14px;
    background: linear-gradient(30deg, #001a26f5, #00041af5, #000005, #000000);
  }
  ${Items} {
    width: 240px;
  }
`
