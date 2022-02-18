import { AnchorHTMLAttributes, ButtonHTMLAttributes, VFC } from 'react'
import { Link } from 'src/components/elements/Link'
import { blue, darkPurple, trueWhite } from 'src/styles/colors'
import { fontWeightHeavy } from 'src/styles/font'
import styled, { css } from 'styled-components'

export const SimpleCtaLink = styled<
  VFC<AnchorHTMLAttributes<HTMLAnchorElement>>
>(({ children, ...props }) => <CtaLink {...props}>{children}</CtaLink>)``

export const SimpleCtaButton = styled<
  VFC<ButtonHTMLAttributes<HTMLButtonElement>>
>(({ children, ...props }) => <CtaButton {...props}>{children}</CtaButton>)``

const ctaStyle = css`
  width: 100%;
  height: 64px;
  border-radius: 8px;

  background: ${blue};
  color: ${trueWhite};

  font-size: 18px;
  font-weight: ${fontWeightHeavy};
  text-align: center;
  :disabled {
    background: ${darkPurple}8f;
  }
`

const CtaLink = styled(Link)`
  ${ctaStyle};
`

const CtaButton = styled.button`
  ${ctaStyle};
`
