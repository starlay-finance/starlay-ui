import { AppBackground } from 'src/components/parts/Background'
import { AppFooter } from 'src/components/parts/Footer'
import { AppHeader } from 'src/components/parts/Header/AppHeader'
import { fontWeightHeavy } from 'src/styles/font'
import { contentMaxWidthCssVar } from 'src/styles/mixins'
import styled from 'styled-components'
import { MakaiMarkets } from './MakaiMarkets'
import { UnclaimedReward } from './UnclaimedReward'

export const Makai = () => (
  <>
    <AppHeader />
    <Main>
      <AppBackground />
      <div>
        <MakaiMarkets />
        <UnclaimedReward />
      </div>
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
  > div {
    margin-top: 80px;
    display: flex;
    column-gap: 24px;
    ${MakaiMarkets} {
      flex: 1;
    }
    ${UnclaimedReward} {
      width: 400px;
      max-height: 294px;
    }
  }
`
