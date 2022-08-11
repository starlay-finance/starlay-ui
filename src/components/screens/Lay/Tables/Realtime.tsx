import { t } from '@lingui/macro'
import { Trans } from '@lingui/react'
import dayjs from 'dayjs'
import { VFC } from 'react'
import {
  AssetTd,
  MarketTable,
} from 'src/components/compositions/Markets/MarketTable'
import { Link } from 'src/components/elements/Link'
import { TERM_UNIT, useVotingEscrow } from 'src/hooks/contracts/useVotingEscrow'
import { useVoteData } from 'src/hooks/useVoteData'
import { darkRed, skyBlue } from 'src/styles/colors'
import { AssetMarketData, UserVoteData, VoteData } from 'src/types/models'
import { BN_ZERO, formatAmtShort, formatPct, formatUSD } from 'src/utils/number'
import { DOCS_VELAY_CLAIM, DOCS_VELAY_TERMS } from 'src/utils/routes'
import { Control, TABS } from './common'

const REALTIME_COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 4 },
  {
    id: 'revenue',
    name: t`Earned Revenue`,
    tooltip: (
      <Trans
        id="The revenue of the protocol so far in the current Term. For more detail, please refer <0>here</0>."
        components={[<Link key="0" href={DOCS_VELAY_TERMS} />]}
      />
    ),
    widthRatio: 4,
  },
  {
    id: 'totalWeight',
    name: t`Applied Total Weight`,
    tooltip: t`The total number and percentage of voting power each asset obtained.`,
    widthRatio: 3,
  },
  {
    id: 'weight',
    name: t`Your Applied Weight`,
    tooltip: t`The number of voting power you voted for each asset.`,
    widthRatio: 3,
  },
  {
    id: 'dividends',
    name: t`Your Dividend`,
    tooltip: (
      <Trans
        id="Dividend you earned so far in the current Term. You can claim after the Term ends. For more detail, please click <0>here</0>."
        components={[<Link key="0" href={DOCS_VELAY_CLAIM} />]}
      />
    ),
    tooltipPosition: 'right',
    widthRatio: 3,
  },
] as const

type RealtimeTableProps = {
  markets: AssetMarketData[]
  changeTab: (tab: string) => void
}
export const RealtimeTable: VFC<RealtimeTableProps> = ({
  markets,
  changeTab,
}) => {
  const { data: voteData, userData: userVoteData } = useVoteData(-1)
  const { userData, term } = useVotingEscrow(-1)
  const thisTermDayjs = dayjs.unix(term)
  return (
    <MarketTable
      tabs={{ items: TABS, setTab: changeTab, activeTab: 'realtime' }}
      control={
        <Control>
          <span style={{ marginRight: 'auto' }}>
            {t`Term: ${thisTermDayjs.format(
              'DD/MM/YYYY HH:mm:ss',
            )} - ${thisTermDayjs
              .add(TERM_UNIT, 's')
              .format('DD/MM/YYYY HH:mm:ss')}`}
          </span>
        </Control>
      }
      // TODO
      columns={REALTIME_COLUMNS as any}
      rows={markets.map((asset) =>
        realtimeRow({ asset, voteData, userVoteData }),
      )}
      hoverGradients={[`${darkRed}3d`, `${skyBlue}3d`, `${darkRed}3d`]}
      placeholderLength={3}
    />
  )
}

const realtimeRow = ({
  asset,
  voteData,
  userVoteData,
}: {
  asset: AssetMarketData
  voteData: VoteData | undefined
  userVoteData: UserVoteData | undefined
}) => {
  const { symbol, displaySymbol, icon, lTokenAddress } = asset
  const assetVoteData = voteData?.data[lTokenAddress.toLowerCase()]
  const userAssetVoteData = userVoteData?.data[lTokenAddress.toLowerCase()]
  const userShare =
    userAssetVoteData &&
    assetVoteData &&
    userAssetVoteData.vote.div(assetVoteData.weight)
  return {
    id: symbol,
    data: {
      asset: <AssetTd icon={icon} name={displaySymbol || symbol} />,
      revenue: !voteData
        ? undefined
        : assetVoteData
        ? formatUSD(assetVoteData.lastWeekRevenueInUSD, { decimalPlaces: 2 })
        : '-',
      totalWeight: !voteData
        ? undefined
        : assetVoteData
        ? `${formatAmtShort(assetVoteData.weight)}(${formatPct(
            voteData.total.gt(BN_ZERO)
              ? assetVoteData.weight.div(voteData.total)
              : 0,
          )})`
        : '-',
      weight: userShare
        ? `${formatAmtShort(userAssetVoteData.vote)}(${formatPct(userShare)})`
        : '-',
      dividends: userShare
        ? formatUSD(assetVoteData.lastWeekRevenueInUSD.times(userShare), {
            decimalPlaces: 2,
          })
        : '-',
    },
  }
}
