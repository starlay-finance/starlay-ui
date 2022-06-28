import { AppFooter } from 'src/components/parts/Footer'
import { AppHeader } from 'src/components/parts/Header/AppHeader'
import { contentMaxWidthCssVar } from 'src/styles/mixins'
import styled from 'styled-components'
import { Assets } from './Assets'
import { LAYBalances } from './LAYBalances'

export const Lay = () => (
  <>
    <AppHeader />
    <Main>
      <LAYBalances />
      <Assets />
    </Main>
    <AppFooter />
  </>
)

const Main = styled.main`
  width: 100%;
  max-width: var(${contentMaxWidthCssVar});
  margin: 0 auto;
  padding-top: 80px;
  padding-bottom: 64px;
  ${Assets} {
    margin-top: 32px;
  }
`
