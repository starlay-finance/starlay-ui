import { t } from '@lingui/macro'
import { BigNumber, valueToBigNumber } from '@starlay-finance/math-utils'
import dayjs from 'dayjs'
import { VFC } from 'react'
import {
  AssetTd,
  MarketTable,
} from 'src/components/compositions/Markets/MarketTable'
import { TooltipMessage } from 'src/components/parts/ToolTip'
import { useVoter } from 'src/hooks/contracts/useVoter'
import { TERM_UNIT, useVotingEscrow } from 'src/hooks/contracts/useVotingEscrow'
import { darkRed, skyBlue } from 'src/styles/colors'
import { AssetMarketData, UserVoteData, VoteData } from 'src/types/models'
import { BN_ZERO, formatAmtShort, formatPct } from 'src/utils/number'
import { Slider } from '../Slider'
import { Control, TABS } from './common'

const VOTES_COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 6 },
  {
    id: 'totalWeight',
    name: t`Total Weight`,
    tooltip: t`The total number and percentage of voting power of each asset planned to be applied for the next Term.`,
    widthRatio: 3,
  },
  {
    id: 'votedWeight',
    name: t`Voted Weight`,
    tooltip: t`The number of voting power you voted for each asset which will be applied for the next Term.`,
    widthRatio: 3,
  },
  {
    id: 'voting',
    name: t`Voting Allocations`,
    tooltip: t`The number and percentage of voting power you apply for each asset for the next Term.`,
    widthRatio: 3,
  },
  { id: 'votingSlider', name: '', widthRatio: 6 },
]
const WEIGHT_DECIMALS = 4

type VotesTableProps = {
  voteData: VoteData | undefined
  userVoteData: UserVoteData | undefined
  votingData: Partial<Record<string, number>> | undefined
  markets: AssetMarketData[]
  layPrice: BigNumber | undefined
  touched: boolean
  changeTab: (tab: string) => void
  touch: () => void
  setVotingData: (data: Partial<Record<string, number>>) => void
}
export const VotesTable: VFC<VotesTableProps> = ({
  markets,
  voteData,
  userVoteData,
  votingData,
  touched,
  changeTab,
  touch,
  setVotingData,
}) => {
  const { userData, term } = useVotingEscrow()
  const { vote } = useVoter()

  const currentVotingTotal =
    (votingData &&
      Object.values(votingData).reduce((res = 0, num = 0) => res + num)) ||
    0

  const nextTermDayjs = dayjs.unix(term)
  const votingPowerAvailable = userData?.lockedEnd.isAfter(nextTermDayjs)
  return (
    <MarketTable
      tabs={{ items: TABS, setTab: changeTab, activeTab: 'votes' }}
      control={
        <Control>
          <span style={{ marginRight: 'auto' }}>
            {t`Voting Term: ${nextTermDayjs.format(
              'DD/MM/YYYY HH:mm',
            )} - ${nextTermDayjs
              .add(TERM_UNIT, 's')
              .format('DD/MM/YYYY HH:mm')}`}
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
              message={t`Your voting ranges will be applied until the Expiry. All ranges will become 0 after that.`}
            />
          </span>
          <button
            onClick={
              votingData
                ? () =>
                    // TODO warn if voting for frozen assets
                    vote(
                      Object.keys(votingData).reduce(
                        (res, key) => ({
                          ...res,
                          [key]: valueToBigNumber(votingData[key]!).shiftedBy(
                            WEIGHT_DECIMALS,
                          ),
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
                  userVoteData &&
                  userVoteData.expiry.unix() > 0 &&
                  userData?.votingPower.gt(0) &&
                  !userData.votingPower.eq(userVoteData.votedTotal || 0)
                ))
            }
          >{t`Apply`}</button>
        </Control>
      }
      columns={VOTES_COLUMNS}
      rows={markets.map((asset) =>
        votingRow({
          asset,
          voteData,
          userVoteData,
          votingData,
          setWeight: (key, weight) => {
            touch()
            setVotingData({
              ...votingData,
              [key]: valueToBigNumber(weight)
                .decimalPlaces(4, BigNumber.ROUND_FLOOR)
                .toNumber(),
            })
          },
          currentVotingTotal,
          votingPower: userData?.votingPower,
          votingPowerAvailable,
        }),
      )}
      hoverGradients={[`${darkRed}3d`, `${skyBlue}3d`, `${darkRed}3d`]}
      placeholderLength={3}
    />
  )
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
      totalWeight: !voteData
        ? undefined
        : assetWeight
        ? `${formatAmtShort(assetWeight)}(${formatPct(
            voteData.total.gt(BN_ZERO) ? assetWeight.div(voteData.total) : 0,
          )})`
        : '-',
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
          disabled={
            !assetWeight ||
            (asset.isFrozen && votingWeight === 0) ||
            !votingData ||
            !votingPowerAvailable
          }
        />
      ),
    },
  }
}
