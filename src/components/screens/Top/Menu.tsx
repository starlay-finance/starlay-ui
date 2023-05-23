import { t } from '@lingui/macro'
import { FC } from 'react'
import { Link } from 'src/components/elements/Link'
import { MenuProps, MobileMenu } from 'src/components/parts/MobileMenu'
import { APP, BUG_BOUNTY, DISCORD, DOCS, GOVERNANCE } from 'src/utils/routes'

export const Menu: FC<MenuProps> = (props) => {
  return (
    <MobileMenu
      {...props}
      items={[
        {
          content: (
            <>
              <Link href={APP} newTab>{t`Launch App`}</Link>
              <Link href={DISCORD}>{t`Discord`}</Link>
              <Link href={DOCS}>{t`Docs`}</Link>
              <Link href={GOVERNANCE}>{t`Governance`}</Link>
              <Link href={BUG_BOUNTY}>{t`Bug Bounty`}</Link>
            </>
          ),
        },
      ]}
    ></MobileMenu>
  )
}
