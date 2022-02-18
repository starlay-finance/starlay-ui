import { t } from '@lingui/macro'
import { LogoProtocol } from 'src/assets/svgs'
import { Link } from 'src/components/elements/Link'
import { APP, BUG_BOUNTY, DISCORD, DOCS, GOVERNANCE } from 'src/utils/routes'
import styled from 'styled-components'
import { HeaderWrapper } from './common'

export const TopHeader = () => (
  <HeaderWrapper>
    <LogoDiv>
      <LogoProtocol />
    </LogoDiv>
    <Nav>
      <Link href={APP}>{t`Launch App`}</Link>
      <Link href={DISCORD}>{t`Discord`}</Link>
      <Link href={DOCS}>{t`Docs`}</Link>
      <Link href={GOVERNANCE}>{t`Governance`}</Link>
      <Link href={BUG_BOUNTY}>{t`Bug Bounty`}</Link>
    </Nav>
  </HeaderWrapper>
)

const LogoDiv = styled.div`
  height: 32px;
  svg {
    height: 32px;
    width: 100px;
  }
`

const Nav = styled.nav`
  a {
    margin-left: 32px;
  }
`
