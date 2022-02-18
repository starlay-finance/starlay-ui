import { VFC } from 'react'
import { AsStyledProps } from 'src/components/hoc/asStyled'
import { Reel } from 'src/components/parts/Reel'
import { Color } from 'src/styles/types'
import { formatPct } from 'src/utils/number'
import styled, { css } from 'styled-components'

type BarChartProps = BarChartStyleProps & {
  showLabel?: boolean
}
export const BarChart = styled<VFC<BarChartProps & AsStyledProps>>(
  ({ showLabel, ratio, filled, className, ...props }) => {
    const ratioPct = Math.floor(ratio * 100)
    const filledColor = extractColor(filled, ratioPct)
    return (
      <BarChartDiv
        {...props}
        ratio={ratioPct}
        filled={filledColor}
        className={className}
      >
        {showLabel && ratioPct !== 0 && (
          <span>
            <Reel text={formatPct(ratio)} />
          </span>
        )}
      </BarChartDiv>
    )
  },
)``

const extractColor = (colors: BarChartProps['filled'], ratioPct: number) => {
  if (typeof colors === 'string') return colors
  const filledColor = colors
    .sort(({ gte: a }, { gte: b }) => (b - a > 0 ? 1 : -1))
    .find(({ gte }, idx, arr) => ratioPct >= gte || idx === arr.length - 1)
  return filledColor!.color
}

export type BarChartStyleProps = {
  ratio: number
  filled:
    | Color
    | {
        gte: number
        color: Color
      }[]
  unfilled: `${Color}${string}`
}
const BarChartDiv = styled.div<BarChartStyleProps>`
  position: relative;
  background-position: 100%;
  span {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin: auto;
  }
  &,
  span {
    transition: all 1s ease-in;
  }
  ${({ ratio, filled, unfilled }) => {
    return css`
      background: linear-gradient(
        90deg,
        ${filled} 50%,
        ${unfilled} 50%,
        ${unfilled}
      );
      background-size: 200%;
      background-position: ${100 - ratio}%;
      span {
        left: min(calc(${ratio}% + 0.5em), calc(100% - 4em));
      }
    `
  }}
`
