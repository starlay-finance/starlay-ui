import { t } from '@lingui/macro'
import { BigNumber } from '@starlay-finance/math-utils'
import { asStyled } from 'src/components/hoc/asStyled'
import { BlinkWrapper } from 'src/components/parts/Blink'
import { DonutChart2 } from 'src/components/parts/Chart'
import { LoadingProtocolIcon } from 'src/components/parts/Loading'
import { Reel } from 'src/components/parts/Reel'
import { blue, lightYellow, secondary } from 'src/styles/colors'
import { fontWeightBold, fontWeightSemiBold } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import { formatPct } from 'src/utils/number'
import styled, { css } from 'styled-components'

type NetAPYProps = {
  openWalletModal: VoidFunction
  netAPY: BigNumber | undefined
}
export const NetAPY = asStyled<NetAPYProps>(({ netAPY, openWalletModal }) => {
  const ratio = calcRatioForAPYChart(netAPY?.toNumber())
  const displayValue = netAPY ? formatPct(netAPY) : undefined
  return (
    <NetAPYDonutChart
      elements={[
        { ratio: ratio.deposit, color: blue },
        { ratio: ratio.borrow, color: lightYellow },
      ]}
    >
      <IconButton
        $loading={!displayValue}
        disabled={!!displayValue}
        onClick={() => openWalletModal()}
      >
        <LoadingProtocolIcon />
        <span>Connect</span>
      </IconButton>
      {displayValue && (
        <ChartCaptionDiv>
          <span>{t`Net APY`}</span>
          <BlinkWrapper value={displayValue}>
            <Reel text={displayValue} />
          </BlinkWrapper>
        </ChartCaptionDiv>
      )}
    </NetAPYDonutChart>
  )
})``
const CHART_FILLED_RATIO = 0.3

const calcRatioForAPYChart = (netAPY: number | undefined) => {
  if (netAPY == null) return { deposit: 0, borrow: 0 }
  const netAPYRatioForChart = netAPY / CHART_FILLED_RATIO
  const deposit =
    netAPYRatioForChart > 0
      ? Math.min(1, netAPYRatioForChart + 0.5)
      : Math.max(0, 0.5 + netAPYRatioForChart)
  const borrow =
    netAPYRatioForChart > 0
      ? Math.max(0, 0.5 - netAPYRatioForChart)
      : Math.min(1, -netAPYRatioForChart + 0.5)
  return { deposit, borrow }
}

const IconButton = styled.button<{ $loading?: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  transition: all 1s ease-out;
  ${flexCenter};
  opacity: 1;
  span {
    opacity: 0;
    position: absolute;
    inset: 0;
    ${flexCenter};
    font-weight: ${fontWeightBold};
    font-size: 20px;
    filter: blur(24px);
    transition: all 0.3s ease-in-out;
  }
  :hover {
    span {
      opacity: 1;
      filter: blur(0px);
      backdrop-filter: blur(4px) brightness(0.8);
    }
  }
  ${({ $loading }) =>
    !$loading &&
    css`
      opacity: 0;
      visibility: hidden;
    `};
`
const ChartCaptionDiv = styled.div`
  position: relative;
  ${flexCenter};
  flex-direction: column;
  row-gap: 8px;
  span:first-child {
    font-size: 16px;
    font-weight: ${fontWeightBold};
    color: ${secondary};
  }
  span:last-child {
    font-size: 32px;
    font-weight: ${fontWeightSemiBold};
  }
`
const NetAPYDonutChart = styled(DonutChart2)`
  width: 164px;
  height: 164px;
`
