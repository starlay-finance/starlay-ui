import NextLink, { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

export type InternalLink = '/' | `/${string}`

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

type InternalLinkProps = { href: InternalLink } & LinkProps &
  ExternalLinkProps & {
    newTab?: boolean
  }

export type LinkFC = {
  (props: ExternalLinkProps): JSX.Element
  (props: InternalLinkProps): JSX.Element
}
export const Link: LinkFC = styled(({ children, ...props }) => {
  if (props.newTab || !props.href?.startsWith('/'))
    return (
      <StyledAnchor
        {...props}
        $disabled={!props.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </StyledAnchor>
    )
  return (
    <NextLink href={props.href} locale={props.locale} passHref>
      <StyledAnchor {...props} $disabled={!props.href}>
        {children}
      </StyledAnchor>
    </NextLink>
  )
})``

const StyledAnchor = styled.a<{ $disabled: boolean }>`
  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    `}
`
