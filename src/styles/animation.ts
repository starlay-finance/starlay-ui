import { css, keyframes } from 'styled-components'

export const fadeIn = keyframes`
0% {
   opacity: 0;
}  
100% {
   opacity: 1;
}
`
export const sequentialFadeIn = (opt: {
  numOfItems: number
  duration: number
  sequenceDelay: number
  initialDelay?: number
}) => css`
  ${Array.from(new Array(opt.numOfItems)).map((_, idx) => {
    return css`
      :nth-child(${idx + 1}) {
        animation: ${fadeIn} ${opt.duration}s
          ${idx * opt.sequenceDelay + (opt.initialDelay || 0)}s ease-in forwards;
      }
    `
  })}
`

export const drawStroke = keyframes`
  100% {
    stroke-dashoffset: 0px;
  }
`
export const showInsetClipped = keyframes`
  100% {
    clip-path: inset(0);
  }
`
