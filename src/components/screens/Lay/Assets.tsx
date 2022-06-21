import { t } from '@lingui/macro'
import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import { useEffect, useState } from 'react'
import {
  AssetTd,
  MarketTable,
  TableContainer,
} from 'src/components/compositions/Markets/MarketTable'
import { asStyled } from 'src/components/hoc/asStyled'
import { useVoter } from 'src/hooks/contracts/useVoter'
import { useVotingEscrow } from 'src/hooks/contracts/useVotingEscrow'
import { useLAYPrice } from 'src/hooks/useLAYPrice'
import { useMarketData } from 'src/hooks/useMarketData'
import { useVoteData } from 'src/hooks/useVoteData'
import { darkGray, darkRed, purple, skyBlue } from 'src/styles/colors'
import { fontWeightBold, fontWeightMedium } from 'src/styles/font'
import { AssetMarketData, UserVoteData, VoteData } from 'src/types/models'
import { filterFalsy } from 'src/utils/array'
import { symbolSorter } from 'src/utils/market'
import { BN_ZERO, formatAmtShort, formatPct, formatUSD } from 'src/utils/number'
import styled from 'styled-components'
import { Slider } from './Slider'

const STATS_COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 4 },
  { id: 'revenue', name: t`Weekly Protocol Revenue`, widthRatio: 4 },
  { id: 'apr', name: t`Dividend APR`, widthRatio: 2 },
  { id: 'totalWeight', name: t`Total Weight`, widthRatio: 2 },
  { id: 'weight', name: t`Your Weight`, widthRatio: 2 },
  { id: 'claimable', name: t`Claimable Amount`, widthRatio: 3 },
]

const VOTING_COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 6 },
  { id: 'totalWeight', name: t`Total Weight`, widthRatio: 3 },
  { id: 'votedWeight', name: t`Voted Weight`, widthRatio: 3 },
  { id: 'voting', name: t`Voting`, widthRatio: 3 },
  { id: 'votingSlider', name: '', widthRatio: 6 },
]
const WEIGHT_DECIMALS = 4

export const Assets = asStyled(({ className }) => {
  const [activeTab, setActiveTab] = useState('stats')
  const [votingData, setVotingData] =
    useState<Partial<Record<string, number>>>()
  const [touched, setTouched] = useState(false)

  const { data: marketData } = useMarketData()
  const { vote } = useVoter()
  const { data: voteData, userData: userVoteData } = useVoteData()
  const { userData } = useVotingEscrow()
  const { data: layPrice } = useLAYPrice()
  const { assets } = marketData || {}
  const markets = (assets || [])
    .filter((each) => each.isActive)
    .sort(symbolSorter)

  const currentVotingTotal =
    (votingData &&
      Object.values(votingData).reduce((res = 0, num = 0) => res + num)) ||
    0

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
        {activeTab == 'stats' ? (
          <MarketTable
            tabs={{
              items: [
                { id: 'stats', label: t`Stats` },
                { id: 'voting', label: t`Vote` },
              ],
              setTab: setActiveTab,
              activeTab: 'stats',
            }}
            control={
              <Control>
                <span>{t`Total Claimable: ${
                  userVoteData
                    ? formatUSD(userVoteData.claimableTotalInUSD)
                    : '-'
                }`}</span>
                <button
                  disabled={!userVoteData?.claimableTotalInUSD.gt(BN_ZERO)}
                >{t`Claim`}</button>
              </Control>
            }
            columns={STATS_COLUMNS}
            rows={markets.map((asset) =>
              statsRow({
                asset,
                voteData,
                userVoteData,
                layPrice,
              }),
            )}
            hoverGradients={[`${darkRed}3d`, `${skyBlue}3d`, `${darkRed}3d`]}
          />
        ) : (
          <MarketTable
            tabs={{
              items: [
                { id: 'stats', label: t`Stats` },
                { id: 'voting', label: t`Vote` },
              ],
              setTab: setActiveTab,
              activeTab: 'voting',
            }}
            control={
              <Control>
                <span>{t`Voting Power Used: ${
                  userData
                    ? `${formatAmtShort(
                        touched
                          ? userData.votingPower.times(currentVotingTotal)
                          : userVoteData?.votedTotal || BN_ZERO,
                      )}/${formatAmtShort(userData.votingPower)}`
                    : '-/-'
                }`}</span>
                <button
                  onClick={
                    votingData
                      ? () =>
                          vote(
                            Object.keys(votingData).reduce(
                              (res, key) => ({
                                ...res,
                                [key]: valueToBigNumber(
                                  votingData[key]!,
                                ).shiftedBy(WEIGHT_DECIMALS),
                              }),
                              {},
                            ),
                          )
                      : undefined
                  }
                  disabled={
                    !userData ||
                    userData.votingPower.isZero() ||
                    (!(touched && currentVotingTotal === 1) &&
                      !(
                        !touched &&
                        userData?.votingPower.gt(0) &&
                        !userData.votingPower.eq(userVoteData?.votedTotal || 0)
                      ))
                  }
                >{t`Apply`}</button>
              </Control>
            }
            columns={VOTING_COLUMNS}
            rows={markets.map((asset) =>
              votingRow({
                asset,
                voteData,
                userVoteData,
                votingData,
                setWeight: (key, weight) => {
                  setTouched(true)
                  setVotingData({ ...votingData, [key]: weight })
                },
                currentVotingTotal,
                votingPower: userData?.votingPower,
              }),
            )}
            hoverGradients={[`${darkRed}3d`, `${skyBlue}3d`, `${darkRed}3d`]}
          />
        )}
      </TableContainer>
    </DetailsSection>
  )
})``

const statsRow = ({
  asset,
  voteData,
  userVoteData,
  layPrice,
}: {
  asset: AssetMarketData
  voteData: VoteData | undefined
  userVoteData: UserVoteData | undefined
  layPrice: BigNumber | undefined
}) => {
  const { symbol, icon, name, lTokenAddress } = asset
  const assetVoteData = voteData?.data[lTokenAddress.toLowerCase()]
  const userAssetVoteData = userVoteData?.data[lTokenAddress.toLowerCase()]
  return {
    id: symbol,
    data: {
      asset: <AssetTd icon={icon} name={name} />,
      revenue:
        assetVoteData &&
        formatUSD(assetVoteData.lastWeekRevenueInUSD, { decimalPlaces: 2 }),
      apr:
        assetVoteData &&
        layPrice &&
        assetVoteData.weight.gt(BN_ZERO) &&
        formatPct(
          assetVoteData.lastWeekRevenueInUSD
            .div(7)
            .times(365)
            .div(assetVoteData.weight)
            .div(layPrice),
        ),
      totalWeight:
        voteData &&
        assetVoteData &&
        voteData.total.gt(BN_ZERO) &&
        `${formatAmtShort(assetVoteData.weight)}(${formatPct(
          assetVoteData.weight.div(voteData.total),
        )})`,
      weight: userAssetVoteData ? formatAmtShort(userAssetVoteData.vote) : '-',
      claimable: userAssetVoteData
        ? formatUSD(userAssetVoteData.claimableInUSD, {
            decimalPlaces: 2,
          })
        : '-',
    },
  }
}
const votingRow = ({
  asset,
  voteData,
  userVoteData,
  votingData,
  setWeight,
  currentVotingTotal,
  votingPower,
}: {
  asset: AssetMarketData
  voteData: VoteData | undefined
  userVoteData: UserVoteData | undefined
  votingData: Partial<Record<string, number>> | undefined
  setWeight: (key: string, weight: number) => void
  currentVotingTotal: number
  votingPower: BigNumber | undefined
}) => {
  const { symbol, icon, name, lTokenAddress } = asset
  const assetWeight = voteData?.data[lTokenAddress.toLowerCase()]?.weight
  const userAssetVoteData = userVoteData?.data[lTokenAddress.toLowerCase()]
  const votingWeight = votingData && votingData[lTokenAddress.toLowerCase()]
  return {
    id: symbol,
    data: {
      asset: <AssetTd icon={icon} name={name} />,
      totalWeight:
        voteData &&
        assetWeight &&
        voteData.total.gt(BN_ZERO) &&
        `${formatAmtShort(assetWeight)}(${formatPct(
          assetWeight.div(voteData.total),
        )})`,
      votedWeight: userAssetVoteData
        ? formatAmtShort(userAssetVoteData.vote)
        : '-',
      // TODO replace to editing value
      voting:
        votingPower && votingWeight != null
          ? `${formatAmtShort(votingPower.times(votingWeight))}(${formatPct(
              votingWeight,
            )})`
          : '-',
      votingSlider: (
        <Slider
          current={votingWeight || 0}
          setValue={(num) => setWeight(lTokenAddress.toLowerCase(), num)}
          remaining={1 - currentVotingTotal}
          disabled={!votingData}
        />
      ),
    },
  }
}

const Control = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 20px;
  font-size: 14px;
  span {
    font-weight: ${fontWeightMedium};
  }
  button {
    background: ${darkGray};
    border-radius: 4px;
    font-weight: ${fontWeightBold};
    padding: 8px 16px;
    line-height: 1;
    transition: background 0.15s ease-in;
    :enabled {
      background: ${purple};
    }
  }
`

const DetailsSection = styled.section`
  table {
    ${Slider} {
      margin-left: 16px;
    }
  }
`
