import { FC, ReactNode } from 'react'
import { flexCenter } from 'src/styles/mixins'
import { Color } from 'src/styles/types'
import styled from 'styled-components'

const CIRCUMFERENCE = 604

type DonutChartElement = {
  ratio: number
  color: Color
}
type DonutChartProps = {
  elements: DonutChartElement[]
  children: ReactNode
}
export const DonutChart = styled<FC<DonutChartProps & { className?: string }>>(
  ({ elements, children, className }) => (
    <DonutChartDiv className={className}>
      <ElementsDiv>
        {elements.map(({ color, ratio }, idx, arr) => (
          <ElementDiv
            key={idx}
            style={{
              transform: `rotate(-${
                arr.slice(0, idx).reduce((prev, { ratio }) => prev + ratio, 0) *
                360
              }deg)`,
            }}
          >
            <svg viewBox="0 0 200 200">
              <circle
                strokeLinecap="round"
                cx="100"
                cy="100"
                r="96"
                stroke={color}
                strokeWidth="4"
                fill="none"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={-CIRCUMFERENCE * (1 - ratio)}
                stroke-mitterlimit="0"
              />
            </svg>
          </ElementDiv>
        ))}
      </ElementsDiv>
      {children}
    </DonutChartDiv>
  ),
)``

type DonutChart2Props = {
  elements: [DonutChartElement, DonutChartElement]
  children: ReactNode
}
export const DonutChart2 = styled<
  FC<DonutChart2Props & { className?: string }>
>(({ elements, children, className }) => {
  return (
    <DonutChartDiv className={className}>
      <ElementsDiv>
        {elements.map(({ color, ratio }, idx) => (
          <ElementDiv key={idx}>
            <svg viewBox="0 0 200 200">
              <circle
                strokeLinecap="round"
                cx="100"
                cy="100"
                r="96"
                stroke={color}
                strokeWidth="4"
                fill="none"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={
                  -CIRCUMFERENCE * (1 - ratio) * (idx === 0 ? 1 : -1)
                }
                stroke-mitterlimit="0"
              />
            </svg>
          </ElementDiv>
        ))}
      </ElementsDiv>
      {children}
    </DonutChartDiv>
  )
})``

const ElementDiv = styled.div`
  position: absolute;
  inset: 0;
  &,
  svg > circle {
    transition: all 1s ease-in;
  }
`

const ElementsDiv = styled.div`
  position: absolute;
  inset: 0;
  transform: rotate(-90deg);
`

const DonutChartDiv = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  ${flexCenter};
`
