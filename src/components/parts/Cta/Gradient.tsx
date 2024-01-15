import { ButtonHTMLAttributes, FC } from 'react'
import { Link, LinkFC } from 'src/components/elements/Link'
import { darkRed, skyBlue, trueWhite } from 'src/styles/colors'
import { fontWeightBlack } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import styled, { css, keyframes } from 'styled-components'

export const GradientCtaLink = styled<LinkFC>(({ children, ...props }) => (
  // @ts-ignore
  <CtaLink {...props}>
    <Content>{children}</Content>
  </CtaLink>
))``

export const GradientCtaButton = styled<
  FC<ButtonHTMLAttributes<HTMLButtonElement>>
>(({ children, ...props }) => (
  <CtaButton {...props}>
    <Content>{children}</Content>
  </CtaButton>
))``

const Content = styled.div`
  height: 100%;
  width: 100%;
  ${flexCenter};

  backdrop-filter: blur(24px) brightness(0.68);
  background: rgba(0, 0, 0, 0.68);
`

const hoverBackgroundKeyframes = keyframes`
  0% {
    background-position: 0%;
  }
  100% {
    background-position: -300%;
  }
`

const ctaStyle = css`
  display: block;
  position: relative;
  width: 180px;
  height: 48px;
  padding: 3px;
  border-radius: 24px;
  overflow: hidden;
  background: linear-gradient(90deg, ${skyBlue}cc, ${darkRed}cc, ${skyBlue}cc);
  background-size: 300%;
  backdrop-filter: blur(50px);

  font-size: 20px;
  font-weight: ${fontWeightBlack};
  font-style: italic;
  ${Content} {
    position: relative;
    border-radius: 24px;
  }
  animation: ${hoverBackgroundKeyframes} 5s infinite linear;
  animation-play-state: paused;
  :hover {
    animation-play-state: running;
    color: ${trueWhite};
  }
`

const CtaLink = styled(Link)`
  ${ctaStyle};
`

const CtaButton = styled.button`
  ${ctaStyle};
`
