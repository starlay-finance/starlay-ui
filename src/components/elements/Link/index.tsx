import NextLink from 'next/link'
import { AnchorHTMLAttributes } from 'react'
import styled from 'styled-components'

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

type InternalLinkProps = { href: '/' | `/${string}` } & ExternalLinkProps

type LinkFC = {
  (props: InternalLinkProps): JSX.Element
  (props: ExternalLinkProps): JSX.Element
}
export const Link: LinkFC = styled(({ children, ...props }) => {
  if (!props.href?.startsWith('/'))
    return (
      <a {...props} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  return (
    <NextLink href={props.href}>
      <a {...props}>{children}</a>
    </NextLink>
  )
})``
