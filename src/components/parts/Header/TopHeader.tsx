import { t } from '@lingui/macro'
import { VFC } from 'react'
import { IconMenu, LogoProtocol } from 'src/assets/svgs'
import { Link } from 'src/components/elements/Link'
import { purple } from 'src/styles/colors'
import { breakpoint } from 'src/styles/mixins'
import { APP, BUG_BOUNTY, DISCORD, DOCS, GOVERNANCE } from 'src/utils/routes'
import styled from 'styled-components'
import { HeaderWrapper } from './common'

export const TopHeader: VFC<{ openMenu: VoidFunction }> = ({ openMenu }) => (
  <StyledHeaderWrapper>
    <LogoDiv>
      <LogoProtocol />
    </LogoDiv>
    <button onClick={openMenu}>
      <IconMenu />
    </button>
    <Nav>
      <Link href={APP}>{t`Launch App`}</Link>
      <Link href={DISCORD}>{t`Discord`}</Link>
      <Link href={DOCS}>{t`Docs`}</Link>
      <Link href={GOVERNANCE}>{t`Governance`}</Link>
      <Link href={BUG_BOUNTY}>{t`Bug Bounty`}</Link>
    </Nav>
  </StyledHeaderWrapper>
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

const StyledHeaderWrapper = styled(HeaderWrapper)`
  padding: 0 24px;
  ${Nav} {
    display: none;
  }
  button:hover {
    color: ${purple};
  }
  @media ${breakpoint.xl} {
    padding: unset;
    > button {
      display: none;
    }
    ${Nav} {
      display: unset;
    }
  }
`
