import { AppBackground } from 'src/components/parts/Background'
import { AppFooter } from 'src/components/parts/Footer'
import { AppHeader } from 'src/components/parts/Header/AppHeader'
import { breakpoint, contentMaxWidthCssVar } from 'src/styles/mixins'
import styled from 'styled-components'
import { Market } from './parts/Market'
import { Summary } from './parts/Summary'

export const Dashboard = () => (
  <>
    <AppHeader />
    <Main>
      <AppBackground />
      <Summary />
      <Market />
    </Main>
    <AppFooter />
  </>
)

const Main = styled.main`
  width: 100%;
  max-width: var(${contentMaxWidthCssVar});
  padding: 0 24px;
  margin: 0 auto;
  padding-bottom: 160px;
  ${Summary}, ${Market} {
    position: relative;
    margin-top: 40px;
  }
  @media ${breakpoint.m} {
    ${Summary}, ${Market} {
      margin-top: 64px;
    }
  }
  @media ${breakpoint.l} {
    ${Summary}, ${Market} {
      margin-top: 118px;
    }
  }
`
