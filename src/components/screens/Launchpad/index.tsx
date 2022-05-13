import { valueToBigNumber } from '@starlay-finance/math-utils'
import dayjs from 'dayjs'
import { VFC } from 'react'
import { AppBackground } from 'src/components/parts/Background'
import { AppFooter } from 'src/components/parts/Footer'
import { AppHeader } from 'src/components/parts/Header/AppHeader'
import { useLaunchpadMarketData } from 'src/hooks/useLaunchpadMarketData'
import { contentMaxWidthCssVar } from 'src/styles/mixins'
import styled from 'styled-components'
import { KeyVisual } from './KeyVisual'
import { withLaunchpadContext } from './LaunchpadContext'
import { ProjectInformation } from './ProjectInformation'
import { Sale } from './Sale'
import { Statistics } from './Statistics'
import { ProjectData, Status } from './types'

export type { ProjectData }

const judgeStatus = (sale: ProjectData['sale']): Status => {
  const now = dayjs()
  if (now.isBefore(sale.start)) return 'Upcoming'
  if (now.isAfter(sale.end)) return 'Ended'
  return 'Open'
}

export const Launchpad: VFC<{ data: ProjectData }> = withLaunchpadContext(
  ({ data }) => {
    const status = judgeStatus(data.sale)
    const { data: marketData } = useLaunchpadMarketData({
      saleStart: data.sale.start,
      saleEnd: data.sale.end,
    })
    const { market, chartData } = marketData || {}
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
            <Statistics
              token={data.token}
              market={market}
              priceChartData={chartData}
            />
          )}
          <Content>
            <ProjectInformation
              information={data.information}
              token={data.token}
            />
            <Sale
              data={data}
              status={status}
              market={market}
              maxAmount={valueToBigNumber(data.sale.emissionAmount)}
            />
          </Content>
        </Main>
        <AppFooter />
      </>
    )
  },
)

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
