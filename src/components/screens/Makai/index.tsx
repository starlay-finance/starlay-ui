import Router from 'next/router'
import { useEffect } from 'react'
import { AppBackground } from 'src/components/parts/Background'
import { AppFooter } from 'src/components/parts/Footer'
import { AppHeader } from 'src/components/parts/Header/AppHeader'
import { useNetworkType } from 'src/hooks/useNetwork'
import { fontWeightHeavy } from 'src/styles/font'
import { contentMaxWidthCssVar } from 'src/styles/mixins'
import { APP } from 'src/utils/routes'
import styled from 'styled-components'
import { MakaiMarkets } from './MakaiMarkets'
import { UnclaimedReward } from './UnclaimedReward'

export const Makai = () => {
  const { data } = useNetworkType()
  useEffect(() => {
    if (data !== 'EVM') Router.replace(APP)
  }, [data])
  return (
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
}

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
