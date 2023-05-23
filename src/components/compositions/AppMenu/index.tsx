import { t } from '@lingui/macro'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { Link } from 'src/components/elements/Link'
import { MenuProps, MobileMenu } from 'src/components/parts/MobileMenu'
import { useNetworkType } from 'src/hooks/useNetwork'
import {
  APP_ROOT,
  MAKAI,
  MARKETS,
  byNetwork,
  evmOnly,
  matchPath,
} from 'src/utils/routes'

export const AppMenu: FC<MenuProps> = (props) => {
  const { pathname } = useRouter()
  const { data: network } = useNetworkType()
  return (
    <MobileMenu {...props}>
      <Link
        href={matchPath(pathname, APP_ROOT) ? '' : byNetwork(APP_ROOT, network)}
      >{t`Dashboard`}</Link>
      <Link
        href={matchPath(pathname, MARKETS) ? '' : byNetwork(MARKETS, network)}
      >{t`Markets`}</Link>
      <Link
        href={matchPath(pathname, MAKAI) ? '' : evmOnly(MAKAI, network)}
      >{t`Makai`}</Link>
      {/* TODO Claim LAY */}
    </MobileMenu>
  )
}
