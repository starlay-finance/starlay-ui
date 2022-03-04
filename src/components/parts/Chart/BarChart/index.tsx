import { VFC } from 'react'
import { AsStyledProps } from 'src/components/hoc/asStyled'
import { Reel } from 'src/components/parts/Number/Reel'
import { trueWhite } from 'src/styles/colors'
import { Color } from 'src/styles/types'
import { formatPct } from 'src/utils/number'
import styled, { css } from 'styled-components'

export type BarChartProps = {
  ratio: number
  unfilled: Color
  showLabel?: boolean
  filledStyles:
    | { bgColor: Color; color?: Color }
    | { gte: number; bgColor: Color; color?: Color }[]
}
export const BarChart = styled<VFC<BarChartProps & AsStyledProps>>(
  ({ showLabel, ratio, filledStyles, className, ...props }) => {
    const ratioPct = Math.floor(ratio * 100)
    const { bgColor, color = trueWhite } = extractStyle(filledStyles, ratioPct)
    return (
      <BarChartDiv
        {...props}
        ratio={ratioPct}
        filled={bgColor}
        $color={color}
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

const extractStyle = (
  style: BarChartProps['filledStyles'],
  ratioPct: number,
) => {
  if (!Array.isArray(style)) return style
  const filledColor = style
    .sort(({ gte: a }, { gte: b }) => (b - a > 0 ? 1 : -1))
    .find(({ gte }, idx, arr) => ratioPct >= gte || idx === arr.length - 1)
  return { bgColor: filledColor!.bgColor, color: filledColor!.color }
}

export type BarChartStyleProps = {
  ratio: number
  filled: Color
  unfilled: Color
  $color: Color
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
  ${({ ratio, filled, unfilled, $color }) => {
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
        font-size: 14px;
        color: ${$color};
        background-color: ${filled};
        left: min(calc(${ratio}%), calc(100% - 4em));
        padding: 4px 8px;
        border-radius: 6px;
        > div {
          margin-top: 1px;
        }
      }
    `
  }}
`
