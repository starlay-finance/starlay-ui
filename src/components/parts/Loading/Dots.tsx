import { FC } from 'react'
import { IconLoading } from 'src/assets/svgs'
import { purple } from 'src/styles/colors'
import { flexCenter } from 'src/styles/mixins'
import styled, { keyframes } from 'styled-components'

export const LoadingDots: FC = () => (
  <IconDiv>
    <IconLoading />
  </IconDiv>
)

const rotate = keyframes`
  0%, 80% {
    transform:  rotate(0deg);
  }
  30%,50% {
    transform:  rotate(360deg);
  }
`
const scale = keyframes`
  0%, 30%, 100% {
    transform:  scale(1) translateX(0px);
  }
  50%, 80% {
    transform:  scale(10) translateX(4.5px);
  }
`
const scale2 = keyframes`
  0%, 30%, 100% {
    transform:  scale(1) translateX(0px);
  }
  50%, 80% {
    transform:  scale(10) translateX(-4.5px);
  }
`
const breathe = keyframes`
  15%, 65% {
    transform:  scale(1) ;
  }
  40%, 90% {
    transform:  scale(1.1) ;
  }
`

const IconDiv = styled.div`
  width: 160px;
  height: 160px;
  margin: 32px;
  border-radius: 50%;
  ${flexCenter};
  animation: ${breathe} 3s infinite;
  svg {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: visible;
    animation: ${rotate} 3s infinite;
    > circle {
      transform-box: fill-box;
      transform-origin: 50% 50%;
      fill: ${purple};
      :nth-child(1) {
        animation: ${scale} 3s infinite;
      }
      :nth-child(2) {
        animation: ${scale2} 3s infinite -1.5s;
      }
    }
  }
`
