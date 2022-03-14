import { t } from '@lingui/macro'
import { VFC } from 'react'
import { AssetBarChartWithPlaceholder } from 'src/components/compositions/Markets/MarketBarChart'
import { TableContainer } from 'src/components/compositions/Markets/MarketTable'
import { asStyled } from 'src/components/hoc/asStyled'
import { BlinkWrapper } from 'src/components/parts/Number/Blink'
import { PercentageChange } from 'src/components/parts/Number/PercentageChange'
import { Reel } from 'src/components/parts/Number/Reel'
import { useMarketData } from 'src/hooks/useMarketData'
import { useMarketDataSnapshot } from 'src/hooks/useMarketData/useMarketDataSnaphost'
import { darkPurple, secondary } from 'src/styles/colors'
import { fontWeightBold, fontWeightRegular } from 'src/styles/font'
import { MarketComposition } from 'src/types/models'
import { amountByAssetsSorter, toMarketCompositions } from 'src/utils/market'
import { formatUSD } from 'src/utils/number'
import styled from 'styled-components'

export const Overview = asStyled(({ className }) => {
  const { data } = useMarketData()
  const { data: marketDataSnapshot } = useMarketDataSnapshot()
  const markets = data?.assets || []
  const { deposit, borrow } = toMarketCompositions(markets)
  const snapshot = toMarketCompositions(marketDataSnapshot?.assets || [])
  return (
    <OverviewSection className={className}>
      <OverViewItem
        caption={t`Total Deposited`}
        chartCaption={t`Deposit_Top3 Markets`}
        market={deposit}
        snapshot={snapshot.deposit}
      />
      <OverViewItem
        caption={t`Total Borrowed`}
        chartCaption={t`Borrow_Top3 Markets`}
        market={borrow}
        snapshot={snapshot.borrow}
      />
    </OverviewSection>
  )
})``

const OverViewItem: VFC<{
  caption: string
  chartCaption: string
  market: MarketComposition
  snapshot?: MarketComposition
}> = ({
  caption,
  chartCaption,
  market: { totalInUSD, amountByAssets },
  snapshot,
}) => {
  const displayTotal = formatUSD(totalInUSD, {
    decimalPlaces: 2,
    shorteningThreshold: 16,
  })
  return (
    <OverviewItemContainer>
      <h2>{caption}</h2>
      <AmountDiv>
        <BlinkWrapper value={displayTotal}>
          <Reel text={displayTotal} />
        </BlinkWrapper>
        <PercentageChange
          current={totalInUSD}
          previous={snapshot?.totalInUSD}
        />
      </AmountDiv>
      <Composition>
        <p>{chartCaption}</p>
        {(amountByAssets.length === 0
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
    </OverviewItemContainer>
  )
}

const Composition = styled.div`
  font-size: 16px;
  font-weight: ${fontWeightBold};
  color: ${secondary};

  > p {
    margin-bottom: 24px;
  }
  ${AssetBarChartWithPlaceholder} {
    margin-top: 16px;
  }
`

const AmountDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
  font-size: 24px;
  font-weight: ${fontWeightBold};
  > span:last-child {
    font-size: 18px;
    font-weight: ${fontWeightRegular};
  }
`

const OverviewItemContainer = styled(TableContainer)`
  padding: 24px 32px 32px;
  h2 {
    padding: 0 32px 24px;
    margin: 0 -32px 32px;
    border-bottom: 1px solid ${darkPurple}3d;
  }
  ${Composition} {
    margin-top: 32px;
  }
`

const OverviewSection = styled.section`
  display: flex;
  justify-content: space-between;
  column-gap: 24px;
  > * {
    flex: 1;
  }
`
