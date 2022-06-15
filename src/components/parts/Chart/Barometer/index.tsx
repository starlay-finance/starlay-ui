import { CSSProperties, InputHTMLAttributes, ReactNode } from 'react'
import { asStyled } from 'src/components/hoc/asStyled'
import { trueBlack } from 'src/styles/colors'
import { flexCenter } from 'src/styles/mixins'
import { Color } from 'src/styles/types'
import { pickColorInGradient } from 'src/utils/color'
import styled, { css, SimpleInterpolation } from 'styled-components'

export type BarometerProps = {
  label?: string
  value?: ReactNode
  ratio: number
  colors: Color[]
  styles?: {
    barometer?: SimpleInterpolation
    thumb?: SimpleInterpolation
  }
  chartStyle?: CSSProperties
  rangeInputProps?: InputHTMLAttributes<HTMLInputElement>
}
export const Barometer = asStyled<BarometerProps>(
  ({
    label,
    value,
    ratio,
    colors,
    chartStyle,
    styles,
    rangeInputProps,
    className,
  }) => {
    const currentColor = pickColorInGradient(ratio, ...colors)
    const adjustedRatio = Math.max(Math.min(ratio, 1), 0)
    return (
      <BarometerFigure
        className={className}
        colors={colors}
        currentColor={currentColor}
        ratio={adjustedRatio}
        styles={styles}
      >
        {label && (
          <figcaption style={{ color: currentColor }}>{label}</figcaption>
        )}
        <div style={chartStyle}>
          <BarometerThumb
            style={{
              left: `min(max(${adjustedRatio * 100}%, 4px), calc(100% - 4px))`,
              backgroundColor: currentColor,
              transition: !!rangeInputProps ? 'none' : undefined,
            }}
          />
        </div>
        {value && (
          <figcaption style={{ color: currentColor }}>{value}</figcaption>
        )}
        {rangeInputProps && <input type="range" {...rangeInputProps} />}
      </BarometerFigure>
    )
  },
)``

const BarometerThumb = styled.span`
  position: absolute;
  left: 4px;
  right: 4px;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border: 4px solid ${trueBlack};
  border-radius: 50%;
  transition: all 1s ease-in;
`

type BarometerFigureProps = {
  ratio: number
  colors: Color[]
  currentColor: string
  styles?: {
    barometer?: SimpleInterpolation
    thumb?: SimpleInterpolation
  }
}
const BarometerFigure = styled.figure<BarometerFigureProps>`
  ${flexCenter};
  position: relative;
  width: 100%;
  column-gap: 16px;
  backdrop-filter: blur(8px) brightness(0.8);
  input {
    position: absolute;
    inset: 0;
    margin-top: -6px;
    height: 16px;
    cursor: pointer;
    :disabled {
      cursor: not-allowed;
    }
  }
  figcaption {
    width: 128px;
  }
  > div {
    position: relative;
    flex: 1;
    height: 3px;
    border-radius: 4px;
  }

  ${({ colors, styles: { barometer, thumb } = {} }) => css`
    > div {
      background: linear-gradient(to right, ${colors.join(',')});
      ${barometer};
      > span {
        ${thumb};
      }
    }
  `}
`
