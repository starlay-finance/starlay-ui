import { t } from '@lingui/macro'
import {
  IconDiscord,
  IconGithub,
  IconMedium,
  IconTwitter,
  LogoProtocol,
} from 'src/assets/svgs'
import { Link } from 'src/components/elements/Link'
import { asStyled } from 'src/components/hoc/asStyled'
import { IconLink } from 'src/components/parts/Link'
import { primary, purple, trueWhite } from 'src/styles/colors'
import { fontWeightMedium, fontWeightSemiBold } from 'src/styles/font'
import { breakpoint, contentMaxWidthCssVar } from 'src/styles/mixins'
import {
  DEVELOPERS,
  DISCORD,
  DOCS,
  GITHUB,
  GOVERNANCE,
  MEDIA_KIT,
  MEDIUM,
  SNAPSHOT,
  TWITTER,
} from 'src/utils/routes'
import styled from 'styled-components'

export const TopFooter = asStyled(({ className }) => (
  <StyledFooter className={className}>
    <Content>
      <NavItem>
        <LogoDiv>
          <LogoProtocol />
        </LogoDiv>
        <Note>{t`Starlay Finance is a leading Polkadot Ecosystem protocol for secure and innovative lending.`}</Note>
        <IconLinks>
          <IconLink Icon={IconTwitter} href={TWITTER} aria-label={t`Twitter`} />
          <IconLink Icon={IconDiscord} href={DISCORD} aria-label={t`Discord`} />
          <IconLink Icon={IconMedium} href={MEDIUM} aria-label={t`Medium`} />
          <IconLink Icon={IconGithub} href={GITHUB} aria-label={t`Github`} />
        </IconLinks>
      </NavItem>
      <Nav>
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
            <Link href={GOVERNANCE}>{t`Forum`}</Link>
            <Link href={SNAPSHOT}>{t`Vote`}</Link>
          </TextLinks>
        </NavItem>
        <NavItem>
          <LinksHeading>{t`Community`}</LinksHeading>
          <TextLinks>
            <Link href={DISCORD}>{t`Discord`}</Link>
          </TextLinks>
        </NavItem>
        <NavItem>
          <LinksHeading>{t`Brand`}</LinksHeading>
          <TextLinks>
            <Link href={MEDIA_KIT}>{t`Media Kit`}</Link>
          </TextLinks>
        </NavItem>
      </Nav>
    </Content>
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
  line-height: 1.75;
  @media ${breakpoint.xl} {
    line-height: 1.33;
  }
`

const LinksHeading = styled.p`
  && {
    color: ${trueWhite};
    font-size: 16;
    font-weight: ${fontWeightSemiBold};
  }
  @media ${breakpoint.xl} {
    font-size: 20px;
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
  ${IconLinks} {
    margin-top: 24px;
  }
  ${TextLinks} {
    margin-top: 16px;
  }
  @media ${breakpoint.xl} {
    ${TextLinks} {
      margin-top: 24px;
    }
  }
`
const Nav = styled.nav`
  display: flex;
  row-gap: 32px;
`
const Content = styled.div``

const StyledFooter = styled.footer`
  padding: 40px 24px;
  backdrop-filter: blur(48px) brightness(1.08);
  ${Content} {
    max-width: var(${contentMaxWidthCssVar});
    margin: 0 auto;
    padding: 0 24px;
  }
  ${Nav} {
    margin-top: 40px;
    flex-wrap: wrap;
    ${NavItem} {
      min-width: 160px;
    }
  }
  @media ${breakpoint.xl} {
    backdrop-filter: blur(48px) brightness(1.08);
    background-color: rgba(0, 0, 0, 0.08);
    padding: 64px 0 80px;
    ${Content} {
      display: flex;
      column-gap: 80px;
      > ${NavItem} {
        max-width: 240px;
      }
    }
    ${Nav} {
      margin-top: 0;
      flex-wrap: nowrap;
      column-gap: 80px;
      > * {
        flex: 1;
      }
    }
  }
`
