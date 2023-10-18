import Router from 'next/router'
import { useEffect } from 'react'
import { AppFooter } from 'src/components/parts/Footer'
import { AppHeader } from 'src/components/parts/Header/AppHeader'
import { useNetworkType } from 'src/hooks/useNetwork'
import { contentMaxWidthCssVar } from 'src/styles/mixins'
import { APP } from 'src/utils/routes'
import styled from 'styled-components'
import { Assets } from './Assets'
import { LAYBalances } from './LAYBalances'

export const Lay = () => {
  const { data } = useNetworkType()
  useEffect(() => {
    if (data !== 'EVM') Router.replace(APP)
  }, [data])
  return (
    <>
      <AppHeader openMenu={() => {}} />
      <Main>
        <LAYBalances />
        <Assets />
      </Main>
      <AppFooter />
    </>
  )
}
const Main = styled.main`
  width: 100%;
  max-width: var(${contentMaxWidthCssVar});
  margin: 0 auto;
  padding: 80ox 24px 64px;
  padding-top: 80px;
  ${Assets} {
    margin-top: 32px;
  }
`
