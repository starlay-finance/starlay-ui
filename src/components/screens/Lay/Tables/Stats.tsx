import { t } from '@lingui/macro'
import { Trans } from '@lingui/react'
import { BigNumber } from '@starlay-finance/math-utils'
import { VFC } from 'react'
import {
  AssetTd,
  MarketTable,
} from 'src/components/compositions/Markets/MarketTable'
import { Link } from 'src/components/elements/Link'
import { useVoter } from 'src/hooks/contracts/useVoter'
import { useSwitchChainIfUnsupported } from 'src/hooks/useUnsupportedChainAlert'
import { useVoteData } from 'src/hooks/useVoteData'
import { darkRed, skyBlue } from 'src/styles/colors'
import { AssetMarketData, UserVoteData, VoteData } from 'src/types/models'
import { BN_ZERO, formatAmtShort, formatPct, formatUSD } from 'src/utils/number'
import { DOCS_VELAY_CLAIM, DOCS_VELAY_TERMS } from 'src/utils/routes'
import { Control, TABS } from './common'

const STATS_COLUMNS = [
  { id: 'asset', name: t`Asset`, widthRatio: 3 },
  {
    id: 'revenue',
    name: t`Last Term Revenue`,
    tooltip: (
      <Trans
        id="The revenue of the protocol in the last Term. For more detail, please refer <0>here</0>."
        components={[<Link key="0" href={DOCS_VELAY_TERMS} />]}
      />
    ),
    widthRatio: 2,
  },
  {
    id: 'lastTermWeight',
    name: t`Last Term Weight`,
    tooltip: (
      <Trans
        id="The percentage of voting power each asset obtained in the last Term."
        components={[<Link key="0" href={DOCS_VELAY_TERMS} />]}
      />
    ),
    widthRatio: 2,
  },
  {
    id: 'apr',
    name: t`Est. Reward APR`,
    tooltip: t`Estimated APR of rewards calculated from Last Term Revenue and Total Weight.`,
    widthRatio: 2,
  },
  {
    id: 'totalWeight',
    name: t`Total Weight`,
    tooltip: t`The total number and percentage of voting power of each asset planned to be applied for the next Term.`,
    widthRatio: 2,
  },
  {
    id: 'weight',
    name: t`Your Weight`,
    tooltip: t`The number of voting power you voted for each asset which will be applied for the next Term.`,
    widthRatio: 2,
  },
  {
    id: 'claimable',
    name: t`Claimable Amount`,
    tooltip: (
      <Trans
        id="Rewards you can claim from the revenue of Terms your voting results applied. For more detail, please click <0>here</0>."
        components={[<Link key="0" href={DOCS_VELAY_CLAIM} />]}
      />
    ),
    tooltipPosition: 'right',
    widthRatio: 3,
  },
]

type StatsTableProps = {
  voteData: VoteData | undefined
  userVoteData: UserVoteData | undefined
  markets: AssetMarketData[]
  layPrice: BigNumber | undefined
  changeTab: (tab: string) => void
}
export const StatsTable: VFC<StatsTableProps> = ({
  voteData,
  userVoteData,
  markets,
  layPrice,
  changeTab,
}) => {
  const { switchChainIfUnsupported } = useSwitchChainIfUnsupported()
  const { claim } = useVoter()
  const { data: lastTermVoteData } = useVoteData(-2)
  return (
    <MarketTable
      tabs={{ items: TABS, setTab: changeTab, activeTab: 'stats' }}
      control={
        <Control>
          <span>{t`Total Claimable: ${
            userVoteData ? formatUSD(userVoteData.claimableTotalInUSD) : '-'
          }`}</span>
          <button
            onClick={switchChainIfUnsupported(claim)}
            disabled={!userVoteData?.claimableTotalInUSD.gt(BN_ZERO)}
          >{t`Claim`}</button>
        </Control>
      }
      // TODO
      columns={STATS_COLUMNS as any}
      rows={markets.map((asset) =>
        statsRow({ asset, voteData, userVoteData, layPrice, lastTermVoteData }),
      )}
      hoverGradients={[`${darkRed}3d`, `${skyBlue}3d`, `${darkRed}3d`]}
      placeholderLength={3}
    />
  )
}

const statsRow = ({
  asset,
  voteData,
  userVoteData,
  layPrice,
  lastTermVoteData,
}: {
  asset: AssetMarketData
  voteData: VoteData | undefined
  lastTermVoteData: VoteData | undefined
  userVoteData: UserVoteData | undefined
  layPrice: BigNumber | undefined
}) => {
  const { symbol, displaySymbol, icon, lTokenAddress } = asset
  const assetVoteData = voteData?.data[lTokenAddress.toLowerCase()]
  const userAssetVoteData = userVoteData?.data[lTokenAddress.toLowerCase()]
  const lastTermAssetVoteData =
    lastTermVoteData?.data[lTokenAddress.toLowerCase()]
  return {
    id: symbol,
    data: {
      asset: <AssetTd icon={icon} name={displaySymbol || symbol} />,
      revenue: !voteData
        ? undefined
        : assetVoteData
        ? formatUSD(assetVoteData.lastWeekRevenueInUSD, { decimalPlaces: 2 })
        : '-',
      lastTermWeight: !lastTermVoteData
        ? undefined
        : lastTermAssetVoteData && lastTermVoteData.total.gt(BN_ZERO)
        ? formatPct(lastTermAssetVoteData.weight.div(lastTermVoteData.total))
        : '-',
      apr: !voteData
        ? undefined
        : assetVoteData && layPrice
        ? formatPct(
            assetVoteData.weight.gt(BN_ZERO)
              ? assetVoteData.lastWeekRevenueInUSD
                  .div(14)
                  .times(365)
                  .div(assetVoteData.weight.times(layPrice))
              : 0,
          )
        : '-',
      totalWeight: !voteData
        ? undefined
        : assetVoteData && voteData.total.gt(BN_ZERO)
        ? `${formatAmtShort(assetVoteData.weight)}(${formatPct(
            assetVoteData.weight.div(voteData.total),
          )})`
        : '-',
      weight:
        userAssetVoteData && assetVoteData
          ? `${formatAmtShort(userAssetVoteData.vote)}(${formatPct(
              assetVoteData.weight.isZero()
                ? BN_ZERO
                : userAssetVoteData.vote.div(assetVoteData.weight),
            )})`
          : '-',
      claimable: userAssetVoteData
        ? formatUSD(userAssetVoteData.claimableInUSD, {
            decimalPlaces: 2,
          })
        : '-',
    },
  }
}
