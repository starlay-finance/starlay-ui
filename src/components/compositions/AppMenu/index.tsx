import { t } from '@lingui/macro'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { Link } from 'src/components/elements/Link'
import { MenuProps, MobileMenu } from 'src/components/parts/MobileMenu'
import { useNetworkType } from 'src/hooks/useNetwork'
import { useWallet } from 'src/hooks/useWallet'
import { APP, MAKAI, MARKETS, POLKADOT_APP } from 'src/utils/routes'

export const AppMenu: FC<MenuProps> = (props) => {
  const { pathname } = useRouter()
  const { data: network } = useNetworkType()
  const { account, chainId } = useWallet(network)
  console.log(
    pathname,
    pathname === APP || pathname === POLKADOT_APP ? '' : APP,
  )
  return (
    <MobileMenu {...props}>
      <Link href="">{t`Dashboard`}</Link>
      <Link href={MARKETS}>{t`Markets`}</Link>
      <Link href={MAKAI}>{t`Makai`}</Link>
      {/* TODO Claim LAY */}
    </MobileMenu>
  )
}
