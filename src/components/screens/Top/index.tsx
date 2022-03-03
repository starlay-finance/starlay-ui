import { useRouter } from 'next/router'
import { VFC } from 'react'
import { GradientCtaLink } from 'src/components/parts/Cta'
import { TopFooter } from 'src/components/parts/Footer'
import { TopHeader } from 'src/components/parts/Header'
import { TOP_ASSETS } from 'src/constants/top'
import { Locale } from 'src/locales'
import { secondary } from 'src/styles/colors'
import { fontWeightHeavy, fontWeightRegular } from 'src/styles/font'
import styled, { css } from 'styled-components'
import { Backers, BackersProps } from './parts/Backers'
import { Background } from './parts/Background'
import { CurrentMarkets } from './parts/CurrentMarkets'
import { FirstView } from './parts/FirstView'
export type TopProps = BackersProps

export const Top: VFC<TopProps> = ({ backers }) => {
  const { locale } = useRouter()
  return (
    <>
      <TopHeader />
      <Main $locale={locale as Locale}>
        <Background />
        <FirstView assets={TOP_ASSETS} />
        <CurrentMarkets />
        {backers.length > 0 && <Backers backers={backers} />}
      </Main>
      <TopFooter />
    </>
  )
}

const Main = styled.main<{ $locale?: Locale }>`
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
  ${({ $locale }) =>
    $locale === 'ja' &&
    css`
      &,
      * {
        font-style: normal;
      }
      ${GradientCtaLink} {
        font-size: 18px;
      }
    `}
`
