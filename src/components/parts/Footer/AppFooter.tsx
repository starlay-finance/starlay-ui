import { t } from '@lingui/macro'
import { useRouter } from 'next/router'
import { useReducer } from 'react'
import { InternalLink, Link } from 'src/components/elements/Link'
import { asStyled } from 'src/components/hoc/asStyled'
import { useBlockNumber } from 'src/hooks/useBlockNumber'
import { DEFAULT_LOCALE, Locale, LOCALES_DICT } from 'src/locales'
import { purple } from 'src/styles/colors'
import { fontWeightSemiBold } from 'src/styles/font'
import { contentMaxWidthCssVar } from 'src/styles/mixins'
import { DOCS, GOVERNANCE, SUPPORT } from 'src/utils/routes'
import styled from 'styled-components'
import { DropdownButton } from '../Button'
import { LocaleSelect } from './LocaleSelect'

export const AppFooter = asStyled(({ className }) => {
  const { locale = DEFAULT_LOCALE, asPath } = useRouter()
  const [isLocaleMenuOpen, toggleLocaleMenuOpen] = useReducer(
    (state: boolean) => !state,
    false,
  )
  const blockNumber = useBlockNumber()
  return (
    <StyledFooter className={className}>
      <Content>
        <Nav>
          <LatestBlock>{t`Latest Block: ${blockNumber}`}</LatestBlock>
          <Link href={DOCS}>{t`Docs`}</Link>
          <Link href={GOVERNANCE}>{t`Governance`}</Link>
          <Link href={SUPPORT}>{t`Support`}</Link>
        </Nav>
        <Control>
          <DropdownButton onClick={toggleLocaleMenuOpen}>
            {LOCALES_DICT[locale as Locale]}
          </DropdownButton>
          <LocaleSelect
            visible={isLocaleMenuOpen}
            toggle={toggleLocaleMenuOpen}
            path={asPath as InternalLink}
          />
        </Control>
      </Content>
    </StyledFooter>
  )
})``

const LatestBlock = styled.p`
  position: relative;
  padding-left: 32px;
  ::before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-40%);
    left: 14px;
    margin: auto;
    padding: 4px;
    border-radius: 50%;
    background: ${purple};
  }
`

const Nav = styled.div`
  display: flex;
  align-items: center;
  column-gap: 40px;
`

const Control = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  margin: 0 auto;
  max-width: var(${contentMaxWidthCssVar});

  font-size: 16px;
  font-weight: ${fontWeightSemiBold};
  > div {
    height: 32px;
  }
`

const StyledFooter = styled.footer`
  position: relative;
  backdrop-filter: blur(48px) brightness(0.52);
  background: rgba(0, 0, 0, 0.52);
  z-index: 1;
`
