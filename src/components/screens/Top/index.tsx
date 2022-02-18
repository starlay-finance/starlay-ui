import { VFC } from 'react'
import { TopFooter } from 'src/components/parts/Footer'
import { TopHeader } from 'src/components/parts/Header'
import { TOP_ASSETS } from 'src/constants/top'
import { secondary } from 'src/styles/colors'
import { fontWeightHeavy, fontWeightRegular } from 'src/styles/font'
import styled from 'styled-components'
import { Backers, BackersProps } from './parts/Backers'
import { Background } from './parts/Background'
import { CurrentMarkets } from './parts/CurrentMarkets'
import { FirstView } from './parts/FirstView'
export type TopProps = BackersProps

export const Top: VFC<TopProps> = ({ backers }) => {
  return (
    <>
      <TopHeader />
      <Main>
        <Background />
        <FirstView assets={TOP_ASSETS} />
        <CurrentMarkets />
        {backers.length > 0 && <Backers backers={backers} />}
      </Main>
      <TopFooter />
    </>
  )
}

const Main = styled.main`
  position: relative;
  width: 100%;
  padding-bottom: 240px;
  ${FirstView} {
    padding-top: 210px;
  }
  ${CurrentMarkets} {
    margin-top: 282px;
  }
  ${Backers} {
    margin-top: 240px;
  }
  h1 {
    font-size: 80px;
    font-weight: ${fontWeightHeavy};
    font-style: italic;
  }
  h2 {
    font-size: 64px;
    font-weight: ${fontWeightHeavy};
  }
  h2 + p {
    margin-top: 16px;
    font-size: 16px;
    font-weight: ${fontWeightRegular};
    color: ${secondary};
  }
`
