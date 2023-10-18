import { useState } from 'react'
import { AppMenu } from 'src/components/compositions/AppMenu'
import { AppBackground } from 'src/components/parts/Background'
import { AppFooter } from 'src/components/parts/Footer'
import { AppHeader } from 'src/components/parts/Header/AppHeader'
import { fontWeightHeavy } from 'src/styles/font'
import { breakpoint, contentMaxWidthCssVar } from 'src/styles/mixins'
import styled from 'styled-components'
import { Assets } from './Assets'
import { Overview } from './Overview'

export const Markets = () => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  return (
    <>
      <AppHeader openMenu={() => setMenuOpen(true)} />
      <Main>
        <AppBackground />
        <Overview />
        <Assets />
        <AppMenu isOpen={isMenuOpen} close={() => setMenuOpen(false)} />
      </Main>
      <AppFooter />
    </>
  )
}

const Main = styled.main`
  width: 100%;
  max-width: var(${contentMaxWidthCssVar});
  margin: 0 auto;
  padding: 0 24px 64px;
  h2 {
    font-size: 20px;
    font-weight: ${fontWeightHeavy};
  }
  ${Overview} {
    margin-top: 40px;
  }
  ${Assets} {
    margin-top: 24px;
  }
  @media ${breakpoint.xl} {
    ${Overview} {
      margin-top: 80px;
    }
    ${Assets} {
      margin-top: 24px;
    }
  }
`
