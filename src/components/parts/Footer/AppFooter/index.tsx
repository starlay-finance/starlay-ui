import { asStyled } from 'src/components/hoc/asStyled'
import { breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'
import { AppFooterMobile } from './AppFooterMobile'
import { AppFooterWide } from './AppFooterWide'

export const AppFooter = asStyled(({ className }) => {
  return (
    <StyledFooter className={className}>
      <AppFooterMobile />
      <AppFooterWide />
    </StyledFooter>
  )
})``

const StyledFooter = styled.footer`
  position: relative;
  width: 100%;
  padding: 32px 44px;
  backdrop-filter: blur(8px) brightness(1.08);
  background: rgba(255, 255, 255, 0.08);
  z-index: 1;
  ${AppFooterWide} {
    display: none;
  }
  @media ${breakpoint.xl} {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    backdrop-filter: blur(48px) brightness(0.52);
    background: rgba(0, 0, 0, 0.52);
    ${AppFooterWide} {
      display: flex;
    }
    ${AppFooterMobile} {
      display: none;
    }
  }
`
