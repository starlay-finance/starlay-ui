import { ReactNode } from 'react'
import { asStyled } from 'src/components/hoc/asStyled'
import { trueBlack } from 'src/styles/colors'
import { flexCenter } from 'src/styles/mixins'
import { Color } from 'src/styles/types'
import { pickColorInGradient } from 'src/utils/color'
import styled, { css } from 'styled-components'

export type BarometerProps = {
  label: string
  value: ReactNode
  ratio: number
  colors: Color[]
}
export const Barometer = asStyled<BarometerProps>(
  ({ label, value, ratio, colors, className }) => {
    const currentColor = pickColorInGradient(ratio, ...colors)
    return (
      <BarometerFigure
        className={className}
        colors={colors}
        currentColor={currentColor}
        ratio={Math.max(Math.min(ratio, 1), 0)}
      >
        <figcaption>{label}</figcaption>
        <div />
        <figcaption>{value}</figcaption>
      </BarometerFigure>
    )
  },
)``

type BarometerFigureProps = {
  ratio: number
  colors: Color[]
  currentColor: string
}
const BarometerFigure = styled.figure<BarometerFigureProps>`
  ${flexCenter};
  position: relative;
  width: 100%;
  column-gap: 16px;
  backdrop-filter: blur(8px) brightness(0.8);
  figcaption {
    width: 128px;
  }
  > div {
    position: relative;
    flex: 1;
    height: 3px;
    border-radius: 4px;
    ::after {
      content: '';
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 16px;
      height: 16px;
      border: 4px solid ${trueBlack};
      border-radius: 50%;
    }
  }
  ${({ colors, currentColor, ratio }) => css`
    figcaption {
      color: ${currentColor};
    }
    > div {
      background: linear-gradient(to right, ${colors.join(',')});
      ::after {
        left: ${ratio * 100}%;
        background-color: ${currentColor};
        transition: all 1s ease-in;
      }
    }
  `}
`
