import { t } from '@lingui/macro'
import dayjs from 'dayjs'
import { CSSProperties, VFC } from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  YAxis,
} from 'recharts'
import { ShimmerPlaceholder } from 'src/components/parts/Loading'
import {
  darkPurple,
  darkRed,
  lightPurple,
  secondary,
  skyBlue,
  trueWhite,
} from 'src/styles/colors'
import {
  fontWeightBlack,
  fontWeightBold,
  fontWeightRegular,
} from 'src/styles/font'
import { formatWithTZ } from 'src/utils/date'
import styled from 'styled-components'
import { LaunchPadData, Market, PriceChartData } from './types'

type StatisticsProps = {
  token: LaunchPadData['token']
  market: Market | undefined
  priceChartData: PriceChartData[]
}

export const Statistics: VFC<StatisticsProps> = ({
  token,
  market,
  priceChartData,
}) => {
  return (
    <StatisticsDiv>
      <div>
        <Items>
          <Item label={t`Token`} value={token.symbol} />
          <Item label={t`Price Per Token`} value={market && 'TODO'} />
          <Item label={t`Bottom Price`} value={market && 'TODO'} />
          <Item label={t`Amount of Raised`} value={market && 'TODO'} />
          <Item label={t`Number of Bidders`} value={market && 'TODO'} />
        </Items>
        <Chart>
          <ResponsiveContainer width={800} height="100%">
            <AreaChart
              width={730}
              data={priceChartData}
              margin={{ top: 64, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPx" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={skyBlue} stopOpacity={0.48} />
                  <stop offset="100%" stopColor={darkRed} stopOpacity={0.48} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="priceInUSD"
                stroke={trueWhite}
                fillOpacity={1}
                fill="url(#colorPx)"
              />
              <Area
                type="monotone"
                dataKey="bottomPriceInUSD"
                stroke={lightPurple}
                fillOpacity={1}
                fill="url(#colorBottomPx)"
              />
              <YAxis dataKey="priceInUSD" tick={false} axisLine={false} />
              <Tooltip
                position={{ y: 0 }}
                offset={-72}
                content={TooltipRenderer}
                active
              />
            </AreaChart>
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
          ? `${Math.max(coordinate?.x - 728, 0)}px`
          : undefined,
      }}
    />
  )
}

const FORMAT = 'MMM, d, HH:mm z'
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
  VFC<{ label: string; value: string | undefined; className?: string }>
>(({ label, value, className }) => (
  <li className={className}>
    <p>{label}</p>
    <p>{value ? value : <ShimmerPlaceholder />}</p>
  </li>
))``

const Items = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  ${Item} {
    padding-bottom: 12px;
    :not(:last-child) {
      border-bottom: 1px solid ${darkPurple}3d;
    }
    p:first-child {
      font-size: 16px;
      font-weight: ${fontWeightRegular};
    }
    p:last-child {
      margin-top: 4px;
      font-size: 20px;
      font-weight: ${fontWeightBold};
      ${ShimmerPlaceholder} {
        width: 50%;
      }
    }
  }
`
const Chart = styled.figure``

const StatisticsDiv = styled.div`
  width: 100%;
  height: 392px;
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
