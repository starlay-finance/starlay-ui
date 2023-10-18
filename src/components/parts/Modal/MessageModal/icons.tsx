import { IconAlert, IconSuccess } from 'src/assets/svgs'
import { asStyled } from 'src/components/hoc/asStyled'
import { showInsetClipped } from 'src/styles/animation'
import { attention } from 'src/styles/colors'
import { keyframes } from 'styled-components'

const drawStrokeCircle = keyframes`
  100% {
      stroke-dashoffset: 804px;
  }
`

export const AnimatedSuccess = asStyled(({ className }) => (
  <div className={className}>
    <IconSuccess />
  </div>
))`
  svg {
    circle {
      stroke-dasharray: 402px;
      stroke-dashoffset: 402px;
      animation: ${drawStrokeCircle} 0.75s forwards;
    }
    path {
      clip-path: inset(0 100% 0 0);
      animation: ${showInsetClipped} 0.25s 0.75s ease-in forwards;
    }
  }
`

const scalingDonutKeyframes = keyframes`
  80% {
    border-width: 0px;
    margin: 3px;
  }
  100% {
    border-width: 14px;
    margin: -13px;
  }
`
export const AnimatedAlert = asStyled(({ className }) => (
  <div className={className}>
    <div />
    <IconAlert />
  </div>
))`
  position: relative;
  width: 104px;
  height: 104px;
 > div {
    position: absolute;
    inset: 0;
    border: 999px solid ${attention};
    border-radius: 50%;
    margin: -998px;
    animation: ${scalingDonutKeyframes} 0.5s ease-out forwards;
  }
  svg {
    width: 104px;
    height: 104px;
  }
  margin-bottom: 14px;
`
