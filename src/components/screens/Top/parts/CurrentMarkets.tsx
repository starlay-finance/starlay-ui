import { t } from '@lingui/macro'
import { forwardRef, VFC } from 'react'
import { useInView } from 'react-hook-inview'
import { asStyled } from 'src/components/hoc/asStyled'
import { BlinkWrapper } from 'src/components/parts/Blink'
import { BarChart } from 'src/components/parts/Chart'
import { SHIMMER_DARA_URI } from 'src/components/parts/Loading'
import { Reel } from 'src/components/parts/Reel'
import { useMarketData } from 'src/hooks/useMarketData'
import { darkRed, secondary, skyBlue } from 'src/styles/colors'
import { fontWeightBlack, fontWeightSemiBold } from 'src/styles/font'
import { contentMaxWidthCssVar } from 'src/styles/mixins'
import { MarketComposition } from 'src/types/models'
import { amountByAssetsSorter, toMarketCompositions } from 'src/utils/market'
import { BN_ZERO, formatPct, formatUSD } from 'src/utils/number'
import styled from 'styled-components'
import { IterableElement } from 'type-fest'

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
      <p>{t`The market is always changing and you can earn`}</p>
      <MarketViewDiv ref={ref}>
        <MarketView
          title={t`Total Market Size`}
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
  </CurrentMarketsSection>
))

const MarketView: VFC<{
  title: string
  market: MarketComposition
  touched: boolean
}> = ({ title, market: { totalInUSD, amountByAssets }, touched }) => {
  const value = formatUSD(touched ? totalInUSD : BN_ZERO, {
    decimalPlaces: 2,
    shorteningThreshold: 30,
  })
  return (
    <ViewDiv>
      <h3>{title}</h3>
      <BlinkWrapper value={value}>
        <Reel text={value} />
      </BlinkWrapper>
      <Composition>
        {(amountByAssets.length === 0 || !touched
          ? Array.from(new Array(3))
          : amountByAssets.sort(amountByAssetsSorter).slice(0, 3)
        ).map((each, idx) => (
          <AssetsWithPlaceholder
            key={idx}
            totalInUSD={totalInUSD}
            asset={each}
          />
        ))}
      </Composition>
    </ViewDiv>
  )
}

const AssetsWithPlaceholder: VFC<{
  totalInUSD: MarketComposition['totalInUSD']
  asset?: IterableElement<MarketComposition['amountByAssets']>
}> = ({ totalInUSD, asset }) => {
  const isValid = totalInUSD.gt(BN_ZERO) && asset
  return (
    <Asset>
      <LabelWithPlaceholder
        label={asset?.symbol}
        value={
          isValid
            ? formatPct(asset.amountInUSD.dividedBy(totalInUSD))
            : formatPct(0)
        }
      />
      <BarChart
        ratio={
          isValid
            ? Math.min(asset.amountInUSD.dividedBy(totalInUSD).toNumber(), 1)
            : 0
        }
        filled={skyBlue}
        unfilled={`${skyBlue}3d`}
      />
    </Asset>
  )
}
const LabelWithPlaceholder: VFC<{
  label?: string
  value: string
}> = ({ label, value }) => (
  <p>
    <span data-label={label || ''}>{label}</span>
    <span>{value}</span>
  </p>
)

const Asset = styled.div`
  p {
    display: flex;
    justify-content: space-between;
    color: ${secondary};
    span:first-child {
      font-size: 16px;
      font-weight: ${fontWeightBlack};
      line-height: 1.2;
    }
    span[data-label=''] {
      background: url('${SHIMMER_DARA_URI}');
      width: 6em;
      height: 1.2em;
      border-radius: 0.5em;
    }
    span:last-child {
      font-size: 14px;
      font-weight: ${fontWeightSemiBold};
    }
  }
  ${BarChart} {
    margin-top: 14px;
    height: 8px;
  }
`

const Composition = styled.div`
  ${Asset} {
    margin-top: 16px;
  }
`

const ViewDiv = styled.div`
  position: relative;
  ${Composition} {
    margin-top: 24px;
  }
`

const MarketViewDiv = styled.div`
  position: relative;
  padding: 32px;
  border-radius: 24px;
  overflow: hidden;
  background: linear-gradient(90deg, ${darkRed}3d, ${skyBlue}3d);
  backdrop-filter: blur(16px) brightness(1.08);

  display: flex;
  column-gap: 48px;
  > * {
    flex: 1;
  }
`

const CurrentMarketsSection = styled.section`
  position: relative;
  width: 100%;
  height: 504px;
  max-width: var(${contentMaxWidthCssVar});
  margin: 0 auto;
  ${MarketViewDiv} {
    margin-top: 56px;
  }
  h2,
  h2 + p {
    text-align: center;
  }
  h3 {
    font-size: 20px;
    font-weight: ${fontWeightSemiBold};
    padding-bottom: 16px;
    border-bottom: 1px solid;
  }
  h3 + * {
    display: block;
    margin-top: 16px;
    font-size: 36px;
    font-weight: ${fontWeightBlack};
  }
`
