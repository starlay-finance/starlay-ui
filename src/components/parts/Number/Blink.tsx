import { FC, ReactNode, useState } from 'react'
import { trueWhite } from 'src/styles/colors'
import styled, { css, keyframes } from 'styled-components'

type BlinkWrapperProps = {
  value: string | number
  children: ReactNode
}
export const BlinkWrapper: FC<BlinkWrapperProps> = ({ value, children }) => {
  const [prev, setPrev] = useState(value)
  return (
    <BlinkSpan animate={value !== prev} onAnimationEnd={() => setPrev(value)}>
      {children}
    </BlinkSpan>
  )
}

const blinkKeyframes = keyframes`
  0%, 50% {
    filter: drop-shadow(0px 0px 0.25em ${trueWhite}40);
  }
   100% {
    filter: drop-shadow(0px 0px 0px ${trueWhite}40);
  }
`
const blinkAnimation = css`
  animation: ${blinkKeyframes} 0.5s 0.25s ease-out;
`
const BlinkSpan = styled.span<{ animate: boolean }>`
  ${({ animate }) => animate && blinkAnimation};
`
