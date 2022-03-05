import { useRouter } from 'next/router'
import { useState, VFC } from 'react'
import { GradientCtaLink } from 'src/components/parts/Cta'
import { TopFooter } from 'src/components/parts/Footer'
import { TopHeader } from 'src/components/parts/Header'
import { TOP_ASSETS } from 'src/constants/top'
import { Locale } from 'src/locales'
import { secondary } from 'src/styles/colors'
import { fontWeightHeavy, fontWeightRegular } from 'src/styles/font'
import { breakpoint } from 'src/styles/mixins'
import styled, { css } from 'styled-components'
import { MobileMenu } from './Menu'
import { Backers, BackersProps } from './parts/Backers'
import { Background } from './parts/Background'
import { CurrentMarkets } from './parts/CurrentMarkets'
import { FirstView } from './parts/FirstView'
export type TopProps = BackersProps

export const Top: VFC<TopProps> = ({ backers }) => {
  const { locale } = useRouter()
  const [isMenuOpen, setMenuOpen] = useState(false)
  return (
    <>
      <TopHeader openMenu={() => setMenuOpen(true)} />
      <Main $locale={locale as Locale}>
        <Background />
        <FirstView assets={TOP_ASSETS} />
        <CurrentMarkets />
        {backers.length > 0 && <Backers backers={backers} />}
        <MobileMenu isOpen={isMenuOpen} close={() => setMenuOpen(false)} />
      </Main>
      <TopFooter />
    </>
  )
}

const Main = styled.main<{ $locale?: Locale }>`
  position: relative;
  width: 100%;
  padding: 0 24px;
  ${FirstView} {
    padding-top: 40px;
  }
  ${CurrentMarkets} {
    margin-top: 80px;
  }
  ${Backers} {
    margin-top: 240px;
  }
  h1 {
    font-size: 40px;
    font-weight: ${fontWeightHeavy};
    font-style: italic;
  }
  h2 {
    font-size: 32px;
    font-weight: ${fontWeightHeavy};
  }
  h2 + p {
    margin-top: 16px;
    font-size: 16px;
    font-weight: ${fontWeightRegular};
    color: ${secondary};
  }
  @media ${breakpoint.xl} {
    padding: 0 0 240px;
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
