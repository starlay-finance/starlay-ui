import { t } from '@lingui/macro'
import { Link } from 'src/components/elements/Link'
import { asStyled } from 'src/components/hoc/asStyled'
import { useBlockNumber } from 'src/hooks/useBlockNumber'
import { blue } from 'src/styles/colors'
import { fontWeightSemiBold } from 'src/styles/font'
import { contentMaxWidthCssVar } from 'src/styles/mixins'
import {
  GOVERNANCE,
  GOVERNANCE_STARLAY,
  SUPPORT,
  TERMS,
} from 'src/utils/routes'
import styled from 'styled-components'

export const AppFooter = asStyled(({ className }) => {
  const blockNumber = useBlockNumber()
  return (
    <StyledFooter className={className}>
      <Content>
        <Nav>
          <LatestBlock>{t`Latest Block: ${blockNumber}`}</LatestBlock>
          <Link href={GOVERNANCE}>{t`Governance`}</Link>
          <Link href={GOVERNANCE_STARLAY}>{t`Starlay`}</Link>
          <Link href={SUPPORT}>{t`Support`}</Link>
          <Link href={TERMS}>{t`Terms`}</Link>
        </Nav>
        <Control>
          {/* TODO show these buttons if supported */}
          {/* <DropdownButton>{t`$USD`}</DropdownButton> */}
          {/* <DropdownButton>{t`English`}</DropdownButton> */}
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
    background: ${blue};
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
`
