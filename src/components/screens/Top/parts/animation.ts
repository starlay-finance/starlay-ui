import { TOP_ASSETS, TOP_BACKERS } from 'src/constants/top'
import { sequentialFadeIn } from 'src/styles/animation'
import { css, keyframes } from 'styled-components'

const rising = keyframes`
  80% {
    opacity: 0;
  }
  90% {
    transform: translateY(0%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`

const fadeIn = keyframes`
  50% {
    filter: blur(0px);
  }
  100% {
    filter: blur(0px);
    opacity: 1;
  }
`

const FIRST_DURATION = 1
const FIRST_DELAY = 0.25
const SECOND_DELAY = FIRST_DURATION + FIRST_DELAY

export const headingAnimation = css`
  animation: ${rising} ${FIRST_DURATION}s ${FIRST_DELAY}s ease-out forwards;
  opacity: 0;
  transform: translateY(1000%);
`

export const contentAnimation = css`
  animation: ${fadeIn} 0.25s ${SECOND_DELAY}s ease-out forwards;
  opacity: 0;
  filter: blur(32px);
`

export const assetsAnimation = sequentialFadeIn({
  numOfItems: TOP_ASSETS.length,
  duration: 0.2,
  sequenceDelay: 0.1,
  initialDelay: SECOND_DELAY,
})

export const backersAnimation = sequentialFadeIn({
  numOfItems: TOP_BACKERS.length,
  duration: 0.2,
  sequenceDelay: 0.1,
})
