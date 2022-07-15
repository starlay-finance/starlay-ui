import { t } from '@lingui/macro'
import { Trans } from '@lingui/react'
import { BigNumber } from '@starlay-finance/math-utils'
import { useEffect, useState } from 'react'
import { TableContainer } from 'src/components/compositions/Markets/MarketTable'
import { Link } from 'src/components/elements/Link'
import { asStyled } from 'src/components/hoc/asStyled'
import { useLAYPrice } from 'src/hooks/useLAYPrice'
import { useMarketData } from 'src/hooks/useMarketData'
import { useVoteData } from 'src/hooks/useVoteData'
import { filterFalsy } from 'src/utils/array'
import { symbolSorter } from 'src/utils/market'
import { DOCS_VELAY_CLAIM, DOCS_VELAY_TERMS } from 'src/utils/routes'
import styled from 'styled-components'
import { Slider } from './Slider'
import { RealtimeTable } from './Tables/Realtime'
import { StatsTable } from './Tables/Stats'
import { VotesTable } from './Tables/Votes'

const STATS_COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 4 },
  {
    id: 'revenue',
    name: t`Last Term Revenue`,
    tooltip: (
      <Trans
        id="The revenue of the protocol in the last term. For more detail, please refer <0>here</0>."
        components={[<Link key="0" href={DOCS_VELAY_TERMS} />]}
      />
    ),
    widthRatio: 4,
  },
  {
    id: 'apr',
    name: t`Dividend APR`,
    tooltip: t`Estimated APR of dividends calculated from Last Term Revenue.`,
    widthRatio: 2,
  },
  {
    id: 'totalWeight',
    name: t`Total Weight`,
    tooltip: t`The total number and percentage of voting power each asset obtained.`,
    widthRatio: 2,
  },
  {
    id: 'weight',
    name: t`Your Weight`,
    tooltip: t`The number of voting power you voted for each asset.`,
    widthRatio: 2,
  },
  {
    id: 'claimable',
    name: t`Claimable Amount`,
    tooltip: (
      <Trans
        id="Dividends you can claim from the revenue of the term your voting results applied. For more detail, please click <0>here</0>."
        components={[<Link key="0" href={DOCS_VELAY_CLAIM} />]}
      />
    ),
    tooltipPosition: 'right',
    widthRatio: 3,
  },
]

const REALTIME_COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 4 },
  {
    id: 'revenue',
    name: t`Earned Revenue`,
    tooltip: (
      <Trans
        id="The revenue of the protocol in this term. For more detail, please refer <0>here</0>."
        components={[<Link key="0" href={DOCS_VELAY_TERMS} />]}
      />
    ),
    widthRatio: 4,
  },
  {
    id: 'totalWeight',
    name: t`Total Weight`,
    tooltip: t`The total number and percentage of voting power each asset obtained.`,
    widthRatio: 2,
  },
  {
    id: 'weight',
    name: t`Your Weight`,
    tooltip: t`The number of voting power you voted for each asset.`,
    widthRatio: 2,
  },
  {
    id: 'dividends',
    name: t`You Dividend`,
    tooltip: (
      <Trans
        id="Dividends you can claim from the revenue of the term your voting results applied. For more detail, please click <0>here</0>."
        components={[<Link key="0" href={DOCS_VELAY_CLAIM} />]}
      />
    ),
    tooltipPosition: 'right',
    widthRatio: 3,
  },
] as const

const VOTING_COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 6 },
  {
    id: 'totalWeight',
    name: t`Total Weight`,
    tooltip: t`The total number and percentage of voting power each asset obtained.`,
    widthRatio: 3,
  },
  {
    id: 'votedWeight',
    name: t`Voted Weight`,
    tooltip: t`The number of voting power you voted for each asset.`,
    widthRatio: 3,
  },
  {
    id: 'voting',
    name: t`Voting Allocations`,
    tooltip: t`The number and percentage of voting power you apply for each asset.`,
    widthRatio: 3,
  },
  { id: 'votingSlider', name: '', widthRatio: 6 },
]
const WEIGHT_DECIMALS = 4

export const Assets = asStyled(({ className }) => {
  const [activeTab, setActiveTab] = useState('stats')
  const [votingData, setVotingData] =
    useState<Partial<Record<string, number>>>()
  const [touched, setTouched] = useState(false)
  const { data: voteData, userData: userVoteData } = useVoteData(0)

  const { data: marketData } = useMarketData()
  const { data: layPrice } = useLAYPrice()
  const assets = marketData?.assets || []
  const markets = assets.filter((each) => each.isActive).sort(symbolSorter)

  useEffect(() => {
    if (!userVoteData || votingData) return
    const weightTotal = BigNumber.sum(
      ...Object.values(userVoteData.data)
        .filter(filterFalsy)
        .map(({ weight }) => weight),
    )
    setVotingData(
      Object.keys(userVoteData.data).reduce(
        (res, key) => ({
          ...res,
          [key]:
            (!weightTotal.isZero() &&
              userVoteData.data[key]?.weight
                .div(weightTotal)
                .decimalPlaces(WEIGHT_DECIMALS, BigNumber.ROUND_FLOOR)
                .toNumber()) ||
            0,
        }),
        {},
      ),
    )
  }, [userVoteData])

  return (
    <DetailsSection className={className}>
      <TableContainer>
        {activeTab == 'stats' && (
          <StatsTable
            markets={markets}
            layPrice={layPrice}
            userVoteData={userVoteData}
            voteData={voteData}
            changeTab={setActiveTab}
          />
        )}
        {activeTab == 'realtime' && (
          <RealtimeTable markets={markets} changeTab={setActiveTab} />
        )}
        {activeTab == 'votes' && (
          <VotesTable
            markets={markets}
            layPrice={layPrice}
            userVoteData={userVoteData}
            voteData={voteData}
            votingData={votingData}
            touched={touched}
            setVotingData={setVotingData}
            changeTab={setActiveTab}
            touch={() => setTouched(true)}
          />
        )}
      </TableContainer>
    </DetailsSection>
  )
})``

const DetailsSection = styled.section`
  table {
    ${Slider} {
      margin-left: 16px;
      width: 96%;
    }
  }
`
