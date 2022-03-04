import { AppBackground } from 'src/components/parts/Background'
import { AppFooter } from 'src/components/parts/Footer'
import { AppHeader } from 'src/components/parts/Header/AppHeader'
import { fontWeightHeavy } from 'src/styles/font'
import { contentMaxWidthCssVar } from 'src/styles/mixins'
import styled from 'styled-components'
import { Details } from './Details'
import { Overview } from './Overview'

export const Markets = () => (
  <>
    <AppHeader />
    <Main>
      <AppBackground />
      <Overview />
      <Details />
    </Main>
    <AppFooter />
  </>
)

const Main = styled.main`
  width: 100%;
  max-width: var(${contentMaxWidthCssVar});
  margin: 0 auto;
  padding-bottom: 64px;
  h2 {
    font-size: 20px;
    font-weight: ${fontWeightHeavy};
  }
  ${Overview} {
    margin-top: 80px;
  }
  ${Details} {
    margin-top: 24px;
  }
`
