import dayjs from 'dayjs'
import { VFC } from 'react'
import { AppBackground } from 'src/components/parts/Background'
import { AppFooter } from 'src/components/parts/Footer'
import { AppHeader } from 'src/components/parts/Header/AppHeader'
import { darkPurple, darkRed, skyBlue, trueBlack } from 'src/styles/colors'
import { fontWeightBold, fontWeightRegular } from 'src/styles/font'
import { contentMaxWidthCssVar } from 'src/styles/mixins'
import styled from 'styled-components'
import { KeyVisual } from './KeyVisual'
import { ProjectInformation } from './ProjectInformation'
import { Sale } from './Sale'
import { Statistics } from './Statistics'
import { LaunchPadData } from './types'

export type { LaunchPadData }

type Status = 'Upcoming' | 'Open' | 'Ended'
const judgeStatus = (sale: LaunchPadData['sale']): Status => {
  const now = dayjs()
  if (now.isBefore(sale.start)) return 'Upcoming'
  if (now.isAfter(sale.end)) return 'Ended'
  return 'Open'
}

export const LaunchPad: VFC<{ data: LaunchPadData }> = ({ data }) => {
  const status = judgeStatus(data.sale)
  const market = undefined // TODO
  return (
    <>
      <AppHeader />
      <Main>
        <AppBackground />
        {status === 'Upcoming' ? (
          <KeyVisual
            src={data.keyVisual}
            alt={`${data.token.symbol} token sale`}
          />
        ) : (
          <Statistics token={data.token} market={market} />
        )}
        <Content>
          <ProjectInformation information={data.information} />
          <Sale token={data.token} information={data.sale} market={market} />
        </Content>
      </Main>
      <AppFooter />
    </>
  )
}

const Items = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  li {
    padding-bottom: 12px;
    :not(:last-child) {
      border-bottom: 1px solid ${darkPurple}3d;
    }
    p:first-child {
      font-size: 16px;
      font-weight: ${fontWeightRegular};
    }
    p:last-child {
      margin-top: 4px;
      font-size: 20px;
      font-weight: ${fontWeightBold};
    }
  }
`
const Chart = styled.figure``

const StatisticsDiv = styled.div`
  width: 100%;
  height: 400px;
  padding: 2px;
  border-radius: 16px;
  background: linear-gradient(45deg, ${skyBlue}cc, ${darkRed}cc);
  backdrop-filter: blur(50px);
  > div {
    width: 100%;
    height: 100%;
    padding: 32px;
    border-radius: 14px;
    background: linear-gradient(45deg, ${trueBlack}cc, ${trueBlack});
    backdrop-filter: blur(24px) brightness(0.52);
  }
  ${Items} {
    width: 240px;
  }
  ${Chart} {
    flex: 1;
  }
`

const Content = styled.div`
  position: relative;
  display: flex;
  column-gap: 80px;
`

const Main = styled.main`
  width: 100%;
  max-width: var(${contentMaxWidthCssVar});
  margin: 88px auto 0;
  padding-bottom: 320px;
  ${Content} {
    margin-top: 64px;
  }
  ${ProjectInformation} {
    flex: 1;
  }
`
