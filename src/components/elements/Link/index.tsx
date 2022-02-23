import NextLink from 'next/link'
import { AnchorHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

type InternalLinkProps = { href: '/' | `/${string}` } & ExternalLinkProps

type LinkFC = {
  (props: InternalLinkProps): JSX.Element
  (props: ExternalLinkProps): JSX.Element
}
export const Link: LinkFC = styled(({ children, ...props }) => {
  if (!props.href?.startsWith('/'))
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
    <NextLink href={props.href} passHref>
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
