import { BigNumber } from '@starlay-finance/math-utils'
import { useEffect, useState } from 'react'
import { TableContainer } from 'src/components/compositions/Markets/MarketTable'
import { asStyled } from 'src/components/hoc/asStyled'
import { useLAYPrice } from 'src/hooks/useLAYPrice'
import { useMarketData } from 'src/hooks/useMarketData'
import { useVoteData } from 'src/hooks/useVoteData'
import { filterFalsy } from 'src/utils/array'
import { symbolSorter } from 'src/utils/market'
import styled from 'styled-components'
import { Slider } from './Slider'
import { RealtimeTable } from './Tables/Realtime'
import { StatsTable } from './Tables/Stats'
import { VotesTable } from './Tables/Votes'

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
