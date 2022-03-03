import { t } from '@lingui/macro'
import {
  IconDiscord,
  IconGithub,
  IconMedium,
  IconTelegram,
  IconTwitter,
  LogoProtocol,
} from 'src/assets/svgs'
import { Link } from 'src/components/elements/Link'
import { asStyled } from 'src/components/hoc/asStyled'
import { IconLink } from 'src/components/parts/Link'
import { primary, purple, trueWhite } from 'src/styles/colors'
import { fontWeightMedium, fontWeightSemiBold } from 'src/styles/font'
import { contentMaxWidthCssVar } from 'src/styles/mixins'
import {
  DEVELOPERS,
  DISCORD,
  DOCS,
  GITHUB,
  GOVERNANCE_OVERVIEW,
  MEDIA_KIT,
  MEDIUM,
  TELEGRAM,
  TWITTER,
} from 'src/utils/routes'
import styled from 'styled-components'
import { FOOTER_HEIGHT } from './common'

export const TopFooter = asStyled(({ className }) => (
  <StyledFooter className={className}>
    <Nav>
      <NavItem>
        <LogoDiv>
          <LogoProtocol />
        </LogoDiv>
        <Note>{t`Starlay Finance is the first lending protocol backed by Astar Network.`}</Note>
        <IconLinks>
          <IconLink Icon={IconTwitter} href={TWITTER} aria-label={t`Twitter`} />
          <IconLink Icon={IconDiscord} href={DISCORD} aria-label={t`Discord`} />
          <IconLink
            Icon={IconTelegram}
            href={TELEGRAM}
            aria-label={t`Telegram`}
          />
          <IconLink Icon={IconMedium} href={MEDIUM} aria-label={t`Medium`} />
          <IconLink Icon={IconGithub} href={GITHUB} aria-label={t`Github`} />
        </IconLinks>
      </NavItem>
      <NavItem>
        <LinksHeading>{t`Protocol`}</LinksHeading>
        <TextLinks>
          <Link href={DEVELOPERS}>{t`Developers`}</Link>
          <Link href={DOCS}>{t`Docs`}</Link>
        </TextLinks>
      </NavItem>
      <NavItem>
        <LinksHeading>{t`Governance`}</LinksHeading>
        <TextLinks>
          <Link href={GOVERNANCE_OVERVIEW}>{t`Overview`}</Link>
        </TextLinks>
      </NavItem>
      <NavItem>
        <LinksHeading>{t`Community`}</LinksHeading>
        <TextLinks>
          <Link href={DISCORD}>{t`Discord`}</Link>
          <Link href={TELEGRAM}>{t`Telegram`}</Link>
        </TextLinks>
      </NavItem>
      <NavItem>
        <LinksHeading>{t`Brand`}</LinksHeading>
        <TextLinks>
          <Link href={MEDIA_KIT}>{t`Media Kit`}</Link>
        </TextLinks>
      </NavItem>
    </Nav>
  </StyledFooter>
))``
const LogoDiv = styled.div`
  color: ${trueWhite};
  > svg {
    > path {
      fill: ${trueWhite};
    }
    height: 32px;
    width: 100px;
  }
`
const IconLinks = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;

  a {
    color: ${trueWhite};
    :hover {
      color: ${purple};
    }
  }
`

const TextLinks = styled.div`
  a {
    display: block;
    width: fit-content;
    margin-top: 16px;
  }
`

const Note = styled.p`
  line-height: 1.33;
`

const LinksHeading = styled.p`
  && {
    color: ${trueWhite};
    font-size: 20px;
    font-weight: ${fontWeightSemiBold};
  }
`
const NavItem = styled.div`
  color: ${primary}cc;
  a,
  ${Note} {
    font-size: 14px;
    font-weight: ${fontWeightMedium};
  }
  > svg > path {
    fill: ${trueWhite};
  }
  ${Note} {
    margin-top: 12px;
  }
  ${TextLinks} ,${IconLinks} {
    margin-top: 24px;
  }
`
const Nav = styled.nav`
  display: flex;
  column-gap: 80px;
  > * {
    flex: 1;
  }
`

const StyledFooter = styled.footer`
  padding: 64px 0 80px;
  min-height: ${FOOTER_HEIGHT};
  backdrop-filter: blur(48px) brightness(1.08);
  background-color: rgba(0, 0, 0, 0.08);
  ${Nav} {
    max-width: var(${contentMaxWidthCssVar});
    margin: 0 auto;
  }
`
