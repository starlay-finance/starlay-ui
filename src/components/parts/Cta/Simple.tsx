import { ButtonHTMLAttributes, FC } from 'react'
import { Link, LinkFC } from 'src/components/elements/Link'
import { darkPurple, purple, trueWhite } from 'src/styles/colors'
import { fontWeightHeavy } from 'src/styles/font'
import { breakpoint } from 'src/styles/mixins'
import styled, { css } from 'styled-components'

export const SimpleCtaLink = styled<LinkFC>(({ children, ...props }) => (
  // @ts-ignore
  <CtaLink {...props}>{children}</CtaLink>
))``

export const SimpleCtaButton = styled<
  FC<ButtonHTMLAttributes<HTMLButtonElement>>
>(({ children, ...props }) => <CtaButton {...props}>{children}</CtaButton>)``

const ctaStyle = css`
  width: 100%;
  height: 40px;
  border-radius: 8px;

  background: ${purple};
  color: ${trueWhite};

  font-size: 12px;
  font-weight: ${fontWeightHeavy};
  text-align: center;
  :disabled {
    background: ${darkPurple}8f;
  }
  @media ${breakpoint.xl} {
    height: 64px;
    font-size: 18px;
  }
`

const CtaLink = styled(Link)`
  ${ctaStyle};
`

const CtaButton = styled.button`
  ${ctaStyle};
`
