import { t } from '@lingui/macro'
import { forwardRef } from 'react'
import { useInView } from 'react-hook-inview'
import { AssetBarChartWithPlaceholder } from 'src/components/compositions/Markets/MarketBarChart'
import { asStyled } from 'src/components/hoc/asStyled'
import { BlinkWrapper } from 'src/components/parts/Number/Blink'
import { Reel } from 'src/components/parts/Number/Reel'
import { useMarketData } from 'src/hooks/useMarketData'
import { darkRed, skyBlue, trueWhite } from 'src/styles/colors'
import { fontWeightBlack, fontWeightSemiBold } from 'src/styles/font'
import { breakpoint, contentMaxWidthCssVar } from 'src/styles/mixins'
import { MarketComposition } from 'src/types/models'
import { amountByAssetsSorter, toMarketCompositions } from 'src/utils/market'
import { BN_ZERO, formatUSD } from 'src/utils/number'
import styled from 'styled-components'

export const CurrentMarkets = asStyled(({ className }) => {
  const { data } = useMarketData()
  const markets = data?.assets || []
  const compositions = toMarketCompositions(markets)
  const [ref, touched] = useInView({
    unobserveOnEnter: true,
  })
  return (
    <CurrentMarketsComponent
      ref={ref}
      touched={touched}
      className={className}
      {...compositions}
    />
  )
})``

type CurrentMarketsComponentProps = {
  deposit: MarketComposition
  borrow: MarketComposition
  touched: boolean
}
export const CurrentMarketsComponent = forwardRef<
  HTMLDivElement,
  CurrentMarketsComponentProps & { className?: string }
>(({ deposit, borrow, touched, className }, ref) => (
  <CurrentMarketsSection className={className}>
    <div>
      <h2>{t`Current Markets`}</h2>
      <p>{t`The more funds that will be borrowed, the higher the interest rate will be`}</p>
      <div ref={ref}>
        <MarketViewDiv>
          <Background />
          <MarketView
            title={t`Total Deposited`}
            market={deposit}
            touched={touched}
          />
          <MarketView
            title={t`Total Borrowed`}
            market={borrow}
            touched={touched}
          />
        </MarketViewDiv>
      </div>
    </div>
  </CurrentMarketsSection>
))

const MarketView = asStyled<{
  title: string
  market: MarketComposition
  touched: boolean
}>(({ title, market: { totalInUSD, amountByAssets }, touched, className }) => {
  const value = formatUSD(touched ? totalInUSD : BN_ZERO, {
    decimalPlaces: 2,
    shorteningThreshold: 30,
  })
  return (
    <ViewDiv className={className}>
      <Background />
      <h3>{title}</h3>
      <BlinkWrapper value={value}>
        <Reel text={value} />
      </BlinkWrapper>
      <Composition>
        {(amountByAssets.length === 0 || !touched
          ? Array.from(new Array(3))
          : amountByAssets.sort(amountByAssetsSorter).slice(0, 3)
        ).map((each, idx) => (
          <AssetBarChartWithPlaceholder
            key={idx}
            totalInUSD={totalInUSD}
            asset={each}
          />
        ))}
      </Composition>
    </ViewDiv>
  )
})``

const Composition = styled.div`
  ${AssetBarChartWithPlaceholder} {
    margin-top: 16px;
  }
`
const Background = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, ${darkRed}3d, ${skyBlue}3d);
`
const ViewDiv = styled.div`
  position: relative;
  backdrop-filter: blur(16px) brightness(1.08);
  background: rgba(255, 255, 255, 0.08);
  ${Composition} {
    margin-top: 24px;
  }
`

const MarketViewDiv = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  column-gap: 48px;
  row-gap: 24px;
  > * {
    flex: 1;
  }
  ${MarketView} {
    padding: 32px 24px 40px;
    border-radius: 16px;
    overflow: hidden;
  }

  > ${Background} {
    display: none;
  }
  @media ${breakpoint.xl} {
    flex-direction: row;

    padding: 32px;
    border-radius: 24px;
    overflow: hidden;
    backdrop-filter: blur(16px) brightness(1.08);
    background: rgba(255, 255, 255, 0.08);
    ${MarketView} {
      padding: 0;
      border-radius: 0;
      overflow: visible;
      background: none;
      backdrop-filter: none;
      ${Background} {
        display: none;
      }
    }
    > ${Background} {
      display: block;
    }
  }
`

const CurrentMarketsSection = styled.section`
  position: relative;
  width: 100%;
  max-width: var(${contentMaxWidthCssVar});
  margin: 0 auto;
  ${MarketViewDiv} {
    margin-top: 40px;
  }
  h2,
  h2 + p {
    text-align: center;
  }
  h3 {
    font-size: 16px;
    font-weight: ${fontWeightSemiBold};
    padding-bottom: 16px;
    border-bottom: 1px solid ${trueWhite}52;
  }
  h3 + * {
    display: block;
    margin-top: 24px;
    font-size: 24px;
    font-weight: ${fontWeightBlack};
  }

  @media ${breakpoint.xl} {
    ${MarketViewDiv} {
      margin-top: 56px;
    }
    h3 + * {
      margin-top: 16px;
      font-size: 36px;
    }
  }
`
