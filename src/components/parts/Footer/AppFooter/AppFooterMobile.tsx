import { t } from '@lingui/macro'
import {
  IconDiscord,
  IconGithub,
  IconTwitter,
  LogoProtocol,
} from 'src/assets/svgs'
import { asStyled } from 'src/components/hoc/asStyled'
import { IconLink } from 'src/components/parts/Link'
import { primary, purple, trueWhite } from 'src/styles/colors'
import { fontWeightMedium } from 'src/styles/font'
import { DISCORD, GITHUB, TWITTER } from 'src/utils/routes'
import styled from 'styled-components'

export const AppFooterMobile = asStyled(({ className }) => (
  <Content className={className}>
    <NavItem>
      <LogoDiv>
        <LogoProtocol />
      </LogoDiv>
      <Note>{t`Starlay Finance is a leading Polkadot Ecosystem protocol for secure and innovative lending.`}</Note>
      <IconLinks>
        <IconLink Icon={IconGithub} href={GITHUB} aria-label={t`Github`} />
        <IconLink Icon={IconDiscord} href={DISCORD} aria-label={t`Discord`} />
        <IconLink Icon={IconTwitter} href={TWITTER} aria-label={t`Twitter`} />
      </IconLinks>
    </NavItem>
  </Content>
))``

const LogoDiv = styled.div`
  > svg {
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

const Note = styled.p`
  line-height: 1.75;
  opacity: 0.5;
`

const NavItem = styled.div`
  color: ${primary}cc;
  a,
  ${Note} {
    font-size: 14px;
    font-weight: ${fontWeightMedium};
  }
  ${Note} {
    margin-top: 12px;
  }
  ${IconLinks} {
    margin-top: 24px;
  }
`

const Content = styled.div``
