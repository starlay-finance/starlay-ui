import { AnchorHTMLAttributes } from 'react'
import { Link } from 'src/components/elements/Link'
import { asStyled } from 'src/components/hoc/asStyled'

type IconLinkProps = {
  Icon: SvgrComponent
  'aria-label': string
} & AnchorHTMLAttributes<HTMLAnchorElement>
export const IconLink = asStyled<IconLinkProps>(({ Icon, ...props }) => (
  <Link {...props}>
    <Icon />
  </Link>
))``
