import { t } from '@lingui/macro'
import { Trans } from '@lingui/react'
import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import {
  AssetTd,
  MarketTable,
  TableContainer,
} from 'src/components/compositions/Markets/MarketTable'
import { Link } from 'src/components/elements/Link'
import { asStyled } from 'src/components/hoc/asStyled'
import { TooltipMessage } from 'src/components/parts/ToolTip'
import { useVoter } from 'src/hooks/contracts/useVoter'
import { TERM_UNIT, useVotingEscrow } from 'src/hooks/contracts/useVotingEscrow'
import { useLAYPrice } from 'src/hooks/useLAYPrice'
import { useMarketData } from 'src/hooks/useMarketData'
import { useVoteData } from 'src/hooks/useVoteData'
import { darkGray, darkRed, purple, skyBlue } from 'src/styles/colors'
import { fontWeightBold, fontWeightMedium } from 'src/styles/font'
import { AssetMarketData, UserVoteData, VoteData } from 'src/types/models'
import { filterFalsy } from 'src/utils/array'
import { symbolSorter } from 'src/utils/market'
import { BN_ZERO, formatAmtShort, formatPct, formatUSD } from 'src/utils/number'
import { DOCS_VELAY } from 'src/utils/routes'
import styled from 'styled-components'
import { Slider } from './Slider'

const STATS_COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 4 },
  {
    id: 'revenue',
    name: t`Last Term Revenue`,
    tooltip: (
      <Trans
        id="The revenue of the protocol in the last term. For more detail, please refer <0>here</0>."
        components={[<Link key="0" href={DOCS_VELAY} />]}
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
        components={[<Link key="0" href={DOCS_VELAY} />]}
      />
    ),
    tooltipPosition: 'right',
    widthRatio: 3,
  },
]

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

  const { data: marketData } = useMarketData()
  const { vote, claim } = useVoter()
  const { data: voteData, userData: userVoteData } = useVoteData()
  const { userData, nextTerm } = useVotingEscrow()
  const { data: layPrice } = useLAYPrice()
  const { assets } = marketData || {}
  const markets = (assets || [])
    .filter((each) => each.isActive)
    .sort(symbolSorter)

  const currentVotingTotal =
    (votingData &&
      Object.values(votingData).reduce((res = 0, num = 0) => res + num)) ||
    0

  const nextTermDayjs = dayjs.unix(nextTerm)
  const votingPowerAvailable = userData?.lockedEnd.isAfter(nextTermDayjs)

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
                { id: 'voting', label: t`Votes` },
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
                  onClick={claim}
                  disabled={!userVoteData?.claimableTotalInUSD.gt(BN_ZERO)}
                >{t`Claim`}</button>
              </Control>
            }
            // TODO
            columns={STATS_COLUMNS as any}
            rows={markets.map((asset) =>
              statsRow({
                asset,
                voteData,
                userVoteData,
                layPrice,
              }),
            )}
            hoverGradients={[`${darkRed}3d`, `${skyBlue}3d`, `${darkRed}3d`]}
            placeholderLength={3}
          />
        ) : (
          <MarketTable
            tabs={{
              items: [
                { id: 'stats', label: t`Stats` },
                { id: 'voting', label: t`Votes` },
              ],
              setTab: setActiveTab,
              activeTab: 'voting',
            }}
            control={
              <Control>
                <span style={{ marginRight: 'auto' }}>
                  {t`Voting Term: ${nextTermDayjs.format(
                    'DD/MM/YYYY HH:mm:ss',
                  )} - ${nextTermDayjs
                    .add(TERM_UNIT, 's')
                    .format('DD/MM/YYYY HH:mm:ss')}`}
                </span>
                <span>
                  {t`Voting Power Used: ${
                    userData
                      ? `${formatAmtShort(
                          touched
                            ? userData.votingPower.times(currentVotingTotal)
                            : userVoteData?.votedTotal || BN_ZERO,
                        )}/${formatAmtShort(userData.votingPower)}`
                      : '-/-'
                  }`}
                  <TooltipMessage
                    message={t`The fraction of voting power you use and you have. To apply on-chain, you must use 100% of the voting power and click "Apply."`}
                  />
                </span>
                <span>
                  {t`Expiry: ${
                    userVoteData &&
                    userVoteData.expiry.unix() > 0 &&
                    votingPowerAvailable
                      ? userVoteData.expiry.isAfter(nextTermDayjs)
                        ? userVoteData.expiry.format('DD/MM/YYYY')
                        : `Expired`
                      : '-'
                  }`}
                  <TooltipMessage
                    message={
                      <Trans
                        id="Your voting ranges will be applied until the Expiry. All ranges will become 0 after that. For more information, please click <0>here</0>."
                        components={[<Link key="0" href={DOCS_VELAY} />]}
                      />
                    }
                  />
                </span>
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
                votingPowerAvailable,
              }),
            )}
            hoverGradients={[`${darkRed}3d`, `${skyBlue}3d`, `${darkRed}3d`]}
            placeholderLength={3}
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
  const { symbol, displaySymbol, icon, lTokenAddress } = asset
  const assetVoteData = voteData?.data[lTokenAddress.toLowerCase()]
  const userAssetVoteData = userVoteData?.data[lTokenAddress.toLowerCase()]
  return {
    id: symbol,
    data: {
      asset: <AssetTd icon={icon} name={displaySymbol || symbol} />,
      revenue: '-',
      // TODO temporarily
      // assetVoteData &&
      // formatUSD(assetVoteData.lastWeekRevenueInUSD, { decimalPlaces: 2 }),
      apr: '-',
      // assetVoteData &&
      // layPrice &&
      // (assetVoteData.weight.gt(BN_ZERO)
      //   ? formatPct(
      //       assetVoteData.lastWeekRevenueInUSD
      //         .div(14)
      //         .times(365)
      //         .div(assetVoteData.weight.times(layPrice)),
      //     )
      //   : '-'),
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
  votingPowerAvailable,
}: {
  asset: AssetMarketData
  voteData: VoteData | undefined
  userVoteData: UserVoteData | undefined
  votingData: Partial<Record<string, number>> | undefined
  setWeight: (key: string, weight: number) => void
  currentVotingTotal: number
  votingPower: BigNumber | undefined
  votingPowerAvailable: boolean | undefined
}) => {
  const { symbol, displaySymbol, icon, lTokenAddress } = asset
  const assetWeight = voteData?.data[lTokenAddress.toLowerCase()]?.weight
  const userAssetVoteData = userVoteData?.data[lTokenAddress.toLowerCase()]
  const votingWeight = votingData && votingData[lTokenAddress.toLowerCase()]
  return {
    id: symbol,
    data: {
      asset: <AssetTd icon={icon} name={displaySymbol || symbol} />,
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
          disabled={!votingData || !votingPowerAvailable}
        />
      ),
    },
  }
}

const Control = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  margin-left: 64px;
  column-gap: 20px;
  font-size: 14px;
  span {
    display: flex;
    column-gap: 4px;
    font-weight: ${fontWeightMedium};
    ${TooltipMessage} {
      width: 240px;
    }
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
