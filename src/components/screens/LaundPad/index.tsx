import { VFC } from 'react'
import { AppFooter } from 'src/components/parts/Footer'
import { AppHeader } from 'src/components/parts/Header/AppHeader'
import { contentMaxWidthCssVar } from 'src/styles/mixins'
import styled from 'styled-components'
import { KeyVisual } from './KeyVisual'
import { ProjectInformation } from './ProjectInformation'
import { Sale } from './Sale'
import { LaunchPadData } from './types'

export type { LaunchPadData }

export const LaunchPad: VFC<{ data: LaunchPadData }> = ({ data }) => {
  return (
    <>
      <AppHeader />
      <Main>
        {/* <AppBackground /> */}
        <KeyVisual
          src={data.keyVisual}
          alt={`${data.token.symbol} token sale`}
        />
        <Content>
          <ProjectInformation information={data.information} />
          <Sale token={data.token} information={data.sale} status={undefined} />
        </Content>
      </Main>
      <AppFooter />
    </>
  )
}

const Content = styled.div`
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
